import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from './Button';

interface ResetModalProps {
  winner: number;
}

const ResetModal: React.FC<JSX.IntrinsicElements['div'] & ResetModalProps> = ({
  winner
}) => {
  const [hide, setHide] = useState(false);
  const router = useRouter();

  const doReset = () => {
    router.reload();
  };

  return (
    <div
      className={`bg-gray-800 ${hide ? 'invisible' : 'visible'
        } flex justify-center items-center appear bg-opacity-50 backdrop-blur absolute h-[100vh] w-[100vw] top-0 left-0`}
    >
      <div className="w-72 bg-black rounded-md p-4">
        {winner === 0 && 'Draw'}
        {winner === 1 && 'You win'}
        {winner === 2 && 'Computer Wins'}
        <div>Play again?</div>
        <div className="flex">
          {' '}
          <Button className="bg-gray-500" onClick={() => doReset()}>
            Yes
          </Button>
          <Button className="bg-gray-500" onClick={() => setHide(true)}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;
