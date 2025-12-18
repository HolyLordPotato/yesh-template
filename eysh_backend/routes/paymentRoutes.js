const express = require('express');
const router = express.Router();
const pool = require('../db');
const qrcode = require('qrcode');

// Get packages
router.get('/packages', async (req, res) => {
  try {
    const packages = await pool.query('SELECT * FROM packages');
    res.json(packages.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Purchase package
router.post('/purchase/:packageId', async (req, res) => {
  const { packageId } = req.params;

  try {
    const pkg = await pool.query('SELECT * FROM packages WHERE id = $1', [packageId]);
    if (pkg.rows.length === 0) return res.status(404).json({ error: 'Package not found' });

    // Generate QR code for payment (simulate)
    const paymentData = `Payment for ${pkg.rows[0].name} - Amount: ${pkg.rows[0].price}`;
    const qrCode = await qrcode.toDataURL(paymentData);

    // Since no auth, don't save user_packages
    res.json({ qrCode, message: 'Purchase simulated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check access
router.get('/access', async (req, res) => {
  // Since no auth, assume always access
  res.json({ hasAccess: true });
});

module.exports = router;