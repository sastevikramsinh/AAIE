function shell(subject, body) {
  return {
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.5; color:#1f2937;">
        ${body}
        <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb;" />
        <p style="font-size:12px;color:#6b7280;">
          AAIE - Association of AI Educators<br/>
          Pune, Maharashtra
        </p>
      </div>
    `,
  };
}

export function getWelcomeTemplate({ email }) {
  return shell(
    "AAIE Newsletter मध्ये स्वागत | Welcome to AAIE Newsletter",
    `
      <h2>नमस्कार ${email},</h2>
      <p>AAIE च्या मराठी AI समुदायात तुमचे मनःपूर्वक स्वागत!</p>
      <p>Hello ${email}, welcome to AAIE's Marathi-first AI learning community.</p>
      <p>आता तुम्हाला workshops, resources आणि AI updates नियमित मिळतील.</p>
    `,
  );
}

export function getContactAutoReplyTemplate({ name }) {
  return shell(
    "तुमचा संदेश मिळाला | We received your message",
    `
      <h2>नमस्कार ${name},</h2>
      <p>तुमचा संदेश आम्हाला मिळाला आहे. आमची टीम लवकरच तुम्हाला प्रतिसाद देईल.</p>
      <p>We have received your message and will reply soon.</p>
    `,
  );
}

export function getContactFounderTemplate({ name, email, subject, message, occupation, phone }) {
  return shell(
    `New contact inquiry from ${name}`,
    `
      <h2>New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Occupation:</strong> ${occupation || "other"}</p>
      <p><strong>Subject:</strong> ${subject || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  );
}

export function getWorkshopConfirmationTemplate({ name, workshopTitleMr, workshopTitleEn, date }) {
  return shell(
    "Workshop Registration Confirmed | नोंदणी यशस्वी",
    `
      <h2>नमस्कार ${name},</h2>
      <p>तुमची workshop नोंदणी यशस्वी झाली आहे.</p>
      <p><strong>Workshop:</strong> ${workshopTitleMr} / ${workshopTitleEn}</p>
      <p><strong>Date:</strong> ${new Date(date).toLocaleString("en-IN")}</p>
      <p>Thank you for registering. See you in the session!</p>
    `,
  );
}

export function getNewsletterTemplate({ subject, contentHtml }) {
  return shell(subject, contentHtml);
}

