import style from "./FormListTabBar.module.scss";

import Button from "./Button";
import TabBar from "./TabBar";

const FormListTabBar = (props) => {
  const { onCreateFormClick = () => {} } = props;

  return (
    <TabBar>
      <Button type="primary" icon="plus" onClick={onCreateFormClick}>
        New Form
      </Button>
    </TabBar>
  );
};

export default FormListTabBar;
