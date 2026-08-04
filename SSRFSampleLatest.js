const express = require('express');
const router = express.Router()
const request = require('request');

const ALLOWED_HOSTS_MAP = Object.freeze({
    'example.com': 'example.com',
    'api.example.com': 'api.example.com'
});

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

    const hostname = parsed.hostname.toLowerCase();
    const allowedHost = ALLOWED_HOSTS_MAP[hostname];
    if (!allowedHost) {
        return null;
    }

    const safePath = parsed.pathname
        .split('/')
        .filter((segment) => segment !== '..')
        .join('/');

    const normalized = new URL(parsed.protocol + '//' + allowedHost);
    normalized.pathname = safePath.startsWith('/') ? safePath : '/' + safePath;
    normalized.search = parsed.search;

    return normalized.toString();
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
    let parsed;
    try {
        parsed = new URL(url);
    } catch (e) {
        return;
    }

    const protocolAllowed = parsed.protocol === 'http:' || parsed.protocol === 'https:';
    const hostAllowed = Boolean(ALLOWED_HOSTS_MAP[parsed.hostname.toLowerCase()]);
    if (!protocolAllowed || !hostAllowed) {
        return;
    }

    const opts = {
      uri: parsed.toString(),
      method: 'GET',
      followAllRedirects: false
    }
  
    request(opts)
      .on('data', ()=>{})
      .on('end', () => onend())
      .on('error', (err) => console.log(err, 'controller.url.download.error'))
}

module.exports = router
