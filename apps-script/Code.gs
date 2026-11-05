/**
 * 北海道賞雪 2027 — 行前待辦清單 / 口袋名單愛心 雲端同步後端
 *
 * 這份程式碼不是網站本身的一部分，是給 Google Apps Script 用的參考備份。
 * 設定步驟：
 *
 * 1. 開一個新的 Google Sheet，把它命名成任意名稱（例如「2027Sapporo DB」）。
 * 2. 在這個 Sheet 裡新增三個分頁（大小寫要一致）：
 *    - "Checklist"：第一列填表頭 person_id | item_index | checked | updated_at
 *    - "Likes"：第一列填表頭 item_id | person_id | liked | updated_at
 *    - "Memos"：第一列填表頭 person_id | day_date | text | updated_at
 * 3. 選單「擴充功能」→「Apps Script」，把這個檔案的內容整個貼進
 *    編輯器裡（取代預設的 Code.gs 內容），存檔。
 * 4. 點右上角「部署」→「新增部署作業」→ 類型選「網頁應用程式」：
 *    - 執行身分：我（你的帳號）
 *    - 誰可以存取：任何人
 *    部署後會拿到一個網址，結尾是 /exec，這就是 CHECKLIST_API_URL。
 * 5. 把這個網址貼到 2027Sapporo/js/app.js 最上面的 CHECKLIST_API_URL 常數。
 *
 * 注意：這個網址沒有身分驗證，任何知道網址的人都能讀寫這個表單，
 * 對朋友出遊使用已經足夠，但不要拿來存放機密資料。
 */

const CHECKLIST_SHEET_NAME = "Checklist";
const LIKES_SHEET_NAME = "Likes";
const MEMOS_SHEET_NAME = "Memos";

function getSheet_(name) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

function doGet(e) {
  const type = e.parameter.type;
  if (type === "likes") return getLikes_();
  if (type === "memos") return getMemos_();
  return getChecklist_();
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.type === "like") return postLike_(body);
  if (body.type === "memo") return postMemo_(body);
  return postChecklist_(body);
}

function getChecklist_() {
  const sheet = getSheet_(CHECKLIST_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1)
    .filter(r => r[0] !== "")
    .map(r => ({
      personId: r[0],
      itemIndex: Number(r[1]),
      checked: r[2] === true || r[2] === "TRUE",
    }));
  return ContentService.createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}

function postChecklist_(body) {
  const personId = body.personId;
  const itemIndex = Number(body.itemIndex);
  const checked = !!body.checked;

  const sheet = getSheet_(CHECKLIST_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === personId && Number(data[i][1]) === itemIndex) {
      rowIndex = i + 1; // 轉成 1-based 列號
      break;
    }
  }

  const now = new Date().toISOString();
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 3).setValue(checked);
    sheet.getRange(rowIndex, 4).setValue(now);
  } else {
    sheet.appendRow([personId, itemIndex, checked, now]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getLikes_() {
  const sheet = getSheet_(LIKES_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1)
    .filter(r => r[0] !== "")
    .map(r => ({
      itemId: r[0],
      personId: r[1],
      liked: r[2] === true || r[2] === "TRUE",
    }));
  return ContentService.createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}

function postLike_(body) {
  const itemId = body.itemId;
  const personId = body.personId;
  const liked = !!body.liked;

  const sheet = getSheet_(LIKES_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === itemId && data[i][1] === personId) {
      rowIndex = i + 1; // 轉成 1-based 列號
      break;
    }
  }

  const now = new Date().toISOString();
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 3).setValue(liked);
    sheet.getRange(rowIndex, 4).setValue(now);
  } else {
    sheet.appendRow([itemId, personId, liked, now]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getMemos_() {
  const sheet = getSheet_(MEMOS_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1)
    .filter(r => r[0] !== "")
    .map(r => ({
      personId: r[0],
      // day_date 欄位格式是「1/5」這種容易被 Sheets 自動誤判成日期的字串，
      // 寫入時已強制該欄位格式為純文字（見 postMemo_），這裡轉成字串保險
      dayDate: String(r[1]),
      text: r[2],
    }));
  return ContentService.createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}

function postMemo_(body) {
  const personId = body.personId;
  const dayDate = body.dayDate;
  const text = body.text || "";

  const sheet = getSheet_(MEMOS_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === personId && String(data[i][1]) === dayDate) {
      rowIndex = i + 1; // 轉成 1-based 列號
      break;
    }
  }

  const now = new Date().toISOString();
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 3).setValue(text);
    sheet.getRange(rowIndex, 4).setValue(now);
  } else {
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1).setValue(personId);
    // day_date 欄位強制設成純文字格式，避免 Sheets 把「1/5」這種字串自動轉成日期
    sheet.getRange(newRow, 2).setNumberFormat("@").setValue(dayDate);
    sheet.getRange(newRow, 3).setValue(text);
    sheet.getRange(newRow, 4).setValue(now);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
