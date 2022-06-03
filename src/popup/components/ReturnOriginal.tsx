import React, { FC } from "react";

interface ReturnOriginalProps {
  handleLogoDeletedAlarm: any;
}

const ReturnOriginal: FC<ReturnOriginalProps> = ({
  handleLogoDeletedAlarm,
}) => {
  return (
    <button onClick={handleLogoDeletedAlarm} className="return-original">
      Return original
    </button>
  );
};

export default ReturnOriginal;
