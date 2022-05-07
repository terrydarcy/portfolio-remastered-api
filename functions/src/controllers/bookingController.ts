var nodemailer = require("nodemailer");

const sendEmail = async (req: any, res: any, next: any) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: "darcydevelopment.contact@gmail.com",
      pass: "X4UY3737R2Z1?ngG",
      
    }
  });

  var mailOptions = {
    from: "darcydevelopment.contact@gmail.com",
    to: "terrykdarcy@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send(info);
    }
  });
  res.status(500).send("Email was not sent");
};

module.exports = { sendEmail };

/*
issues(last:20, states:CLOSED) {
            edges {
              node {
                title
                url
                labels(first:5) {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
*/
