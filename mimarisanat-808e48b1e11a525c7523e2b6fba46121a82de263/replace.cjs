const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'i18n/translations.ts',
    'pages/Contact.tsx',
    'components/Footer.tsx',
    'public/sitemap.xml',
    'public/manifest.json'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/BEREL Trio/g, 'MİMARİ Sanat');
    content = content.replace(/Berel Trio/g, 'Mimari Sanat');
    content = content.replace(/bereltrio/g, 'mimarisanat');
    content = content.replace(/berelinsaat\.com/g, 'mimarisanat.com');
    content = content.replace(/Berel İnşaat/g, 'Mimari Sanat');

    // Specific replacements for Footer
    content = content.replace(/BEREL <span className="text-brand-primary italic">Trio<\/span>/g, 'MİMARİ <span className="text-brand-primary italic">Sanat<\/span>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
});
