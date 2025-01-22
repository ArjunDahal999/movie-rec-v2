'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/store/store';

import { PlayCircleIcon } from 'lucide-react';

import { MainLogo } from '../../../public/images';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const MainNavbar = () => {
  const authStaate = useUserStore();

  const [value, setValue] = useState(''); // Immediate value
  const router = useRouter();
  // Update both the immediate and debounced states
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    router.push(`/query/${value}`);
  };

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
        <div className="flex w-[400px] items-center">
          <form onSubmit={handleSearch}>
            <div className="relative z-10 flex space-x-3 rounded-lg bg-slate-400/10 p-3">
              <div className="w-full">
                <Input
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                  className="h-full w-full bg-transparent placeholder:text-gray-400"
                  id="movie"
                  placeholder="example : James Bond movies"
                />
              </div>
              <div className="">
                <Button type="submit" size="icon" variant="secondary">
                  <PlayCircleIcon className="text-red-500" />
                </Button>
              </div>
            </div>
          </form>
          {authStaate.user ? (
            <div className="flex items-center space-x-4">
              <Button className="border-none text-primary" variant={'outline'}>
                <Link href={'/bookmark'}>{authStaate.user.username}</Link>
              </Button>
              <Button
                className="border-none text-primary"
                variant={'outline'}
                onClick={() => {
                  authStaate.clearAuth();
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button className="border-none text-primary" variant={'outline'}>
              <Link href={'/login'}>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MainNavbar;
