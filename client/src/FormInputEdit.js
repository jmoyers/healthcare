import useFormState from "./state/useFormState";
import { InputTypes } from "./state/form";
import style from "./FormInputEdit.module.scss";
import SelectSearch from "react-select-search";

import IconButton from "./IconButton";

const FormInputEdit = (props) => {
  const { type, required, title, id } = props.section;
  const { onClickDelete = () => {}, onChange = () => {} } = props;

  const onTitleChange = (e) => {
    onChange({ ...props.section, title: e.target.value });
  };

  const onRequiredChange = () => {
    onChange({ ...props.section, required: !props.section.required });
  };

  const onSelectChange = (value) => {
    onChange({ ...props.section, type: value });
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

  return (
    <div className={style.formSection}>
      <h2>Question</h2>
      <input type="text" value={title} onChange={onTitleChange}></input>
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
            onChange={onRequiredChange}
          />
        </fieldset>
        <IconButton
          size="md"
          icon="trash"
          onClick={() => onClickDelete(id)}
        ></IconButton>
      </div>
    </div>
  );
};

export default FormInputEdit;
