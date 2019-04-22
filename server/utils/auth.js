const fs   = require('fs');
const jwt   = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
// var privateKEY  = fs.readFileSync('./server.key', 'utf8');
console.log("Private Key", privateKEY);
// var publicKEY  = fs.readFileSync('./public.key', 'utf8');  
module.exports = {
 sign: (payload) => {
    console.log("payload", payload);
   sOptions = {
    issuer: "Authorizaxtion/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }
  
  // Token signing options
  var signOptions = {
      issuer:  sOptions.issuer,
      subject:  sOptions.subject,
      audience:  sOptions.audience,
      expiresIn:  "30d",    // 30 days validity
      algorithm:  "RS256"    
  };
  const signed = jwt.sign({ foo: 'bar' }, 'shhhhh')
  return signed;
},
  verify: (token, $Option) => {
  /*
   vOption = {
    issuer: "Authorization/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }  
  */
  var  decode: (token) => {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
 }
}