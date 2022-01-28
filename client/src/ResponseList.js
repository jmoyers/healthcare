import { useResponses, useResponseDelete } from "./hooks/response";
import { useNavigate } from "react-router-dom";

import style from "./ResponseList.module.scss";
import cx from "classnames";

import Button from "./Button";

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

  return (
    <div className={style.container}>
      <h1>All Responses</h1>
      <div className={style.table}>
        {status === "success" && responses.length === 0 && (
          <div className={style.emptyMessage}>
            Your forms do not have any responses yet.
          </div>
        )}

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
                  <div className={style.sectionsContainer}>
                    {response.sections
                      .slice(0, 3)
                      .filter((section) => section.type !== "HEADER")
                      .map((section) => (
                        <div className={style.sectionContainer}>
                          <span className={style.responseFormTitle}>
                            {section.title}
                          </span>
                          : {section.answer}
                        </div>
                      ))}
                  </div>
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
