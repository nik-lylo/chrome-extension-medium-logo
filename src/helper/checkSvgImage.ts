import { PathNewLogoEnum } from "../utils/PathNewLogoEnum";
import { createImage } from "./createImage";
import { recursiveSeekSvg } from "./recursiveSeekSvg";
import { uploadToLocalStorage } from "./uploadToLocalStorage";

export function checkSvgImage(path_runtime: string) {
  const paths = document.querySelectorAll("path");
  if (paths.length > 0) {
    const arr = Array.from(paths);
    const filter = arr.filter((it) => {
      console.log(it, "item");

      if (
        it.getAttribute("d").includes(PathNewLogoEnum.LOGO_PATH_1) ||
        it.getAttribute("d").includes(PathNewLogoEnum.LOGO_PATH_2)
      ) {
        return true;
      }
      return false;
    });

    if (filter.length > 0) {
      filter.forEach((elem) => {
        let recursiveSvg = recursiveSeekSvg(elem);
        let img = createImage(path_runtime, recursiveSvg);
        recursiveSvg.parentNode.replaceChild(img, recursiveSvg);
      });
      uploadToLocalStorage(path_runtime);
    }
  }
}
