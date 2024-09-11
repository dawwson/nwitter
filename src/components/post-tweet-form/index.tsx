import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import * as S from "./style";
import { auth, db } from "../../configs/firebase";

const PostTweetForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleOnTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const handleOnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files?.length === 1) {
      setFile(files[0]);
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user || isLoading || tweet === "" || tweet.length > 180) {
      return;
    }

    try {
      setIsLoading(true);
      await addDoc(collection(db, "tweets"), {
        tweet,
        username: user.displayName || "Anonymous",
        userId: user.uid,
        createdAt: Date.now(),
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Form onSubmit={handleOnSubmit}>
      <S.TextArea
        rows={5}
        maxLength={180}
        value={tweet}
        placeholder="What is happening?"
        onChange={handleOnTextChange}
      />
      <S.AttachFileButton htmlFor="file">
        {file ? "✅ Photo added!" : "Add photo"}
      </S.AttachFileButton>
      <S.AttachFileInput
        id="file"
        type="file"
        accept="image/*"
        onChange={handleOnFileChange}
      />
      <S.SubmitButton
        type="submit"
        value={isLoading ? "Posting..." : "Post tweet"}
      />
    </S.Form>
  );
};

export default PostTweetForm;
