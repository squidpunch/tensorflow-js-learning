import DemoPage from '../components/DemoPage';
import * as tf from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';

const clearCanvases = () => {
  const canvas = document.getElementById('detection') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const getModelPrediction = (
  model: tf.LayersModel,
  imageTensor: tf.Tensor3D
) => {
  // Model expects 256x256 0-1 value 3D tensor
  const preppedModel = tf.image
    .resizeNearestNeighbor(imageTensor, [256, 256], true)
    .div(255)
    .reshape([1, 256, 256, 3]);

  const result = model.predict(preppedModel) as tf.Tensor2D;
  // Model returns top left and bottom right
  // result.print();
  const box = result.dataSync();

  return box;
};

const annotateFace = async (
  imgWidth: number,
  imgHeight: number,
  dimension: Float32Array | Int32Array | Uint8Array
) => {
  const detection = document.getElementById('detection') as HTMLCanvasElement;
  detection.width = imgWidth;
  detection.height = imgHeight;
  const startX = dimension[0] * imgWidth;
  const startY = dimension[1] * imgHeight;
  const width = (dimension[2] - dimension[0]) * imgWidth;
  const height = (dimension[3] - dimension[1]) * imgHeight;

  const ctx = detection.getContext('2d');
  if (!ctx) return;

  ctx.strokeStyle = '#0F0';
  ctx.lineWidth = 4;
  ctx.strokeRect(startX, startY, width, height);
};

const prepareFaceTensor = async (
  imageTensor: tf.Tensor3D,
  dimension: Float32Array | Int32Array | Uint8Array
) => {
  const tensorHeight = imageTensor.shape[0];
  const tensorWidth = imageTensor.shape[1];
  const tensorStartX = dimension[0] * tensorWidth;
  const tensorStartY = dimension[1] * tensorHeight;
  const finalWidth = parseInt(
    ((dimension[2] - dimension[0]) * tensorWidth) as unknown as string,
    0
  );
  const finalHeight = parseInt(
    ((dimension[3] - dimension[1]) * tensorHeight) as unknown as string,
    0
  );

  const cropped = tf.slice(
    imageTensor,
    [tensorStartY, tensorStartX, 0],
    [finalWidth, finalHeight, 3]
  );

  const faceTensor = tf.image
    .resizeBilinear(cropped, [96, 96], true)
    .reshape([1, 96, 96, 3]);

  // faceTensor.print();

  const croppedCanvas = document.getElementById('cropped') as HTMLCanvasElement;

  await tf.browser.toPixels(cropped, croppedCanvas);
};

const detectFace = async () => {
  const modelPath = '/c5/model.json';
  const model = await tf.loadLayersModel(modelPath);

  tf.tidy(() => {
    const petImage = document.getElementById('pet') as HTMLImageElement;

    if (!petImage) return;

    const imageTensor = tf.browser.fromPixels(petImage);
    const imgWidth = petImage.width;
    const imgHeight = petImage.height;
    const box = getModelPrediction(model, imageTensor);

    annotateFace(imgWidth, imgHeight, box);

    prepareFaceTensor(imageTensor, box);
  });

  model.dispose();

  // verify memory cleanup
  // console.log(tf.memory().numTensors);
};

const CuteFaces = () => {
  const [imgSrc, setImgSrc] = useState('/c5/dog1.jpg');

  const updateDog = (value: number) => {
    clearCanvases();
    setImgSrc(`c5/dog${value}.jpg`);
  };
  useEffect(() => {
    detectFace();
  }, [imgSrc]);

  return (
    <DemoPage
      title="Chapter 5: Cute Faces"
      description="Expand the face framing to get the pet face and prep it for another model"
    >
      <div className="flex w-full">
        {[1, 2, 3].map((value) => (
          <button
            key={value}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => updateDog(value)}
          >
            Dog {value}
          </button>
        ))}
      </div>
      <div className="relative">
        <img id="pet" src={imgSrc} height="100%" />
        <canvas id="detection" className="left-0 absolute top-0"></canvas>
      </div>
      <div className="font-bold">
        We've pulled out the face created a tensor to send for more analysis,
        the cropped image tensor data is respresented here:
      </div>
      <canvas id="cropped"></canvas>
    </DemoPage>
  );
};

export default CuteFaces;
