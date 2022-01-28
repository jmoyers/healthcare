import style from "./TabBar.module.scss";
import Button from "./Button";

const TabBar = ({ actions }) => (
  <div className={style.container}>
    {actions.map((action) => (
      <Button key={action.name} icon={action.icon} onClick={action.onClick}>
        {action.name}
      </Button>
    ))}
  </div>
);

export default TabBar;
