const REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default emails => {
  const invalidEmailsArray = emails

    .split(",")
    .map(email => email.trim())
    .filter(email => REGEXP.test(email) === false);

  if (invalidEmailsArray.length) {
    return `these emails are invalid ${invalidEmailsArray}`;
  }
};

//emailregexp.com