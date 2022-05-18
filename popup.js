function sendImageHandler(path) {
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   chrome.tabs.sendMessage(
  //     tabs[0].id,
  //
  //     function (response) {
  //       console.log(response);
  //     }
  //   );
  // });
  chrome.tabs.query({}, (tabs) =>
    tabs.forEach((tab) =>
      chrome.tabs.sendMessage(tab.id, {
        message: { reason: "change_color", path: path },
      })
    )
  );
}

const image_item = document.querySelectorAll(".popup__item");
const arr = Array.from(image_item);
for (let item of arr) {
  console.log(item.firstElementChild.src);
  item.addEventListener("click", () =>
    sendImageHandler(item.firstElementChild.src)
  );
}

console.log("popup");
