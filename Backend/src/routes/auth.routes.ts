import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, name, email, role, contact_info, flat_number FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        fullName: user.name,
        email: user.email,
        role: user.role,
        contactInfo: user.contact_info,
        flatNumber: user.flat_number
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Signup
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, contactInfo, flatNumber } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password, and role are required' });
    }

    // Check if email exists
    const [existing] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role, contact_info, flat_number) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password, role, contactInfo || null, flatNumber || null]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
