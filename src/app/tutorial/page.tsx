"use client";

import { LanguageContext } from "@/components/language/LanguageProvider";
import Text from "@/components/language/Text";
import { useContext } from "react";

const TutorialPage = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="grow flex flex-col">
      <h2 className="text-2xl py-4 text-center">TUTORIAL</h2>
      {lang && (
        <div className="grow flex flex-col justify-start max-w-[1024px] w-full m-auto sm:px-12 p-4">
          <ol>
            <li className="p-4">
              <h3 className="text-xl font-semibold">
                1. <Text keyword="signInToInstagram" />
              </h3>
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

            <li className="p-4">
              <h3 className="text-xl font-semibold">
                2. <Text keyword="moveToTarget" />
              </h3>
              <div className="text-base break-keep pl-5">
                <Text keyword="moveToTargetDesc" />
              </div>
              <ol className="pl-5">
                <li className="py-4">
                  <h4 className="text-lg font-semibold">
                    2-1. <Text keyword="ifSameAccount" />
                  </h4>
                  <div className="text-base break-keep pl-10">
                    <Text keyword="nextStep" />
                  </div>
                </li>
                <li>
                  <h4 className="text-lg font-semibold">
                    2-2. <Text keyword="ifDifferentAccount" />
                  </h4>
                  <div className="text-base break-keep pl-10">
                    <Text keyword="mayFail" />
                  </div>
                  <div className="text-base break-keep pl-10">
                    1. <Text keyword="ifPrivateAccount" />
                  </div>
                  <div className="text-base break-keep pl-10">
                    2. <Text keyword="ifNotFollowing" /> (
                    <a href="#failed-to-find-user" className="underline">
                      <Text keyword="checkFrequently5" />
                    </a>
                    )
                  </div>
                </li>
              </ol>
            </li>

            <li className="p-4">
              <h3 className="text-xl font-semibold">
                3. <Text keyword="scanningAtExtension" />
              </h3>
              <div className="text-base break-keep pl-5">
                <Text keyword="scanningAtExtensionDesc" />
              </div>
              <br />
              <div className="text-base break-keep pl-5">
                <Text keyword="waitForScanning" />
              </div>
            </li>
          </ol>

          <div className="p-4 pt-12">
            <h3 className="text-xl font-semibold">
              <Text keyword="frequentlyAsk" />
            </h3>
            <ol className="pl-5">
              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  1. <Text keyword="reportNotShowing" />
                </h4>
                <div className="text-base break-keep pl-10">
                  <Text keyword="reportNotShowingDesc" />
                  <a href="https://ifs.rarebeef.co.kr/" target="_blank">
                    https://ifs.rarebeef.co.kr/
                  </a>
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  2. <Text keyword="scanningNeverEnd" />
                </h4>
                <div className="text-base break-keep pl-10">
                  <Text keyword="scanningNeverEndDesc" />
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  3. <Text keyword="figureNotMatch" />
                </h4>
                <div className="text-base break-keep pl-10">
                  <Text keyword="figureNotMatchDesc" />
                </div>
              </li>

              <li className="py-4">
                <h4 className="text-lg font-semibold">
                  4. <Text keyword="emptyList" />
                </h4>
                <div className="text-base break-keep pl-10">
                  <Text keyword="emptyListDesc" />
                </div>
              </li>

              <li id="failed-to-find-user" className="py-4">
                <h4 className="text-lg font-semibold">
                  5. <Text keyword="userNotFound" />
                </h4>
                <div className="text-base break-keep pl-10">
                  1. <Text keyword="checkSignIn" />
                </div>
                <div className="text-base break-keep pl-10">
                  2. <Text keyword="checkOpenPage" />
                </div>
                <div className="text-base break-keep pl-10">
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
