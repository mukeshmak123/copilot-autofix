const express = require('express');
const router = express.Router()
const request = require('request');

// Only allow pre-approved URLs by key
router.post('/downlad-url', (req, res) => {
    const urlKey = req.body.urlKey;
    // Define an allow-list mapping
    const allowedUrls = {
        docs: 'https://docs.example.com/api/info',
        images: 'https://images.example.com/api/img'
    };
    const url = allowedUrls[urlKey];
    if (!url) {
        res.status(400).send('Invalid URL key');
        return;
    }
    downloadURL(url, () => {
        res.send('Done');
    });
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
