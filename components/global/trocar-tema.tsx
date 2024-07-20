"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";

export const TrocarTema = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      {theme === "dark" ? (
        <CiDark
          onClick={() => setTheme("light")}
          className="size-5 lg:size-7"
        />
      ) : (
        <CiLight
          onClick={() => setTheme("dark")}
          className="size-5 lg:size-7"
        />
      )}
    </>
  );
};
