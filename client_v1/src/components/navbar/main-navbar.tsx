import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { MainLogo } from '../../../public/images';
import { Button } from '../ui/button';

const MainNavbar = () => {
  return (
    <>
      {/*  parent nav resposive for arragement for the compnents inside */}
      <div className="container sticky top-6 z-[999] mx-auto flex h-[3rem] w-full max-w-7xl items-center justify-between bg-background/30 px-4 md:px-12">
        {/* main logo */}
        <Link href={'/'}>
          <Image
            src={MainLogo}
            className="scale-150"
            alt="moviesflix logo"
            width={90}
            height={90}
            priority
          />
        </Link>
        <Button className="border-none text-primary" variant={'outline'}>
          Login
        </Button>
      </div>
    </>
  );
};

export default MainNavbar;
