import * as S from "./style";
import PostTweetForm from "../../components/post-tweet-form";
import Timeline from "../../components/timeline";

const Home = () => {
  return (
    <S.Wrapper>
      <PostTweetForm />
      <Timeline />
    </S.Wrapper>
  );
};

export default Home;
