if (Object.keys(body).length == 0) return res.status(400).send("body is empty");

let validate = /^([a-z A-Z ]){1,30}$/;

let validateEmail =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  module.exports={validate, validateEmail}