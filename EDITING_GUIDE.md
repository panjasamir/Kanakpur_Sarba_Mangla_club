# How to update your Kanakpur Puja website

All content lists are in **data.js**. Open the website folder in VS Code and edit that file. You do not need to edit the layout or run a build command.

## 1. Add photos

1. Put your photo in `assets/photos/` (create this folder if needed).
2. Use short filenames without spaces: `puja-2026-01.jpg`. JPG, PNG and WebP are supported. Compress large photos to roughly 1600 pixels wide for faster loading.
3. Find `"gallery": [` in data.js. Add an object inside that list like this:

```javascript
{
  "image": "assets/photos/puja-2026-01.jpg",
  "title": { "en": "Our illuminated pandal", "bn": "আমাদের আলোকিত মণ্ডপ" },
  "caption": { "en": "Kanakpur Shyama Puja, 2026", "bn": "কনকপুর শ্যামাপূজা, ২০২৬" }
}
```

Put a comma between objects: `}, {`. Keep the existing square brackets around the list. You can replace the current illustrative gallery entry or keep it with its illustration label. Every photo automatically opens at full size when clicked.

Use paths relative to index.html, not Mac paths such as `/Users/...`. Filenames are case-sensitive on GitHub: `Photo.jpg` and `photo.jpg` are different files. Upload both the new photo file and the updated data.js.

## 2. Add or change the schedule

Find `"schedule": [` in data.js. Each event has category, title, description, date and time. Copy one event object, add a comma, and change its values. Example below is an EDITING EXAMPLE, not a confirmed event:

```javascript
{
  "category": "ritual",
  "title": { "en": "Evening Aarti", "bn": "সন্ধ্যার আরতি" },
  "description": { "en": "Join us at the puja mandap.", "bn": "পূজামণ্ডপে আমাদের সঙ্গে যোগ দিন।" },
  "date": { "en": "Enter confirmed date", "bn": "নির্দিষ্ট দিন লিখুন" },
  "time": { "en": "Enter confirmed time (IST)", "bn": "নির্দিষ্ট সময় লিখুন (ভারতীয় সময়)" }
}
```

Use `"ritual"` for puja events, `"culture"` for cultural programmes or `"service"` for community service; these control the filter buttons. Arrange objects in chronological order. The supplied poster has already been transcribed, so `"scheduleConfirmed"` is true. The custom bilingual `scheduleNotice` explains the source. When revising the programme, update `scheduleNotice` too. Do not invent exact times when the poster says only morning or evening.

## 3. Add organisers and members

Find `"organisers": []`. Replace the empty list with entries like:

```javascript
"organisers": [
  {
    "name": { "en": "Enter actual name", "bn": "আসল নাম লিখুন" },
    "role": { "en": "President", "bn": "সভাপতি" },
    "image": "assets/people/president.jpg"
  },
  {
    "name": { "en": "Enter actual name", "bn": "আসল নাম লিখুন" },
    "role": { "en": "Secretary", "bn": "সম্পাদক" },
    "image": ""
  }
]
```

Create `assets/people/` and add the actual portraits. Leaving image as an empty string displays the person's initial instead of a photograph. Use the same structure in `"members": []` for members and volunteers. Use names/photos approved for publication; do not leave example names in the public site.

## 4. Add past-puja albums

Find `"pastPujas": []`. Replace it with year-by-year albums. Example structure:

```javascript
"pastPujas": [
  {
    "year": "2025",
    "title": { "en": "Shyama Puja 2025", "bn": "শ্যামাপূজা ২০২৫" },
    "description": { "en": "Memories from our puja.", "bn": "আমাদের পূজার স্মৃতি।" },
    "photos": [
      {
        "image": "assets/past/2025-pandal.jpg",
        "title": { "en": "The pandal", "bn": "পূজামণ্ডপ" },
        "caption": { "en": "Our pandal in 2025", "bn": "২০২৫ সালের আমাদের মণ্ডপ" }
      },
      {
        "image": "assets/past/2025-idol.jpg",
        "title": { "en": "Maa Kali", "bn": "মা কালী" },
        "caption": { "en": "Our 2025 idol", "bn": "২০২৫ সালের প্রতিমা" }
      }
    ]
  }
]
```

Only add years for which you have authentic photographs. Create `assets/past/` and upload the matching files. Copy an entire album object to add another year. The year filter buttons are generated automatically. This download intentionally has no invented historical club photos.

## 5. Change the ten-form illustrations

The section below the main theme uses the traditional Dasha Mahavidya names: Kali, Tara, Tripura Sundari, Bhuvaneshwari, Bhairavi, Chhinnamasta, Dhumavati, Bagalamukhi, Matangi and Kamala. This is the assumed interpretation of the requested ten forms; confirm that these are the forms your committee plans to worship.

The ten images are in `assets/mahavidya/`. Change image paths in the `forms` list in data.js if you replace them. Change both English and Bangla names if your local list differs. Current images are AI-created devotional interpretations, not documentation of the actual idols. Chhinnamasta is represented symbolically without graphic detail. If all images become actual photographs, update the disclosure text in index.html and the illustration wording used in app.js.

The main background is `assets/hero-kali-v3.webp`. To replace it, use your own image with the same filename or update its references in style.css, data.js and index.html as needed. The background is intentionally zoomed out to show more of the image.

## 6. Preview and upload changes

