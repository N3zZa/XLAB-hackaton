import React from 'react';
import { Link } from 'react-router';

export const Header: React.FC = () => {
 
  return (
    <header className="flex flex-col gap-4 sm:p-4 py-4 px-0">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <h1 className='text-2xl'>RabotaByAnalyzer</h1>
        </Link>
      </div>{" "}
      <nav className="w-fit mx-auto">
        <ul className="flex items-center gap-3"></ul>
      </nav>
    </header>
  );
};

