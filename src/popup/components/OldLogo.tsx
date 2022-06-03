import React, { FC } from "react";
import { StorageKeysEnum } from "../../utils/StorageKeysEnum";
import "../popup.css";

interface OldLogoProps {
  src: string;
  setSelectedLogo: any;
  selectedLogo: string;
}

const OldLogo: FC<OldLogoProps> = ({ src, setSelectedLogo, selectedLogo }) => {
  function handleSendMessage(src: string) {
    setSelectedLogo(src);

    chrome.storage.local.set({ [StorageKeysEnum.LOGO_KEY]: src });

    chrome.tabs.query({}, (tabs) =>
      tabs.forEach((tab) =>
        chrome.tabs.sendMessage(tab.id, { reason: "change_logo", path: src })
      )
    );
  }
  return (
    <div
      className={
        src === selectedLogo ? "old-logo old-logo_selected" : "old-logo"
      }
      onClick={() => handleSendMessage(src)}
    >
      <img src={src} alt="old logo" />
    </div>
  );
};

export default OldLogo;
