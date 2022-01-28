import React from "react";

import IconButton from "./IconButton.js";

import styles from "./IconToggleButton.module.scss";
import cx from "classnames";

function IconToggleButton(props) {
  const { checked = false } = props;
  return (
    <IconButton
      {...props}
      className={cx({
        [styles.checked]: checked
      })}
    />
  );
}

export default React.memo(IconToggleButton);
