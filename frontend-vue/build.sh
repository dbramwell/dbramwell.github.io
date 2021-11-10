#!/bin/bash
set -e
npm run build
lowriter --headless --convert-to pdf david_bramwell_cv.docx
mv david_bramwell_cv.pdf ./dist