"use client";

import { LanguageContext } from "@/components/language/LanguageProvider";
import Text from "@/components/language/Text";
import { useContext } from "react";
// import profilePageExampleImg from "@/images/profile-page-example.png";
// import Image from "next/image";

const TutorialPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="grow flex flex-col break-keep">
      <h2 className="text-2xl pt-4 pb-8 text-center">TUTORIAL</h2>
      {lang && (
        <div className="grow flex flex-col justify-start max-w-[1024px] w-full m-auto sm:px-12 p-4">
          <ol>
            <li className="p-8">
              <h3 className="text-xl font-semibold">
                1. <Text keyword="signInToInstagram" />
              </h3>
              <div className="text-base break-keep pl-5">
                <Text keyword="signInToInstagramDesc" />
              </div>
              <div className="text-base break-keep pl-5">
                <Text keyword="notNecessarySameAccount" />
              </div>
              <ol className="pl-5">
                <li className="pt-4">
                  <h4 className="text-lg font-semibold">
                    !! <Text keyword="ifDifferentAccount" />
                  </h4>
                  <div className="text-base break-keep pl-5">
                    <Text keyword="mayFail" />
                  </div>
                  <div className="text-base break-keep pl-5">
                    1. <Text keyword="ifPrivateAccount" />
                  </div>
                  <div className="text-base break-keep pl-5">
                    2. <Text keyword="ifNotFollowing" /> (
                    <a href="#failed-to-find-user" className="underline">
                      <Text keyword="checkFrequently1" />
                    </a>
                    )
                  </div>
                </li>
              </ol>
              <br />
              <div className="border py-4 rounded w-fit mx-5 my-0 p-5">
                <div className="break-keep italic text-sm">
                  <Text keyword="doNotCollectPersonalInformation" />
                </div>
                <div className="break-keep italic text-sm">
                  (<Text keyword="reasonForSignIn" />)
                </div>
              </div>
            </li>

            <li className="p-8">
              <h3 className="text-xl font-semibold">
                2. <Text keyword="moveToTarget" />
              </h3>
              <div className="text-base break-keep pl-5">
                <Text keyword="moveToTargetDesc" />
                <br />
                <Text keyword="exampleOfProfilePage" />
              </div>
            </li>

            <li className="p-8">
              <h3 className="text-xl font-semibold">
                3. <Text keyword="scanningAtExtension" />
              </h3>
              <div className="text-base break-keep pl-5">
                <Text keyword="scanningAtExtensionDesc" />
              </div>

              <br />
              <div className="text-base break-keep pl-5">
                <Text keyword="scanningNeverEndDesc" />
              </div>
            </li>

            <li className="p-8">
              <h3 className="text-xl font-semibold">
                4. <Text keyword="checkReport" />
              </h3>
              <div className="text-base break-keep pl-5">
                <Text keyword="reportOpenAutomatically" />
              </div>
              <br />
              <div className="text-base break-keep pl-5">
                <Text keyword="clickCardToProfile" />
              </div>
            </li>

            <li className="p-8">
              <h3 className="text-xl font-semibold">
                (<Text keyword="optional" />){" "}
                <Text keyword="exceptionTutorial" />
              </h3>
              <div className="text-base break-keep pl-5">
                <Text keyword="whatIsException" />
              </div>
              <div className="text-base break-keep pl-5">
                <Text keyword="exceptionListMaintain" />
              </div>
              <br />
              <div className="text-base break-keep pl-5">
                <Text keyword="howToAddException" />
              </div>
            </li>
          </ol>

          <hr />

          <div className="p-4 pt-16">
            <h3 className="text-xl font-semibold">
              <Text keyword="frequentlyAsk" />
            </h3>
            <ol className="pl-5">
              <li id="failed-to-find-user" className="py-4">
                <h4 className="text-lg font-semibold">
                  1. <Text keyword="userNotFound" />
                </h4>
                <div className="text-base break-keep pl-5">
                  1. <Text keyword="checkSignIn" />
                </div>
                <div className="text-base break-keep pl-5">
                  2. <Text keyword="checkOpenPage" />
                </div>
                <div className="text-base break-keep pl-5">
                  3. <Text keyword="retryAfterFollow" />
                </div>
                <br />
                <div className="border py-4 rounded w-fit mx-10 my-0 p-5">
                  <div className="break-keep italic text-sm">
                    <Text keyword="reasonForFollow" />
                    <div>
                      <Text keyword="reasonForFollowDesc" />
                    </div>
                  </div>
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  2. <Text keyword="goToProfilePage" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="scanningAtTargetPage" />
                  <br />
                  <Text keyword="exampleOfProfilePage" />
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  3. <Text keyword="needToSignInInstagram" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="signInToInstagramDesc" />
                </div>
                <div className="text-base break-keep pl-5">
                  <Text keyword="notNecessarySameAccount" />
                </div>
                <br />
                <div className="border py-4 rounded w-fit mx-5 my-0 p-5">
                  <div className="break-keep italic text-sm">
                    <Text keyword="doNotCollectPersonalInformation" />
                  </div>
                  <div className="break-keep italic text-sm">
                    (<Text keyword="reasonForSignIn" />)
                  </div>
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  4. <Text keyword="scanFailed" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="refreshAndRetry" />
                </div>
                <div className="text-base break-keep pl-5">
                  <Text keyword="inquireToMe" />
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  5. <Text keyword="reportNotShowing" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="reportNotShowingDesc" />
                  <a
                    href="https://ifs.rarebeef.co.kr/"
                    target="_blank"
                    className="underline"
                  >
                    <br />
                    https://ifs.rarebeef.co.kr/
                  </a>
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  6. <Text keyword="scanningNeverEnd" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="scanningNeverEndDesc" />
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  7. <Text keyword="figureNotMatch" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="figureNotMatchDesc" />
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  8. <Text keyword="emptyList" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="emptyListDesc" />
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  9. <Text keyword="extensionInfinityLoading" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="infinityLoadingCause" />
                </div>
                <div className="text-base break-keep pl-5">
                  <Text keyword="infinityLoadingSolution" />
                </div>
              </li>
            </ol>
          </div>

          <hr />

          <div className="p-4 pt-16">
            <h3 className="text-xl font-semibold">
              <Text keyword="notes" />
            </h3>
            <ol className="pl-5">
              <li id="failed-to-find-user" className="py-4">
                <h4 className="text-lg font-semibold">
                  1. <Text keyword="doNotCollect" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="doNotCollectDesc" />
                </div>
              </li>
              <li id="failed-to-find-user" className="py-4">
                <h4 className="text-lg font-semibold">
                  2. <Text keyword="deletePrevReport" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="butNoException" />
                </div>
              </li>
              <li id="failed-to-find-user" className="py-4">
                <h4 className="text-lg font-semibold">
                  3. <Text keyword="programPurpose" />
                </h4>
              </li>
              <li id="failed-to-find-user" className="py-4">
                <h4 className="text-lg font-semibold">
                  4. <Text keyword="doNotSupportStatusUpdate" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="doNotSupportStatusUpdateDesc" />
                </div>
              </li>

              <li id="failed-to-find-user" className="py-4">
                <h4 className="text-lg font-semibold">
                  5. <Text keyword="repeatedAndMisuse" />
                </h4>
                <div className="text-base break-keep pl-5">
                  <Text keyword="repeatedAndMisuseDesc" />
                </div>
              </li>

              <li id="failed-to-find-user" className="py-4">
                <h4 className="text-lg font-semibold">
                  6. <Text keyword="onlyUseYourOwn" />
                </h4>
              </li>

              <li id="failed-to-find-user" className="py-4">
                <h4 className="text-lg font-semibold">
                  7. <Text keyword="responsible" />
                </h4>
              </li>
            </ol>
          </div>

          <div className="p-5">
            <Text keyword="inquireToMe" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialPage;
