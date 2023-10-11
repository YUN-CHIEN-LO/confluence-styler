function addStyle(style: string) {
  alert("add");
  const cssStyle = document.createElement("style");
  cssStyle.textContent = style;

  const iframe = document.getElementById(
    "wysiwygTextarea_ifr"
  ) as HTMLIFrameElement;

  if (!!iframe && !!iframe.contentWindow) {
    alert("frame");
    iframe.contentWindow.document.head.appendChild(cssStyle);
  }
}

const styleText = `
    .mce-content-body {
        font-size: 18px;
        line-height: 1.5;
        border: solid 1px red;
    }
    .mce-content-body > h1 {
        font-size: 26px;
    }
    .mce-content-body > h1 > img {
        vertical-align: text-top;
        width: 26px;
        height: 26px;
    }
    .mce-content-body > h2 {
        font-size: 24px;
    }
    .mce-content-body > h2 > img {
        vertical-align: text-top;
        width: 24px;
        height: 24px;
    }
    .mce-content-body > h3 {
        font-size: 20px;
    }
    .mce-content-body > h3 > img {
        vertical-align: text-top;
        width: 20px;
        height: 20px;
    }
    `;

alert("load");
addStyle(styleText);
