const fs = require('fs');
const https = require('https');
const path = require('path');

const data = require('./data.json');
const baseDir = path.join(__dirname, 'public', 'mimarisanatt');

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
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

    for (let j = 0; j < post.imageUrls.length; j++) {
      const url = post.imageUrls[j];
      const filePath = path.join(postDir, `image_${j + 1}.jpg`);
      console.log(`Downloading image for post ${i + 1}...`);
      try {
        await downloadFile(url, filePath);
        console.log(`Saved image for post ${i + 1}`);
      } catch (err) {
        console.error(`Failed to download image: ${err}`);
      }
    }
  }
  console.log('All downloads completed successfully.');
})();
