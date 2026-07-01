const fs = require('fs');
const path = require('path');

const instaDir = path.join(__dirname, 'public', 'insta_post');
const outputFile = path.join(__dirname, 'public', 'posts.json');

const dirs = fs.readdirSync(instaDir)
    .filter(d => fs.statSync(path.join(instaDir, d)).isDirectory() && d.startsWith('post_'))
    .sort((a, b) => {
        const numA = parseInt(a.replace('post_', ''));
        const numB = parseInt(b.replace('post_', ''));
        return numA - numB;
    });

const posts = dirs.map((dir, idx) => {
    const postPath = path.join(instaDir, dir);
    const files = fs.readdirSync(postPath)
        .filter(f => /\.(jpg|jpeg|png|gif|mp4|webp|webm)$/i.test(f))
        .sort((a, b) => {
            const numA = parseInt(a.replace(/\D/g, '')) || 0;
            const numB = parseInt(b.replace(/\D/g, '')) || 0;
            return numA - numB;
        });

    return {
        id: idx + 1,
        folder: dir,
        media: files,
        visible: true
    };
});

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Generated posts.json with ${posts.length} posts.`);
