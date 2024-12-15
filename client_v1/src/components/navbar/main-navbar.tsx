'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useDebouncedState } from '@mantine/hooks';

import { PlayCircleIcon } from 'lucide-react';

import { MainLogo } from '../../../public/images';
import AutoSuggestionBox from '../auto-suggestion-box';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const MainNavbar = () => {
  const [value, setValue] = useState(''); // Immediate value
  const [searchText, setSearchText] = useDebouncedState('', 500);

  // Update both the immediate and debounced states
  const handleChange = (event: any) => {
    setValue(event.target.value);
    setSearchText(event.target.value);
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
        <div className="flex">
          <form>
            <div className="relative z-10 flex max-w-[400px] space-x-3 rounded-lg bg-slate-400/10 p-3">
              <div className="flex-[1_0_0%]">
                <Label htmlFor="movie" className="sr-only">
                  Search movies & TV shows
                </Label>
                <Input
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                  className="h-full bg-transparent placeholder:text-gray-400"
                  id="movie"
                  placeholder="Search movies & TV shows"
                />
                {searchText.length > 0 && (
                  <AutoSuggestionBox movieName={searchText} />
                )}
              </div>
            </div>
          </form>

          <Button className="border-none text-primary" variant={'outline'}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default MainNavbar;
