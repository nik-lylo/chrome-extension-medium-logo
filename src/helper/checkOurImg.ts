import { createImage } from "./createImage";
import { uploadToLocalStorage } from "./uploadToLocalStorage";

export function checkOurImg(path_runtime) {
  const images_prev: any = document.querySelectorAll(".old-image");
  if (images_prev.length > 0) {
    images_prev.forEach((elem) => {
      if (elem.src === path_runtime) return;
      if (!elem) return;
      if (!elem.parentNode) return;
      const srcElemArr = elem.src.split("/");
      const patElem = srcElemArr[srcElemArr.length - 1];
      if (path_runtime.includes(patElem)) return;
      let newImg = createImage(path_runtime, elem);
      elem.parentNode.replaceChild(newImg, elem);
    });
    uploadToLocalStorage(path_runtime);
  }
}
