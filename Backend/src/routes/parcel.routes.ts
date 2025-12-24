import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = Router();

// Get all parcels
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT vp.*, u.name as resident_name, u.flat_number, sg.name as guard_name
      FROM visitors_parcels vp
      LEFT JOIN users u ON vp.resident_id = u.id
      LEFT JOIN users sg ON vp.security_guard_id = sg.id
      WHERE vp.type = 'parcel'
      ORDER BY vp.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Get parcels error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get parcels by resident
router.get('/resident/:residentId', async (req: Request, res: Response) => {
  try {
    const { residentId } = req.params;
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT vp.*, sg.name as guard_name
      FROM visitors_parcels vp
      LEFT JOIN users sg ON vp.security_guard_id = sg.id
      WHERE vp.type = 'parcel' AND vp.resident_id = ?
      ORDER BY vp.created_at DESC
    `, [residentId]);
    res.json(rows);
  } catch (error) {
    console.error('Get resident parcels error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Log new parcel
router.post('/', async (req: Request, res: Response) => {
  try {
    const { residentId, securityGuardId, name, description, media } = req.body;

    if (!residentId || !name) {
      return res.status(400).json({ error: 'Resident and parcel details are required' });
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO visitors_parcels (resident_id, security_guard_id, type, name, description, media, status)
       VALUES (?, ?, 'parcel', ?, ?, ?, 'Received')`,
      [residentId, securityGuardId || null, name, description || null, media || null]
    );

    res.status(201).json({ message: 'Parcel logged successfully', id: result.insertId });
  } catch (error) {
    console.error('Log parcel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update parcel status
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['Received', 'Acknowledged', 'Entered', 'Exited', 'Collected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    if (notes) {
      await pool.execute(
        'UPDATE visitors_parcels SET status = ?, notes = ? WHERE id = ? AND type = ?',
        [status, notes, id, 'parcel']
      );
    } else {
      await pool.execute(
        'UPDATE visitors_parcels SET status = ? WHERE id = ? AND type = ?',
        [status, id, 'parcel']
      );
    }

    res.json({ message: 'Parcel status updated successfully' });
  } catch (error) {
    console.error('Update parcel status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent parcel history
router.get('/history/recent', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT vp.*, u.name as resident_name, u.flat_number
      FROM visitors_parcels vp
      LEFT JOIN users u ON vp.resident_id = u.id
      WHERE vp.type = 'parcel'
      ORDER BY vp.created_at DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (error) {
    console.error('Get parcel history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
