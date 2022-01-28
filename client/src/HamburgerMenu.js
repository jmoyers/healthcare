import style from "./HamburgerMenu.module.scss";
import cx from "classnames";

const HamburgerMenu = (props) => {
  const { items, open, onClick = () => {} } = props;

  return (
    <div
      className={cx({
        [style.menu]: true,
        [style.menuClosed]: !open,
      })}
    >
      {items.map((item) => (
        <div className={style.menuItem} onClick={() => onClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default HamburgerMenu;
