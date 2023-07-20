import styles from "./Advantages.module.css";
import cn from "classnames";
import { AdvantagesProps } from "./Advantages.props";
import CheckIcon from "./checkmark.svg";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <>
      <div>{advantages.length}</div>
      {advantages.map((a) => {
        <div key={a._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <div>{a.description}</div>
        </div>;
      })}
    </>
  );
};
