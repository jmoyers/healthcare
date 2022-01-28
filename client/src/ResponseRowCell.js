import style from "./ResponseRowCell.module.scss";
import cx from "classnames";

const ResponseRowCell = (props) => {
  const { item } = props;
  return (
    <div className={cx(style.cell, style.title)}>
      <i className={cx(style.itemIcon, "icon-list")}></i>
      <div>
        <div className={style.fromForm}>
          <span className={style.itemFormTitle}>Form</span>: {item.title}
        </div>
        <div className={style.sectionsContainer}>
          {item.sections
            .slice(0, 3)
            .filter((section) => section.type !== "HEADER")
            .map((section) => (
              <div className={style.sectionContainer} key={section.id}>
                <span className={style.itemFormTitle}>{section.title}</span>:{" "}
                {section.answer}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResponseRowCell;
