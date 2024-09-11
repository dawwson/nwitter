import { useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import * as S from "./style";
import { auth, db, storage } from "../../configs/firebase";

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

    if (!user || isLoading || tweet.length > 180) {
      return;
    }

    try {
      setIsLoading(true);

      const docRef = await addDoc(collection(db, "tweets"), {
        tweet,
        username: user.displayName || "Anonymous",
        userId: user.uid,
        createdAt: Date.now(),
      });

      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${docRef.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const downloadUrl = await getDownloadURL(result.ref);
        await updateDoc(docRef, { downloadUrl });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setTweet("");
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
        disabled={tweet === "" && !file}
      />
    </S.Form>
  );
};

export default PostTweetForm;
