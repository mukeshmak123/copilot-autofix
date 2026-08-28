const express = require('express');
const router = express.Router()
const request = require('request');

const ALLOWED_HOSTS = new Set(['example.com', 'api.example.com']);
const BASE_URLS = new Map([
    ['example.com', 'https://example.com'],
    ['api.example.com', 'https://api.example.com']
]);

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

    if (parsed.username || parsed.password) {
        return null;
    }

    const hostname = parsed.hostname.toLowerCase();
    if (!ALLOWED_HOSTS.has(hostname)) {
        return null;
    }

    const safeSegments = [];
    const segments = parsed.pathname.split('/');
    for (const segment of segments) {
        if (!segment) {
            continue;
        }

        let decodedSegment;
        try {
            decodedSegment = decodeURIComponent(segment);
        } catch (e) {
            return null;
        }

        if (decodedSegment === '.' || decodedSegment === '..') {
            return null;
        }

        safeSegments.push(segment);
    }

    const normalized = new URL(BASE_URLS.get(hostname));
    normalized.pathname = '/' + safeSegments.join('/');
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
