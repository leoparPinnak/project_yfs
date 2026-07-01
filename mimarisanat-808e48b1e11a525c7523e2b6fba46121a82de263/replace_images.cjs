const fs = require('fs');
const path = require('path');

const imageList = [
    '/mimarisanatt/post_1/image_1.jpg',
    '/mimarisanatt/post_2/image_1.jpg',
    '/mimarisanatt/post_3/image_1.jpg',
    '/mimarisanatt/post_4/image_1.jpg',
    '/mimarisanatt/post_5/image_1.jpg',
    '/mimarisanatt/post_6/image_1.jpg',
    '/mimarisanatt/post_6/image_2.jpg'
];

let globalIndex = 0;
const getNextImage = () => {
    const img = imageList[globalIndex % imageList.length];
    globalIndex++;
    return img;
};

const replaceImagesInFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace unsplash URLs
    content = content.replace(/https:\/\/images\.unsplash\.com\/[^'"]+/g, () => getNextImage());

    // Replace berelinsaat URLs 
    // Wait, some URLs were previously changed to mimarisanat.com in the first replace step?
    // Actually, berelinsaat.com was changed to mimarisanat.com! So I need to match mimarisanat.com/public/ as well.
    content = content.replace(/https:\/\/(www\.)?(berelinsaat|mimarisanat)\.com\/public\/[^'"]+/g, () => getNextImage());

    // For Gallery, replace picsum
    content = content.replace(/https:\/\/picsum\.photos\/[^'"`]+/g, () => getNextImage());

    // Restore proper backticks if any got replaced (though the regex stops at `'") 

    fs.writeFileSync(filePath, content, 'utf8');
};

const componentsDir = path.join(__dirname, 'components');
const pagesDir = path.join(__dirname, 'pages');

const walkSync = (dir, callback) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkSync(fullPath, callback);
        } else {
            callback(fullPath);
        }
    });
};

walkSync(componentsDir, replaceImagesInFile);
walkSync(pagesDir, replaceImagesInFile);
replaceImagesInFile(path.join(__dirname, 'index.html'));

console.log('Images replaced successfully.');
