import * as tf from '@tensorflow/tfjs';
export default function unique(values: number[]): number[] {
  let result: number[] = [];
  tf.tidy(() => {
    const tensor = tf.tensor(values);
    result = tf.unique(tensor).values.arraySync() as number[];
  });
  return result;
}
