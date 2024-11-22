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
    en: "Exception List",
  },
  didNotFollowBackList: {
    ko: "맞팔하지 않은 사람들",
    en: "People who don't follow back",
  },
  empty: {
    ko: "비어있음",
    en: "EMPTY",
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
    ko: "예외 목록에서 삭제",
    en: "Remove From Exception List",
  },
  addToException: {
    ko: "예외 목록에 추가",
    en: "Add To Exception List",
  },
  removeFromList: {
    ko: "목록에서 삭제하기",
    en: "Remove From List",
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
    ko: "아래의 이유로 스캔할 계정과 동일한 계정에 로그인하는 것을 권장합니다.",
    en: "For the reasons below, we recommend that you sign in to the same account you will be scanning from.",
  },
  moveToTarget: {
    ko: "스캔 대상의 프로필 페이지로 이동",
    en: "Go to the profile page of the scan target",
  },
  moveToTargetDesc: {
    ko: "스캔 대상의 프로필 페이지로 이동해주세요.",
    en: "Go to the profile page of the user you want to scan the follow list.",
  },
  exampleOfProfilePage: {
    ko: '(프로필 페이지 경로: "instagram.com/대상id")',
    en: '(Profile page path: "instagram.com/targetId")',
  },
  ifDifferentAccount: {
    ko: "로그인한 계정과 스캔할 계정이 다른 경우",
    en: "If the signed in account is different from the account to be scanned",
  },
  mayFail: {
    ko: "다음과 같은 계정은 스캔에 실패할 수 있습니다:",
    en: "The following accounts may fail the scan:",
  },
  ifPrivateAccount: {
    ko: "로그인한 계정과 스캔할 계정이 다르고, 스캔할 계정이 비공개인 경우.",
    en: "If the signed in account and the account to be scanned are different, and the account to be scanned is private.",
  },
  ifNotFollowing: {
    ko: "로그인한 계정과 스캔할 계정이 다르고, 스캔할 계정을 팔로우하지 않는 경우.",
    en: "If the signed in account and the account to be scanned are different, and you do not follow the account to be scanned.",
  },
  unableToSearch: {
    ko: "아이디에 검색 불가능한 키워드가 포함된 경우.",
    en: "If the ID contains keywords that cannot be searched.",
  },
  checkFrequently1: {
    ko: "자주 묻는 질문 1번 참고",
    en: "Refer to Frequently Asked Questions No. 1",
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
    ko: "프로그램 창이 출력되면 스캔 시작 버튼을 누르고 기다립니다.",
    en: "When the program window is displayed, press the Start Scan button and wait.",
  },
  reportOpenAutomatically: {
    ko: "스캔이 완료되면 보고서가 자동으로 열립니다.",
    en: "scan Once completed, the report will open automatically.",
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
    ko: "팔로우가 많을수록 스캔하는데 더 오랜 시간이 소요됩니다. 잠시 기다려 주세요.",
    en: "The more followers(or followings) you have, the longer it will take to scan. Please wait a moment.",
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
    ko: "유저를 찾는데 실패했다는 오류가 발생하는 경우",
    en: "If an error continues to occur saying that it failed to find the user",
  },
  checkSignIn: {
    ko: "인스타그램에 로그인되었는지 확인해 주세요.",
    en: "Please make sure you are signed in to Instagram.",
  },
  checkOpenPage: {
    ko: "스캔 대상의 프로필 페이지가 열려있는 상태에서 스캔했는지 확인해 주세요.",
    en: "Make sure you run the scan while the profile page of the account you want to scan is open.",
  },
  retryAfterFollow: {
    ko: "가능하면 스캔할 계정과 동일한 계정으로 로그인하고, 부득이한 경우 로그인한 계정에서 스캔할 계정을 팔로우해주세요.",
    en: "If possible, sign in with the same account as the account to be scanned, and if unavoidable, follow the account to be scanned from the signed in account.",
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
  reload: {
    ko: "재시도",
    en: "retry",
  },
  goToProfilePage: {
    ko: "프로필 페이지로 이동하라는 메세지가 출력되는 경우",
    en: "If a message asking you to go to the profile page is displayed",
  },
  scanningAtTargetPage: {
    ko: "스캔 대상의 프로필 페이지에서 스캔을 실행해 주세요.",
    en: "Please run the scan from the profile page of the scan target.",
  },
  needToSignInInstagram: {
    ko: "인스타그램에 로그인하라는 메세지가 출력되는 경우",
    en: "If a message asking you to log in to Instagram is displayed",
  },
  scanFailed: {
    ko: "팔로우 목록을 스캔하는데 실패했다는 메세지가 출력되는 경우",
    en: "If a message is displayed saying that scanning the follow list failed,",
  },
  refreshAndRetry: {
    ko: "인스타그램 창을 새로고친 뒤 시간적 여유를 두고 다시 시도해 주세요.",
    en: "Please refresh the Instagram window and try again after some time.",
  },
  checkReport: {
    ko: "스캔 보고서 확인하기",
    en: "Check the scan report",
  },
  clickCardToProfile: {
    ko: "목록에서 유저 카드를 클릭해 유저의 인스타그램 프로필로 이동할 수 있습니다.",
    en: "You can click on a user's card in the list to go to the user's Instagram profile.",
  },
  optional: {
    ko: "선택사항",
    en: "optional",
  },
  exceptionTutorial: {
    ko: "예외 목록에 추가하기",
    en: "Add to exception list",
  },
  whatIsException: {
    ko: "예외 목록은 해당 유저가 나를 팔로우하지 않더라도 스캔 결과에 포함하지 않을 유저의 목록입니다.",
    en: "The exception list is a list of users that you will not include in the scan results, even if those users do not follow you.",
  },
  exceptionListMaintain: {
    ko: "예외 목록은 스캔 대상마다 별도로 저장되며 검사 간에 유지됩니다.",
    en: "Exception lists are stored separately for each scan target and are maintained between scans.",
  },
  howToAddException: {
    ko: "유저 카드의 메뉴를 클릭해 해당 유저를 예외 목록에 등록/제거하거나 이번 검사 기록에서 아예 삭제할 수도 있습니다.",
    en: "You can click the menu on the user card to register/remove the user from the exception list or delete him/her from this inspection record.",
  },
  notes: {
    ko: "참고 및 유의사항",
    en: "Notes and precautions",
  },
  doNotCollect: {
    ko: "본 프로그램은 데이터를 수집하지 않습니다.",
    en: "This program does not collect data.",
  },
  doNotCollectDesc: {
    ko: "스캔 결과 등 프로그램 실행 과정에서 발생된 데이터는 모두 사용자의 로컬 환경에만 저장되며 외부로 전송되지 않습니다.",
    en: "All data generated during program execution, such as scan results, are stored only in the user’s local environment and are not transmitted externally.",
  },
  deletePrevReport: {
    ko: "스캔 실행 시 이전 스캔 결과는 영구적으로 삭제됩니다.",
    en: "When running a scan, previous scan results will be permanently deleted.",
  },
  butNoException: {
    ko: "사용자 편의를 위해 예외 유저 목록은 삭제되지 않고 다음번 스캔시 자동으로 적용됩니다.",
    en: "For user convenience, the exception user list will not be deleted and will be automatically applied the next time you scan.",
  },
  programPurpose: {
    ko: "본 프로그램은 비즈니스 통계 도출용으로 제작되었습니다.",
    en: "This program was designed to derive business statistics.",
  },
  doNotSupportStatusUpdate: {
    ko: "유저에 대한 팔로우 상태 변경(팔로우 취소 등)은 지원하지 않습니다.",
    en: "Changing the follow status of a user (unfollow, etc.) is not supported.",
  },
  doNotSupportStatusUpdateDesc: {
    ko: "원하시는 경우 목록에서 해당하는 유저를 클릭해 해당 유저의 프로필 페이지로 이동 후 직접 상태를 변경하실 수 있습니다.",
    en: "If you wish, you can click on the relevant user in the list to go to that user's profile page and change the status directly.",
  },
  repeatedAndMisuse: {
    ko: "반복적인 스캔 실행과 오남용은 금지합니다.",
    en: "Repeated scanning and misuse are prohibited.",
  },
  repeatedAndMisuseDesc: {
    ko: "Meta 가이드라인에 위배되어 제재의 대상이 될 수 있습니다.",
    en: "You may be subject to sanctions for violating Meta's guidelines.",
  },
  onlyUseYourOwn: {
    ko: "본인 소유의 계정에만 이용해주세요.",
    en: "Please only use it on your own account.",
  },
  responsible: {
    ko: "본 프로그램을 이용해 발생할 수 있는 모든 피해와 법적 책임은 사용자에게 있습니다.",
    en: "The user is responsible for all damages and legal liability that may arise from using this program.",
  },
  extensionInfinityLoading: {
    ko: "확장프로그램이 무한로딩에 걸린 경우",
    en: "If the extension is stuck in infinite loading",
  },
  infinityLoadingCause: {
    ko: "스캔이 종료되지 않은 상태에서 스캔 중인 인스타그램 페이지를 이탈할 경우 확장 프로그램이 무한 로딩에 걸리는 경우가 발생할 수 있습니다.",
    en: "If you leave the Instagram page being scanned before the scan has finished, the extension may load infinitely.",
  },
  infinityLoadingSolution: {
    ko: "이 경우 프로그램을 제거 후 재설치하면 해결되며, 가급적이면 스캔 중 페이지를 이탈하지 않도록 주의해 주세요.",
    en: "In this case, you can resolve the issue by uninstalling and reinstalling the program. If possible, be careful not to leave the page while scanning.",
  },
  unfollower: {
    ko: "언팔로우 목록",
    en: "Unfollow List",
  },
  unfollowerDesc: {
    ko: "이전 스캔 시점을 기준으로 팔로우가 취소된 유저의 목록입니다. 스캔 실행 시 목록이 새로고침됩니다.",
    en: "This is the list of users who have been unfollowed as of the previous scan point. The list will be refreshed when you run the scan.",
  },
  unfollowerDesc2: {
    ko: "해당 유저의 계정이 삭제되거나 비활성화 된 경우도 포함될 수 있습니다.",
    en: "This may also include cases where the user's account has been deleted or deactivated.",
  },
  exceptionListDesc: {
    ko: "맞팔하지 않은 사람들에서 제외할 유저의 목록입니다.",
    en: "This is a list of people who will not be included in the list of People who don't follow back.",
  },
  goToStore: {
    ko: "크롬 웹스토어로 이동하기",
    en: "Go to Chrome Web Store",
  },
  scannedAt: {
    ko: "스캔일시",
    en: "Scanned At",
  },
  deleteReport: {
    ko: "현재 검사 결과 삭제",
    en: "Delete This Scan Report",
  },
  checkUsername: {
    ko: "Meta 가이드라인에 위배되는 키워드가 포함된 아이디는 검색이 불가능하고 스캔에 실패합니다. 인스타그램 검색창에서 해당 유저의 아이디가 검색되는지 확인해 주세요.",
    en: "IDs containing keywords that violate the Meta guidelines are not searchable and the scan will fail. Please check if the user's ID can be found in the Instagram search bar.",
  },
};

const Text = ({ keyword }: { keyword: string }) => {
  const { lang } = useContext(LanguageContext);

  return lang ? TextDictionary[keyword]?.[lang] || keyword : null;
};

export default Text;
