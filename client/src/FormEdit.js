import React, { useState } from "react";
import style from "./FormEdit.module.scss";
import cx from "classnames";
import IconButton from "./IconButton";
import Button from "./Button";

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
  const [description, onChangeDesc] = useState("A form description...");

  return (
    <div className={cx("medscribe", style.container)}>
      <div className={style.deadLeft}></div>
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
      </div>
      <div className={style.controlsContainer}>
        <IconButton icon="plus" size="md" />
        <Button type="primary">Done</Button>
      </div>
    </div>
  );
};

export default FormEdit;
