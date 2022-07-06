//types
import { FC } from 'react';
import BucketObject from './BucketObject';

interface Props {
  bucketObjects: any[];
  bucketId: string;
}

const BucketObjectList: FC<Props> = ({ bucketObjects, bucketId }) => {
  return (
    <div>
      {bucketObjects.map(object => (
        <BucketObject bucketId={bucketId} object={object} />
      ))}
    </div>
  );
};

export default BucketObjectList;
