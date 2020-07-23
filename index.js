const express = require('express');
const app = express();
var cors = require('cors');
const mailgun = require('mailgun-js')({
  apiKey: 'key-9903f87a9fdb915aa894a7434dad2a72',
  domain: 'sandbox64bdaa08f5a64788b3e31531adc24a96.mailgun.org',
});

app.use(cors());

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json('Working');
});

app.post('/quote', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const data = {
      from: `Request a Quote <usman.aslam0701@gmail.com>`,
      to: 'uxman0701@gmail.com',
      subject: `${subject} / ${email}`,
      text: `Email ${email}`,
      html: `<div>
              <h1>Request a Quote</h1>
              <p>From: ${name}</p> 
              <p>Email: ${email} <b>(REPLY TO THIS EMAIL)</b></p> 
              <p>Subject: ${subject}</p> 
              <p><b>Message</b>: ${message}</p>
            </div>
            <h2>**Do not Reply to this mail**</h2>`,
    };

    mailgun.messages().send(data, function (error, body) {
      if (error) res.json(error);
      res.json('OK');
    });
  } catch (error) {
    res.json('error');
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
