import { useResponses, useResponseDelete } from "./hooks/response";
import { useNavigate } from "react-router-dom";

import style from "./ResponseList.module.scss";
import cx from "classnames";

import Button from "./Button";

const ResponseList = () => {
  const { status, data: responses } = useResponses();

  const navigate = useNavigate();

  const { mutate: deleteResponse } = useResponseDelete();

  const onViewClick = (id) => {
    navigate(`/response/${id}`);
  };

  const onDeleteClick = (id) => {
    deleteResponse(id);
  };

  return (
    <div className={style.container}>
      <div className={style.table}>
        {status === "success" &&
          responses.map((response) => (
            <div className={style.row} key={response.id}>
              <div className={cx(style.cell, style.title)}>
                <i className={cx(style.responseIcon, "icon-list")}></i>
                <div>
                  <div className={style.fromForm}>
                    <span className={style.responseFormTitle}>Form</span>:{" "}
                    {response.title}
                  </div>
                  {response.sections[0] && (
                    <div className={style.firstSection}>
                      <span className={style.responseFormTitle}>
                        {response.sections[0].title}
                      </span>
                      : {response.sections[0].answer}
                    </div>
                  )}
                </div>
              </div>
              <div className={cx(style.cell, style.actions)}>
                <Button
                  icon="doc-text"
                  onClick={() => onViewClick(response.id)}
                >
                  View
                </Button>
                <Button
                  icon="trash"
                  type="danger"
                  onClick={() => onDeleteClick(response.id)}
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

export default ResponseList;
