import DemoPage from '../components/DemoPage';
import * as tf from '@tensorflow/tfjs';
import { useEffect } from 'react';

const buildImages = async () => {
  const random = tf.randomUniform([400, 400]);
  const canvas = document.getElementById('originalCanvas');
  const sortedCanvas = document.getElementById('sortedCanvas');

  // topk creates two tensors, indices and values, noticed if you just peal off values the indices doesnt get GC'd properly
  // so disposing a little extra variable shuffling here to allow dispoing
  const { indices, values } = tf.topk(random, 400);

  await tf.browser.toPixels(random as tf.Tensor2D, canvas as HTMLCanvasElement);
  await tf.browser.toPixels(
    values as tf.Tensor2D,
    sortedCanvas as HTMLCanvasElement
  );

  random.dispose();
  values.dispose();
  indices.dispose();
};

const SortingChaos = () => {
  useEffect(() => {
    buildImages();
  }, []);

  return (
    <DemoPage
      title="Sorting Chaos"
      description="Take a random grayscale tensor and sort the pixels."
    >
      <div className="flex w-full">
        <div className="w-1/2">
          <h2 className="text-lg font-bold">Original</h2>
          <canvas id="originalCanvas" />
        </div>
        <div className="w-1/2">
          <h2 className="text-lg font-bold">Sorted</h2>
          <canvas id="sortedCanvas" />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <h2 className="text-lg font-bold w-full">Notes</h2>
        <p>
          Originally I tried to just draw the random image and then pull it from
          the canvas to sort it. The shape of the tensor is not the same making
          it a bit more complicated, might come back and revisit trying ths
          approach another time though.
        </p>
      </div>
    </DemoPage>
  );
};

export default SortingChaos;
