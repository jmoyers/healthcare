import style from "./FormRowCell.module.scss";
import cx from "classnames";

const FormRowCell = (props) => {
  const { item } = props;
  return (
    <div className={cx(style.cell, style.title)}>
      <i className={cx(style.icon, `icon-folder`)}></i>
      {item.title}
    </div>
  );
};

export default FormRowCell;
