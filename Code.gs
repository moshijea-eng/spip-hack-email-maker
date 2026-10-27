const DRIVE_FOLDER_ID = '1j_3-brmaFhFRYheYJHlkIA70zhPK1ms_';
const MAX_HTML_SIZE = 2000000;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('SPIP_Hack_Letter_Maker')
    .setTitle('SPIP Hack Letter Maker');
}

function authorizeDriveAccess() {
  return DriveApp.getFolderById(DRIVE_FOLDER_ID).getName();
}

function saveLetterPdf(html, filename) {
  if (typeof html !== 'string' || html.length === 0 || html.length > MAX_HTML_SIZE) {
    throw new Error('The letter preview is empty or too large to export.');
  }
  if (typeof filename !== 'string' || filename.trim() === '') {
    throw new Error('A filename is required.');
  }

  const safeFilename = filename.replace(/[\\/:*?"<>|#%{}~&]/g, '-').slice(0, 180);
  const pdf = Utilities.newBlob(html, 'text/html', safeFilename + '.html')
    .getAs(MimeType.PDF)
    .setName(safeFilename + '.pdf');
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const file = folder.createFile(pdf);
  return { name: file.getName(), url: file.getUrl() };
}
