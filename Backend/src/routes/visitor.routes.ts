import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = Router();

// Get all visitors
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT vp.*, u.name as resident_name, u.flat_number, sg.name as guard_name
      FROM visitors_parcels vp
      LEFT JOIN users u ON vp.resident_id = u.id
      LEFT JOIN users sg ON vp.security_guard_id = sg.id
      WHERE vp.type = 'visitor'
      ORDER BY vp.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Get visitors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get visitors by resident
router.get('/resident/:residentId', async (req: Request, res: Response) => {
  try {
    const { residentId } = req.params;
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT vp.*, sg.name as guard_name
      FROM visitors_parcels vp
      LEFT JOIN users sg ON vp.security_guard_id = sg.id
      WHERE vp.type = 'visitor' AND vp.resident_id = ?
      ORDER BY vp.created_at DESC
    `, [residentId]);
    res.json(rows);
  } catch (error) {
    console.error('Get resident visitors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get pending visitors for approval
router.get('/pending/:residentId', async (req: Request, res: Response) => {
  try {
    const { residentId } = req.params;
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT vp.*, sg.name as guard_name
      FROM visitors_parcels vp
      LEFT JOIN users sg ON vp.security_guard_id = sg.id
      WHERE vp.type = 'visitor' AND vp.resident_id = ? AND vp.status IN ('New', 'Waiting for Approval')
      ORDER BY vp.created_at DESC
    `, [residentId]);
    res.json(rows);
  } catch (error) {
    console.error('Get pending visitors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Log new visitor
router.post('/', async (req: Request, res: Response) => {
  try {
    const { residentId, securityGuardId, name, phone, purpose, vehicleDetails, media } = req.body;

    if (!residentId || !name || !purpose) {
      return res.status(400).json({ error: 'Resident, visitor name, and purpose are required' });
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO visitors_parcels (resident_id, security_guard_id, type, name, phone, purpose, vehicle_details, media, status)
       VALUES (?, ?, 'visitor', ?, ?, ?, ?, ?, 'Waiting for Approval')`,
      [residentId, securityGuardId || null, name, phone || null, purpose, vehicleDetails || null, media || null]
    );

    res.status(201).json({ message: 'Visitor logged successfully', id: result.insertId });
  } catch (error) {
    console.error('Log visitor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update visitor status
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['New', 'Waiting for Approval', 'Approved', 'Rejected', 'Entered', 'Exited'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    if (notes) {
      await pool.execute(
        'UPDATE visitors_parcels SET status = ?, notes = ? WHERE id = ? AND type = ?',
        [status, notes, id, 'visitor']
      );
    } else {
      await pool.execute(
        'UPDATE visitors_parcels SET status = ? WHERE id = ? AND type = ?',
        [status, id, 'visitor']
      );
    }

    res.json({ message: 'Visitor status updated successfully' });
  } catch (error) {
    console.error('Update visitor status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent visitor history
router.get('/history/recent', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT vp.*, u.name as resident_name, u.flat_number
      FROM visitors_parcels vp
      LEFT JOIN users u ON vp.resident_id = u.id
      WHERE vp.type = 'visitor'
      ORDER BY vp.created_at DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (error) {
    console.error('Get visitor history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
