// /api/contact.js - Vercel Serverless Function for Portfolio Inquiries & Call Bookings
export default async function handler(req, res) {
  // CORS Headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      formType = 'inquiry', // 'inquiry' | 'call'
      name,
      email,
      phone,
      service,
      budget,
      topic,
      preferredDate,
      preferredTime,
      message,
      notes
    } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and Email are required fields.' });
    }

    const recipients = (process.env.CONTACT_EMAILS || 'rounakkayal0@gmail.com,manishanandi2005@gmail.com')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);

    const isCall = formType === 'call' || !!preferredDate;
    const subject = isCall
      ? `📅 30-Min Discovery Call Request: ${name}`
      : `🚀 New Project Inquiry: ${name} (${service || 'General'})`;

    // 1. Preferred Primary: RESEND API (Recommended on Vercel)
    if (process.env.RESEND_API_KEY) {
      const htmlContent = isCall
        ? `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF9F6; border: 1px solid #E4E2DC; border-radius: 16px; overflow: hidden; color: #111111;">
          <div style="background-color: #111111; padding: 28px 32px; color: #ffffff;">
            <h1 style="margin: 0; font-size: 20px; letter-spacing: 0.5px; font-weight: 800;">ROUNAK × MANISHA</h1>
            <p style="margin: 6px 0 0 0; color: #E06D53; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">📅 30-Min Discovery Call Booking</p>
          </div>
          <div style="padding: 32px;">
            <p style="font-size: 15px; line-height: 1.6; margin-top: 0; color: #333333;">You received a new 30-min discovery call request from your portfolio website:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #ffffff; border-radius: 12px; border: 1px solid #EAE8E2; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
              <tr style="border-bottom: 1px solid #F0EEEA;">
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; width: 35%; font-size: 12px; text-transform: uppercase;">Name</td>
                <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #111111;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EEEA;">
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; font-size: 12px; text-transform: uppercase;">Email</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #2457FF;"><a href="mailto:${email}" style="color: #2457FF; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EEEA;">
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; font-size: 12px; text-transform: uppercase;">Phone</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #111111;">${phone || 'Not provided'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EEEA;">
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; font-size: 12px; text-transform: uppercase;">Preferred Date</td>
                <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #111111;">${preferredDate || 'Flexible'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EEEA;">
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; font-size: 12px; text-transform: uppercase;">Preferred Time</td>
                <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #2457FF;">${preferredTime || '11:00 AM IST'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EEEA;">
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; font-size: 12px; text-transform: uppercase;">Discussion Topic</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #111111; font-weight: 600;">${topic || 'General Discussion'}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; font-size: 12px; text-transform: uppercase;">Notes</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #333333; line-height: 1.5; white-space: pre-wrap;">${notes || 'No extra notes.'}</td>
              </tr>
            </table>
            <div style="text-align: center; margin-top: 28px;">
              <a href="mailto:${email}?subject=Re:%20Discovery%20Call%20Booking%20—%20Rounak%20%26%20Manisha" style="display: inline-block; background-color: #2457FF; color: #ffffff; padding: 13px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px;">REPLY TO ${name.toUpperCase()}</a>
            </div>
          </div>
        </div>
        `
        : `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF9F6; border: 1px solid #E4E2DC; border-radius: 16px; overflow: hidden; color: #111111;">
          <div style="background-color: #111111; padding: 28px 32px; color: #ffffff;">
            <h1 style="margin: 0; font-size: 20px; letter-spacing: 0.5px; font-weight: 800;">ROUNAK × MANISHA</h1>
            <p style="margin: 6px 0 0 0; color: #2457FF; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">🚀 New Project Inquiry</p>
          </div>
          <div style="padding: 32px;">
            <p style="font-size: 15px; line-height: 1.6; margin-top: 0; color: #333333;">You received a new project inquiry from your portfolio website:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #ffffff; border-radius: 12px; border: 1px solid #EAE8E2; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
              <tr style="border-bottom: 1px solid #F0EEEA;">
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; width: 35%; font-size: 12px; text-transform: uppercase;">Client Name</td>
                <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #111111;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EEEA;">
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; font-size: 12px; text-transform: uppercase;">Client Email</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #2457FF;"><a href="mailto:${email}" style="color: #2457FF; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EEEA;">
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; font-size: 12px; text-transform: uppercase;">Service Required</td>
                <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #111111;">${service || 'Full Website Experience'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EEEA;">
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; font-size: 12px; text-transform: uppercase;">Budget Range</td>
                <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #2457FF;">${budget || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; font-weight: 700; color: #6F6F6A; font-size: 12px; text-transform: uppercase;">Project Details</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #333333; line-height: 1.5; white-space: pre-wrap;">${message || 'No additional details provided.'}</td>
              </tr>
            </table>
            <div style="text-align: center; margin-top: 28px;">
              <a href="mailto:${email}?subject=Re:%20Project%20Inquiry%20—%20Rounak%20%26%20Manisha" style="display: inline-block; background-color: #2457FF; color: #ffffff; padding: 13px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px;">REPLY TO ${name.toUpperCase()}</a>
            </div>
          </div>
        </div>
        `;

      const fromAddress = process.env.RESEND_FROM_EMAIL || 'RKMN Portfolio <onboarding@resend.dev>';

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: recipients,
          reply_to: email,
          subject: subject,
          html: htmlContent
        })
      });

      if (resendResponse.ok) {
        return res.status(200).json({ success: true, provider: 'resend' });
      } else {
        const errorData = await resendResponse.json();
        console.error('Resend API Error:', errorData);
      }
    }

    // 2. Secondary: WEB3FORMS (If WEB3FORMS_ACCESS_KEY is set)
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const web3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject: subject,
          from_name: name,
          email: email,
          ...req.body
        })
      });

      if (web3Res.ok) {
        return res.status(200).json({ success: true, provider: 'web3forms' });
      }
    }

    // 3. Fallback: FormSubmit server-side call
    const formSubmitPayload = {
      _subject: subject,
      _replyto: email,
      _captcha: 'false',
      _template: 'table',
      _cc: recipients.slice(1).join(','),
      ...req.body
    };

    const primaryRecipient = recipients[0] || 'rounakkayal0@gmail.com';
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${primaryRecipient}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formSubmitPayload)
    });

    if (formSubmitRes.ok) {
      return res.status(200).json({ success: true, provider: 'formsubmit' });
    }

    return res.status(200).json({ success: true, notice: 'Processed' });
  } catch (error) {
    console.error('Contact handler error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
