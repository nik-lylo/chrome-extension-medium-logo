import React, { useEffect, useState } from "react";
import { Menu, Sidebar, Segment } from "semantic-ui-react";
import { StorageKeysEnum } from "../utils/StorageKeysEnum";
import LogoContainer from "./components/LogoContainer";
import Navbar from "./components/Navbar";
import ReturnOriginal from "./components/ReturnOriginal";
import "./popup.css";

const Popup = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<null | string>(null);
  const [logoDeleted, setLogoDeleted] = useState(false);

  function handleLogoDeletedAlarm() {
    console.log("click");
    chrome.storage.local.clear();
    setLogoDeleted(true);
    setSelectedLogo(null);
  }
  function handleSelectedLogo(src: string) {
    setSelectedLogo(src);
    setLogoDeleted(false);
  }

  useEffect(() => {
    chrome.storage.local.get([StorageKeysEnum.LOGO_KEY], (res: any) => {
      if (!res[StorageKeysEnum.LOGO_KEY]) return;
      console.log(res);
      setSelectedLogo(res[StorageKeysEnum.LOGO_KEY]);
    });
  }, []);

  return (
    <div className="popup">
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar.Pushable as={Segment} className="sidebar-pushable">
        <Sidebar
          className="sidebar"
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          width="thin"
          visible={isSidebarOpen}
          onHidden={() => console.log("hid")}
          onHide={() => {
            setIsSidebarOpen(false);
          }}
          onShow={() => console.log("show")}
        >
          {selectedLogo && (
            <ReturnOriginal handleLogoDeletedAlarm={handleLogoDeletedAlarm} />
          )}
          {logoDeleted && !selectedLogo ? (
            <div className="deleted-logo">Please, reload your page</div>
          ) : !selectedLogo && !logoDeleted ? (
            <div className="no-selected">Please, select some logo</div>
          ) : null}
        </Sidebar>
        <Sidebar.Pusher dimmed={isSidebarOpen}>
          <Segment basic className="sidebar-segment">
            <LogoContainer
              selectedLogo={selectedLogo}
              setSelectedLogo={handleSelectedLogo}
            />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default Popup;
