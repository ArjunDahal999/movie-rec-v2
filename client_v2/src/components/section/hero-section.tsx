'use client';

import {  ChangeEvent, useState } from 'react';
import Link from 'next/link';



export default function MovieFlixHero() {
  const [value, setValue] = useState(''); // Immediate value//hold valuethat user types in..
  const [suggestionData,setSuggestionData] = useState()
  const handleChange =  async(event:ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    setValue( event.target.value)
   const res  = await fetch('http://13.49.18.64/autocomplete/'+value)
  const {data} = await res.json()//data contains list of suggestions based on user input.....AND DESTRUCTURE TO GET DAT AOBJECT
   setSuggestionData(data)
  };

  return (
    <>
      {/* Hero */}
      <div className="relative w-full overflow-hidden p-4">
        <div className="relaive container mx-auto py-20">
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              MoviesFlix
            </h1>
            <p className="mt-3 text-xl text-gray-400">
            </p>
            <div className="relative mx-auto mt-7 max-w-xl sm:mt-12">
              {/* Form */}
              <form>
                <div className="relative z-10 flex space-x-3 rounded-lg bg-slate-400/10 p-3">
                  <div className="flex-[1_0_0%]">
                    <input value={value} onChange={(e)=>handleChange(e)}  placeholder='Search movie...' className=' w-full indent-3'/>
                  </div>
                  <SuggestionBox data={suggestionData!}/>
             
                </div>
              </form>
              {/* End Form */}

              {/* SVG Elements */}
              <div className="absolute end-0 top-0 hidden -translate-y-12 translate-x-20 md:block">
                <svg
                  className="h-auto w-16 text-red-500"
                  width={121}
                  height={135}
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* End SVG Element */}
              {/* SVG Element */}
              <div className="absolute bottom-0 start-0 hidden -translate-x-32 translate-y-10 md:block">
                <svg
                  className="h-auto w-40 text-red-500/30"
                  width={347}
                  height={188}
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    strokeWidth={7}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
const SuggestionBox = ({data}:{data:string[]})=>{
  console.log(data)
  return(
    <>
<div className="  bg-slate-400/10 absolute z-[99] top-12  flex flex-col  h-[50vh] w-full -left-3">
    {data?.map((v)=>{
      return (
     <div className=" border-black/10  flex justify-start px-4 border-b-2">
       <Link href={'/movie/'+v}>{v}</Link>
     </div>
      )
    })}
</div>
    </>
  )
}