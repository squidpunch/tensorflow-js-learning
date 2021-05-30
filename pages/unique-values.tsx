import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import unique from '../util/unique';

const UniqueValues = () => {
  const values = [8367677, 4209111, 4209111, 8675309, 83767677];

  const [uniqueValues, setUniqueValues] = useState<number[]>([]);

  const getUniqueValues = () => {
    setUniqueValues(unique(values));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Learning TensorFlow.js | Unique Values</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Unique Values</h1>
        <p>
          Take an array of phone numbers, and return only unique values. There
          are other libraries to do this of course, it's mostly about testing
          how to implement your own tensor to solve a problem!
        </p>
        <p>Values: [{values.join(', ')}]</p>
        {uniqueValues?.length > 0 ? (
          <p>Unique: [{uniqueValues?.join(', ')}]</p>
        ) : (
          <button onClick={getUniqueValues}>Analyze</button>
        )}
      </main>
      <footer className={styles.footer}>
        <a href="/">Back Home</a>
      </footer>
    </div>
  );
};

export default UniqueValues;
