const express = require('express');
const router = express.Router()
const request = require('request');

const ALLOWED_HOSTS = new Set(['example.com', 'api.example.com']);

const validateAndNormalizeUrl = (rawUrl) => {
    let parsed;
    try {
        parsed = new URL(rawUrl);
    } catch (e) {
        return null;
    }

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return null;
    }

    if (!ALLOWED_HOSTS.has(parsed.hostname)) {
        return null;
    }

    return parsed.toString();
};

router.post('/downlad-url', (req, res) => {
    const safeUrl = validateAndNormalizeUrl(req.body.url);
    if (!safeUrl) {
        return res.status(400).send('Invalid or disallowed URL');
    }

    downloadURL(safeUrl, () =>{
        res.send('Done')
    }) 
});

const downloadURL = (url, onend) => {
    const opts = {
      uri: url,
      method: 'GET',
      followAllRedirects: false
    }
  
    request(opts)
      .on('data', ()=>{})
      .on('end', () => onend())
      .on('error', (err) => console.log(err, 'controller.url.download.error'))
}

module.exports = router
