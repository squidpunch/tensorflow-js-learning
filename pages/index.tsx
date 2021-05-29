import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Learning TensorFlow.js</title>
        <meta
          name="description"
          content="Building an app around the exmaples in the book Learning TensorFlow.js book"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Learning TensorFlow.js</h1>

        <p className={styles.description}>
          A sample app that wires up the exercises from Learning TensorFlow.js
          in a central next app.
        </p>

        <div className={styles.grid}>
          <a href="truck-alert" className={styles.card}>
            <h2>Truck Alert &rarr;</h2>
            <p>Use mobilenet to verify if an image is a truck or not.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
