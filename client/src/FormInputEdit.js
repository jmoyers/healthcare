import useFormState from "./state/useFormState";
import { InputTypes } from "./state/form";
import style from "./FormInputEdit.module.scss";
import SelectSearch from "react-select-search";

import IconButton from "./IconButton";

import log from "ulog";

const FormInputEdit = (props) => {
  const { id, title, type, required: reqProp, options } = props.section;
  const { onClickDelete = () => {}, onChangeSection = () => {} } = props;

  const [required, handleRequiredEvent] = useFormState(reqProp);

  const onSelectChange = (a1, a2, a3) => {
    log(a1, a2, a3);
  };

  const questionTypes = [
    {
      name: "Short answer",
      value: InputTypes.ShortAnswer,
    },
    {
      name: "Paragraph",
      value: InputTypes.Paragraph,
    },
    {
      name: "Checkbox Group",
      value: InputTypes.CheckboxGroup,
    },
    {
      name: "Dropdown",
      value: InputTypes.Dropdown,
    },
    {
      name: "Date/Time",
      value: InputTypes.DateTime,
    },
  ];

  log(props.section);

  return (
    <div className={style.formSection}>
      <h2>Question</h2>
      <input type="text" defaultValue={title}></input>
      {type === InputTypes.ShortAnswer && (
        <div className={style.textInput}>Short answer text</div>
      )}
      {type === InputTypes.Paragraph && (
        <div className={style.textInput}>Long answer text</div>
      )}
      <div className={style.bottomToolbar}>
        <SelectSearch
          options={questionTypes}
          value={type}
          name="questionType"
          onChange={onSelectChange}
        ></SelectSearch>
        <fieldset className={style.reqFieldset}>
          <label className={style.reqLabel} htmlFor="required">
            Required
          </label>
          <input
            type="checkbox"
            id="required"
            className={style.reqCheckbox}
            checked={required}
            onChange={handleRequiredEvent}
          />
        </fieldset>
        <IconButton size="md" icon="trash" onClick={onClickDelete}></IconButton>
      </div>
    </div>
  );
};

export default FormInputEdit;
