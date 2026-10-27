const DRIVE_FOLDER_ID = '1j_3-brmaFhFRYheYJHlkIA70zhPK1ms_';
const MAX_PDF_BASE64_SIZE = 2000000;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('SPIP_Hack_Letter_Maker')
    .setTitle('SPIP Hack Letter Maker');
}

function authorizeDriveAccess() {
  return DriveApp.getFolderById(DRIVE_FOLDER_ID).getName();
}

function saveLetterPdf(pdfBase64, filename) {
  if (typeof pdfBase64 !== 'string' || pdfBase64.length === 0 || pdfBase64.length > MAX_PDF_BASE64_SIZE) {
    throw new Error('The PDF export is empty or too large.');
  }
  if (typeof filename !== 'string' || filename.trim() === '') {
    throw new Error('A filename is required.');
  }

  const safeFilename = filename.replace(/[\\/:*?"<>|#%{}~&]/g, '-').slice(0, 180);
  const pdf = Utilities.newBlob(
    Utilities.base64Decode(pdfBase64),
    MimeType.PDF,
    safeFilename + '.pdf'
  );
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const file = folder.createFile(pdf);
  return { name: file.getName(), url: file.getUrl() };
}
