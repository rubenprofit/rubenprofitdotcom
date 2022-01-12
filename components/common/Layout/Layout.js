import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "next-themes";
import { getSiteMetaData } from "@utils/helpers";

import RSSIcon from "@assets/svg/rss.svg";

export function Layout({ children }) {
  const { pathname } = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { author } = getSiteMetaData();

  useEffect(() => setMounted(true), []);

  const toggleDarkMode = (checked) => {
    const isDarkMode = checked;

    if (isDarkMode) setTheme("dark");
    else setTheme("light");
  };

  const isRoot = pathname === "/";
  const isDarkMode = theme === "dark";

  return (
    <div>
      <div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
        <Header
          isRoot={isRoot}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          mounted={mounted}
        />
        <main>{children}</main>
        <footer className="text-xs font-light">
          © {new Date().getFullYear()} {author.name},{" "}
          <a href="https://github.com/rubenprofit/rubenprofitdotcom">Source</a>.
        </footer>
      </div>
    </div>
  );
}

const Header = ({ isRoot, mounted, isDarkMode, toggleDarkMode }) => (
  <header
    className={clsx("flex items-center justify-between ", {
      "mb-8": isRoot,
      "mb-2": !isRoot,
    })}
  >
    <div className={"max-w-md"}>{isRoot ? <LargeTitle /> : <SmallTitle />}</div>
    {mounted && (
      <div className="flex space-x-4">
        <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} />
        <Link href="/rss.xml" passHref>
          <a target="__blank" rel="noreferrer noopener">
            <RSSIcon className={isDarkMode ? "text-white" : "text-black"} />
          </a>
        </Link>
      </div>
    )}
  </header>
);

const LargeTitle = () => {
  const { title } = getSiteMetaData();
  return (
    <h1>
      <Link href="/">
        <a
          className={clsx(
            "text-3xl font-black leading-none text-black no-underline font-display",
            "sm:text-5xl",
            "dark:text-white"
          )}
        >
          {title}
        </a>
      </Link>
    </h1>
  );
};

const SmallTitle = () => {
  const { title } = getSiteMetaData();
  return (
    <h1>
      <Link href="/">
        <a
          className={clsx(
            "text-2xl font-black text-black no-underline font-display",
            "dark:text-white"
          )}
        >
          {title}
        </a>
      </Link>
    </h1>
  );
};
