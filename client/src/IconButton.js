import React from "react";
import styles from "./IconButton.module.scss";
import cx from "classnames";

function IconButton(props) {
  const {
    icon,
    onClick = () => {},
    border = false,
    size = "sm",
    className = [],
  } = props;

  const _onClick = (e) => {
    // sane default
    e.stopPropagation();
    onClick(e);
  };

  return (
    <button
      {...props}
      className={cx(
        `icon-${icon}`,
        styles.iconButton,
        {
          [styles.border]: border,
          [styles.sm]: size === "sm",
          [styles.md]: size === "md",
        },
        className
      )}
      onClick={_onClick}
    />
  );
}

export default IconButton;
