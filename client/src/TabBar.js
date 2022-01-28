import style from "./TabBar.module.scss";

const TabBar = ({ children }) => (
  <div className={style.container}>{children}</div>
);

export default TabBar;
