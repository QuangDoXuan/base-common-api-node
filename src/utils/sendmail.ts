export const sendMail = async param => {
  Object.assign(param, {
    emailFrom: process.env.EMAIL_FROM,
    emailTo: process.env.EMAIL_TO,
    subject: process.env.SUBJECT,
  });
  const response = await fetch(process.env.SERVER_MAIL, {
    mode: 'cors',
    method: 'POST',
    // json: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(param),
  });
  let jsondata = await response.json();
  if (jsondata.message === 'Success') {
    console.log(jsondata);
  }
};
