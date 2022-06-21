import React, { Dispatch, SetStateAction } from 'react';

type ColorType = {
  blue: string;
  red: string;
};

enum Color {
  'blue' = 'text-sky-500',
  'red' = 'text-red-700'
}

interface TurnChooserProps {
  onClick: Dispatch<SetStateAction<boolean | null>>;
  playerColor: string;
}

const TurnChooser: React.FC<TurnChooserProps> = ({ playerColor, onClick }) => {
  return (
    <section className="flex flex-col appear">
      <div className=" mb-8 ml-1 text-3xl">
        <h1>Would You like to go first or second?</h1>
      </div>
      <div className={`${Color[playerColor as keyof ColorType]} flex`}>
        <div
          className="hover:underline hover:cursor-pointer rounded-md mr-4"
          onClick={() => onClick(true)}
        >
          First{' '}
        </div>
        <div
          className="hover:underline hover:cursor-pointer rounded-md"
          onClick={() => onClick(false)}
        >
          Second{' '}
        </div>
      </div>
    </section>
  );
};

export default TurnChooser;
