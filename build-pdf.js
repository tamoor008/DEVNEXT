const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        // Emulate print media type to apply the print css
        await page.emulateMediaType('print');
        
        const filePath = `file://${path.join(__dirname, 'proposal_styled.html')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        await page.pdf({
            path: 'Technifuse_Proposal_Styled.pdf',
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });
        
        console.log('PDF generated successfully');
        await browser.close();
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
})();
