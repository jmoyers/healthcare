import React from "react";
import style from "./MedscribeIntake.module.scss";
import cx from "classnames";

import CheckboxOption from "./CheckboxOption.js";
import CheckboxGroup from "./CheckboxGroup.js";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import "./SelectSearch.scss";

function MedscribeIntake() {
  const options = [
    { name: "English", value: "en" },
    { name: "Spanish", value: "es" },
  ];

  return (
    <div className={cx("medscribe", style.container)}>
      <div className={style.intake}>
        <h1>Intake</h1>
        <form action="#" method="POST" className={style.medscribeForm}>
          <section className={style.intakeSection}>
            <fieldset>
              <label htmlFor="firstName">First Name</label>
              <input className={style.shortAnswer} name="firstName" />
            </fieldset>

            <fieldset>
              <label htmlFor="lastName">Last Name</label>
              <input className={style.shortAnswer} name="lastName" />
            </fieldset>
          </section>

          <fieldset>
            <label htmlFor="bio">Bio</label>
            <textarea className={style.paragraph} name="bio" />
          </fieldset>

          <CheckboxGroup title="Please indicate any conditions that you have had or currently have:">
            <CheckboxOption label="headaches/migraine" optionName="o1" />
            <CheckboxOption label="allergies/sensitivities" optionName="o2" />
            <CheckboxOption label="arthirtis/tendonitis" optionName="o2" />
            <CheckboxOption label="cancer/tumors" optionName="o4" />
          </CheckboxGroup>

          <fieldset>
            <label htmlFor="language" className={style.dropdownLabel}>
              Please select your preferred language:
            </label>
            <SelectSearch options={options} name="language" />
          </fieldset>

          {/* <input className={style.dateInput} /> */}
          {/* <input className={style.time} /> */}
        </form>
      </div>
    </div>
  );
}

export default MedscribeIntake;
