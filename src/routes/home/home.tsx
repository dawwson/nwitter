import { auth } from "../../configs/firebase";

const Home = () => {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <h1>
      <button onClick={signOut}>SIGN OUT</button>
    </h1>
  );
};

export default Home;
