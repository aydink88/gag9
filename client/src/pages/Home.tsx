import { FC } from "react";

import Posts from "../containers/Posts";
import Header from "../containers/Header";
import Footer from "../containers/Footer";

const Home: FC = () => {
  return (
    <>
      <Header />
      <Posts />
      <Footer />
    </>
  );
};

export default Home;
