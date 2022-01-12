
import { v4 as uuid } from 'uuid';

class Form {
  id: string;
  owner: string;
  created: Date;

  title: string;
  description: string;
  sections: Array<FormSection>;

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
      new FormSection("First Name", FormSectionType.ShortAnswer, true)
    ];
  }
}

enum FormSectionType {
  ShortAnswer = "SHORT_ANSWER",
  Paragraph = "PARAGRAPH",
  Checkbox = "CHECKBOX",
  Dropdown = "DROPDOWN",
  DateInput = "DATE_INPUT",
  Time = "TIME"
}

class FormSection {
  title: string;
  type: FormSectionType;
  required: boolean;
  
  constructor(title: string, type: FormSectionType, required: boolean) {
    this.title = title;
    this.type = type;
    this.required = required;
  }
}

async function getFormById(id: string) : Promise<Form> {
  return new Form();
}

export {Form, FormSectionType, FormSection, getFormById}
