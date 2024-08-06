function setClockInTime(
  ResultValue: Array<{
    [key: string]: any;
  }>
) {
  const overwriteTarget = document.getElementById("gadget-30723-renderbox");
  if (!overwriteTarget) return;
  const oldElement = overwriteTarget.querySelector(".dashboard-item-frame");
  if (!oldElement) return;

  const clockInGadget = document.createElement("div");
  clockInGadget.setAttribute("class", "clock-in-gadget");

  const countDown = document.createElement("h2");
  countDown.setAttribute("id", "clockInCountDown");

  clockInGadget.appendChild(countDown);

  // creates a <table> element and a <tbody> element
  const tbl = document.createElement("table");

  const tblHead = document.createElement("thead");
  const tblBody = document.createElement("tbody");

  // creates a table row
  const headRow = document.createElement("tr");
  const headCell = document.createElement("th");
  const headCellText = document.createTextNode(`打卡時間`);
  headCell.appendChild(headCellText);
  headRow.appendChild(headCell);
  tblHead.appendChild(headRow);

  // creating all cells
  for (const element of ResultValue) {
    // creates a table row
    const row = document.createElement("tr");
    row.style.borderBottom = "1px solid #dfe1e6";

    for (let j = 0; j < 1; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement("td");
      cell.style.textAlign = "center";
      const cellText = document.createTextNode(`${element["Time"]}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblHead);
  tbl.appendChild(tblBody);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "0");
  tbl.style.borderCollapse = "collapse";

  clockInGadget.appendChild(tbl);

  oldElement.replaceWith(clockInGadget);

  const firstClockInTime = ResultValue[0] ? ResultValue[0]["Time"] : null;
  const [hour, minute] = firstClockInTime.split(":");
  const expectedClockOutTime = `${Number(hour) + 9}:${minute}`;

  const countDownElement = document.getElementById("clockInCountDown");
  if (countDownElement) {
    countDownElement.innerText = `預計下班時間：${expectedClockOutTime}`;
  }
}
async function getClockInTime() {
  const currentDate = new Date().toJSON().slice(0, 10);
  const EmpID = "10101927";
  const url = `https://ws.syntecclub.com.tw:3790/HRMService.asmx/AT_SKZX_061_GetClockInInfo?EmpID=${EmpID}&BeginDate=${currentDate}&EndDate=${currentDate}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const text = await response.text();
    const div = document.createElement("div");
    div.innerHTML = text;
    const content = JSON.parse(div.innerText);
    const { ResultValue } = content ?? {};

    setClockInTime(ResultValue);
  } catch (error: any) {
    console.error(error.message);
    setClockInTime([]);
  }
}

function initBoard() {
  setTimeout(() => {
    getClockInTime();
  }, 1000);
}

initBoard();
