import React from 'react';

const Layout: React.FC<JSX.IntrinsicElements['section']> = ({ children }) => {
  return (
    <section className="flex flex-col justify-center items-center h-[100vh]">
      {children}
    </section>
  );
};

export default Layout;
