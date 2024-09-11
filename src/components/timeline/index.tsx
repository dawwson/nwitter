import { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import * as S from "./style";
import { db } from "../../configs/firebase";
import Tweet from "../tweet";
import { Unsubscribe } from "firebase/auth";

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

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      // NOTE: query에 이벤트 리스너를 등록하여 업데이트된 collection을 실시간으로 가져온다.
      unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
        const tweets: TweetDocument[] = snapshot.docs.map((doc) => {
          const { tweet, userId, username, downloadUrl, createdAt } =
            doc.data();

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
      });
    };

    fetchTweets();

    // cleanup : 이벤트 리스너 구독 취소
    return () => unsubscribe && unsubscribe();
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
