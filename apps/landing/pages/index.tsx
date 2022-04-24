import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sensible - The Full Stack Typescript Framework</title>
        <meta
          name="description"
          content="Sensible - The Full Stack Typescript Framework"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The <b>Typescript</b> Framework For <b>Effective</b> Teams
        </h1>

        <p className={styles.description}>yarn create sensible-app</p>

        <a href="https://github.com/Code-From-Anywhere/sensible">
          <Image
            src={"/github.png"}
            width={150}
            height={150}
            alt="Go to GitHub"
          />
        </a>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://codefromanywhere.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Code From Anywhere
        </a>
      </footer>
    </div>
  );
};

export default Home;