import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "./Button";
import IconToggleButton from "./IconToggleButton";
import HamburgerMenu from "./HamburgerMenu";

import styles from "./Header.module.scss";

function Header() {
  let user = {
    auth: true,
    type: "provider",
  };

  const navigate = useNavigate();

  const [menuExpanded, setMenuExpanded] = useState(false);

  const onSiteNameClick = () => {
    if (user.auth && user.type === "provider") {
      navigate("/forms");
    }
  };

  const onMenuClick = () => {
    setMenuExpanded((old) => !old);
  };

  let menuItems = [];

  if (user.auth && user.type === "provider") {
    menuItems = [
      {
        name: "Forms",
        onClick: () => {
          setMenuExpanded(false);
          navigate("/forms");
        },
      },
      {
        name: "Responses",
        onClick: () => {
          setMenuExpanded(false);
          navigate("/responses");
        },
      },
      {
        name: "Sign Out",
        onClick: () => {
          setMenuExpanded(false);
          navigate("/signout");
        },
      },
    ];
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.siteName} onClick={onSiteNameClick}>
          🩺 Medscribe
        </div>
        <div className={styles.rightNav}>
          {!user.auth && (
            <>
              <Button to="/signin/patient" type="primary">
                Patient Sign In
              </Button>
              <Button to="/signin/provider" type="secondary">
                Provider Sign In
              </Button>
            </>
          )}
          {user.auth && user.type === "provider" && (
            <>
              <Button to="/forms" type="primary">
                Forms
              </Button>
              <Button to="/responses" type="secondary">
                Responses
              </Button>
              <Button to="/signout" type="secondary">
                Sign Out
              </Button>
            </>
          )}
        </div>
        <div className={styles.rightNavHamburger}>
          <IconToggleButton
            icon="menu"
            size="sm"
            onClick={onMenuClick}
            checked={menuExpanded}
          ></IconToggleButton>
        </div>
      </div>
      <HamburgerMenu actions={menuItems} open={menuExpanded} />
    </div>
  );
}

export default React.memo(Header);
