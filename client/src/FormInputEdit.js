import { useState } from "react";
import { InputTypes, InputPrettyNames } from "./hooks/form";
import style from "./FormInputEdit.module.scss";
import SelectSearch from "react-select-search";

import IconButton from "./IconButton";
import CheckboxGroupEdit from "./CheckboxGroupEdit";
import DropdownGroupEdit from "./DropdownGroupEdit";

const FormInputEdit = (props) => {
  const { id, type, required, title, options } = props.section;
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

  const onOptionsChange = (newOptions) => {
    console.log("opt change", newOptions);
    onChange({ ...props.section, options: newOptions });
  };

  return (
    <div className={style.formSection}>
      <h2>Section</h2>
      <input type="text" value={title} onChange={onTitleChange}></input>
      {type === InputTypes.ShortAnswer && (
        <div className={style.textInput}>Short answer text</div>
      )}
      {type === InputTypes.Paragraph && (
        <div className={style.textInput}>Long answer text</div>
      )}
      {type === InputTypes.CheckboxGroup && (
        <CheckboxGroupEdit options={options} onChange={onOptionsChange} />
      )}
      {type === InputTypes.DateTime && (
        <div className={style.textInput}>
          <i className="icon-clock"></i>Date/time entry
        </div>
      )}
      {type === InputTypes.Dropdown && (
        <DropdownGroupEdit options={options} onChange={onOptionsChange} />
      )}
      <div className={style.bottomToolbar}>
        <SelectSearch
          options={InputPrettyNames}
          value={type}
          name="questionType"
          onChange={onSelectChange}
        ></SelectSearch>
        {type !== InputTypes.Header && (
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
        )}
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
