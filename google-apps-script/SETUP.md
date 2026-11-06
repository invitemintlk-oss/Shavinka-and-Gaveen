Sheet: https://docs.google.com/spreadsheets/d/1i1KW0s1DGMzS490Wzmd69TgHC6JBILw8Pn3E011Hoik/edit

1. Open the sheet above and go to Extensions > Apps Script.
2. Replace the script content with google-apps-script/code.gs and save.
3. Pick the `setup` function in the toolbar and click Run. Approve the permissions.
   This creates the RSVP tab with headers.
4. Click Deploy > New deployment.
5. Select type: Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Deploy and copy the Web App URL (ends in /exec).
9. Local: create a file named .env in the project root with:

VITE_GOOGLE_APPS_SCRIPT_URL=YOUR_WEB_APP_URL

   Vercel: Project > Settings > Environment Variables, add VITE_GOOGLE_APPS_SCRIPT_URL
   with the same URL, then redeploy.

10. Restart the Vite dev server.

RSVP columns: Timestamp | Invited As | Name | Attendance | Guests
"Invited As" is the guest name from the personalised link (e.g. Mr. Sanjaya); it is blank
for the plain link. "Name" is what the guest typed (pre-filled from the link).

Notes:
- If you update Apps Script code later, use Deploy > Manage deployments > Edit > New version,
  so the Web App URL stays the same.
