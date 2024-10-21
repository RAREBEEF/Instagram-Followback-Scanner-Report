"use client";

import { Fragment, useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import Text from "@/components/language/Text";
import spinnerIcon from "@/icons/spinner-solid.svg";
import Image from "next/image";

const Home = () => {
  const [waitForExtension, setWaitForExtension] = useState<boolean>(false);
  const [showReloadBtn, setShowReloadBtn] = useState<boolean>(false);
  const [startExpiredTimer, setStartExpiredTimer] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
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

  useEffect(() => {
    const waitForExtension = setTimeout(() => {
      setWaitForExtension(true);
    }, 1000);

    return () => {
      clearTimeout(waitForExtension);
    };
  }, []);

  // 메세지 핸들러
  useEffect(() => {
    const receiveMessage = async (e: MessageEvent) => {
      if (e.origin !== window.location.origin) {
        return;
      }

      const {
        data: { key, data },
      } = e;

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
    if (!waitForExtension) return;

    if (!didNotFollowbackList) {
      window.postMessage(
        { key: "requestDidNotFollowBack", data: null },
        window.location.origin
      );
    } else if (!exceptionList && reportUid) {
      window.postMessage(
        { key: "requestExceptionList", data: { uid: reportUid } },
        window.location.origin
      );
    }
  }, [waitForExtension, didNotFollowbackList, exceptionList, reportUid]);

  // 모든 목록을 받아온 후, 맞팔 목록에서 예외 유저를 빼고 상태에 저장
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
      window.location.origin
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
      window.location.origin
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
      window.location.origin
    );
    // 상태 업데이트
    setExceptionList((prev) =>
      prev ? prev.filter((user) => user.uid !== targetUid) : null
    );
  };

  useEffect(() => {
    const reloadTimer = setTimeout(() => {
      setShowReloadBtn(true);
    }, 5000);

    return () => {
      clearTimeout(reloadTimer);
    };
  }, []);

  // 리로드 버튼(익스텐션이 로드되기 전에 전송되어 요청이 씹혔을 때 재요청하기 위함)
  const onReload = () => {
    setWaitForExtension(true);
    window.postMessage(
      { key: "requestDidNotFollowBack", data: null },
      window.location.origin
    );
    setShowReloadBtn(false);
    setStartExpiredTimer(true);
  };

  useEffect(() => {
    if (!startExpiredTimer) return;

    const expiredTimer = setTimeout(() => {
      setExpired(true);
    }, 5000);

    return () => {
      clearTimeout(expiredTimer);
    };
  }, [startExpiredTimer]);

  return (
    <div className=" grow flex flex-col w-full">
      <h2 className="text-2xl pt-4 pb-8 text-center">SCAN REPORT</h2>
      <div className="grow flex flex-col justify-center">
        {/* 리포트가 준비 완료된 경우 */}
        {didNotFollowbackWithoutException && reportUid ? (
          <div className="flex w-full grow flex-col gap-6 items-center">
            <details className="w-full">
              <summary className="underline w-fit cursor-pointer">
                <Text keyword="exceptionList" />
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
                  <div className="text-gray-500">
                    <Text keyword="empty" />
                  </div>
                )}
              </ul>
            </details>
            <details className="w-full" open={true}>
              <summary className="underline w-fit cursor-pointer">
                <Text keyword="didNotFollowBackList" />
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
                  <div className="text-gray-500">
                    <Text keyword="empty" />
                  </div>
                )}
              </ul>
            </details>
          </div>
        ) : // 스캔 기록이 없는 경우
        didNotFollowbackList ? (
          <div>
            <Text keyword="scanFirst" /> <br />
          </div>
        ) : (
          <div className="grow flex flex-col gap-8 justify-center items-center">
            {expired ? (
              <div>
                <Text keyword="unableToConnect" />
                <br />
                <Text keyword="checkInstalled" />
              </div>
            ) : (
              <Fragment>
                <div className="w-[30%] animate-spin opacity-50 select-none max-w-[300px]">
                  <Image src={spinnerIcon} alt="loading..." />
                </div>
                <button
                  onClick={onReload}
                  className={`underline text-[gray] ${
                    showReloadBtn ? "visible" : "invisible"
                  }`}
                >
                  <Text keyword="reload" />
                </button>
              </Fragment>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
