#!/bin/bash

echo "🚀 Building for Hostinger deployment..."

# Build the project
echo "📦 Building project..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "📁 Files ready for upload in the 'dist' folder:"
echo "   - index.html"
echo "   - js/ (folder)"
echo "   - assets/ (folder)"
echo "   - images/ (folder)"
echo "   - gurucharanResume.pdf"
echo "   - eduexp.json"
echo "   - _redirects"
echo ""
echo "🌐 Next steps:"
echo "   1. Log into your Hostinger control panel"
echo "   2. Go to File Manager"
echo "   3. Navigate to public_html folder"
echo "   4. Upload all files from the 'dist' folder"
echo "   5. Ensure index.html is in the root of public_html"
echo ""
echo "🔒 Don't forget to enable SSL certificate in Hostinger!" 