// this is the sample example for SSRF - demo purpose - not need to fix this but helps to understand how 
// attaker will by pass the server request forgery 
const express = require('express');
const router = express.Router()
const request = require('request');

router.post('/downlad-url', (req, res) => {
    downloadURL(req.body.url, () =>{
        res.send('Done')
    }) 
});

const downloadURL = (url, onend) => {
    const opts = {
      uri: url,
      method: 'GET',
      followAllRedirects: true
    }
  
    request(opts)
      .on('data', ()=>{})
      .on('end', () => onend())
      .on('error', (err) => console.log(err, 'controller.url.download.error'))
}

module.exports = router
