# MM הגברה ותאורה

אתר תדמית + שרת Node פשוט עם טופס "צור קשר" ששולח מייל דרך SMTP.

## מבנה הפרויקט
- `client/` – קבצי Frontend סטטיים (HTML/CSS/JS + תמונות).
- `server/` – שרת Express שמגיש את קבצי הלקוח ומטפל בטופס (נתיב `/api/contact`).
- `.env.example` – דוגמה למשתני סביבת SMTP. את הקובץ `.env` האמיתי משאירים מקומית בלבד.

## הרצה מקומית
1. שכפלו את הריפו והתקינו תלויות שרת:
   ```bash
   cd server
   npm install
   ```
2. צרו קובץ `server/.env` (אפשר להתחיל מ-.env.example) עם פרטי SMTP אמיתיים:
   ```env
   SMTP_HOST=smtp-relay.sendinblue.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=example@example.com
   SMTP_PASS=your_smtp_key
   CONTACT_TO=example@example.com
   ```
3. הפעילו את השרת:
   ```bash
   npm start
   ```
4. פתחו דפדפן ב-`http://localhost:3000` ובדקו שהטופס שולח הודעה.

## דיפלוי (Render / Railway וכד')
1. ודאו שהקוד האחרון דחוף ל-GitHub.
2. פתחו שירות Node חדש (למשל Render → New Web Service → התחברות ל-GitHub → בחרו ריפו זה).
3. Root directory: `server`, פקודת Build: `npm install`, פקודת Start: `npm start`.
4. הגדירו את משתני הסביבה ב-Dashboard (אותם משתנים כמו ב-.env).
5. אחרי שהדיפלוי עולה, ה-URL שתקבלו יהיה האתר הציבורי.

## הערות
- אין לבקש מהשרת לשלוח מיילים ללא SMTP תקין – אחרת יישמר רק לוג ב-console.
- ניתן להחליף את ספק ה-SMTP (Gmail עם App Password, Brevo וכו') פשוט על ידי עדכון `.env`.
- לשדרוג התוכן, עדכנו את קבצי ה-HTML/css/JS ואז הריצו מחדש `npm start`.
