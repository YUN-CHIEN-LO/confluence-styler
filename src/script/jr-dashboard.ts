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

  const clockIn = document.createElement("h2");
  clockIn.setAttribute("id", "clockIn");

  const clockOut = document.createElement("h2");
  clockOut.setAttribute("id", "clockOut");

  const countDown = document.createElement("h2");
  countDown.setAttribute("id", "clockInCountDown");

  const firstClockInTime = ResultValue[0] ? ResultValue[0]["Time"] : null;
  const [hour, minute] = firstClockInTime.split(":");
  const expectedClockOutTime =
    Number(hour) + 9 >= 17 ? `${Number(hour) + 9}:${minute}` : "17:00";

  clockIn.innerText = `最早上班時間：${firstClockInTime}`;
  clockOut.innerText = `預計下班時間：${expectedClockOutTime}`;
  countDown.innerText = `倒數剩餘時間：--`;

  clockInGadget.appendChild(clockIn);
  clockInGadget.appendChild(clockOut);
  clockInGadget.appendChild(countDown);

  oldElement.replaceWith(clockInGadget);

  setInterval(() => {
    const today = new Date();
    const clockOutTime = Number(
      new Date(
        `${today.getFullYear()}/${
          today.getMonth() + 1
        }/${today.getDate()} ${expectedClockOutTime}:00`
      )
    );
    let remainTime = clockOutTime - Number(today);
    remainTime = Math.ceil(remainTime / 1000);
    const hour = Math.floor(remainTime / 60 / 60);
    remainTime -= hour * 60 * 60;
    const minutes = Math.floor(remainTime / 60);
    remainTime -= minutes * 60;
    const seconds = remainTime;
    const formatter = (time: number): string => `${time}`.padStart(2, "0");

    const countDownElement = document.getElementById("clockInCountDown");
    if (countDownElement) {
      countDownElement.innerText = `倒數剩餘時間：${formatter(
        hour
      )}:${formatter(minutes)}:${formatter(seconds)}`;
    }
  }, 1000);
}

function getEmpID() {
  const user = document.getElementById("header-details-user-fullname");
  if (!user) return;
  return user.getAttribute("data-username");
}

async function getClockInTime() {
  const currentDate = new Date().toJSON().slice(0, 10);
  const EmpID = getEmpID();
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
