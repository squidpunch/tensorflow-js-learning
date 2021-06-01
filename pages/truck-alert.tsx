import { useState, useRef } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import ImageUploader from '../pageComponents/truck-alert/ImageUploader';
import DemoPage from '../components/DemoPage';

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
    <DemoPage
      title="Truck Alert"
      description="Use mobilenet to verify if an image is a truck or not."
    >
      <div className="p-5">
        {demoState === states.initial && (
          <ImageUploader onUpload={onImageUploaded} />
        )}
      </div>

      <img ref={imageRef} width="250" id="img" />
      <br />
      {demoState > states.initial && (
        <p className="p-5 border-2 rounded-xl mb-10">{statusText[demoState]}</p>
      )}
    </DemoPage>
  );
};

export default TruckAlert;
