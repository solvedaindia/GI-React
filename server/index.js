/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
var multer  = require('multer')
var fs = require('fs');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.body
    const dir = `./upload/${id}`
    fs.exists(dir, exist => {
      if (!exist) {
        return fs.mkdir(dir, error => cb(error, dir))
      }
      return cb(null, dir)
      })
   // cb(null, './public/upload');
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    var filePrefix='file-'
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
      filePrefix='image-';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
      filePrefix='image-';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
      filePrefix='image-';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
      filePrefix='image-';
    }
    if(file.mimetype==='application/pdf')
    {
      filetype="pdf"
      filePrefix='doc-';
    }
    cb(null, filePrefix + Date.now() + '.' + filetype);
  }
});
var upload = multer({storage: storage});




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
  // req.url = req.url + '.gz'; // eslint-disable-line
   //res.set('Content-Encoding', 'gzip');
   //next();
   console.log(req.file);
   if(!req.file || req.body.id ===undefined) {
    res.status(500);
    return res.json({ message:'param missing'  });
  }
   //res.send(req.body);
   res.json({ fileUrl: './upload/' + req.file.filename });
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
