import React from "react";
import style from "./MedscribeIntake.module.scss";

import CheckboxOption from "./CheckboxOption.js";
import CheckboxGroup from "./CheckboxGroup.js";

function MedscribeIntake() {
  return (
    <div className={style.container}>
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

          <input className={style.dropdown} />
          <input className={style.dateInput} />
          <input className={style.time} />
        </form>
      </div>
    </div>
  );
}

export default MedscribeIntake;
