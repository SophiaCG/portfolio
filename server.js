const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;
const password = process.env.PASSWORD;

app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { name, subject, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // Replace with your email service
    auth: {
      user: "sophia.gorgonio@gmail.com", // Your email address
      pass: password, // Your email password
    },
  });

  const mailOptions = {
    from: email,
    to: "sophia.gorgonio@gmail.com", // Recipient's email address
    subject: subject,
    text: `Name: ${name} \nEmail: ${email} \nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
