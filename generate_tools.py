#!/usr/bin/env python3
"""
Script to generate all tool HTML files
"""

tools = [
    # Image Tools (1-10)
    ("image-resizer", "Image Resizer", "Resize images to any dimensions", "image"),
    ("image-compressor", "Image Compressor", "Compress images to reduce file size", "image"),
    ("image-cropper", "Image Cropper", "Crop images to desired dimensions", "image"),
    ("image-to-base64", "Image to Base64", "Convert images to Base64 string", "image"),
    ("webp-to-png", "WebP to PNG", "Convert WebP images to PNG", "image"),
    ("gif-maker", "GIF Maker", "Create animated GIFs from images", "image"),
    ("screenshot-to-pdf", "Screenshot to PDF", "Convert screenshots to PDF format", "image"),
    
    # SEO Tools (11-20)
    ("meta-tag-generator", "Meta Tag Generator", "Generate meta tags for SEO", "seo"),
    ("keyword-density-checker", "Keyword Density Checker", "Check keyword density in your content", "seo"),
    ("sitemap-generator", "Sitemap Generator", "Generate XML sitemap for your website", "seo"),
    ("robots-txt-generator", "Robots.txt Generator", "Generate robots.txt file", "seo"),
    ("google-index-checker", "Google Index Checker", "Check if URL is indexed in Google", "seo"),
    ("domain-authority-checker", "Domain Authority Checker", "Check domain authority score", "seo"),
    ("backlink-checker", "Backlink Checker", "Check backlinks for any URL", "seo"),
    ("page-speed-checker", "Page Speed Checker", "Check website page speed", "seo"),
    ("xml-sitemap-validator", "XML Sitemap Validator", "Validate XML sitemap format", "seo"),
    ("mobile-friendly-test", "Mobile-Friendly Test", "Test if website is mobile-friendly", "seo"),
    
    # Text Tools (21-30)
    ("character-counter", "Character Counter", "Count characters with and without spaces", "text"),
    ("case-converter", "Case Converter", "Convert text to uppercase, lowercase, etc.", "text"),
    ("plagiarism-checker", "Plagiarism Checker", "Check text for plagiarism", "text"),
    ("grammar-checker", "Grammar Checker", "Check grammar and spelling", "text"),
    ("text-to-speech", "Text-to-Speech", "Convert text to speech audio", "text"),
    ("speech-to-text", "Speech-to-Text", "Convert speech to text", "text"),
    ("url-encoder-decoder", "URL Encoder/Decoder", "Encode or decode URL strings", "text"),
    ("fancy-text-generator", "Fancy Text Generator", "Generate fancy styled text", "text"),
    ("random-text-generator", "Random Text Generator", "Generate random text strings", "text"),
    
    # Developer Tools (31-40)
    ("html-to-markdown", "HTML to Markdown", "Convert HTML to Markdown format", "dev"),
    ("css-minifier", "CSS Minifier", "Minify CSS code", "dev"),
    ("javascript-minifier", "JavaScript Minifier", "Minify JavaScript code", "dev"),
    ("sql-formatter", "SQL Formatter", "Format SQL queries", "dev"),
    ("htaccess-redirect-generator", "HTACCESS Redirect Generator", "Generate .htaccess redirect rules", "dev"),
    ("markdown-to-html", "Markdown to HTML", "Convert Markdown to HTML", "dev"),
    ("color-code-picker", "Color Code Picker", "Pick and convert color codes", "dev"),
    ("base64-encoder-decoder", "Base64 Encoder/Decoder", "Encode or decode Base64 strings", "dev"),
    ("ip-address-lookup", "IP Address Lookup", "Lookup IP address information", "dev"),
    
    # Math & Calculators (41-50)
    ("percentage-calculator", "Percentage Calculator", "Calculate percentages easily", "calc"),
    ("age-calculator", "Age Calculator", "Calculate age from birthdate", "calc"),
    ("bmi-calculator", "BMI Calculator", "Calculate Body Mass Index", "calc"),
    ("loan-emi-calculator", "Loan EMI Calculator", "Calculate loan EMI payments", "calc"),
    ("scientific-calculator", "Scientific Calculator", "Advanced scientific calculator", "calc"),
    ("discount-calculator", "Discount Calculator", "Calculate discounts and savings", "calc"),
    ("currency-converter", "Currency Converter", "Convert between currencies", "calc"),
    ("time-zone-converter", "Time Zone Converter", "Convert between time zones", "calc"),
    ("binary-to-decimal", "Binary to Decimal", "Convert binary to decimal numbers", "calc"),
    ("tip-calculator", "Tip Calculator", "Calculate tip amounts", "calc"),
    
    # Unit Converters (51-60)
    ("length-converter", "Length Converter", "Convert length units", "converter"),
    ("weight-converter", "Weight Converter", "Convert weight units", "converter"),
    ("speed-converter", "Speed Converter", "Convert speed units", "converter"),
    ("temperature-converter", "Temperature Converter", "Convert temperature units", "converter"),
    ("volume-converter", "Volume Converter", "Convert volume units", "converter"),
    ("data-storage-converter", "Data Storage Converter", "Convert data storage units", "converter"),
    ("energy-converter", "Energy Converter", "Convert energy units", "converter"),
    ("pressure-converter", "Pressure Converter", "Convert pressure units", "converter"),
    ("fuel-efficiency-converter", "Fuel Efficiency Converter", "Convert fuel efficiency units", "converter"),
    ("angle-converter", "Angle Converter", "Convert angle units", "converter"),
    
    # Security & Encryption (61-70)
    ("md5-hash-generator", "MD5 Hash Generator", "Generate MD5 hash", "security"),
    ("sha256-hash-generator", "SHA256 Hash Generator", "Generate SHA256 hash", "security"),
    ("password-generator", "Password Generator", "Generate secure passwords", "security"),
    ("random-string-generator", "Random String Generator", "Generate random strings", "security"),
    ("url-shortener", "URL Shortener", "Shorten long URLs", "security"),
    ("ip-geolocation-finder", "IP Geolocation Finder", "Find IP geolocation", "security"),
    ("ssl-certificate-checker", "SSL Certificate Checker", "Check SSL certificate validity", "security"),
    ("whois-lookup", "Whois Lookup", "Lookup domain information", "security"),
    ("http-headers-checker", "HTTP Headers Checker", "Check HTTP headers", "security"),
    ("privacy-policy-generator", "Privacy Policy Generator", "Generate privacy policy", "security"),
    
    # Social Media (71-80)
    ("youtube-thumbnail-downloader", "YouTube Thumbnail Downloader", "Download YouTube thumbnails", "social"),
    ("instagram-photo-downloader", "Instagram Photo Downloader", "Download Instagram photos", "social"),
    ("twitter-video-downloader", "Twitter Video Downloader", "Download Twitter videos", "social"),
    ("facebook-video-downloader", "Facebook Video Downloader", "Download Facebook videos", "social"),
    ("tiktok-video-downloader", "TikTok Video Downloader", "Download TikTok videos", "social"),
    ("youtube-tags-extractor", "YouTube Tags Extractor", "Extract tags from YouTube videos", "social"),
    ("hashtag-generator", "Hashtag Generator", "Generate hashtags for posts", "social"),
    ("social-media-post-generator", "Social Media Post Generator", "Generate social media posts", "social"),
    ("emoji-keyboard", "Emoji Keyboard", "Copy and use emojis", "social"),
    ("twitter-character-counter", "Twitter Character Counter", "Count characters for Twitter", "social"),
    
    # Miscellaneous (81-100)
    ("barcode-generator", "Barcode Generator", "Generate barcodes", "misc"),
    ("meme-generator", "Meme Generator", "Create memes easily", "misc"),
    ("resume-builder", "Resume Builder", "Build professional resumes", "misc"),
    ("invoice-generator", "Invoice Generator", "Generate invoices", "misc"),
    ("business-name-generator", "Business Name Generator", "Generate business names", "misc"),
    ("lottery-number-generator", "Lottery Number Generator", "Generate lottery numbers", "misc"),
    ("flip-a-coin", "Flip a Coin", "Flip a virtual coin", "misc"),
    ("random-number-generator", "Random Number Generator", "Generate random numbers", "misc"),
    ("dice-roller", "Dice Roller", "Roll virtual dice", "misc"),
    ("internet-speed-test", "Internet Speed Test", "Test internet connection speed", "misc"),
    ("daily-planner-creator", "Daily Planner Creator", "Create daily planners", "misc"),
    ("wedding-invitation-generator", "Wedding Invitation Generator", "Generate wedding invitations", "misc"),
    ("story-plot-generator", "Story Plot Generator", "Generate story plots", "misc"),
    ("ebook-creator", "E-book Creator", "Create e-books", "misc"),
    ("ai-chatbot-demo", "AI Chatbot Demo", "Interactive AI chatbot", "misc"),
    ("ip-address-tracker", "IP Address Tracker", "Track IP addresses", "misc"),
    ("fake-address-generator", "Fake Address Generator", "Generate fake addresses", "misc"),
    ("electric-bill-calculator", "Electric Bill Calculator", "Calculate electric bills", "misc"),
    ("leap-year-checker", "Leap Year Checker", "Check if year is a leap year", "misc"),
    ("name-to-numerology", "Name to Numerology", "Calculate numerology from name", "misc"),
]

