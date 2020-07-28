/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const jwt = require('jwt-simple');
const crypto = require('crypto-js');

var multer  = require('multer')
var fs = require('fs');
var path = require('path')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const dir = `./upload/${getTodayDate()}`
    fs.exists(dir, exist => {
      if (!exist) {
        return fs.mkdir(dir, error => cb(error, dir))
      }
      return cb(null, dir)
      })
   // cb(null, './public/upload');
  },
  filename: (req, file, cb) => {
    //console.log("originalname",getTodayDate());
    console.log("requestFile",req.body);
    var filename=path.basename(file.originalname,path.extname(file.originalname));
    var extn =path.extname(file.originalname);
    var userid=req.body.userid;
    var typeid=req.body.typeid;

    var uFile=typeid+'-'+userid+'-'+filename+'-'+Date.now()+extn;
    console.log("newFileName",uFile);
    cb(null, uFile);
  }
});
var upload = multer({storage: storage});  


function getTodayDate(flag)
{
  var today = new Date(); 
  var dd = today.getDate(); 
  var mm = today.getMonth() + 1; 

  var yyyy = today.getFullYear(); 
  if (dd < 10) { 
      dd = '0' + dd; 
  } 
  if (mm < 10) { 
      mm = '0' + mm; 
  } 
  var today = yyyy + '' + mm + '' + dd;
  return today 
}

function decodeToken(inputToken) {
  const encodingKey= 'rVlJvxsARa0bDTwFeSrnoQCO7SPN0lFt';
  const decryptedtoken = decryptToken(inputToken);
  const decoded = jwt.decode(decryptedtoken, encodingKey);
  return decoded;
}
function decryptToken(encryptedToken) {
  const encryptionKey= 'yqzSYsrLLYkJBya0P513QGqQq82CiojT';
  const decryptedToken = crypto.AES.decrypt(
    encryptedToken,
    encryptionKey,
  ).toString(crypto.enc.Utf8);
  return decryptedToken;
}



const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const prerenderToken = '2TDAZcXaVTBG76dw3DY2';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

if(process.env.WCSENDPOINT==='PRDLV'){
  app.use(require('prerender-node').set('protocol', 'https').set('host', 'www.godrejinterio.com').set('prerenderToken', prerenderToken))
}

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});
app.post('/imageupload',upload.single('file'), (req, res, next) => {

    console.log("request",req.body);
   // console.log("request",req.headers.access_token);
    const headerToken = req.headers.access_token;
    const decodedToken = decodeToken(headerToken);
    console.log("request",decodedToken.userId);
    if(!req.file || req.body.userid ===undefined || req.body.typeid ===undefined) {
      res.status(500);
      return res.json({ message:'param missing'  });
    }
    if(!(decodedToken && decodedToken.userId && decodedToken.userId===req.body.userid))
    {
      res.status(401);
      return res.json({ message:'Access Token is Invalid'  });
    }
    res.json({ status:true,fileUrl: req.file.destination+'/'+req.file.filename });
});

app.post('/imagedelete',upload.single('file'),(req, res, next)=>{

  console.log("req",req.body);
  if(req.body=== undefined || req.body.nameFile=== undefined )
  {
    res.status(500);
    return res.json({ message:'param missing'});
  }
  var extn=path.extname(req.body.nameFile);
  if(extn===undefined || extn==='')
  {
    res.status(500);
    return res.json({ message:'invalid param'});
  }
  try {
    fs.unlinkSync(req.body.nameFile)
    res.json({ status:true,message:"file deleted"  });
  } catch(err) {
    console.log("error",err);
    res.status(500);
    res.json({ message:"file not deleted",error:JSON.stringify(err)  });
  }
  
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
