import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";
import cn from "classnames";
import { Input, Rating, Textarea, Button } from "../index";
import CloseIcon from "./cross.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm } from "./ReviewForm.interface";

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewForm>();
  const onSubmit = (data: IReviewForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Заполните имя" },
          })}
          error={errors.name}
          placeholder="Имя"
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Заполните заголовок" },
          })}
          error={errors.title}
          placeholder="Заголовок отзыва"
          className={styles.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: "Укажите рейтинг" } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          {...register("description", {
            required: { value: true, message: "Заполните текст отзыва" },
          })}
          placeholder="Текст отзыва"
          error={errors.description}
          className={styles.description}
        />
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div className={styles.successDescription}>
          Спасибо, Ваш отзыв будет размещён после проверки
          <CloseIcon className={styles.close} />
        </div>
      </div>
    </form>
  );
};
