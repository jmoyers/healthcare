import style from "./HamburgerMenu.module.scss";
import cx from "classnames";

const HamburgerMenu = (props) => {
  const { items, open, formId, onClick = () => {} } = props;

  return (
    <div
      className={cx({
        [style.menu]: true,
        [style.menuOpen]: open,
      })}
    >
      {items.map((item) => (
        <div
          key={item}
          className={style.menuItem}
          onClick={() => onClick(item, formId)}
        >
          <div
            className={cx({
              [style.navText]: true,
              "icon-users": item === "Link",
              "icon-list": item === "Preview",
              "icon-cog": item === "Edit",
              "icon-trash": item === "Delete",
            })}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HamburgerMenu;
