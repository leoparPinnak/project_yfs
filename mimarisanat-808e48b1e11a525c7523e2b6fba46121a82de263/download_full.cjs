const fs = require('fs');
const https = require('https');
const path = require('path');

const dataFile = path.join(__dirname, 'data_full.json');
if (!fs.existsSync(dataFile)) {
    console.error('data_full.json not found!');
    process.exit(1);
}

const data = require(dataFile);
const baseDir = path.join(__dirname, 'public', 'mimarisanatt_full');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // simple redirect handling
                https.get(response.headers.location, res => {
                    res.pipe(file);
                    file.on('finish', () => file.close(resolve));
                }).on('error', err => fs.unlink(dest, () => reject(err)));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', err => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

(async () => {
    for (let i = 0; i < data.length; i++) {
        const post = data[i];
        const postDir = path.join(baseDir, `post_${i + 1}`);
        if (!fs.existsSync(postDir)) {
            fs.mkdirSync(postDir, { recursive: true });
        }

        if (post.caption) {
            fs.writeFileSync(path.join(postDir, 'caption.txt'), post.caption, 'utf8');
            console.log(`Saved caption for post ${i + 1}`);
        }

        for (let j = 0; j < post.mediaUrls.length; j++) {
            const url = post.mediaUrls[j];
            const isVideo = url.includes('.mp4');
            const ext = isVideo ? '.mp4' : '.jpg';
            const filePath = path.join(postDir, `media_${j + 1}${ext}`);

            console.log(`Downloading ${isVideo ? 'video' : 'image'} for post ${i + 1}...`);
            try {
                await downloadFile(url, filePath);
                console.log(`Saved ${isVideo ? 'video' : 'image'} for post ${i + 1}`);
            } catch (err) {
                console.error(`Failed to download media: ${err}`);
            }
        }
    }
    console.log('All downloads completed successfully.');
})();
