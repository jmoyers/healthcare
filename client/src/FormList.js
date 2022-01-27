import { useForms, useFormDelete, useFormCreate } from "./hooks/form";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import copy from "clipboard-copy";

import style from "./FormList.module.scss";
import cx from "classnames";

import Button from "./Button";

const FormList = () => {
  const { status, data: forms } = useForms();
  const navigate = useNavigate();
  const { mutate: deleteForm } = useFormDelete();
  const { mutate: createForm } = useFormCreate();

  const onLinkClick = async (id) => {
    await copy(
      `${window.location.protocol}//${window.location.host}/respond/${id}/new`
    );
  };

  const onResponsesClick = (id) => {
    navigate(`/form/${id}/responses`);
  };

  const onEditClick = (id) => {
    navigate(`/form/${id}/edit`);
  };

  const onDeleteClick = (id) => {
    deleteForm(id);
  };

  const onCreateFormClick = () => {
    createForm(
      {
        id: nanoid(),
        title: "A new form",
        description: "A new form description",
        sections: [],
      },
      {
        onSuccess: (res) => {
          console.log("success", res.data);
          navigate(`/form/${res.data.id}/edit`);
        },
      }
    );
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
                <Button icon="users" onClick={() => onLinkClick(form.id)}>
                  Link
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
      <div className={style.controlsContainer}>
        <Button type="primary" icon="plus" onClick={onCreateFormClick}>
          Create New Form
        </Button>
      </div>
    </div>
  );
};

export default FormList;
