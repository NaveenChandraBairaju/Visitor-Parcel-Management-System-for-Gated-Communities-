import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = Router();


router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT fv.*, u.name as resident_name, u.flat_number
      FROM frequent_visitors fv
      JOIN users u ON fv.resident_id = u.id
      ORDER BY fv.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Get frequent visitors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/resident/:residentId', async (req: Request, res: Response) => {
  try {
    const { residentId } = req.params;
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT * FROM frequent_visitors
      WHERE resident_id = ?
      ORDER BY created_at DESC
    `, [residentId]);
    res.json(rows);
  } catch (error) {
    console.error('Get resident frequent visitors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT fv.*, u.name as resident_name, u.flat_number
      FROM frequent_visitors fv
      JOIN users u ON fv.resident_id = u.id
      WHERE fv.name LIKE ? OR fv.phone LIKE ?
      ORDER BY fv.name ASC
    `, [`%${query}%`, `%${query}%`]);
    res.json(rows);
  } catch (error) {
    console.error('Search frequent visitors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', async (req: Request, res: Response) => {
  try {
    const { residentId, name, phone, relationship } = req.body;

    if (!residentId || !name || !phone || !relationship) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO frequent_visitors (resident_id, name, phone, relationship)
       VALUES (?, ?, ?, ?)`,
      [residentId, name, phone, relationship]
    );

    res.status(201).json({ message: 'Frequent visitor added successfully', id: result.insertId });
  } catch (error) {
    console.error('Add frequent visitor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM frequent_visitors WHERE id = ?', [id]);
    res.json({ message: 'Frequent visitor deleted successfully' });
  } catch (error) {
    console.error('Delete frequent visitor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
