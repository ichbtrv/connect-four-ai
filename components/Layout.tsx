import React from "react";

interface LayoutProps { }

const Layout: React.FC<LayoutProps & JSX.IntrinsicElements['section']> = ({ children }) => {
  return (
    <section className='flex flex-col justify-center items-center h-[100vh]'>
      {children}
    </section>
  );
};

export default Layout;