import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import * as S from "./style";
import { db } from "../../configs/firebase";
import Tweet from "../tweet";

export interface TweetDocument {
  id: string;
  tweet: string;
  userId: string;
  username: string;
  downloadUrl: string;
  createdAt: number;
}

const Timeline = () => {
  const [tweets, setTweets] = useState<TweetDocument[]>([]);
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(tweetsQuery);
    const tweets: TweetDocument[] = snapshot.docs.map((doc) => {
      const { tweet, userId, username, downloadUrl, createdAt } = doc.data();
      return {
        id: doc.id,
        tweet,
        userId,
        username,
        downloadUrl,
        createdAt,
      };
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <S.Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </S.Wrapper>
  );
};

export default Timeline;
