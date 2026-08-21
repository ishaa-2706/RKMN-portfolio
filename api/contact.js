// /api/contact.js - Server-side API handler (Vercel Serverless Function & local dev)
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
      helpNeeded,
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

    const isCall = formType === 'call' || !!preferredDate;
    const subject = isCall
      ? `📅 30-Min Discovery Call Booking: ${name}`
      : `🚀 New Project Inquiry: ${name}`;

    const htmlContent = isCall
      ? `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 20px; background-color: #F5F3EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid rgba(17,17,17,0.12); border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
          <div style="background-color: #111111; padding: 28px 32px; color: #FFFFFF;">
            <span style="font-size: 18px; font-weight: 800; letter-spacing: 1px;">ROUNAK <span style="color: #2457FF;">×</span> MANISHA</span>
            <div style="margin-top: 10px; display: inline-block; background-color: rgba(224, 109, 83, 0.15); border: 1px solid rgba(224, 109, 83, 0.4); color: #E06D53; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
              📅 30-Min Discovery Call Request
            </div>
          </div>
          <div style="padding: 32px;">
            <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 800; color: #111111;">New Discovery Call Booking</h2>
            <p style="margin: 0 0 24px 0; font-size: 14px; color: #6F6F6A; line-height: 1.5;">
              A client has requested a 30-minute discovery call from your portfolio website.
            </p>
            <table style="width: 100%; border-collapse: collapse; background-color: #FAF9F6; border: 1px solid rgba(17,17,17,0.08); border-radius: 16px; overflow: hidden;">
              <tr style="border-bottom: 1px solid rgba(17,17,17,0.06);">
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase; width: 35%;">Client Name</td>
                <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #111111;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(17,17,17,0.06);">
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase;">Email Address</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #2457FF;"><a href="mailto:${email}" style="color: #2457FF; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(17,17,17,0.06);">
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase;">Phone Number</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #111111;">${phone || 'Not provided'}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(17,17,17,0.06);">
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase;">Preferred Date</td>
                <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #111111;">${preferredDate || 'Flexible'}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(17,17,17,0.06);">
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase;">Preferred Time</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #2457FF;">${preferredTime || '11:00 AM IST'}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(17,17,17,0.06);">
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase;">Discussion Topic</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #111111; font-weight: 600;">${topic || 'General Discussion'}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase; vertical-align: top;">Additional Notes</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #333333; line-height: 1.5; white-space: pre-wrap;">${notes || 'No additional notes provided.'}</td>
              </tr>
            </table>
            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${email}?subject=Re:%20Discovery%20Call%20Booking%20—%20Rounak%20%26%20Manisha" style="display: inline-block; background-color: #111111; color: #FFFFFF; text-decoration: none; padding: 14px 28px; border-radius: 9999px; font-size: 13px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">
                Reply Directly to ${name} →
              </a>
            </div>
          </div>
          <div style="padding: 16px 32px; background-color: #FAF9F6; border-top: 1px solid rgba(17,17,17,0.06); font-size: 11px; color: #8C8C88; text-align: center;">
            Sent automatically from Rounak × Manisha Portfolio • ${new Date().toUTCString()}
          </div>
        </div>
      </body>
      </html>
      `
      : `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 20px; background-color: #F5F3EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid rgba(17,17,17,0.12); border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
          <div style="background-color: #111111; padding: 28px 32px; color: #FFFFFF;">
            <span style="font-size: 18px; font-weight: 800; letter-spacing: 1px;">ROUNAK <span style="color: #2457FF;">×</span> MANISHA</span>
            <div style="margin-top: 10px; display: inline-block; background-color: rgba(36, 87, 255, 0.15); border: 1px solid rgba(36, 87, 255, 0.4); color: #2457FF; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
              🚀 New Project Inquiry
            </div>
          </div>
          <div style="padding: 32px;">
            <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 800; color: #111111;">New Project Inquiry</h2>
            <p style="margin: 0 0 24px 0; font-size: 14px; color: #6F6F6A; line-height: 1.5;">
              A potential client has submitted an inquiry through the "Start a Project" form.
            </p>
            <table style="width: 100%; border-collapse: collapse; background-color: #FAF9F6; border: 1px solid rgba(17,17,17,0.08); border-radius: 16px; overflow: hidden;">
              <tr style="border-bottom: 1px solid rgba(17,17,17,0.06);">
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase; width: 35%;">Client Name</td>
                <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #111111;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(17,17,17,0.06);">
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase;">Client Email</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #2457FF;"><a href="mailto:${email}" style="color: #2457FF; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(17,17,17,0.06);">
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase; vertical-align: top;">How Can We Help You?</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #111111; line-height: 1.5; white-space: pre-wrap;">${helpNeeded || service || 'Not specified'}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(17,17,17,0.06);">
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase;">Estimated Budget</td>
                <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #2457FF;">${budget || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #6F6F6A; text-transform: uppercase; vertical-align: top;">Project Details & Vision</td>
                <td style="padding: 14px 18px; font-size: 14px; color: #333333; line-height: 1.5; white-space: pre-wrap;">${message || 'No additional details provided.'}</td>
              </tr>
            </table>
            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${email}?subject=Re:%20Project%20Inquiry%20—%20Rounak%20%26%20Manisha" style="display: inline-block; background-color: #2457FF; color: #FFFFFF; text-decoration: none; padding: 14px 28px; border-radius: 9999px; font-size: 13px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">
                Reply Directly to ${name} →
              </a>
            </div>
          </div>
          <div style="padding: 16px 32px; background-color: #FAF9F6; border-top: 1px solid rgba(17,17,17,0.06); font-size: 11px; color: #8C8C88; text-align: center;">
            Sent automatically from Rounak × Manisha Portfolio • ${new Date().toUTCString()}
          </div>
        </div>
      </body>
      </html>
      `;

    const fromSender = 'Rounak × Manisha <onboarding@resend.dev>';
    const dispatches = [];

    // 1. Manisha's Delivery via Resend API Key
    if (process.env.RESEND_API_KEY) {
      dispatches.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromSender,
            to: ['manishanandi2005@gmail.com'],
            reply_to: email,
            subject: subject,
            html: htmlContent
          })
        })
          .then(async (res) => {
            const data = await res.json().catch(() => ({}));
            if (!res.ok) console.error('Resend Manisha dispatch:', data);
            return data;
          })
          .catch((err) => {
            console.error('Resend Manisha error:', err);
            return null;
          })
      );
    }

    // 2. Rounak's Delivery via Rounak's own Resend API Key (if provided in Vercel)
    const rounakKey = process.env.RESEND_API_KEY_ROUNAK || process.env.ROUNAK_RESEND_API_KEY;
    if (rounakKey) {
      dispatches.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${rounakKey.trim()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromSender,
            to: ['rounakkayal0@gmail.com'],
            reply_to: email,
            subject: subject,
            html: htmlContent
          })
        })
          .then(async (res) => {
            const data = await res.json().catch(() => ({}));
            if (!res.ok) console.error('Resend Rounak dispatch:', data);
            return data;
          })
          .catch((err) => {
            console.error('Resend Rounak error:', err);
            return null;
          })
      );
    }

    // 3. Fallback / Direct Forward to FormSubmit for Rounak
    const rounakPayload = isCall
      ? {
          _subject: subject,
          _replyto: email,
          _captcha: 'false',
          _template: 'table',
          'Client Name': name,
          'Client Email': email,
          'Phone Number': phone || 'Not provided',
          'Preferred Date': preferredDate || 'Flexible',
          'Preferred Time': preferredTime || '11:00 AM IST',
          'Topic': topic || 'General Inquiry',
          'Additional Notes': notes || 'No additional notes provided.'
        }
      : {
          _subject: subject,
          _replyto: email,
          _captcha: 'false',
          _template: 'table',
          'Client Name': name,
          'Client Email': email,
          'How Can We Help You?': helpNeeded || service || 'Not specified',
          'Estimated Budget': budget || 'Not specified',
          'Project Details & Vision': message || 'No additional details provided.'
        };

    dispatches.push(
      fetch('https://formsubmit.co/ajax/rounakkayal0@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: 'https://rkmn-portfolio.vercel.app',
          Referer: 'https://rkmn-portfolio.vercel.app/'
        },
        body: JSON.stringify(rounakPayload)
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          return data;
        })
        .catch(() => null)
    );

    await Promise.allSettled(dispatches);

    return res.status(200).json({ success: true, delivered: true });
  } catch (error) {
    console.error('Contact handler error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
