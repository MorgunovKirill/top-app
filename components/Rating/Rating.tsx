import { RatingProps } from "./Rating.props";
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
} from "react";
import styles from "./Rating.module.css";
import cn from "classnames";
import StarIcon from "./star.svg";

export const Rating = forwardRef(
  (
    { isEditable = false, error, rating, setRating, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    useEffect(() => {
      constructRating(rating);
    }, [rating]);

    const changeDisplay = (i: number) => {
      if (!isEditable) return;

      constructRating(i);
    };

    const onClick = (i: number) => {
      if (!isEditable || !setRating) return;
      setRating(i);
    };

    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
      if (e.code !== "Space" || !setRating) return;
      setRating(i);
    };

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}
          >
            <StarIcon
              onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                isEditable && handleSpace(i + 1, e)
              }
              tabIndex={isEditable ? 0 : -1}
            />
          </span>
        );
      });
      setRatingArray(updatedArray);
    };

    return (
      <div
        ref={ref}
        {...props}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
