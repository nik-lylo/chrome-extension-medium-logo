import { PathNewLogoEnum } from "../utils/PathNewLogoEnum";
import { createImage } from "./createImage";
import { uploadToLocalStorage } from "./uploadToLocalStorage";

export function checkImgImage(path_runtime: string) {
  const images_medium = document.querySelectorAll("img");
  if (images_medium.length > 0) {
    const images_mediumArr = Array.from(images_medium);
    // *Перевіряємо на співпадіння з перемінною const imgPathEnds і imgPath1
    const filtered_images_mediumArr = images_mediumArr.filter((it) => {
      if (it.src.endsWith(PathNewLogoEnum.IMG_PATH_1)) return it;
      if (it.src.endsWith(PathNewLogoEnum.IMG_PATH_4)) return it;
      if (it.src === PathNewLogoEnum.IMG_PATH_2) return it;
      if (it.src === PathNewLogoEnum.IMG_PATH_3) return it;
      return false;
    });
    if (filtered_images_mediumArr.length > 0) {
      filtered_images_mediumArr.forEach((imageElem: any) => {
        if (!imageElem.parentNode) return;
        let images_medium__img = createImage(path_runtime, imageElem);
        if (
          imageElem.src === PathNewLogoEnum.IMG_PATH_2 ||
          imageElem.src === PathNewLogoEnum.IMG_PATH_3
        ) {
          images_medium__img.classList.add("medium-bg-white");
        }

        imageElem.parentNode.replaceChild(images_medium__img, imageElem);
      });
      uploadToLocalStorage(path_runtime);
      return;
    }
  }
}
