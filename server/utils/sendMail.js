const nodemailer = require("nodemailer");

const sendMail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Code de validation',
    html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8f8f8;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            text-align: center;
            background-color: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
          }
          .code {
            font-size: 36px;
            font-weight: bold;
            color: #333;
            background-color: #f1f1f1;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 20px;
            display: inline-block;
          }
          .expiration {
            font-size: 16px;
            color: #666;
          }
          .txt{
            font-weight : bold
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p class="txt">Voici votre code de validation valable pour 3h:</p>
          <div class="code">${code}</div>
          <p class="expiration">Ce code est valide pour une seule utilisation et expire dans 24 heures.</p>
        </div>
      </body>
      </html>
    `,
  };
  

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
