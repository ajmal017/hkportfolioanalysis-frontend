import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  selectLastBusinessDay
} from "../features/lastBusinessDay/lastBusinessDaySlice";
import {
  selectLanguage
} from "../features/language/languageSlice";

export function useWindow() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);

    // Bind the event listener
    window.addEventListener("resize", handleSetTable);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("resize", handleSetTable);
    };
  }, []);

  function handleSetTable() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    setWidth(windowWidth);
    setHeight(windowHeight);
  }

  return { width: width, height: height };
}

export function usePaperWidth() {
  const { width } = useWindow();
  const paperWidth = Math.min(width * 0.85, 400);
  return paperWidth;
}

export function useLoggedIn() {
  const isLoggedIn = !!useSelector(state => state.firebase.auth.uid);
  return isLoggedIn;
}

export function useUserId() {
  const userId = useSelector(state => state.firebase.auth.uid);
  return userId;
}

export function useIsVerified() {
  const isVerified = useSelector(state => state.firebase.auth.emailVerified);
  return isVerified;
}

export function useIsAuthLoaded() {
  const isAuthLoaded = useSelector(state => state.firebase.auth.isLoaded);
  return isAuthLoaded;
}

export function useIsMobile() {
  const isMobile = useMediaQuery("(max-width:680px)");
  return isMobile;
}

export function useLastBusinessDay() {
  const lastBusinessDate = useSelector(selectLastBusinessDay);
  return lastBusinessDate;
}

export function useLanguage(){
  const language = useSelector(selectLanguage);
  return language
}