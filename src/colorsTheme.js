import { createMuiTheme } from "@material-ui/core/styles";

export const QUALITATIVE_COLOR_SCHEME = [
  "#FF5A8A",
  "#00C5FF",
  "#FF892F",
  "#00E23C",
  "#FF77FF",
  "#00E8FF",
  "#E59A00",
  "#00C944",
  "#FF66FF",
  "#FF794F",
  "#00EAFF",
  "#FF9900",
  "#B8AAFF",
  "#00ECC1",
  "#FF89FF",
  "#00E980",
  "#00DFFF",
  "#FF51A9",
  "#6BB9FF",
  "#FFA700",
  "#FF58E7",
  "#CFCA00",
  "#00D8FF",
  "#8ED900",
  "#FF50C8",
  "#00ECFF",
  "#FF686D",
  "#00EAA0",
  "#00E4FF",
  "#EB9AFF",
  "#B0D200",
  "#00ECFF",
  "#63DE02",
  "#00D0FF",
  "#FF50C8",
  "#00ECE1"
];

export const THEME = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#131c2e",
      paper: "#202b43",
      navBar: "#101522"
    },
    primary: {
      main: "#545E79"
    },
    secondary: {
      main: "#D3DCFC"
    },
    elavatedPaper: "#232E46",
    stockColor: {
      increased: "#18AA36",
      decreased: "#FF5660",
      noChange: "#B0B0B0"
    },
    white: "#fff",
    black: "#212121",
    link: "#82EFFF",
  },
  customForm: {
    paper: {
      paddingSpacing: 4,
      maxWidth: 400,
      marginTop: "25vh"
    }
  },
  overrides: {}
});
