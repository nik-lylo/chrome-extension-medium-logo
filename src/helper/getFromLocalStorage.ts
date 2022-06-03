import { StorageKeysEnum } from "../utils/StorageKeysEnum";
import { replaceLogo } from "./replaceLogo";

export function getFromLocalStorage() {
  chrome.storage.local.get([StorageKeysEnum.LOGO_KEY], function (result) {
    if (result[StorageKeysEnum.LOGO_KEY]) {
      replaceLogo(result[StorageKeysEnum.LOGO_KEY]);
    }
  });
}
