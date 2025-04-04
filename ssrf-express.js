const express = require('express');
const { URL } = require('url');
const router = express.Router()
const request = require('request');

router.post('/downlad-url', (req, res) => {
    downloadURL(req.body.url, () =>{
        res.send('Done')
    }) 
});

const downloadURL = (url, onend) => {
    const allowedDomains = ['example.com', 'another-example.com'];
    const parsedUrl = new URL(url);
    
    if (!allowedDomains.includes(parsedUrl.hostname)) {
        console.log('Invalid URL domain');
        return;
    }

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
