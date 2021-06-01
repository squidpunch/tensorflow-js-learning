import { useState } from 'react';
import DemoPage from '../components/DemoPage';
import unique from '../util/unique';

const UniqueValues = () => {
  const values = [8367677, 4209111, 4209111, 8675309, 83767677];

  const [uniqueValues, setUniqueValues] = useState<number[]>([]);

  const getUniqueValues = () => {
    setUniqueValues(unique(values));
  };

  return (
    <DemoPage
      title="Unique Values"
      description="Take an array of phone numbers, and return only unique values. There
      are other libraries to do this of course, it's mostly about testing
      how to implement your own tensor to solve a problem!"
    >
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
    </DemoPage>
  );
};

export default UniqueValues;
