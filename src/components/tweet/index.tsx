import { TweetDocument } from "../timeline";
import * as S from "./style";

const Tweet = ({ username, downloadUrl, tweet }: TweetDocument) => {
  return (
    <S.Wrapper>
      <S.Column>
        <S.Username>{username}</S.Username>
        <S.Payload>{tweet}</S.Payload>
      </S.Column>
      {downloadUrl ? (
        <S.Column>
          <S.Media src={downloadUrl} />
        </S.Column>
      ) : null}
    </S.Wrapper>
  );
};

export default Tweet;
