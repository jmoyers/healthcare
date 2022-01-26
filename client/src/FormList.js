import { useForms, useFormDelete } from "./hooks/form";
import { useNavigate } from "react-router-dom";

import style from "./FormList.module.scss";
import cx from "classnames";

import Button from "./Button";

const FormList = () => {
  const { status, data: forms } = useForms();
  const navigate = useNavigate();
  const { mutate } = useFormDelete();

  const onResponsesClick = (id) => {
    navigate(`/form/${id}/responses`);
  };

  const onEditClick = (id) => {
    navigate(`/form/${id}/edit`);
  };

  const onDeleteClick = (id) => {
    mutate(id);
  };

  return (
    <div className={style.container}>
      <div className={style.table}>
        {status === "success" &&
          forms.map((form) => (
            <div className={style.row} key={form.id}>
              <div className={cx(style.cell, style.title)}>
                <i className={cx(style.formIcon, "icon-folder")}></i>
                {form.title}
              </div>
              <div className={cx(style.cell, style.actions)}>
                <Button
                  icon="archive"
                  onClick={() => onResponsesClick(form.id)}
                >
                  Responses
                </Button>
                <Button
                  icon="cog"
                  type="secondary"
                  onClick={() => onEditClick(form.id)}
                >
                  Edit
                </Button>
                <Button
                  icon="trash"
                  type="danger"
                  onClick={() => onDeleteClick(form.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FormList;
