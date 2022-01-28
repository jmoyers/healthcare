import { useResponses, useResponseDelete } from "./hooks/response";
import { useNavigate } from "react-router-dom";

import List from "./List";
import ResponseRowCell from "./ResponseRowCell";

const ResponseList = () => {
  let { status, data: responses } = useResponses();

  const navigate = useNavigate();

  const { mutate: deleteResponse } = useResponseDelete();

  const onViewClick = (id) => {
    navigate(`/response/${id}`);
  };

  const onDeleteClick = (id) => {
    deleteResponse(id);
  };

  const props = {
    title: "All Responses",
    items: responses,
    rowActions: [
      {
        name: "View",
        icon: "docs",
        type: "primary",
        onClick: onViewClick,
      },
      {
        name: "Delete",
        icon: "trash",
        type: "danger",
        onClick: onDeleteClick,
      },
    ],
    RowCell: ResponseRowCell,
    emptyMessage: "Your forms do not have any responses yet",
  };

  return status === "success" ? <List {...props} /> : null;
};

export default ResponseList;
