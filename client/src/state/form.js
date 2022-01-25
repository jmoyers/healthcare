import camelcase from "camelcase";
import { v4 as uuid } from "uuid";

class Form {
  constructor() {
    this.id = uuid();
    this.owner = uuid();
    this.created = new Date();

    this.title = "Sunrise Medical Patient Intake";
    this.description = `Please fill in all information as accurately as possible. The 
       information you provide will assist in formulating a complete
       health profile. All answers are confidential`;

    this.sections = [
      new FormSection("First Name", InputTypes.ShortAnswer, true),
      new FormSection("Last Name", InputTypes.ShortAnswer, true),
      new FormSection(
        "What is your reason for visit today?",
        InputTypes.Paragraph,
        true
      ),
      new FormSection(
        "Please select your preferred language:",
        InputTypes.Dropdown,
        true,
        ["English", "Spanish"]
      ),
      new FormSection(
        "Please enter a desired date for your visit:",
        InputTypes.DateTime,
        true
      ),
      new FormSection(
        "Please indicate any conditions that you have had or currently have:",
        InputTypes.Checkbox,
        true,
        [
          "headaches/migraine",
          "allergies/sensitivities",
          "arthirtis/tendonitis",
          "cancer/tumors",
        ]
      ),
    ];
  }
}

const InputTypes = {
  ShortAnswer: "SHORT_ANSWER",
  Paragraph: "PARAGRAPH",
  Checkbox: "CHECKBOX",
  CheckboxGroup: "CHECKBOX_GROUP",
  Dropdown: "DROPDOWN",
  DateTime: "DATETIME",
};

class FormSection {
  constructor(title, type, required, options = [], id = false) {
    this.title = title;
    this.type = type;
    this.required = required;
    this.options = options;
    this.id = !id ? camelcase(title).substring(0, 10) : id;
  }
}

async function getFormById(id) {
  return new Form();
}

export { Form, InputTypes, FormSection, getFormById };
