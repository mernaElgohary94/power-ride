# Snap Lens Camera

Mobile-first React app built with Snap Camera Kit Web. It loads one configured Lens from a Lens Group, captures photos, records the Camera Kit canvas, downloads captures, and switches front/back cameras.

## Run it

1. Add the Camera Kit API token, Lens Group ID, and Lens ID from the Snap Developer Portal to `.env`.
2. Run `npm install` then `npm run dev`.
3. Open the supplied local URL. For a physical phone, serve the app from an HTTPS host; browsers only allow camera access on HTTPS (except localhost).

## Notes

- Video is recorded from Camera Kit's output canvas at 30fps, producing WebM. Browser support varies; Chrome on Android is the most reliable target.
- A website can request a file download but cannot directly write into the phone's Gallery. On mobile, use the browser's download/save prompt and choose Photos/Gallery where available.
- Never commit the `.env` file with your live token.
