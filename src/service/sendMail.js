export default function sendMail(emailReceived, subject, text) {
  Email.send({
    Host: 'smtp.elasticemail.com',
    Username: 'mentorshipcompany@gmail.com',
    Password: '9EA95A316614783B806484879CDB33EA0E11',
    To: emailReceived,
    From: 'mentorshipcompany@gmail.com',
    Subject: subject,
    Body: text,
  })
    .then((message) => {
      return message;
    })
    .catch((err) => {
      return err;
    });
}