On a Mac, open Terminal. Type `cd ` (with a space), drag the extracted website folder from Finder into Terminal, then press Return. Run:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000. Stop with Control+C. Python 3 is only needed for this optional local preview, not for GitHub hosting.

Check English and Bangla, click a photo, try schedule/year filters, and inspect your new images. If the lists disappear after editing, inspect data.js for a missing comma, quote or bracket. If Node is installed, `node --check data.js` can check syntax.

Upload the updated files and images to the same GitHub repository and commit. Keep **index.html at the repository root**. Keep `assets/` and its subfolders intact. Use Settings > Pages > Deploy from a branch > main > / (root) > Save.

For this upgrade, upload index.html, style.css, app.js, data.js, the entire assets folder, README.md and EDITING_GUIDE.md. Do not mix the new app.js with an old index.html. The `.nojekyll` file is included; show hidden files in Finder with Command+Shift+period if needed.

Your GitHub Pages address is shown in Settings > Pages after deployment. The previous private preview and your GitHub copy are separate: uploading to GitHub does not automatically update the private preview, or vice versa.

## Notes

- There is no admin login or online upload backend. Editing data.js and uploading files is how content is published.
- The fireworks are silent and the Pause effects button stops animations. Reduced-motion preferences are respected.
- Google Fonts and Google Maps need internet access; local images and application code are included.
- The Maps link uses the supplied address: 3FFW+46Q, Kanakpur, West Bengal 721439.

## Registration and poster

The supplied poster records establishment in 1952 and registration S/65935. These are shown on the website. The original, unmodified poster is bundled at assets/programme-poster-2026.jpg and linked in the programme section. Eleven entries cover 8–14 November 2026, including morning and evening events. The poster confirms the Dasha Mahavidya celebration.

## 7. Set up the separate UPI donation page

Open donate.html to see the donation page. It is linked from the main menu, donation section and footer. Online donations are intentionally disabled until you configure the real details.

In data.js find the donations object at the end:

```javascript
"donations": {
  "enabled": false,
  "upiId": "",
  "recipientName": "",
  "qrImage": "",
  "note": "Kanakpur Shyama Puja donation"
}
```

1. Put the organisation's actual UPI ID between the quotes after upiId.
2. Put the recipient's name, as displayed by the bank/UPI app, after recipientName.
3. Optionally add the committee's actual payment QR image to assets/ and set qrImage to its relative path, for example assets/donation-qr.png. Use the QR supplied by your UPI provider, not a decorative image. Ensure it belongs to the same recipient. The QR is a static uploaded image: changing the amount on this website does not change the QR.
4. Change enabled from false to true only after checking those details.
5. Upload data.js and the QR image (if used) to GitHub. Test the page on your phone and verify the recipient shown in the UPI app before sharing the site.

The amount buttons fill in the amount. Open UPI app creates a standard upi://pay link using the configured recipient and amount. A compatible phone/app is required and providers may restrict generic links. Copy UPI ID and the uploaded QR are alternatives. There is no payment gateway, transaction verification, automatic receipt or payment-success page. This website never asks for a UPI PIN. Payments are completed in the donor's UPI app.

## 8. Updated background, animation and footer

The new main artwork is assets/hero-kali-v3.webp. The older assets/puja.webp remains in the gallery. All 10 Mahavidya artworks remain in assets/mahavidya/.

The section scenery and full-page fireworks are in ambience.js and the V3 section at the end of style.css. Pause effects works on both pages. The animation respects reduced-motion settings and the global fireworks stop while the browser tab is hidden.

The new footer is in both index.html and donate.html. Edit both if changing footer links, address or wording. Update both data-en and data-bn attributes for bilingual text.

## 9. Replace the GitHub version with this complete download

Extract the ZIP. Upload all files inside Kanakpur_Website to your repository root, including the NEW donate.html, donate.js, ambience.js and data.js. Upload the entire assets folder, including hero-kali-v3.webp and all 10 Mahavidya files. Keep index.html directly at the repository root. Commit the changes. Your existing GitHub Pages branch settings can stay the same.

Open HOW_TO_EDIT.html in your browser to read this guide. You do not need npm or a build step.

## 10. Section backgrounds and richer animations (version 4)

Three new illustrative backgrounds are in assets/backgrounds/: rangoli.webp, gateway.webp and river.webp. The main Maa Kali hero is unchanged from version 3. Section-specific background assignments are at the end of style.css under V4. Change --scene-image for a section to choose another local image. --scene-position adjusts its crop and --scene-strength adjusts visibility.

The page has multicolour ring, starburst and cascading firework effects, small golden spark fountains at the viewport edges, animated hanging lamps, glowing floating lights and rows of flickering diyas. The effects are silent. Pause effects stops them; reduced-motion preferences are respected. Off-screen section decorations pause to reduce animation work.

Upload all extracted files, including the new assets/backgrounds folder, to replace the previous GitHub version. Existing photos, event schedule, registration number and donation setup remain in data.js.

## Programme day labels
Each schedule entry now has a numeric `day` field: 1 for 8 November through 7 for 14 November. Events on the same day share the same number. Keep entries in date/time order. Day labels work in both English and Bangla and remain correct when categories are filtered.

## Welcome poster
The Platinum Jubilee welcome poster is in index.html (`jubilee-welcome`). Edit its text there. Styling is at the end of style.css. welcome.js shows it once per browser-tab visit; visitors can close with ×, Enter the celebration, Escape, or outside the poster. A new tab shows it again.
