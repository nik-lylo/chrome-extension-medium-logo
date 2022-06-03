import { StorageKeysEnum } from "../utils/StorageKeysEnum";

export function uploadToLocalStorage(path: string) {
  chrome.storage.local.set({ [StorageKeysEnum.LOGO_KEY]: path });
}
