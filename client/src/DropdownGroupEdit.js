import style from "./DropdownGroupEdit.module.scss";
import IconButton from "./IconButton";
import Button from "./Button";

const DropdownGroupEdit = (props) => {
  const { options = [], onChange = () => {} } = props;

  const onClickRemove = (removeIndex) => {
    options.splice(removeIndex);
    onChange(options);
  };

  const onNameChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    console.log(newOptions);
    onChange(newOptions);
  };

  const addOption = () => {
    options.push("");
    onChange(options);
  };

  return (
    <div className={style.options}>
      {options.map((option, index) => (
        <div className={style.container} key={index}>
          <input
            type="text"
            value={option}
            className={style.name}
            onChange={(e) => onNameChange(index, e.target.value)}
          ></input>
          <IconButton
            icon="erase"
            onClick={() => onClickRemove(index)}
          ></IconButton>
        </div>
      ))}
      <div className={style.addButton}>
        <Button icon="plus" onClick={addOption}>
          Add Option
        </Button>
      </div>
    </div>
  );
};

export default DropdownGroupEdit;
