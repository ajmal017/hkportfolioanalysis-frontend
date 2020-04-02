import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  const { width, height } = useWindow();
  const paperWidth = Math.min(width * 0.85, 400);
  return paperWidth;
}

export function useSelectedProducts(productIds, fetchProduct, productId_) {
  // productId_ is for rerender
  // since arrays cannot be used for rerendering

  const products = useSelector(state => state.product.products);
  const productsAlreadyLoaded = new Set(Object.keys(products));
  const isLoaded = useSelector(state => state.firebase.profile.isLoaded);

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    let productsArray = [];
    productIds.forEach(productId => {
      productsArray.push(productId);
      if (!productsAlreadyLoaded.has(productId)) {
        // is there a way to dispatch here?
        fetchProduct(productId);
      }
    });
    setSelectedProducts(productsArray);
  }, [isLoaded, productId_]);

  let productsToShow = {};
  selectedProducts.forEach(id => {
    productsToShow[id] = products[id];
  });

  return productsToShow;
}

export function useAllProducts(fetchProducts) {
  const products = useSelector(state => state.product.products);
  useEffect(() => {
    async function fetchData() {
      fetchProducts();
    }
    // a user probably shouldnt have 300 products loaded?
    const notFullyLoaded = Object.keys(products).length < 300;
    if (notFullyLoaded) {
      fetchData();
    }
  }, []);
  return products;
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

// export function useLanguage() {
//   const language = useSelector(state => state.language.language);
//   return language;
// }

export function useIsMobile() {
  const isMobile = useMediaQuery("(max-width:680px)");
  return isMobile;
}
