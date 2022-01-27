import React from "react";

import Button from "./Button";
import styles from "./Header.module.scss";

function Header() {
  let user = {
    auth: true,
    type: "provider",
  };

  return (
    <div className={styles.header}>
      <div className={styles.siteName}>🩺 Medscribe</div>
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
    </div>
  );
}

export default React.memo(Header);
