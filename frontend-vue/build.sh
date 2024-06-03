#!/bin/bash
set -e
npm run build
lowriter --headless --convert-to pdf david_bramler_cv.docx
mv david_bramler_cv.pdf ./dist