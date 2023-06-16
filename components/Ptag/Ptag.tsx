import { PtagProps } from "./Ptag.props";
import styles from "./Ptag.module.css";
import cn from "classnames";

export const Ptag = ({
  size = "M",
  className,
  children,
  ...props
}: PtagProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.s]: size === "S",
        [styles.m]: size === "M",
        [styles.l]: size === "L",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
