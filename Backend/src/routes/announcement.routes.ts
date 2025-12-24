import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = Router();

// Get all announcements
router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT a.*, u.name as created_by_name
      FROM announcements a
      LEFT JOIN users u ON a.created_by = u.id
      ORDER BY a.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get announcements by audience (for residents/security)
router.get('/audience/:audience', async (req: Request, res: Response) => {
  try {
    const { audience } = req.params;
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT a.*, u.name as created_by_name
      FROM announcements a
      LEFT JOIN users u ON a.created_by = u.id
      WHERE a.audience = 'All' OR a.audience = ?
      ORDER BY a.priority DESC, a.created_at DESC
    `, [audience]);
    res.json(rows);
  } catch (error) {
    console.error('Get announcements by audience error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create announcement (admin only)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, message, audience, priority, createdBy } = req.body;

    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' });
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO announcements (title, message, audience, priority, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      [title, message, audience || 'All', priority || 'normal', createdBy || null]
    );

    res.status(201).json({ message: 'Announcement created successfully', id: result.insertId });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete announcement
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM announcements WHERE id = ?', [id]);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
