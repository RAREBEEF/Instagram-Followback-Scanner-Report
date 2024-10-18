import MenuIcon from "@/icons/ellipsis-solid.svg";
import CloseIcon from "@/icons/xmark-solid.svg";
import Image from "next/image";
import { Fragment, MouseEvent, useState } from "react";
import Text from "./language/Text";

const UserCard = ({
  userData: { uid, username, fullName, profileImg },
  removeUserFromExceptionList,
  removeUserFromList,
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
  removeUserFromList: (uid: string) => void;
  addUserToExceptionList: (targetUserData: {
    uid: string;
    username: string;
    fullName: string;
    profileImg: string;
  }) => void;
  exception: boolean;
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const toggleCardFrontBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowMenu((prev) => !prev);
  };

  const removeFromList = () => {
    removeUserFromList(uid);
  };

  const addToExceptionList = () => {
    addUserToExceptionList({ uid, username, fullName, profileImg });
  };

  const removeFromExceptionList = () => {
    removeUserFromExceptionList(uid);
  };

  return (
    <li key={uid} className="relative p-4 border rounded overflow-hidden">
      <button
        onClick={toggleCardFrontBack}
        className="group absolute w-5 h-5 right-3 top-2 z-30"
      >
        {showMenu ? (
          <Image
            className="opacity-50 group-hover:opacity-70"
            src={CloseIcon}
            alt="close menu"
          />
        ) : (
          <Image
            className="opacity-50 group-hover:opacity-70"
            src={MenuIcon}
            alt="open menu"
          />
        )}
      </button>
      <a
        href={`https://instagram.com/${username}`}
        target="_blank"
        className="relative block"
      >
        <Image
          className="rounded-full overflow-hidden m-[25px]"
          src={profileImg}
          width={100}
          height={100}
          alt={`${username}'s profile image.`}
        />
        <div className="w-[150px] mt-2 h-[50px] flex flex-col">
          <div className="text-center break-keep">
            <div className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              {username}
            </div>
            <div className="font-semibold text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
              {fullName}
            </div>
          </div>
        </div>
      </a>

      <div
        className={`absolute w-full h-full m-auto right-0 left-0 transition-all  ${
          showMenu ? "bottom-0" : "bottom-[100%]"
        }`}
      >
        <div className="w-full z-10 h-full absolute top-0 left-0 bg-[white] "></div>

        <div className="flex z-20 flex-col pt-12 m-auto h-full w-full justify-center items-center">
          <a
            className="z-20 flex items-center gap-2 max-w-[150px]"
            href={`https://instagram.com/${username}`}
            target="_blank"
          >
            <Image
              className="rounded-full overflow-hidden"
              src={profileImg}
              width={30}
              height={30}
              alt={`${username}'s profile image.`}
            />
            <div className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              {username}
            </div>
          </a>

          <div className="relative z-20 flex flex-col gap-2 w-full h-full items-center justify-center">
            {exception ? (
              <button
                onClick={removeFromExceptionList}
                className="bg-[#0095f6] leading-tight max-w-[150px] opacity-100 text-sm rounded-lg px-2 py-1 text-white font-semibold hover:bg-[#1877f2]"
              >
                <Text keyword="removeFromException" />
              </button>
            ) : (
              <Fragment>
                <button
                  onClick={addToExceptionList}
                  className="bg-[#0095f6] leading-tight max-w-[150px] opacity-100 text-sm rounded-lg px-2 py-1 text-white font-semibold hover:bg-[#1877f2]"
                >
                  <Text keyword="addToException" />
                </button>
                <button
                  onClick={removeFromList}
                  className="bg-[#efefef] max-w-[150px] opacity-100 text-sm rounded-lg px-2 py-1 text-black font-semibold hover:bg-[#dbdbdb]"
                >
                  <Text keyword="removeFromList" />
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default UserCard;
