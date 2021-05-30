import Head from 'next/head';
import { useState, useRef } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import styles from '../styles/Home.module.css';
import ImageUploader from '../pageComponents/ImageUploader';

const TruckAlert = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isTruckText, setIsTruckText] = useState('');

  const verifyTruck = async (img: HTMLImageElement) => {
    setIsTruckText('Scanning Image');

    const model = await mobilenet.load();
    const preditions = await model.classify(img);

    if (preditions.some((p) => p.className.match(/truck/))) {
      setIsTruckText('The image is a truck');
    } else {
      setIsTruckText('The image is not a truck');
    }
  };

  const onImageUploaded = (image: HTMLImageElement) => {
    if (imageRef?.current) {
      imageRef.current.src = image.src;
      verifyTruck(image);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Learning TensorFlow.js | Truck Alert</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Truck Alert</h1>
        <ImageUploader onUpload={onImageUploaded} />
        <img ref={imageRef} width="250" id="img" />
        <br />
        <p>{isTruckText}</p>
      </main>
      <footer className={styles.footer}>
        <a href="/">Back Home</a>
      </footer>
    </div>
  );
};

export default TruckAlert;
