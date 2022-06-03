export function createImage(path_runtime: string, prevImage: any) {
  let converted_path = path_runtime;
  if (!path_runtime.startsWith("chrome-extension")) {
    converted_path = chrome.runtime.getURL(path_runtime);
  }
  let newImg = document.createElement("img");
  newImg.src = converted_path;
  const prevValueSize = parseInt(getComputedStyle(prevImage).height);
  if (prevImage.classList.contains("old-image")) {
    if (prevImage.classList.contains("medium-bg-white")) {
      newImg.classList.add("medium-bg-white");
    }
    newImg.style.height = prevValueSize + "px";
    newImg.style.width = prevValueSize + "px";
  } else {
    newImg.style.height = prevValueSize + 5 + "px";
    newImg.style.width = prevValueSize + 5 + "px";
  }
  newImg.classList.add("old-image");
  return newImg;
}
