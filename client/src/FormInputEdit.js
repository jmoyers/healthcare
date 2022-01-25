import react, { useState } from "react";
import useFormState from "./state/useFormState";
import { InputTypes } from "./state/form";
import style from "./FormInputEdit.module.scss";
import CheckboxOption from "./CheckboxOption";
import SelectSearch from "react-select-search";

import "react-select-search/style.css";
import "./react-selectsearch-custom.scss";
import "react-datetime/css/react-datetime.css";
import IconButton from "./IconButton";

const FormInputEdit = ({ section }) => {
  const { id, title, type, required: reqProp, options } = section;

  const [required, handleRequiredEvent, setRequired] = useFormState(reqProp);

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

  console.log(section);

  return (
    <div className={style.formSection}>
      <input type="text" value={title}></input>
      {type === InputTypes.ShortAnswer && (
        <div className={style.textInput}>Short answer text</div>
      )}
      {type === InputTypes.Paragraph && (
        <div className={style.textInput}>Long answer text</div>
      )}
      <div className={style.bottomToolbar}>
        <SelectSearch
          options={questionTypes}
          name="questionType"
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
        <IconButton size="md" icon="trash"></IconButton>
      </div>
    </div>
  );
};

export default FormInputEdit;
