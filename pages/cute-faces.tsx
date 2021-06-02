import DemoPage from '../components/DemoPage';
import * as tf from '@tensorflow/tfjs';
import { useEffect } from 'react';

const workIt = async (model: tf.LayersModel) => {
  const petImage = document.getElementById('pet') as HTMLImageElement;

  if (!petImage) return;

  const myTensor = tf.browser.fromPixels(petImage);
  // Model expects 256x256 0-1 value 3D tensor
  const readyfied = tf.image
    .resizeNearestNeighbor(myTensor, [256, 256], true)
    .div(255)
    .reshape([1, 256, 256, 3]);

  const result = model.predict(readyfied) as tf.Tensor2D;
  // Model returns top left and bottom right
  result.print();

  // Draw box on canvas
  const detection = document.getElementById('detection') as HTMLCanvasElement;
  const imgWidth = petImage.width;
  const imgHeight = petImage.height;
  detection.width = imgWidth;
  detection.height = imgHeight;
  const box = result.dataSync();
  const startX = box[0] * imgWidth;
  const startY = box[1] * imgHeight;
  const width = (box[2] - box[0]) * imgWidth;
  const height = (box[3] - box[1]) * imgHeight;
  const ctx = detection.getContext('2d');

  if (!ctx) return;

  ctx.strokeStyle = '#0F0';
  ctx.lineWidth = 4;
  ctx.strokeRect(startX, startY, width, height);
};

const detectFace = async () => {
  const modelPath = '/c5/model.json';
  const model = await tf.loadLayersModel(modelPath);

  tf.tidy(() => {
    // shell out to another function in order to be able to run `await` :(
    workIt(model);
    model.dispose();
  });
  console.log(tf.memory().numTensors);
};

const CuteFaces = () => {
  useEffect(() => {
    detectFace();
  }, []);

  return (
    <DemoPage
      title="Chapter 5: Cute Faces"
      description="Expand the face framing to get the pet face and prep it for another model"
    >
      <div className="relative">
        <img id="pet" src="/dog1.jpg" height="100%" />
        <canvas id="detection" className="left-0 absolute top-0"></canvas>
      </div>
    </DemoPage>
  );
};

export default CuteFaces;
