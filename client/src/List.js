import { useState } from "react";

import style from "./List.module.scss";
import cx from "classnames";

import Button from "./Button";
import HamburgerMenu from "./HamburgerMenu";
import TabBar from "./TabBar";

const List = (props) => {
  const { title, items, tabBarActions, rowActions, RowCell, emptyMessage } =
    props;

  const [activeMenu, setActiveMenu] = useState(false);

  const onRowClick = (id) => {
    if (activeMenu === id) {
      setActiveMenu(false);
    } else {
      setActiveMenu(id);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.componentTitle}>{title}</h1>
      <div className={style.table}>
        {items.length === 0 && (
          <div className={style.emptyMessage}>
            <div style={{ marginBottom: "2rem" }}>{emptyMessage}</div>
          </div>
        )}

        {items.map((item) => (
          <div key={item.id}>
            <div className={style.row} onClick={() => onRowClick(item.id)}>
              <RowCell item={item} />
              <div className={cx(style.cell, style.actions)}>
                {rowActions.map((action) => (
                  <Button
                    key={action.name}
                    icon={action.icon}
                    type={action.type ? action.type : "primary"}
                    onClick={() => action.onClick(item.id)}
                  >
                    {action.name}
                  </Button>
                ))}
              </div>
            </div>
            <HamburgerMenu
              open={activeMenu === item.id}
              actions={rowActions}
              itemId={item.id}
            />
          </div>
        ))}
        {tabBarActions ? <TabBar actions={tabBarActions} /> : null}
      </div>
    </div>
  );
};

export default List;
