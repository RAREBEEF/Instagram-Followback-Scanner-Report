"use client";

import { ChangeEvent, Fragment, useContext, useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import Text from "@/components/language/Text";
import spinnerIcon from "@/icons/spinner-solid.svg";
import Image from "next/image";
import { LanguageContext } from "@/components/language/LanguageProvider";

export interface UserData {
  uid: string;
  username: string;
  fullName: string;
  profileImg: string;
}

export interface ReportData {
  scanTarget: UserData;
  following: Array<UserData>;
  follower: Array<UserData>;
  unfollower: Array<UserData>;
  didNotFollowBack: Array<UserData>;
  scannedAt: number;
}

const Home = () => {
  const { lang } = useContext(LanguageContext);
  const [waitForExtension, setWaitForExtension] = useState<boolean>(false);
  const [showReloadBtn, setShowReloadBtn] = useState<boolean>(false);
  const [startExpiredTimer, setStartExpiredTimer] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [reportUid, setReportUid] = useState<string | null>(null);
  const [scanReportList, setScanReportList] = useState<
    { [uid in string]: ReportData } | null
  >(null);
  const [exceptionList, setExceptionList] = useState<
    { [key in string]: Array<UserData> } | null
  >(null);
  const [sortedReportList, setSortedReportList] =
    useState<Array<ReportData> | null>(null);

  // 메세지 핸들러
  useEffect(() => {
    const receiveMessage = async (e: MessageEvent) => {
      if (e.origin !== window.location.origin) {
        return;
      }

      const {
        data: { key, data },
      } = e;

      // console.log(key);

      if (key === "scanReportList") {
        // console.log(data);
        setScanReportList(data || {});
      } else if (key === "exceptionList") {
        // console.log(data);
        setExceptionList(data || []);
      }
    };

    window.addEventListener("message", receiveMessage);

    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);

  // 목록 요청하기
  useEffect(() => {
    if (!waitForExtension) return;

    if (scanReportList === null) {
      window.postMessage(
        { key: "requestScanReportList", data: null },
        window.location.origin
      );
    }
    if (exceptionList === null) {
      window.postMessage(
        { key: "requestExceptionList", data: null },
        window.location.origin
      );
    }
  }, [exceptionList, scanReportList, waitForExtension]);

  // 보고서 목록을 스캔 시점 내림차순 정렬 및 가장 최근 보고서 출력 준비
  useEffect(() => {
    if (
      !scanReportList ||
      Object.keys(scanReportList).length === 0 ||
      reportUid
    )
      return;

    // console.log(scanReportList);

    // 스캔 시점 내림차순 정렬
    const reportsArr = Object.values(scanReportList);
    const sortedByScannedAt = reportsArr.sort((a, b) => {
      return b.scannedAt - a.scannedAt;
    });
    setSortedReportList(sortedByScannedAt);
    setReportUid(sortedByScannedAt[0].scanTarget.uid);
  }, [scanReportList, reportUid]);

  // 선택한 보고서가 변경되면 해당 보고서 출력 준비
  const onReportChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // if (scanReportList) {
    //   console.log(scanReportList[e.target.value]);
    // }
    setReportUid(e.target.value);
  };

  // 예외 목록에 유저 추가
  const addUserToExceptionList = (targetUserData: UserData) => {
    // 익스텐션에 추가 요청 보내기
    window.postMessage(
      {
        key: "requestAddUserToExceptionList",
        data: { reportUid, target: targetUserData },
      },
      window.location.origin
    );

    // 맞팔 안한 목록에서 대상 유저 삭제
    setScanReportList((prev) => {
      if (!prev || !reportUid) return null;

      const newList = { ...prev };
      const newTargetReport = { ...newList[reportUid] };
      const newDidNotFollowBack = [...newTargetReport.didNotFollowBack];

      const targetUserIndex = newDidNotFollowBack.findIndex(
        (user) => user.uid === targetUserData.uid
      );

      newDidNotFollowBack.splice(targetUserIndex, 1);

      newTargetReport.didNotFollowBack = newDidNotFollowBack;
      newList[reportUid] = newTargetReport;

      return newList;
    });

    // 예외 목록에 대상 유저 추가
    setExceptionList((prev) => {
      if (!prev) return null;
      const newList = { ...prev };

      if (!reportUid) {
        return newList;
      } else if (!newList[reportUid]) {
        newList[reportUid] = [targetUserData];
      } else {
        newList[reportUid] = [targetUserData, ...newList[reportUid]];
      }

      return newList;
    });
  };

  // 예외 목록에서 유저 삭제
  const removeUserFromExceptionList = (targetUid: string) => {
    // 익스텐션에 삭제 요청 보내기
    window.postMessage(
      {
        key: "requestRemoveUserFromExceptionList",
        data: { reportUid, target: targetUid },
      },
      window.location.origin
    );

    // 예외 목록에서 대상 삭제
    setExceptionList((prev) => {
      if (!prev || !reportUid) return null;
      const newList = { ...prev };
      const newTargetException = [...newList[reportUid]];

      if (!reportUid) {
        return newList;
      } else if (!newList[reportUid]) {
        newList[reportUid] = [];
      } else {
        const targetUserIndex = newTargetException.findIndex(
          (user) => user.uid === targetUid
        );
        newTargetException.splice(targetUserIndex, 1);
      }

      newList[reportUid] = newTargetException;
      return newList;
    });

    // 맞팔 안한 유저 목록에 대상 유저 추가
    setScanReportList((prev) => {
      if (!prev || !reportUid) return prev;

      const newList = { ...prev };
      const newTargetReport = { ...newList[reportUid] };

      const targetUserData = prev[reportUid].following.find(
        (user) => user.uid === targetUid
      );

      if (targetUserData) {
        newTargetReport.didNotFollowBack = [
          targetUserData,
          ...newTargetReport.didNotFollowBack,
        ];
      }
      newList[reportUid] = newTargetReport;

      return newList;
    });
  };

  // 검사 결과 삭제
  const deleteScanReport = () => {
    if (!reportUid) return;

    window.postMessage(
      {
        key: "requestDeleteScanReport",
        data: { reportUid },
      },
      window.location.origin
    );

    setReportUid(null);
    setScanReportList((prev) => {
      if (!prev || !reportUid) return null;

      const newList = { ...prev };

      delete newList[reportUid];

      return newList;
    });
  };

  // 익스텐션 준비시간
  useEffect(() => {
    const waitForExtension = setTimeout(() => {
      setWaitForExtension(true);
    }, 1000);

    return () => {
      clearTimeout(waitForExtension);
    };
  }, []);

  // 리로드 버튼 출력 타이머
  useEffect(() => {
    const reloadTimer = setTimeout(() => {
      setShowReloadBtn(true);
    }, 5000);

    return () => {
      clearTimeout(reloadTimer);
    };
  }, []);

  // 리로드 버튼 클릭(리로드 및 만료 타이머 시작)
  const onReload = () => {
    setWaitForExtension(true);
    window.postMessage(
      { key: "requestScanReportList", data: null },
      window.location.origin
    );
    setShowReloadBtn(false);
    setStartExpiredTimer(true);
  };

  // 만료
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
    <div className=" grow flex flex-col w-full break-keep">
      <h2 className="text-2xl pt-4 pb-4 text-center">SCAN REPORT</h2>
      {sortedReportList && reportUid && (
        <select
          className="w-fit m-auto mb-8 border rounded text-lg"
          onChange={onReportChange}
          value={reportUid}
        >
          {sortedReportList?.map((report) => (
            <option value={report.scanTarget.uid} key={report.scanTarget.uid}>
              {report.scanTarget.username}
            </option>
          ))}
        </select>
      )}
      {scanReportList && reportUid && (
        <div className="w-full text-sm text-[gray] text-end">
          <Text keyword="scannedAt" />:{" "}
          {new Date(scanReportList[reportUid].scannedAt).toLocaleString(
            lang || ""
          )}
        </div>
      )}
      {scanReportList && reportUid && (
        <div className="mb-8 mt-4 w-full text-end">
          <button
            className="w-fit font-semibold bg-[firebrick] text-xs rounded px-2 py-1 text-white hover:bg-[darkred]"
            onClick={deleteScanReport}
          >
            <Text keyword="deleteReport" />
          </button>
        </div>
      )}
      <div className="grow flex flex-col justify-center">
        {/* 리포트가 준비 완료된 경우 */}
        {scanReportList && exceptionList && reportUid ? (
          <div className="flex w-full grow flex-col gap-6 items-center">
            {/* 예외 목록 */}
            <details className="w-full" open={false}>
              <summary className="w-fit cursor-pointer">
                <Text keyword="exceptionList" /> (
                {exceptionList[reportUid]?.length.toLocaleString() || 0})
              </summary>
              <p className="text-sm text-[gray] ml-4">
                <Text keyword="exceptionListDesc" />
              </p>
              {exceptionList[reportUid]?.length > 0 ? (
                <ul className="py-12 flex flex-col xs:grid xs:grid-cols-[repeat(auto-fill,_182px)] gap-4 justify-center">
                  {exceptionList[reportUid].map((user, i) => (
                    <UserCard
                      addUserToExceptionList={addUserToExceptionList}
                      removeUserFromExceptionList={removeUserFromExceptionList}
                      userData={user}
                      key={user.uid + i}
                      exception={true}
                    />
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 flex items-center justify-center h-[150px] ">
                  <Text keyword="empty" />
                </div>
              )}
            </details>
            {/* 팔취 목록 */}
            <details className="w-full" open={true}>
              <summary className="w-fit cursor-pointer">
                <Text keyword="unfollower" /> (
                {Array.isArray(scanReportList[reportUid].unfollower)
                  ? scanReportList[
                      reportUid
                    ].unfollower.length.toLocaleString() || 0
                  : 0}
                )
              </summary>
              <p className="text-sm text-[gray] ml-4">
                <Text keyword="unfollowerDesc" /> <br />
                <Text keyword="unfollowerDesc2" />
              </p>

              {Array.isArray(scanReportList[reportUid].unfollower) &&
              scanReportList[reportUid].unfollower.length > 0 ? (
                <ul className="py-12 flex flex-col xs:grid xs:grid-cols-[repeat(auto-fill,_182px)] gap-4 justify-center">
                  {scanReportList[reportUid].unfollower.map((user) => (
                    <UserCard
                      addUserToExceptionList={addUserToExceptionList}
                      removeUserFromExceptionList={removeUserFromExceptionList}
                      userData={user}
                      key={user.uid}
                      exception={true}
                    />
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 flex items-center justify-center h-[150px] ">
                  <Text keyword="empty" />
                </div>
              )}
            </details>
            {/* 맞팔 안한 목록 */}
            <details className="w-full" open={true}>
              <summary className="w-fit cursor-pointer">
                <Text keyword="didNotFollowBackList" /> (
                {scanReportList[
                  reportUid
                ].didNotFollowBack.length.toLocaleString()}
                )
              </summary>

              {scanReportList[reportUid].didNotFollowBack.length > 0 ? (
                <ul className="py-12 flex flex-col xs:grid xs:grid-cols-[repeat(auto-fill,_182px)] gap-4 justify-center">
                  {scanReportList[reportUid].didNotFollowBack.map((user, i) => (
                    <UserCard
                      addUserToExceptionList={addUserToExceptionList}
                      removeUserFromExceptionList={removeUserFromExceptionList}
                      userData={user}
                      key={user.uid + i}
                      exception={false}
                    />
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 flex items-center justify-center h-[150px] ">
                  <Text keyword="empty" />
                </div>
              )}
            </details>
          </div>
        ) : // 스캔 기록이 없는 경우
        scanReportList === null && exceptionList === null ? (
          // 로딩 중 혹은 만료
          <div className="grow flex flex-col gap-8 justify-center items-center">
            {expired ? (
              <div className="text-center">
                <Text keyword="unableToConnect" />
                <br />
                <Text keyword="checkInstalled" />
                <br />
                <a
                  href="https://chromewebstore.google.com/detail/instagram-followback-scan/ioapdbeebenampepgjabpjinndcoagcf"
                  target="_blank"
                  className="underline"
                >
                  <Text keyword="goToStore" />
                </a>
              </div>
            ) : (
              <Fragment>
                <div className="w-[30%] animate-spin opacity-50 select-none max-w-[300px]">
                  <Image src={spinnerIcon} priority alt="loading..." />
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
        ) : (
          <div className="text-center">
            <Text keyword="scanFirst" /> <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
