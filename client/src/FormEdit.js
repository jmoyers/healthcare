import React, { useState } from "react";
import style from "./FormEdit.module.scss";
import cx from "classnames";
import log from "ulog";
import Button from "./Button";
import FormInputEdit from "./FormInputEdit";
import { Form } from "./state/form";

const useFormState = (initial) => {
  const [state, setState] = useState(initial);
  const handleEvent = (e) => setState(e.target.value);
  return [state, handleEvent, setState];
};

/**
 * Create a floating panel on the right that allows for you
 * to add new form fields, edit existing form fields. Each
 * form input should be in a floating container centered on
 * the screen.
 *
 * There will be a dropdown to select the form input type
 * an editable input for the title of the form input and
 * the ability to add options where appropriate to checkbox
 * or radio button groups.
 *
 * We will save on the fly and not require you to hit a save
 * button.
 */

const FormEdit = () => {
  const [title, onChangeTitle] = useFormState("A form title");
  const [description, onChangeDesc] = useFormState("A form description...");

  const form = new Form();

  const [sections, setSections] = useState(form.sections);

  const onClickAdd = () => {};

  const onClickDelete = (section) => {
    console.log("test");
    log(section);
  };

  const onChangeSection = (section) => {};

  return (
    <>
      <div className={cx("medscribe", style.container)}>
        <div className={style.formEditContainer}>
          <div className={style.formSection}>
            <h2>Title</h2>
            <input type="text" value={title} onChange={onChangeTitle}></input>
          </div>

          <div className={style.formSection}>
            <h2>Description</h2>
            <input
              type="text"
              value={description}
              onChange={onChangeDesc}
            ></input>
          </div>

          {sections.map((section) => (
            <FormInputEdit
              section={section}
              key={section.id}
              onClickDelete={() => onClickDelete(section)}
              onChange={() => onChangeSection(section)}
            />
          ))}
        </div>
      </div>
      <div className={style.controlsContainer}>
        <Button type="primary" icon="plus" onClick={onClickAdd}>
          Add Question
        </Button>
      </div>
    </>
  );
};

export default FormEdit;
