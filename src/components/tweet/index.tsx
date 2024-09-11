import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import * as S from "./style";
import { auth, db, storage } from "../../configs/firebase";
import { TweetDocument } from "../timeline";
import Modal from "../modal";

const Tweet = ({ id, userId, username, downloadUrl, tweet }: TweetDocument) => {
  const [isOpen, setIsOpen] = useState(false);

  const user = auth.currentUser;

  const handleOnDelete = async () => {
    if (user?.uid !== userId) {
      return;
    }

    try {
      // 1. docuement 삭제
      await deleteDoc(doc(db, "tweets", id));

      // 2. storage 파일 삭제
      if (downloadUrl) {
        const mediaRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(mediaRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.Column>
          <S.Username>{username}</S.Username>
          <S.Payload>{tweet}</S.Payload>
          {user?.uid === userId ? (
            <S.DeleteButton onClick={() => setIsOpen(true)}>
              Delete
            </S.DeleteButton>
          ) : null}
        </S.Column>
        {downloadUrl ? (
          <S.Column>
            <S.Media src={downloadUrl} />
          </S.Column>
        ) : null}
      </S.Wrapper>
      {isOpen && (
        <Modal
          type="success"
          title="Delete tweet"
          buttons={[
            {
              name: "Cancel",
              location: "left",
              onClick: () => setIsOpen(false),
            },
            {
              name: "Delete",
              location: "right",
              onClick: handleOnDelete,
            },
          ]}
        >
          <p>Are you sure you want to delete this tweet?</p>
        </Modal>
      )}
    </>
  );
};

export default Tweet;
