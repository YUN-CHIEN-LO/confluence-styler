/**
 * 計時器
 * @param {number} time - 等待時間 ms
 * @returns {Promise}
 */
function setTimeoutTimer(time: number = 100) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve("");
    }, time);
  });
}

/**
 * 建立 tooltip
 *
 * @returns {HTMLElement}
 */
function createTooltip() {
  // 建立刷新按鈕
  const newRefreshBtn = document.createElement("div");
  newRefreshBtn.className = "lyc-cf-tooltip__refresh";
  newRefreshBtn.onclick = (event) => {
    event.stopPropagation();
    initTooltip();
  };
  // 插入到側邊欄工具列
  const footerDom = document.querySelector(".space-tools-section");
  footerDom?.appendChild(newRefreshBtn);

  // 建立 tooltip DOM
  const newTooltip = document.createElement("div");
  newTooltip.id = "lyc-cf-nav-tooltip";
  newTooltip.className = "lyc-cf-tooltip";

  // 將 tooltip 掛載到頁面上
  const pageDom = document.getElementById("page");
  pageDom && pageDom.appendChild(newTooltip);

  return document.getElementById("lyc-cf-nav-tooltip") as HTMLElement;
}

/**
 * 對 DOM 元件鍵新增 tooltip 提示
 * @param {HTMLElement} target - 要掛載 tooltip 的 DOM 元件
 * @param {string} labelSelector - tooltip 標籤來源 DOM
 */
function setTooltipAction(target: HTMLElement, labelSelector: string) {
  // 取得標籤來源 DOM
  const labelDOM = target.querySelector(labelSelector) as HTMLElement;

  // 取得標籤內容
  let label = labelDOM?.innerText;

  // 鼠標進入
  target.onmouseover = () => {
    setTimeoutTimer().then(() => {
      const { top, right } = target.getBoundingClientRect();
      // 更新定位
      tooltipDom.style.top = `${top - 2}px`;
      tooltipDom.style.left = `${right + 36}px`;
      // 更新標籤內容
      tooltipDom.innerText = label;
      // 顯示 tooltip
      if (label?.length) tooltipDom.style.opacity = "1";
    });
  };

  // 鼠標離開
  target.onmouseout = () => {
    setTimeoutTimer().then(() => {
      // 隱藏 tooltip
      tooltipDom.style.opacity = "0";
    });
  };
}

/**
 * 選取快捷鍵清單
 * @param {string} navItemSelector - 快捷鍵清單 selector
 * @param {string} navLabelSelector - 快捷鍵標籤 selector
 */
function selectNavList(navItemSelector: string, navLabelSelector: string) {
  const navList = document.querySelectorAll(
    navItemSelector
  ) as NodeListOf<Element>;

  // 對每個快捷鍵新增 tooltip 提示
  navList.forEach((value) => {
    let navItem = value as HTMLElement;
    setTooltipAction(navItem, navLabelSelector);
  });
}

function initTooltip(time: number = 100) {
  // 取得快捷標籤
  setTimeoutTimer(time).then(() => {
    // 取得頁面標籤
    selectNavList(
      ".plugin_pagetree_children_content",
      ".plugin_pagetree_children_span > a"
    );
  });
}

// 建立 tooltip DOM
const tooltipDom = createTooltip();
// 初始 tooltip
initTooltip(1000);
