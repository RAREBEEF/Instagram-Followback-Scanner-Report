"use client";

import { LanguageContext } from "@/components/language/LanguageProvider";
import Text from "@/components/language/Text";
import { useContext } from "react";
// import profilePageExampleImg from "@/images/profile-page-example.png";
// import Image from "next/image";

const QuestionsPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="grow flex flex-col break-keep">
      <h2 className="text-2xl pt-4 pb-8 text-center">
        FREQUENTLY ASKED QUESTIONS
      </h2>
      {lang && (
        <div className="grow flex flex-col justify-start max-w-[1024px] w-full m-auto sm:px-12 p-4">
          <div className="p-4">
            <ol className="pl-5">
              <li id="failed-to-find-user" className="py-4">
                <h4 className="text-lg font-semibold">
                  1. <Text keyword="userNotFound" />
                </h4>
                <ul>
                  <li className="text-base break-keep pl-5">
                    1. <Text keyword="checkSignIn" />
                  </li>
                  <li className="text-base break-keep pl-5">
                    2. <Text keyword="checkOpenPage" />
                  </li>
                  <li className="text-base break-keep pl-5">
                    3. <Text keyword="retryAfterFollow" />
                  </li>
                  <li className="text-base break-keep pl-5">
                    4. <Text keyword="checkUsername" />
                  </li>
                </ul>
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

export default QuestionsPage;
