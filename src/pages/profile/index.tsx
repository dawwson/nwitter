import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

import * as S from "./style";
import { auth, storage } from "../../configs/firebase";

const Profile = () => {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);

  const handleOnChangeAvatar = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;

    if (!user) {
      return;
    }

    if (files?.length === 1) {
      // 1. 아바타 이미지 업로드
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user.uid}`);
      const result = await uploadBytes(locationRef, file);
      // 2. 사용자 정보 업데이트
      const avatarUrl = await getDownloadURL(result.ref);
      await updateProfile(user, { photoURL: avatarUrl });

      setAvatar(avatarUrl);
    }
  };

  return (
    <S.Wrapper>
      <S.AvatarUpload htmlFor="avatar">
        {avatar ? (
          <S.AvatarImg src={avatar} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </S.AvatarUpload>
      <S.AvatarInput
        id="avatar"
        type="file"
        accept="image/*"
        onChange={handleOnChangeAvatar}
      />
      <S.Name>{user?.displayName ?? "Anonymous"}</S.Name>
    </S.Wrapper>
  );
};

export default Profile;
