const fs = require('fs');
const html = fs.readFileSync('instagram_debug.html', 'utf8');

// find all hrefs
const matches = [...html.matchAll(/href="([^"]+)"/g)];
const uniqueHrefs = [...new Set(matches.map(m => m[1]))];

const postHrefs = uniqueHrefs.filter(href => href.includes('/p/'));
console.log('Found post hrefs:', postHrefs);
