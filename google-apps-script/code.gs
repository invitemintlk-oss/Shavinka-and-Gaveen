// Buddi & Aloka wedding — RSVP endpoint.
// Sheet: https://docs.google.com/spreadsheets/d/1i1KW0s1DGMzS490Wzmd69TgHC6JBILw8Pn3E011Hoik/edit
const SPREADSHEET_ID = '1i1KW0s1DGMzS490Wzmd69TgHC6JBILw8Pn3E011Hoik';

const RSVP_SHEET = 'RSVP';
const RSVP_HEADERS = ['Timestamp', 'Invited As', 'Name', 'Attendance', 'Guests'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = parsePayload_(e);

    if (!clean_(payload.name)) {
      return jsonResponse_({ ok: false, error: 'Name is required.' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(ss, RSVP_SHEET);
    ensureHeaders_(sheet, RSVP_HEADERS);
    sheet.appendRow([
      new Date(),
      clean_(payload.invitedAs),
      clean_(payload.name),
      clean_(payload.attendance),
      clean_(payload.guests),
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: String(error && error.message ? error.message : error),
    });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    message: 'Wedding form endpoint is running.',
  });
}

// Run this once from the Apps Script editor to check the sheet connection and create the RSVP tab.
function setup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  ensureHeaders_(getOrCreateSheet_(ss, RSVP_SHEET), RSVP_HEADERS);
}

function parsePayload_(e) {
  const params = e && e.parameter ? e.parameter : {};

  if (Object.keys(params).length > 0) {
    return params;
  }

  const contents = e && e.postData && e.postData.contents ? e.postData.contents : '';
  if (!contents) {
    return {};
  }

  if (contents.indexOf('=') !== -1 && contents.indexOf('{') !== 0) {
    return parseQueryString_(contents);
  }

  try {
    return JSON.parse(contents);
  } catch (_error) {
    return {};
  }
}

function parseQueryString_(query) {
  const out = {};
  const pairs = String(query).split('&');

  for (let i = 0; i < pairs.length; i++) {
    const part = pairs[i];
    if (!part) continue;

    const idx = part.indexOf('=');
    const rawKey = idx >= 0 ? part.slice(0, idx) : part;
    const rawValue = idx >= 0 ? part.slice(idx + 1) : '';
    const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
    const value = decodeURIComponent(rawValue.replace(/\+/g, ' '));

    out[key] = value;
  }

  return out;
}

// Prevents values starting with = + - @ from being run as spreadsheet formulas.
function clean_(value) {
  const text = String(value == null ? '' : value).trim().slice(0, 500);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function getOrCreateSheet_(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
