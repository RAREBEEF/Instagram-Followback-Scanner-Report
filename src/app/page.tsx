"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import LogoSvg from "@/icons/magnifying-glass-solid.svg";

const Home = () => {
  const [reportUid, setReportUid] = useState<string | null>(null);
  const [didNotFollowbackList, setDidNotFollowbackList] = useState<Array<{
    uid: string;
    username: string;
    fullName: string;
    profileImg: string;
  }> | null>(null);
  const [exceptionList, setExceptionList] = useState<Array<{
    uid: string;
    username: string;
    fullName: string;
    profileImg: string;
  }> | null>(null);
  const [
    didNotFollowbackWithoutException,
    setDidNotFollowbackWithoutException,
  ] = useState<Array<{
    uid: string;
    username: string;
    fullName: string;
    profileImg: string;
  }> | null>(null);
  const [extensionDisconnected, setExtensionDisconnected] =
    useState<boolean>(false);

  useEffect(() => {
    const receiveMessage = async (e: MessageEvent) => {
      if (e.origin !== window.location.origin) {
        return;
      }

      console.log(e.origin);

      const {
        data: { key, data },
      } = e;

      console.log("결과 팝업이 메새지를 수신함:", key);

      if (key === "didNotFollowBack") {
        console.table(data);
        setDidNotFollowbackList(data.didNotFollowBack || []);
        setReportUid(data.uid || "");
      } else if (key === "exceptionList") {
        console.table(data);
        setExceptionList(data || []);
      }
    };

    window.addEventListener("message", receiveMessage);
  }, [reportUid]);

  // 목록 요청하기
  useEffect(() => {
    if (!didNotFollowbackList) {
      window.postMessage({ key: "requestDidNotFollowBack", data: null }, "*");
    } else if (!exceptionList && reportUid) {
      window.postMessage(
        { key: "requestExceptionList", data: { uid: reportUid } },
        "*"
      );
    }
  }, [didNotFollowbackList, exceptionList, reportUid]);

  // 맞팔 안한 유저 목록에서 예외인 유저 제거
  useEffect(() => {
    if (!didNotFollowbackList || !exceptionList) return;

    const withoutException = didNotFollowbackList.filter(
      (user) => !exceptionList.some((exception) => user.uid === exception.uid)
    );

    setDidNotFollowbackWithoutException(withoutException);
  }, [didNotFollowbackList, exceptionList]);

  // 맞팔 안한 목록에서 유저 삭제
  const removeUserFromList = (uid: string) => {
    // 익스텐션에 삭제 요청 보내기
    window.postMessage(
      { key: "requestRemoveUserFromList", data: { target: uid } },
      "*"
    );
    // 상태 업데이트
    setDidNotFollowbackList((prev) =>
      prev ? prev.filter((user) => user.uid !== uid) : null
    );
  };

  // 예외 목록에 유저 추가
  const addUserToExceptionList = (targetUserData: {
    uid: string;
    username: string;
    fullName: string;
    profileImg: string;
  }) => {
    // 익스텐션에 추가 요청 보내기
    window.postMessage(
      {
        key: "requestAddUserToExceptionList",
        data: { uid: reportUid, target: targetUserData },
      },
      "*"
    );
    // 상태 업데이트
    setExceptionList((prev) =>
      prev ? [targetUserData, ...prev] : [targetUserData]
    );
  };

  // 예외 목록에서 유저 삭제
  const removeUserFromExceptionList = (targetUid: string) => {
    // 익스텐션에 삭제 요청 보내기
    window.postMessage(
      {
        key: "requestRemoveUserFromExceptionList",
        data: { uid: reportUid, target: targetUid },
      },
      "*"
    );
    // 상태 업데이트
    setExceptionList((prev) =>
      prev ? prev.filter((user) => user.uid !== targetUid) : null
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("통신 불가");
      setExtensionDisconnected(true);
    }, 3000);

    if (didNotFollowbackList) {
      clearTimeout(timeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [didNotFollowbackList]);

  return (
    <div className="flex flex-col justify-between items-center min-h-screen p-8 gap-2 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center w-fit sm:w-full">
        <h1 id="logo">
          <div id="logo--icon-wrapper">
            <Image src={LogoSvg} alt="" id="logo--icon"></Image>
          </div>
          <div id="logo--text">
            Instagram
            <br />
            Followback
            <br />
            Scanner
          </div>
        </h1>
      </header>

      {/* 리포트가 준비 완료된 경우 */}
      {didNotFollowbackWithoutException && reportUid ? (
        <main className="flex w-full grow flex-col gap-6 items-center">
          <h2 className="text-xl mt-8">SCAN REPORT</h2>
          <details className="w-full">
            <summary className="underline w-fit cursor-pointer">
              EXCEPTION LIST
            </summary>
            <ul className="flex flex-wrap justify-center gap-5 py-12">
              {exceptionList && exceptionList.length > 0 ? (
                exceptionList.map((user) => (
                  <UserCard
                    removeUserFromList={removeUserFromList}
                    addUserToExceptionList={addUserToExceptionList}
                    removeUserFromExceptionList={removeUserFromExceptionList}
                    userData={user}
                    key={user.uid}
                    exception={true}
                  />
                ))
              ) : (
                <div className="text-gray-500">EMPTY</div>
              )}
            </ul>
          </details>
          <details className="w-full" open={true}>
            <summary className="underline w-fit cursor-pointer">
              DID NOT FOLLOW BACK LIST
            </summary>
            <ul className="flex flex-wrap justify-center gap-5 py-12">
              {didNotFollowbackWithoutException.length > 0 ? (
                didNotFollowbackWithoutException.map((user) => (
                  <UserCard
                    removeUserFromList={removeUserFromList}
                    addUserToExceptionList={addUserToExceptionList}
                    removeUserFromExceptionList={removeUserFromExceptionList}
                    userData={user}
                    key={user.uid}
                    exception={false}
                  />
                ))
              ) : (
                <div className="text-gray-500">EMPTY</div>
              )}
            </ul>
          </details>
        </main>
      ) : // 스캔 기록이 없는 경우
      didNotFollowbackList ? (
        <div>
          You can check the report after scanning in the extension. <br />
        </div>
      ) : (
        // 로딩 중이거나 연결에 실패한 경우
        <main className="text-center">
          {/* TODO: 마켓 링크 연결하기 */}
          {extensionDisconnected ? (
            <div>
              Unable to connect to the extension.
              <br />
              Please make sure that the extension is installed.
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </main>
      )}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://rarebeef.co.kr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Developer Homepage
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Write a review →
        </a>
      </footer>
    </div>
  );
};

export default Home;
