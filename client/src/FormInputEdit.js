import { InputTypes, InputPrettyNames, getPrettyName } from "./hooks/form";
import child from "./FormInputEdit.module.scss";
import base from "./FormEdit.module.scss";
import Select from "react-select";

import IconButton from "./IconButton";
import CheckboxGroupEdit from "./CheckboxGroupEdit";
import DropdownGroupEdit from "./DropdownGroupEdit";

const FormInputEdit = (props) => {
  const { id, type, required, title, options } = props.section;
  const { onClickDelete = () => {}, onChange = () => {} } = props;

  const style = { ...child, ...base };

  const onTitleChange = (e) => {
    onChange({ ...props.section, title: e.target.value });
  };

  const onRequiredChange = () => {
    onChange({ ...props.section, required: !props.section.required });
  };

  const onSelectChange = (e) => {
    onChange({ ...props.section, type: e.value });
  };

  const onOptionsChange = (newOptions) => {
    onChange({ ...props.section, options: newOptions });
  };

  return (
    <div className={style.section}>
      <h2 className={style.sectionTitle}>Section</h2>
      <input
        type="text"
        value={title}
        onChange={onTitleChange}
        onFocus={(event) => event.target.select()}
      ></input>
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
      {type === InputTypes.Date && (
        <div className={style.textInput}>
          <i className="icon-clock"></i>Date entry
        </div>
      )}
      {type === InputTypes.Dropdown && (
        <DropdownGroupEdit options={options} onChange={onOptionsChange} />
      )}
      <div className={style.bottomToolbar}>
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
        <Select
          options={InputPrettyNames}
          value={{
            label: getPrettyName(type),
            value: type,
          }}
          menuPlacement="auto"
          styles={{
            control: (provided) => ({
              ...provided,
              width: "14rem",
              marginTop: "0.5rem",
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
            }),
          }}
          name="questionType"
          onChange={onSelectChange}
        ></Select>
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
