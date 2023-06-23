import { useState } from "react";
import { Button, Htag, Ptag, Rating } from "../components";
import { Tag } from "../components/Tag/Tag";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { GetStaticProps } from "next";

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h3">Текст</Htag>
      <Button appearance="primary" arrow="down">
        Кнопка
      </Button>
      <Button appearance="primary" arrow="down">
        Кнопка
      </Button>
      <Button appearance="ghost" arrow="right">
        Кнопка
      </Button>
      <Ptag size="S">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima,
        tenetur!
      </Ptag>
      <Ptag>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima,
        tenetur!
      </Ptag>
      <Ptag size="L">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima,
        tenetur!
      </Ptag>
      <Tag size="M">TAG 1</Tag>
      <Tag color="red">TAG 2</Tag>
      <Tag size="S" color="primary">
        TAG 3
      </Tag>
      <Tag size="M" color="green" href="/ghost">
        TAG 4
      </Tag>
      <Tag size="M" color="grey">
        TAG 5
      </Tag>
      <Rating rating={rating} isEditable setRating={setRating}></Rating>
      <ul>
        {menu.map((m) => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))}
      </ul>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory,
    }
  );
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
