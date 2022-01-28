import style from "./HamburgerMenu.module.scss";
import cx from "classnames";

const HamburgerMenu = (props) => {
  const { actions, open, itemId } = props;

  return (
    <div
      className={cx({
        [style.menu]: true,
        [style.menuOpen]: open,
      })}
    >
      {actions &&
        actions.map((action) => (
          <div
            key={action.name}
            className={style.menuItem}
            onClick={() => action.onClick(itemId)}
          >
            <div className={cx(style.navText, `icon-${action.icon}`)}>
              {action.name}
            </div>
          </div>
        ))}
    </div>
  );
};

export default HamburgerMenu;