def get_tool_template(filename, title, description, category):
    icons = {
        "image": "bi-image",
        "seo": "bi-search",
        "text": "bi-text-paragraph",
        "dev": "bi-code-slash",
        "calc": "bi-calculator",
        "converter": "bi-arrow-left-right",
        "security": "bi-shield-lock",
        "social": "bi-share",
        "misc": "bi-tools"
    }
    icon = icons.get(category, "bi-tools")
    
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - MultiTools</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    <link href="../css/style.css" rel="stylesheet">
</head>
<body>
    <main>
        <div class="tool-container">
            <div class="tool-header text-center">
                <h1><i class="bi {icon}"></i> {title}</h1>
                <p class="mb-0">{description}</p>
            </div>
            <div class="tool-content">
                <div class="back-to-home">
                    <a href="../index.html" class="btn btn-outline-primary"><i class="bi bi-arrow-left"></i> Back to Home</a>
                </div>
                <div id="toolContent">
                    <!-- Tool content will be added by individual tool scripts -->
                    <p class="text-center text-muted">Tool functionality coming soon...</p>
                </div>
                <div class="ad-space mt-4">
                    <small>Advertisement</small>
                </div>
            </div>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/main.js"></script>
    <script src="js/{filename}.js"></script>
</body>
</html>'''

# Generate all tool files
for filename, title, description, category in tools:
    html_content = get_tool_template(filename, title, description, category)
    with open(f"tools/{filename}.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Generated: {filename}.html")

print(f"\nGenerated {len(tools)} tool files!")

