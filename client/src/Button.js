import React from "react";
import styles from "./Button.module.scss";
import cx from "classnames";
import { useNavigate } from "react-router-dom";

function Button(props) {
  const {
    onClick = () => {},
    className = [],
    type = "primary",
    icon,
    children,
    size,
    to,
  } = props;

  const navigate = useNavigate();

  const _onClick = (e) => {
    // sane default
    e.stopPropagation();

    if (to) {
      navigate(to);
    }

    onClick(e);
  };

  return (
    <button
      className={cx(styles.button, className, {
        [styles.primary]: type === "primary",
        [styles.secondary]: type === "secondary",
        [styles.danger]: type === "danger",
        [styles.large]: size === "large",
      })}
      onClick={_onClick}
    >
      {icon && <i className={cx("icon-" + icon, styles.icon)} />}
      {children}
    </button>
  );
}

export default React.memo(Button);
