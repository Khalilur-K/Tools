// Node.js script to generate all remaining tool HTML files
const fs = require('fs');
const path = require('path');

const tools = [
    {id: 'image-compressor', name: 'Image Compressor', desc: 'Compress images to reduce file size', icon: 'bi-compress'},
    {id: 'image-cropper', name: 'Image Cropper', desc: 'Crop images to desired dimensions', icon: 'bi-crop'},
    {id: 'image-to-base64', name: 'Image to Base64', desc: 'Convert images to Base64 string', icon: 'bi-code-square'},
    {id: 'webp-to-png', name: 'WebP to PNG', desc: 'Convert WebP images to PNG', icon: 'bi-image-fill'},
    {id: 'gif-maker', name: 'GIF Maker', desc: 'Create animated GIFs from images', icon: 'bi-play-circle'},
    {id: 'screenshot-to-pdf', name: 'Screenshot to PDF', desc: 'Convert screenshots to PDF format', icon: 'bi-file-pdf'},
    {id: 'meta-tag-generator', name: 'Meta Tag Generator', desc: 'Generate meta tags for SEO', icon: 'bi-tags'},
    {id: 'keyword-density-checker', name: 'Keyword Density Checker', desc: 'Check keyword density in your content', icon: 'bi-search'},
    {id: 'sitemap-generator', name: 'Sitemap Generator', desc: 'Generate XML sitemap for your website', icon: 'bi-diagram-3'},
    {id: 'robots-txt-generator', name: 'Robots.txt Generator', desc: 'Generate robots.txt file', icon: 'bi-robot'},
    {id: 'google-index-checker', name: 'Google Index Checker', desc: 'Check if URL is indexed in Google', icon: 'bi-google'},
    {id: 'domain-authority-checker', name: 'Domain Authority Checker', desc: 'Check domain authority score', icon: 'bi-bar-chart'},
    {id: 'backlink-checker', name: 'Backlink Checker', desc: 'Check backlinks for any URL', icon: 'bi-link-45deg'},
    {id: 'page-speed-checker', name: 'Page Speed Checker', desc: 'Check website page speed', icon: 'bi-speedometer2'},
    {id: 'xml-sitemap-validator', name: 'XML Sitemap Validator', desc: 'Validate XML sitemap format', icon: 'bi-check-circle'},
    {id: 'mobile-friendly-test', name: 'Mobile-Friendly Test', desc: 'Test if website is mobile-friendly', icon: 'bi-phone'},
    {id: 'character-counter', name: 'Character Counter', desc: 'Count characters with and without spaces', icon: 'bi-123'},
    {id: 'plagiarism-checker', name: 'Plagiarism Checker', desc: 'Check text for plagiarism', icon: 'bi-shield-check'},
    {id: 'grammar-checker', name: 'Grammar Checker', desc: 'Check grammar and spelling', icon: 'bi-check2-square'},
    {id: 'text-to-speech', name: 'Text-to-Speech', desc: 'Convert text to speech audio', icon: 'bi-volume-up'},
    {id: 'speech-to-text', name: 'Speech-to-Text', desc: 'Convert speech to text', icon: 'bi-mic'},
    {id: 'fancy-text-generator', name: 'Fancy Text Generator', desc: 'Generate fancy styled text', icon: 'bi-stars'},
    {id: 'random-text-generator', name: 'Random Text Generator', desc: 'Generate random text strings', icon: 'bi-shuffle'},
    {id: 'html-to-markdown', name: 'HTML to Markdown', desc: 'Convert HTML to Markdown format', icon: 'bi-filetype-html'},
    {id: 'css-minifier', name: 'CSS Minifier', desc: 'Minify CSS code', icon: 'bi-filetype-css'},
    {id: 'javascript-minifier', name: 'JavaScript Minifier', desc: 'Minify JavaScript code', icon: 'bi-filetype-js'},
    {id: 'sql-formatter', name: 'SQL Formatter', desc: 'Format SQL queries', icon: 'bi-database'},
    {id: 'htaccess-redirect-generator', name: 'HTACCESS Redirect Generator', desc: 'Generate .htaccess redirect rules', icon: 'bi-arrow-left-right'},
    {id: 'markdown-to-html', name: 'Markdown to HTML', desc: 'Convert Markdown to HTML', icon: 'bi-filetype-md'},
    {id: 'color-code-picker', name: 'Color Code Picker', desc: 'Pick and convert color codes', icon: 'bi-palette'},
    {id: 'ip-address-lookup', name: 'IP Address Lookup', desc: 'Lookup IP address information', icon: 'bi-globe'},
    {id: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Calculate percentages easily', icon: 'bi-percent'},
    {id: 'loan-emi-calculator', name: 'Loan EMI Calculator', desc: 'Calculate loan EMI payments', icon: 'bi-bank'},
    {id: 'scientific-calculator', name: 'Scientific Calculator', desc: 'Advanced scientific calculator', icon: 'bi-calculator'},
    {id: 'discount-calculator', name: 'Discount Calculator', desc: 'Calculate discounts and savings', icon: 'bi-tag'},
    {id: 'currency-converter', name: 'Currency Converter', desc: 'Convert between currencies', icon: 'bi-currency-exchange'},
    {id: 'time-zone-converter', name: 'Time Zone Converter', desc: 'Convert between time zones', icon: 'bi-clock'},
    {id: 'binary-to-decimal', name: 'Binary to Decimal', desc: 'Convert binary to decimal numbers', icon: 'bi-0-circle'},
    {id: 'tip-calculator', name: 'Tip Calculator', desc: 'Calculate tip amounts', icon: 'bi-cash-coin'},
    {id: 'length-converter', name: 'Length Converter', desc: 'Convert length units', icon: 'bi-rulers'},
    {id: 'weight-converter', name: 'Weight Converter', desc: 'Convert weight units', icon: 'bi-box'},
    {id: 'speed-converter', name: 'Speed Converter', desc: 'Convert speed units', icon: 'bi-speedometer'},
    {id: 'volume-converter', name: 'Volume Converter', desc: 'Convert volume units', icon: 'bi-droplet'},
    {id: 'data-storage-converter', name: 'Data Storage Converter', desc: 'Convert data storage units', icon: 'bi-hdd'},
    {id: 'energy-converter', name: 'Energy Converter', desc: 'Convert energy units', icon: 'bi-lightning'},
    {id: 'pressure-converter', name: 'Pressure Converter', desc: 'Convert pressure units', icon: 'bi-arrow-down-up'},
    {id: 'fuel-efficiency-converter', name: 'Fuel Efficiency Converter', desc: 'Convert fuel efficiency units', icon: 'bi-fuel-pump'},
    {id: 'angle-converter', name: 'Angle Converter', desc: 'Convert angle units', icon: 'bi-arrow-left-right'},
    {id: 'md5-hash-generator', name: 'MD5 Hash Generator', desc: 'Generate MD5 hash', icon: 'bi-shield-lock'},
    {id: 'sha256-hash-generator', name: 'SHA256 Hash Generator', desc: 'Generate SHA256 hash', icon: 'bi-shield-check'},
    {id: 'random-string-generator', name: 'Random String Generator', desc: 'Generate random strings', icon: 'bi-shuffle'},
    {id: 'url-shortener', name: 'URL Shortener', desc: 'Shorten long URLs', icon: 'bi-link-45deg'},
    {id: 'ip-geolocation-finder', name: 'IP Geolocation Finder', desc: 'Find IP geolocation', icon: 'bi-geo-alt'},
    {id: 'ssl-certificate-checker', name: 'SSL Certificate Checker', desc: 'Check SSL certificate validity', icon: 'bi-lock-fill'},
    {id: 'whois-lookup', name: 'Whois Lookup', desc: 'Lookup domain information', icon: 'bi-info-circle'},
    {id: 'http-headers-checker', name: 'HTTP Headers Checker', desc: 'Check HTTP headers', icon: 'bi-list-check'},
    {id: 'privacy-policy-generator', name: 'Privacy Policy Generator', desc: 'Generate privacy policy', icon: 'bi-file-text'},
    {id: 'youtube-thumbnail-downloader', name: 'YouTube Thumbnail Downloader', desc: 'Download YouTube thumbnails', icon: 'bi-youtube'},
    {id: 'instagram-photo-downloader', name: 'Instagram Photo Downloader', desc: 'Download Instagram photos', icon: 'bi-instagram'},
    {id: 'twitter-video-downloader', name: 'Twitter Video Downloader', desc: 'Download Twitter videos', icon: 'bi-twitter'},
    {id: 'facebook-video-downloader', name: 'Facebook Video Downloader', desc: 'Download Facebook videos', icon: 'bi-facebook'},
    {id: 'tiktok-video-downloader', name: 'TikTok Video Downloader', desc: 'Download TikTok videos', icon: 'bi-tiktok'},
    {id: 'youtube-tags-extractor', name: 'YouTube Tags Extractor', desc: 'Extract tags from YouTube videos', icon: 'bi-tags'},
    {id: 'hashtag-generator', name: 'Hashtag Generator', desc: 'Generate hashtags for posts', icon: 'bi-hash'},
    {id: 'social-media-post-generator', name: 'Social Media Post Generator', desc: 'Generate social media posts', icon: 'bi-pencil-square'},
    {id: 'emoji-keyboard', name: 'Emoji Keyboard', desc: 'Copy and use emojis', icon: 'bi-emoji-smile'},
    {id: 'twitter-character-counter', name: 'Twitter Character Counter', desc: 'Count characters for Twitter', icon: 'bi-123'},
    {id: 'barcode-generator', name: 'Barcode Generator', desc: 'Generate barcodes', icon: 'bi-upc'},
    {id: 'meme-generator', name: 'Meme Generator', desc: 'Create memes easily', icon: 'bi-image'},
    {id: 'resume-builder', name: 'Resume Builder', desc: 'Build professional resumes', icon: 'bi-file-earmark-person'},
    {id: 'invoice-generator', name: 'Invoice Generator', desc: 'Generate invoices', icon: 'bi-receipt'},
    {id: 'business-name-generator', name: 'Business Name Generator', desc: 'Generate business names', icon: 'bi-building'},
    {id: 'lottery-number-generator', name: 'Lottery Number Generator', desc: 'Generate lottery numbers', icon: 'bi-123'},
    {id: 'flip-a-coin', name: 'Flip a Coin', desc: 'Flip a virtual coin', icon: 'bi-coin'},
    {id: 'random-number-generator', name: 'Random Number Generator', desc: 'Generate random numbers', icon: 'bi-shuffle'},
    {id: 'dice-roller', name: 'Dice Roller', desc: 'Roll virtual dice', icon: 'bi-dice-6'},
    {id: 'internet-speed-test', name: 'Internet Speed Test', desc: 'Test internet connection speed', icon: 'bi-speedometer'},
    {id: 'daily-planner-creator', name: 'Daily Planner Creator', desc: 'Create daily planners', icon: 'bi-calendar-check'},
    {id: 'wedding-invitation-generator', name: 'Wedding Invitation Generator', desc: 'Generate wedding invitations', icon: 'bi-envelope-heart'},
    {id: 'story-plot-generator', name: 'Story Plot Generator', desc: 'Generate story plots', icon: 'bi-book'},
    {id: 'ebook-creator', name: 'E-book Creator', desc: 'Create e-books', icon: 'bi-journal-text'},
    {id: 'ai-chatbot-demo', name: 'AI Chatbot Demo', desc: 'Interactive AI chatbot', icon: 'bi-robot'},
    {id: 'ip-address-tracker', name: 'IP Address Tracker', desc: 'Track IP addresses', icon: 'bi-geo-alt'},
    {id: 'fake-address-generator', name: 'Fake Address Generator', desc: 'Generate fake addresses', icon: 'bi-geo'},
    {id: 'electric-bill-calculator', name: 'Electric Bill Calculator', desc: 'Calculate electric bills', icon: 'bi-lightning-charge'},
    {id: 'leap-year-checker', name: 'Leap Year Checker', desc: 'Check if year is a leap year', icon: 'bi-calendar-event'},
    {id: 'name-to-numerology', name: 'Name to Numerology', desc: 'Calculate numerology from name', icon: 'bi-person'},
];

const template = (tool) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tool.name} - MultiTools</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    <link href="../css/style.css" rel="stylesheet">
</head>
<body>
    <main>
        <div class="tool-container">
            <div class="tool-header text-center">
                <h1><i class="bi ${tool.icon}"></i> ${tool.name}</h1>
                <p class="mb-0">${tool.desc}</p>
            </div>
            <div class="tool-content">
                <div class="back-to-home">
                    <a href="../index.html" class="btn btn-outline-primary"><i class="bi bi-arrow-left"></i> Back to Home</a>
                </div>
                <div id="toolContent">
                    <div class="input-group-custom">
                        <label for="input" class="form-label">Enter Input</label>
                        <textarea class="form-control" id="input" rows="5" placeholder="Enter your data here..."></textarea>
                    </div>
                    <button class="btn btn-primary btn-tool" onclick="processTool()">Process</button>
                    <div id="resultContainer" class="result-box mt-4" style="display: none;">
                        <h5>Result:</h5>
                        <div id="output"></div>
                    </div>
                </div>
                <div class="ad-space mt-4">
                    <small>Advertisement</small>
                </div>
            </div>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/main.js"></script>
    <script>
        function processTool() {
            const input = document.getElementById('input').value;
            if (!input.trim()) {
                showAlert('Please enter some input', 'warning');
                return;
            }
            // Tool-specific logic will be implemented
            document.getElementById('output').textContent = 'Result: ' + input;
            document.getElementById('resultContainer').style.display = 'block';
        }
    </script>
</body>
</html>`;

const toolsDir = path.join(__dirname, 'tools');
if (!fs.existsSync(toolsDir)) {
    fs.mkdirSync(toolsDir, { recursive: true });
}

let created = 0;
tools.forEach(tool => {
    const filePath = path.join(toolsDir, `${tool.id}.html`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, template(tool), 'utf8');
        created++;
    }
});

console.log(`Created ${created} new tool files. Total tools: ${tools.length}`);

