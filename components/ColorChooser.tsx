import React, { Dispatch, SetStateAction } from 'react';

import { CellColor } from 'types';

interface ColorChooserProps {
  onClick: Dispatch<SetStateAction<CellColor>>;
}

const ColorChooser: React.FC<ColorChooserProps> = ({ onClick }) => {
  const blue: CellColor = 'blue';
  const red: CellColor = 'red';
  return (
    <section className="flex flex-col appear">
      <div className=" mb-8 ml-1 text-3xl">
        <h1>Choose a color</h1>
      </div>
      <div className="flex">
        <div
          className="bg-sky-500 hover:border cursor-pointer rounded-md h-24 w-24 mr-4"
          onClick={() => onClick(blue)}
        />
        <div
          className="bg-red-700 hover:border cursor-pointer rounded-md h-24 w-24"
          onClick={() => onClick(red)}
        />
      </div>
    </section>
  );
};

export default ColorChooser;
