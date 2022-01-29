import React from "react";
import style from "./ViewResponse.module.scss";
import cx from "classnames";

import FormInput from "./FormInput";

import { useResponse, useResponseUpdate } from "./hooks/response";
import { useNavigate, useParams } from "react-router-dom";
import TabBar from "./TabBar";

const ViewResponse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { status, data: response } = useResponse(id);
  const { mutate: updateReponse } = useResponseUpdate(id);

  const onAnswerChange = (newSection, answer) => {
    console.log(newSection, answer);

    const newResponse = JSON.parse(JSON.stringify(response));

    for (const [i, section] of response.sections.entries()) {
      if (section.id === newSection.id) {
        newResponse.sections[i].answer = answer;
      }
    }

    updateReponse(newResponse);
  };

  const tabBarActions = [
    {
      name: "Done",
      icon: "check",
      onClick: () => navigate(`/forms/${id}/thankyou`),
    },
  ];

  return (
    <div className={cx("medscribe", style.container)}>
      {status === "success" && (
        <div className={style.intake}>
          <div className={style.titleContainer}>
            <h1 className={style.title}>{response.title}</h1>
          </div>
          <div className={style.descriptionContainer}>
            <div className={style.description}>{response.description}</div>
          </div>
          <div className={style.sectionsContainer}>
            {response.sections.map((section) => (
              <FormInput
                section={section}
                onAnswerChange={onAnswerChange}
                key={section.id}
              />
            ))}
          </div>
        </div>
      )}
      <TabBar actions={tabBarActions} />
    </div>
  );
};

export default ViewResponse;
