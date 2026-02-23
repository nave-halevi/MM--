import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let transporter = null;
const smtpHost = process.env.SMTP_HOST;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (smtpHost && smtpUser && smtpPass) {
    transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE !== "false",
        auth: {
            user: smtpUser,
            pass: smtpPass
        }
    });

    transporter.verify()
        .then(() => console.log("SMTP transporter ready"))
        .catch((err) => {
            console.warn("Failed to verify SMTP transporter:", err.message);
            transporter = null;
        });
} else {
    console.warn("SMTP settings missing. Contact form submissions will be logged only.");
}

// להגיש קבצים סטטיים (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "../client/html")));
app.use(express.static(path.join(__dirname, "../client")));

// GET "/" מחזיר את ה-HTML הראשי
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/html/index.html"));
});

app.post("/api/contact", async (req, res) => {
    const { fullName, phone, email, message } = req.body || {};

    if (!fullName || !phone || !message) {
        return res.status(400).json({
            success: false,
            error: "אנא מלאו שם מלא, טלפון והודעה."
        });
    }

    const mailData = {
        from: `"MM Website" <${smtpUser || "no-reply@example.com"}>`,
        to: process.env.CONTACT_TO || smtpUser || "owner@example.com",
        subject: `פנייה חדשה מאתר MM - ${fullName}`,
        text: `
שם: ${fullName}
טלפון: ${phone}
אימייל: ${email || "לא הוזן"}

הודעה:
${message}
        `,
        html: `
            <h2>פנייה חדשה מאתר MM</h2>
            <p><strong>שם:</strong> ${fullName}</p>
            <p><strong>טלפון:</strong> ${phone}</p>
            <p><strong>אימייל:</strong> ${email || "לא הוזן"}</p>
            <p><strong>הודעה:</strong><br>${message.replace(/\n/g, "<br>")}</p>
        `
    };

    try {
        if (transporter) {
            await transporter.sendMail(mailData);
        } else {
            console.log("Contact form submission (no SMTP configured):", mailData);
        }

        res.json({ success: true, message: "ההודעה נשלחה בהצלחה!" });
    } catch (error) {
        console.error("Failed to send contact email:", error);
        res.status(500).json({ success: false, error: "אירעה שגיאה בשליחת ההודעה. נסו שוב מאוחר יותר." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
