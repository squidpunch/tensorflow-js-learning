import DemoPage from '../components/DemoPage';
import * as tf from '@tensorflow/tfjs';

const findHighestRanking = (): string => {
  const sourceData = [
    [
      [1, 2, 3, 4, 5],
      [1.1, 2.1, 3.1, 4.1, 5.1],
      [1.2, 2.2, 3.2, 4.2, 5.2],
      [1.2, 12.2, 3.2, 4.2, 5.2],
      [1.3, 2.3, 3.3, 4.3, 5.3],
      [1, 1, 1, 1, 1],
    ],
  ];
  let results = '';

  tf.tidy(() => {
    const sourceTensor = tf.tensor(sourceData);
    // get values of the first dimesion using topK
    const { values } = sourceTensor.topk();

    // results of this would be something like
    // [
    //     [5],
    //     [5.1]
    //     ...
    // ]

    // squeeze values down for removing that wrapper
    const topValues = values.squeeze();

    // now that we have the top values of each element, get the top 3 of those items
    const { indices } = tf.topk(topValues, 3);

    // get the data out, and just make it string friendly for the display output
    const data = indices.arraySync() as number[];
    results = data.join(', ');
  });
  // always good to make sure we havent messed with some memory while working through the problem
  //   console.log(tf.memory().numTensors);
  return results;
};

const TopDetective = () => {
  return (
    <DemoPage
      title="Chapter 6: Top Dectective"
      description="Rather than relying on NMS to find the most viable and highest values, lets do it directly ourselves."
    >
      <div className="flex w-full flex-col">
        <div className="w-full">
          <div className="font-bold">Source Tensor</div>
          <pre>
            [[
            <br />
            &nbsp;&nbsp;[1, 2, 3, 4, 5],
            <br />
            &nbsp;&nbsp;[1.1, 2.1, 3.1, 4.1, 5.1],
            <br />
            &nbsp;&nbsp;[1.2, 2.2, 3.2, 4.2, 5.2],
            <br />
            &nbsp;&nbsp;[1.2, 12.2, 3.2, 4.2, 5.2],
            <br />
            &nbsp;&nbsp;[1.3, 2.3, 3.3, 4.3, 5.3],
            <br />
            &nbsp;&nbsp;[1, 1, 1, 1, 1],
            <br />
            ]]
          </pre>
        </div>
        <div className="font-bold">Indexes with highest ranking value</div>[
        {findHighestRanking()}]
      </div>
    </DemoPage>
  );
};

export default TopDetective;
