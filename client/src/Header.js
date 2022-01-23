import React from "react";

import Button from "./Button";
import styles from "./Header.module.scss";

function Header() {
  let signedInUser = true;

  return (
    <div className={styles.header}>
      <div className={styles.siteName}>Medscribe Patient Intake</div>
      <div className={styles.rightNav}>
        {!signedInUser ? (
          <>
            <Button to="/signup">Get Started</Button>
            <Button to="/signin" type="secondary">
              Sign In
            </Button>
          </>
        ) : (
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
