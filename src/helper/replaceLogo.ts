import { checkImgImage } from "./checkImgImage";
import { checkOurImg } from "./checkOurImg";
import { checkSvgImage } from "./checkSvgImage";
import { getFromLocalStorage } from "./getFromLocalStorage";

export function replaceLogo(path_runtime: string) {
  //!Перевіряємо ми чи є у нас вже встановлена картинка і як є міняємо її.
  checkOurImg(path_runtime);
  // !Перевіряємо тепер svg картинку і її path
  checkSvgImage(path_runtime);
  // !Перевіряємо image
  checkImgImage(path_runtime);

  setTimeout(() => {
    getFromLocalStorage();
  }, 2000);
}
