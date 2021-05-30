import Head from 'next/head';
import { useState } from 'react';
import unique from '../util/unique';

const UniqueValues = () => {
  const values = [8367677, 4209111, 4209111, 8675309, 83767677];

  const [uniqueValues, setUniqueValues] = useState<number[]>([]);

  const getUniqueValues = () => {
    setUniqueValues(unique(values));
  };

  return (
    <div className="flex h-screen items-center justify-center flex-col min-h-screen py-2 px-0">
      <Head>
        <title>Learning TensorFlow.js | Unique Values</title>
      </Head>
      <main className="flex flex-col justify-center items-center py-20 px-0 flex-1">
        <h1 className="m-0 leading-tight text-7xl font-bold">Unique Values</h1>
        <p>
          Take an array of phone numbers, and return only unique values. There
          are other libraries to do this of course, it's mostly about testing
          how to implement your own tensor to solve a problem!
        </p>
        <p>
          <strong>Values:</strong> [{values.join(', ')}]
        </p>
        {uniqueValues?.length > 0 ? (
          <p>
            <strong>Unique:</strong> [{uniqueValues?.join(', ')}]
          </p>
        ) : (
          <div className="p-5">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={getUniqueValues}
            >
              Analyze
            </button>
          </div>
        )}
      </main>
      <footer className="w-full h-20 border-t-2 flex justify-center items-center">
        <a href="/">&larr; Back Home</a>
      </footer>
    </div>
  );
};

export default UniqueValues;
