import React from "react";
import { FC } from "react";
import { ArrayLogo } from "../../utils/ArrayLogo";
import OldLogo from "./OldLogo";

interface LogoContainerProps {
  selectedLogo: string | null;
  setSelectedLogo: any;
}

const LogoContainer: FC<LogoContainerProps> = ({
  selectedLogo,
  setSelectedLogo,
}) => {
  return (
    <div className="logo-content">
      <h1 className="logo-content__title">Select logo</h1>

      <div className="logo-content__container _container">
        {ArrayLogo.map((item: string) => (
          <div className="logo-content__column" key={item}>
            <div className="logo-content__item">
              <OldLogo
                src={item}
                selectedLogo={selectedLogo}
                setSelectedLogo={setSelectedLogo}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoContainer;
