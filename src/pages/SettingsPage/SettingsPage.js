// import React from "react";

// import { useFirebase } from "react-redux-firebase";
// import Switch from "@material-ui/core/Switch";

// import { useLanguage } from "../../utils/customHooks";
// import { useLoggedIn } from "../../utils/customHooks";
// import { LanguageButtonContainer, DarkThemeSwitchContainer } from "../../containers";
// import { HelmetWrapper, SettingsRow } from "../../components";
// import { MISC_LANG } from "../../utils/constants";
// import { logout } from "../../firebase/crud";

// const TEXT = {
//   profile: {
//     en: "Profile",
//     zh: "帳號",
//     jp: "プロフィール"
//   },
//   logout: {
//     en: "Logout",
//     zh: "登出",
//     jp: "ログアウト"
//   },
//   language: {
//     en: "Language",
//     zh: "語言",
//     jp: "言語"
//   },
//   dark: {
//     en: "Dark Theme",
//     zh: "黑夜模式",
//     jp: "ダークモード"
//   }
// };

// function SettingsPage() {
//   const locale = useLanguage() || "en";
//   const firebase = useFirebase();
//   const isLoggedIn = useLoggedIn();

//   return (
//     <div style={{ width: "100%" }}>
//       <HelmetWrapper title={MISC_LANG.setting[locale]} content="Settings" />
//       <div>
//         <SettingsRow text={MISC_LANG.setting[locale]} head={true} />
//         <SettingsRow
//           text={TEXT.language[locale]}
//           rightSideOption={LanguageButtonContainer}
//         />
//         <SettingsRow text={TEXT.dark[locale]} rightSideOption={DarkThemeSwitchContainer} />

//         {isLoggedIn && (
//           <div>
//             <SettingsRow text={TEXT.profile[locale]} head={true} />
//             <SettingsRow
//               text={TEXT.logout[locale]}
//               onClick={() => {
//                 logout(firebase);
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SettingsPage;
