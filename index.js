const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Simple allow-list of trusted domains (optional, for security)
const allowedDomains = [
    'cigna-im--devghb.sandbox.my.site.com',
    'your-trusted-domain.com'
];

app.get('/redirect', (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('Missing "url" query parameter.');
    }

    try {
        const decodedURL = decodeURIComponent(url);
        const parsedURL = new URL(decodedURL);

        // OPTIONAL: Validate domain
        if (!allowedDomains.includes(parsedURL.hostname)) {
            return res.status(403).send('URL domain not allowed.');
        }

        return res.redirect(decodedURL);
    } catch (error) {
        return res.status(400).send('Invalid URL.');
    }
});

app.listen(port, () => {
    console.log(`Redirect service running at http://localhost:${port}`);
});
