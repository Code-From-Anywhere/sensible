import Head from "next/head";
import Image from "next/image";
import { useSiteParams } from "../hooks/useSiteParams";
import DarkModeToggle from "./DarkModeToggle";

const Header = ({
  constants,
}: {
  constants: { [key: string]: any } | undefined;
}) => {
  const { apiUrl } = useSiteParams();
  const title = (
    <div className="ml-4">
      <h1 className="text-xl font-bold">
        {constants?.appName || "Sensible Docs"}
      </h1>
      <p
        onClick={() => {
          window.open("https://sensibleframework.co", "_blank")?.focus();
        }}
        className="text-sm cursor-pointer hover:underline"
      >
        {constants?.appName && "Sensible Docs"}
      </p>
    </div>
  );

  const headTitle = `${
    constants?.appName ? constants.appName + " - " : ""
  }Sensible Docs`;

  const description =
    "Sensible is the fastest way to make an app. Check it out!";
  return (
    <div className="w-full px-4 border-b border-gray-100">
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>
      <div className={"flex flex-row items-center justify-between p-3"}>
        <div className="flex">
          {/* eslint-disable-next-line */}
          <img width={30} src={apiUrl + "/logo.png"} alt="Logo" />
          {title}
        </div>
        <div className="flex flex-row">
          <a
            className="py-2 px-3 mr-4 bg-gray-100 rounded-md font-semibold"
            href={"#"}
            rel="noreferrer"
          >
            Docs
          </a>
          {constants?.domain ? (
            <a
              className="py-2 px-3 mr-4 hover:bg-gray-100 rounded-md font-semibold"
              href={constants.domain}
              rel="noreferrer"
              target="_blank"
            >
              Visit website
            </a>
          ) : null}

          {constants?.email ? (
            <a
              className="py-2 px-3 mr-4 hover:bg-gray-100 rounded-md font-semibold"
              href={`mailto:${constants.email}`}
              rel="noreferrer"
              target="_blank"
            >
              Contact
            </a>
          ) : null}

          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
