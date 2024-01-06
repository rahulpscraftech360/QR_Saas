async function sendMail() {
  console.log(`logging at async ${String(code)}, ${String(name)}, ${String(email)}`);

  var result = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'rsvp@eventfaqs.com',
          Name: 'GOURMET LUXE 2023',
        },
        To: [
          {
            Email: `${email}`,
            Name: `${name}`,
          },
        ],
        Subject: 'Your Ticket to Gourmet Luxe 2023: See You tomorrow!',
        HTMLPart: htmlString,
      },
    ],
  });
  return result;
}

try {
  await sendMail()
    .then((result) => {
      console.log(JSON.stringify(result));
      console.log('indside the try block');
      console.log(`Email sent successfully to ${String(name)} (${String(email)}):${result}`);
    })
    .catch((err) => {
      console.log("inside the try's catch block");
      console.log(`error in catch block${err}`);
    });
} catch (err) {
  console.error(`Error sending email to ${name} (${email}): ${err.statusCode}`);
}

// send whatsapp
