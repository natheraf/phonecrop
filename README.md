# PhoneCrop

A web-based tool for batch cropping images to mobile device resolutions.

## Features

- **Device presets** — Pre-configured resolutions for iPhone 6 through iPhone 17 series
- **Custom resolution** — Enter any target width and height
- **Crop positioning** — Control anchor point (top/center/bottom, left/center/right)
- **Duplicate detection** — Automatically skips similar images using perceptual hashing
- **Batch processing** — Drag & drop multiple images, outputs as ZIP
- **Mobile support** — Detects device screen resolution on mobile browsers

## Usage

1. Open `phone-crop-tool.html` in a web browser
2. Select a device preset or enter custom dimensions
3. Choose crop anchor position
4. Drag images or click to browse
5. Click **Download ZIP** to get cropped images

## Supported Formats

JPG, PNG, WebP, GIF

## Browser Support

Modern browsers with canvas and FileReader API support.