import Image from "next/image";
import { useState } from "react";
import Text from "./language/Text";
import defaultProfileImg from "@/images/default-profile-img.png";
import EyeIcon from "@/images/eye-solid.svg";
import EyeSlashIcon from "@/images/eye-slash-solid.svg";

const UserCard = ({
  userData: { uid, username, fullName, profileImg },
  removeUserFromExceptionList,
  addUserToExceptionList,
  exception,
}: {
  userData: {
    uid: string;
    username: string;
    fullName: string;
    profileImg: string;
  };
  removeUserFromExceptionList: (targetUid: string) => void;
  addUserToExceptionList: (targetUserData: {
    uid: string;
    username: string;
    fullName: string;
    profileImg: string;
  }) => void;
  exception: boolean;
}) => {
  const [profileImgSrc, setProfileImgSrc] = useState<string>(
    profileImg || defaultProfileImg.src
  );

  const addToExceptionList = () => {
    addUserToExceptionList({ uid, username, fullName, profileImg });
  };

  const removeFromExceptionList = () => {
    removeUserFromExceptionList(uid);
  };

  return (
    <li key={uid} className="relative text-balance border rounded">
      <button
        onClick={exception ? removeFromExceptionList : addToExceptionList}
        className="group absolute w-5 h-5 right-2 top-2 z-30"
      >
        {exception ? (
          <Image
            className="opacity-50 group-hover:opacity-70"
            src={EyeIcon}
            alt="Add To Exception List"
          />
        ) : (
          <Image
            className="opacity-50 group-hover:opacity-70"
            src={EyeSlashIcon}
            alt="Remove From Exception List"
          />
        )}
        <div className="absolute px-2 py-1 text-sm font-semibold translate-x-[-50%] left-[50%] pointer-events-none w-fit whitespace-nowrap bg-[#efefef] shadow text-black rounded transition-all opacity-0 bottom-0 group-hover:bottom-[120%] group-hover:opacity-100">
          {exception ? (
            <Text keyword="removeFromException" />
          ) : (
            <Text keyword="addToException" />
          )}
        </div>
      </button>
      <a
        href={`https://instagram.com/${username}`}
        target="_blank"
        className="relative xs:block flex items-center p-4"
      >
        <Image
          className="rounded-full shrink-0 overflow-hidden xs:m-[25px] m-[12px] xs:w-[100px] xs:h-[100px]"
          src={profileImgSrc}
          width={100}
          height={100}
          alt={`${username}'s profile image.`}
          onError={() => {
            setProfileImgSrc(defaultProfileImg.src);
          }}
        />
        <div className="xs:w-[150px] xs:mt-2 m-auto h-[50px] flex flex-col">
          <div className="text-center break-keep">
            <div className="font-semibold overflow-hidden text-ellipsis xs:whitespace-nowrap">
              {username}
            </div>
            <div className="font-semibold text-sm text-gray-500 overflow-hidden text-ellipsis xs:whitespace-nowrap">
              {fullName}
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default UserCard;
