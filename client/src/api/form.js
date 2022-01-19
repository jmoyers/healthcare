
import { v4 as uuid } from 'uuid';

class Form {
  constructor(){
    this.id = uuid();
    this.owner = uuid();
    this.created = new Date();

    this.title = "Sunrise Medical Patient Intake";
    this.description = 
      `Please fill in all information as accurately as possible. The 
       information you provide will assist in formulating a complete
       health profile. All answers are confidential`;

    this.sections = [
      new FormSection("First Name", InputTypes.ShortAnswer, true)
    ];
  }
}

const InputTypes = Object.freeze({
  ShortAnswer: Symbol("SHORT_ANSWER"),
  Paragraph: Symbol("PARAGRAPH"),
  Checkbox: Symbol("CHECKBOX"),
  Dropdown: Symbol("DROPDOWN"),
  DateInput: Symbol("DATE_INPUT"),
  Time: Symbol("TIME")
});

class FormSection {
  constructor(title, type, required) {
    this.title = title;
    this.type = type;
    this.required = required;
  }
}

async function getFormById(id) {
  return new Form();
}

export {Form, InputTypes, FormSection, getFormById}
