import Head from 'next/head';
import { useState, useRef } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import ImageUploader from '../pageComponents/ImageUploader';

const states = {
  initial: 0,
  uploaded: 1,
  isTruck: 2,
  isNotTruck: 3,
};

const statusText = [
  '',
  'Processing image',
  'The image contains a truck',
  'The image does not contain a truck',
];

const TruckAlert = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [demoState, setDemoState] = useState(states.initial);

  const verifyTruck = async (img: HTMLImageElement) => {
    const model = await mobilenet.load();
    const preditions = await model.classify(img);

    setDemoState(
      preditions.some((p) => p.className.match(/truck/))
        ? states.isTruck
        : states.isNotTruck
    );
  };

  const onImageUploaded = (image: HTMLImageElement) => {
    if (imageRef?.current) {
      setDemoState(states.uploaded);
      imageRef.current.src = image.src;
      verifyTruck(image);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center flex-col min-h-screen py-2 px-0">
      <Head>
        <title>Learning TensorFlow.js | Truck Alert</title>
      </Head>
      <main className="flex flex-col justify-center items-center py-20 px-0 flex-1">
        <h1 className="m-0 leading-tight text-7xl font-bold">Truck Alert</h1>
        <p>Use mobilenet to verify if an image is a truck or not.</p>
        <div className="p-5">
          {demoState === states.initial && (
            <ImageUploader onUpload={onImageUploaded} />
          )}
        </div>

        <img ref={imageRef} width="250" id="img" />
        <br />
        {demoState > states.initial && (
          <p className="p-5 border-2 rounded-xl mb-10">
            {statusText[demoState]}
          </p>
        )}
      </main>
      <footer className="w-full h-20 border-t-2 flex justify-center items-center">
        <a href="/">&larr; Back Home</a>
      </footer>
    </div>
  );
};

export default TruckAlert;
