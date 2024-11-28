const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const port = process.env.PORT || 3001;
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => res.type('html').send(html));

// Define a POST endpoint
app.post('/email', (req, res) => {
    // Extract data from the request body
    console.log(req.body);
    
    const { Name, Email, Message } = req.body;

    // Log the received data (for debugging purposes)
    console.log('Received Contact Form Submission:', { Name, Email, Message });

    const mailjetUrl = "https://api.mailjet.com/v3.1/send";

    const payload = {
        Messages: [
            {
                From: {
                    Email: "moriellohomesolutionsllc@gmail.com",
                    Name: "Your Website"
                },
                To: [
                    {
                        Email: "moriellohomesolutionsllc@gmail.com",
                        Name: "Stephano Moriello"
                    }
                ],
                Subject: "New Inquiry!",
                TextPart: "This is an email notification sent from your website:",
                HTMLPart: "<p>Inquiry from: " + Name + " <br> " + "Their email address: " + Email + " <br> " + "Their message: " + Message + " </p>"
            }
        ]
    };

  axios
  .post('https://api.mailjet.com/v3.1/send', payload, {
    auth: {
      username: process.env.MORIELLO_API_KEY,
      password: process.env.MORIELLO_SECRET_KEY
    }
  })
  .then(response => {
    console.log('Email sent successfully:', response.data);
  })
  .catch(error => {
    console.error('Error sending email:', error.response.data);
  });

    // Respond with a success message
    res.status(200).json({
        message: 'Contact form submitted successfully!',
        receivedData: { Name, Email, Message }
    });
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
