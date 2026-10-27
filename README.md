# SPIP-Hack-Letter-Maker

## Save generated letters to Google Drive

The **Save PDF to Google Drive** button exports the current preview (one or both
languages) as a PDF in the configured Drive folder. The existing **Save as PDF /
Print** button continues to open the browser print dialog, and **Save as my
template** continues to save the subject and body in the current browser.

To enable Drive saving:

1. Sign in to the Google account that owns or can edit the destination folder.
2. Open [Google Apps Script](https://script.google.com/) and create a project.
3. Add a script file named `Code.gs` and paste in this repository's `Code.gs`.
   The provided folder ID is already configured there.
4. Add an HTML file named `SPIP_Hack_Letter_Maker` and paste in the contents of
   `SPIP_Hack_Letter_Maker.html`.
5. In the Apps Script editor, select and run `authorizeDriveAccess`, then
   approve the requested Google Drive access.
6. In **Deploy → New deployment**, choose **Web app**, set **Execute as** to
   **Me**, and restrict access to **Only myself**. Deploy the web app.
7. Open the deployed web app URL. Use **Save PDF to Google Drive** to create a
   PDF in the configured folder.

The script runs as the deploying account and is restricted to that account.
Do not make the deployment public: the save handler writes files to Drive.
The first authorization and deployment are required by Google; this cannot be
done by an unauthenticated standalone HTML file.