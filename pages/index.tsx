import type { NextPage } from "next";
import Main from "../components/Main";
import NavWrapper from "../components/nav/NavWrapper";

const Home: NextPage = () => {
  return (
    <NavWrapper>
      <Main />
    </NavWrapper>
  );
};

export default Home;
