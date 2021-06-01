import Head from 'next/head';
import Image from 'next/image';
import Card from '../pageComponents/home/Card';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center flex-col min-h-screen py-2 px-0">
      <Head>
        <title>Learning TensorFlow.js</title>
        <meta
          name="description"
          content="Building an app around the exmaples in the book Learning TensorFlow.js book"
        />
      </Head>

      <main className="flex flex-col justify-center items-center py-20 px-0 flex-1">
        <h1 className="m-0 leading-tight text-xl md:text-5xl font-bold">
          Learning TensorFlow.js
        </h1>

        <p className="mb-5">
          A sample app that wires up the exercises from Learning TensorFlow.js
          in a central next app.
        </p>

        <div className="w-full flex-col md:flex-row flex items-stretch justify-center flex-wrap max-w-screen-md mt-3">
          <Card
            url="truck-alert"
            title="Chapter 2: Truck Alert"
            description="Use mobilenet to verify if an image is a truck or not."
          />
          <Card
            url="unique-values"
            title="Chapter 3: Unique Values"
            description="Use tensorflow to get unique values of an array for funsies."
          />
          <Card
            url="sorting-chaos"
            title="Chapter 4: Sorting Chaos"
            description="Take a random grayscale tensor and sort the pixels."
          />
        </div>
      </main>

      <footer className="w-full h-20 border-t-2 flex justify-center items-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className="h-4 ml-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
