const express = require('express');
const { Resend } = require('resend');
const path = require('path');

const app = express();
app.use(express.json());

/* Allow requests from the portfolio static site */
app.use(function (req, res, next) {
  const allowed = [
    'https://thobane-sithole-portfolio.onrender.com',
    'http://localhost:3000',
    'http://localhost:3333',
    'http://127.0.0.1:3333',
    'http://127.0.0.1:5500'
  ];
  const origin = req.headers.origin;
  if (!origin || allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
  const { name, email, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const toEmail = process.env.CONTACT_TO_EMAIL || 'fortitudefounders@gmail.com';

  try {
    await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New inquiry from ${name} — ${service || 'General'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#020202;color:#fff;padding:32px;border-radius:8px;">
          <h2 style="color:#e85d00;margin:0 0 24px;font-size:24px;text-transform:uppercase;letter-spacing:3px;">New Portfolio Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;width:120px;">Name</td><td style="padding:8px 0;color:#fff;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Email</td><td style="padding:8px 0;color:#fff;">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Service</td><td style="padding:8px 0;color:#fff;">${service || 'Not specified'}</td></tr>
          </table>
          <div style="margin-top:24px;padding-top:24px;border-top:1px solid #333;">
            <p style="color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">Message</p>
            <p style="color:#fff;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="margin-top:32px;font-size:11px;color:#555;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
