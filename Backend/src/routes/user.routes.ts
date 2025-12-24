import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

const router = Router();

// Get all users (admin only)
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, name, email, role, contact_info, flat_number, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all residents (for security guard dropdown)
router.get('/residents', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, name, flat_number, contact_info FROM users WHERE role = ? ORDER BY flat_number',
      ['resident']
    );
    res.json(rows);
  } catch (error) {
    console.error('Get residents error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, name, email, role, contact_info, flat_number, created_at FROM users WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get dashboard stats (admin)
router.get('/stats/dashboard', async (req: Request, res: Response) => {
  try {
    const [userCount] = await pool.execute<RowDataPacket[]>('SELECT COUNT(*) as count FROM users');
    const [visitorCount] = await pool.execute<RowDataPacket[]>("SELECT COUNT(*) as count FROM visitors_parcels WHERE type = 'visitor'");
    const [parcelCount] = await pool.execute<RowDataPacket[]>("SELECT COUNT(*) as count FROM visitors_parcels WHERE type = 'parcel'");
    const [pendingVisitors] = await pool.execute<RowDataPacket[]>("SELECT COUNT(*) as count FROM visitors_parcels WHERE type = 'visitor' AND status IN ('New', 'Waiting for Approval')");
    const [pendingParcels] = await pool.execute<RowDataPacket[]>("SELECT COUNT(*) as count FROM visitors_parcels WHERE type = 'parcel' AND status = 'Received'");

    res.json({
      totalUsers: userCount[0].count,
      totalVisitors: visitorCount[0].count,
      totalParcels: parcelCount[0].count,
      pendingVisitors: pendingVisitors[0].count,
      pendingParcels: pendingParcels[0].count
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
