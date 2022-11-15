import { useState, useEffect, useRef } from "react";

export const useComponentVisible = (initialIsVisible, refArray) => {

  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !refArray.some((el) => el.current && el.current.contains(event.target))
    ) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, ref, refArray]);

  return { ref, isComponentVisible, setIsComponentVisible };
};
