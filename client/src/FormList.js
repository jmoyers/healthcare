import { useForms, useFormDelete, useFormCreate } from "./hooks/form";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import copy from "clipboard-copy";

import FormRowCell from "./FormRowCell";
import List from "./List";

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

  const onPreviewClick = (id) => {
    navigate(`/preview/${id}`);
  };

  const props = {
    title: "Forms",
    items: forms,
    tabBarActions: [
      {
        name: "New Form",
        icon: "plus",
        onClick: onCreateFormClick,
      },
    ],
    rowActions: [
      {
        name: "Link",
        icon: "link",
        onClick: onLinkClick,
      },
      {
        name: "Preview",
        icon: "list",
        onClick: onPreviewClick,
      },
      {
        name: "Edit",
        icon: "cog",
        type: "secondary",
        onClick: onEditClick,
      },
      {
        name: "Delete",
        icon: "trash",
        type: "danger",
        onClick: onDeleteClick,
      },
    ],
    RowCell: FormRowCell,
    emptyMessage: "You have not created any forms yet.",
  };

  return status === "success" ? <List {...props} /> : null;
};

export default FormList;
