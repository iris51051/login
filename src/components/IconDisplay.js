import React from "react";
import Icon from "@mdi/react";
import {
  mdiAvTimer,
  mdiGroup,
  mdiChartAreaspline,
  mdiChartBar,
  mdiKeyboard,
  mdiCellphoneLink,
  mdiBulletinBoard,
  mdiDownload,
  mdiPackageUp,
} from "@mdi/js";

const IconDisplay = ({ iconName }) => {
  let iconPath = "";
  switch (iconName) {
    case "mdi-av-timer":
      iconPath = mdiAvTimer;
      break;
    case "mdi-group":
      iconPath = mdiGroup;
      break;
    case "mdi-chart-areaspline":
      iconPath = mdiChartAreaspline;
      break;
    case "mdi-chart-bar":
      iconPath = mdiChartBar;
      break;
    case "mdi-keyboard":
      iconPath = mdiKeyboard;
      break;
    case "mdi-cellphone-link":
      iconPath = mdiCellphoneLink;
      break;
    case "mdi-bulletin-board":
      iconPath = mdiBulletinBoard;
      break;
    case "mdi-download":
      iconPath = mdiDownload;
      break;
    case "mdi-package-up":
      iconPath = mdiPackageUp;
      break;
  }

  return (
    <>
      <Icon path={iconPath} size={0.85} style={{ marginRight: "7px" }} />
    </>
  );
};

export default IconDisplay;
