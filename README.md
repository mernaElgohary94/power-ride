# Snap Lens Camera

Mobile-first React app built with Snap Camera Kit Web. It loads one configured Lens from a Lens Group, captures photos, records the Camera Kit canvas, downloads captures, and switches front/back cameras.

## Run it

1. Add the Camera Kit API token, Lens Group ID, and Lens ID from the Snap Developer Portal to `.env`.
2. Run `npm install` then `npm run dev`.
3. Open the supplied local URL. For a physical phone, serve the app from an HTTPS host; browsers only allow camera access on HTTPS (except localhost).

## Notes

- Video is recorded from Camera Kit's capture canvas at 30fps. Browser support varies; Chrome on Android is the most reliable target.
- Camera Kit does not add Lens sound to its canvas stream. The in-app **Tap to enable Lens sound** control handles browsers' autoplay restriction, but a Lens's own embedded/licensed audio cannot be muxed into a web recording by Camera Kit. Use a separately owned audio track in the web app if that sound must be included in exports.
- A website can request a file download but cannot directly write into the phone's Gallery. On mobile, use the browser's download/save prompt and choose Photos/Gallery where available.
- Never commit the `.env` file with your live token.
