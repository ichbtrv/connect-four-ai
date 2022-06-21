const Button: React.FC<JSX.IntrinsicElements['div']> = ({
  children,
  onClick
}) => {
  return (
    <div
      className="w-20 px-2 rounded-md flex justify-center items-center mr-2 mt-2 py-1 cursor-pointer bg-gray-600 bg-opacity-30 hover:bg-opacity-40"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
