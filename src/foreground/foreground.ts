import { getFromLocalStorage } from "../helper/getFromLocalStorage";
import { replaceLogo } from "../helper/replaceLogo";

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    getFromLocalStorage();
  }
};

// *Тут ми звязуємось з content скриптом і слухаємо чи є нам якісь повідомлення------------------------------------------------------
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.reason == "change_logo") {
    console.log(request.path, "path message");
    replaceLogo(request.path);
    sendResponse(true);
  }
});
