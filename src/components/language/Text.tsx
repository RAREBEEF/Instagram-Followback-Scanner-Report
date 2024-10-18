import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

const TextDictionary: { [keyword in string]: { ko: string; en: string } } = {
  tutorial: {
    ko: "튜토리얼",
    en: "Tutorial",
  },
  scanReport: {
    ko: "스캔 보고서",
    en: "Scan report",
  },
  exceptionList: {
    ko: "예외 목록",
    en: "Exception list",
  },
  didNotFollowBackList: {
    ko: "맞팔하지 않은 사람들",
    en: "Did not follow back list",
  },
  empty: {
    ko: "비어있음",
    en: "Empty",
  },
  scanFirst: {
    ko: "확장프로그램에서 스캔을 실행하신 후 결과를 확인하실 수 있습니다.",
    en: "You can check the report after scanning in the extension.",
  },
  unableToConnect: {
    ko: "확장프로그램과 연결할 수 없습니다.",
    en: "Unable to connect to the extension.",
  },
  checkInstalled: {
    ko: "확장프로그램이 설치되어 있는지 확인해 주세요.",
    en: "Please make sure that the extension is installed.",
  },
  loading: {
    ko: "로딩 중",
    en: "Loading",
  },
  removeFromException: {
    ko: "예외 목록에서 삭제하기",
    en: "Remove from exception list",
  },
  addToException: {
    ko: "예외 목록에 추가하기",
    en: "Add to exception list",
  },
  removeFromList: {
    ko: "목록에서 삭제하기",
    en: "Remove from list",
  },
  signInToInstagram: {
    ko: "브라우저에서 인스타그램에 로그인",
    en: "Sign in to Instagram from your browser",
  },
  signInToInstagramDesc: {
    ko: "확장프로그램이 설치된 브라우저에서 인스타그램에 로그인합니다.",
    en: "Log in to Instagram from the browser where the extension is installed.",
  },
  doNotCollectPersonalInformation: {
    ko: "걱정하지 마세요! 확장프로그램이 아닌 브라우저에서 로그인하는 것이며 개인정보를 수집하지 않습니다.",
    en: "Don't worry! It's signing in from a browser, not an extension, and it doesn't collect personal information.",
  },
  reasonForSignIn: {
    ko: "로그인이 필요한 이유: 로그인하지 않은 사용자에게 인스타그램은 데이터를 제공하지 않습니다.",
    en: "Why you need to sign in: Instagram doesn't provide data to users who aren't signed in.",
  },
  notNecessarySameAccount: {
    ko: "스캔할 계정과 로그인한 계정이 동일할 필요는 없지만 스캔에 실패하는 경우가 있을 수 있습니다.",
    en: "The account you want to scan and the account you are signed in need not be the same, but sometimes the scan fails.",
  },
  moveToTarget: {
    ko: "스캔 대상의 프로필 페이지로 이동",
    en: "Go to the profile page of the scan target",
  },
  moveToTargetDesc: {
    ko: "스캔 대상의 프로필 페이지로 이동",
    en: "Go to the profile page of the user you want to scan the follow list.",
  },
  ifSameAccount: {
    ko: "로그인한 계정과 대상 계정이 동일한 경우",
    en: "If the signed in account and target account are the same",
  },
  nextStep: {
    ko: "다음 단계로 진행",
    en: "Proceed to the next step",
  },
  ifDifferentAccount: {
    ko: "로그인한 계정과 대상 계정이 다른 경우",
    en: "If the signed in account and target account are different",
  },
  mayFail: {
    ko: "아래의 경우 스캔에 실패할 수 있습니다.",
    en: "The scan may fail in the following cases.",
  },
  ifPrivateAccount: {
    ko: "대상 계정이 비공개인 경우",
    en: "The target account is private",
  },
  ifNotFollowing: {
    ko: "로그인한 계정이 대상 계정을 팔로우하지 않는 경우",
    en: "The signed in account does not follow the target account",
  },
  checkFrequently5: {
    ko: "자주 묻는 질문 5번 참고",
    en: "Refer to Frequently Asked Questions No. 5",
  },
  scanningAtExtension: {
    ko: "확장프로그램에서 스캔 실행하기",
    en: "Run scan from extension",
  },
  scanningAtExtensionDesc: {
    ko: '스캔 대상의 페이지가 켜져있는 상태에서 브라우저 우측 상단의 확장프로그램 아이콘을 클랙해 "Instagram Followback Scanner"를 실행합니다.',
    en: "While the scan target page is on, click the extension icon at the top right of the browser to run “Instagram Followback Scanner”.",
  },
  waitForScanning: {
    ko: "프로그램 창이 출력되면 스캔 시작 버튼을 누르고 기다립니다. 스캔이 완료되면 보고서가 자동으로 열립니다.",
    en: "When the program window is displayed, press the Start Scan button and wait. scan Once completed, the report will open automatically.",
  },
  frequentlyAsk: {
    ko: "자주 묻는 질문",
    en: "Frequently Asked Questions",
  },
  reportNotShowing: {
    ko: "보고서가 자동으로 나타나지 않는 경우",
    en: "If the report doesn't appear automatically",
  },
  reportNotShowingDesc: {
    ko: '스캔 완료 후 보고서가 나타나지 않는 경우 확장프로그램에서 "스캔 보고서 열기"를 클릭하시거나 아래 링크를 통해 보고서를 확인하실 수 있습니다.',
    en: 'If the report does not appear after completing the scan, you can click "Open Scan Report" in the extension or check the report through the link below.',
  },
  scanningNeverEnd: {
    ko: "스캔이 종료되지 않는 경우",
    en: "If scanning does not end",
  },
  scanningNeverEndDesc: {
    ko: "팔로워가 많을수록 스캔하는데 더 오랜 시간이 소요됩니다.",
    en: "The more followers you have, the longer it will take to scan.",
  },
  figureNotMatch: {
    ko: "보고서와 실제 팔로워의 숫자가 일치하지 않는 경우",
    en: "If the reported and actual follower numbers do not match",
  },
  figureNotMatchDesc: {
    ko: "팔로워에 포함된 비공개 계정은 스캔에 집계되지 않아서 실제 팔로워 수와 차이가 발생할 수 있습니다.",
    en: "Private accounts included in your followers may not be counted in the scan, which may result in a discrepancy from your actual follower count.",
  },
  emptyList: {
    ko: "스캔 보고서가 빈 목록을 보여주는 경우",
    en: "If the scan report shows an empty list",
  },
  emptyListDesc: {
    ko: "스캔 대상이 비공개 계정인 경우 빈 목록이 출력됩니다.",
    en: "If the scan target is a private account, an empty list will be output.",
  },
  userNotFound: {
    ko: "유저를 찾는데 실패했다는 오류가 계속 발생하는 경우",
    en: "If an error continues to occur saying that it failed to find the user",
  },
  checkSignIn: {
    ko: "인스타그램에 로그인되었는지 확인해 주세요.",
    en: "Please make sure you are signed in to Instagram.",
  },
  checkOpenPage: {
    ko: "인스타그램에 로그인되었는지 확인해 주세요.",
    en: "Make sure you run the scan while the profile page of the account you want to scan is open.",
  },
  retryAfterFollow: {
    ko: "그래도 안 될 경우 로그인한 계정으로 스캔할 계정을 팔로우하고 새로고침한 뒤 잠시 후 다시 시도해 주세요.",
    en: "If that doesn't work, follow the account you want to scan with the account you're logged in with, refresh, and try again later.",
  },
  reasonForFollow: {
    ko: "스캔할 계정을 팔로우 해야하는 이유:",
    en: "Why you should follow the accounts you want to scan:",
  },
  reasonForFollowDesc: {
    ko: "본 확장프로그램은 인스타그램 상위 검색결과를 기반으로 스캔할 유저의 데이터를 요청합니다. 현재 로그인된 계정에서 대상의 id를 검색했을 때 상위 5개 검색 결과에 대상이 포함되지 않는다면 데이터를 불러올 수 없습니다. 따라서 유저를 찾을 수 없는 경우 대상을 검색 결과 상단에 노출시키기 위해 대상을 팔로우하거나 스캔 대상과 동일한 계정으로 로그인한 후 스캔을 시도해 주세요.",
    en: "This extension requests user data to be scanned based on top Instagram search results. If the target's id is not included in the top five search results when you search for the target's id in the currently logged in account, the data cannot be retrieved. Therefore, if you cannot find the user, follow the target to have it appear at the top of the search results or log in with the same account as the scan target and try scanning.",
  },
  inquireToMe: {
    ko: "문제가 지속될 경우 스토어에 문의를 남겨 주세요.",
    en: "If the problem persists, please write an inquiry to the store.",
  },
};

const Text = ({ keyword }: { keyword: string }) => {
  const { lang } = useContext(LanguageContext);

  return lang ? TextDictionary[keyword]?.[lang] || null : null;
};

export default Text;
