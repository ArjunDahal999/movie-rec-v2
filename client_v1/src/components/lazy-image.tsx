import React from 'react';

import Image from 'next/image';

import axios from 'axios';

const GetLazyImage = async ({ title }: { title: any }): Promise<any> => {
  try {
    const { data: imageData } = await axios.get(
      `https://www.myapifilms.com/imdb/idIMDB?title=${title}&token=e7a9efa9-2cd6-46e0-89f0-5026fd325f99`
    );
    if (imageData)
      return (
        <Image
          alt="Movie Poster"
          className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          height="825"
          width="550"
          src={imageData?.data?.movies[0]?.urlPoster!}
        />
      );
    return (
      <Image
        alt="Movie Poster"
        className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
        height="825"
        width="550"
        src={'/placeholder.svg'}
      />
    );
  } catch (error) {
    return (
      <Image
        alt="Movie Poster"
        className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
        height="825"
        width="550"
        src={'/placeholder.svg'}
      />
    );
  }
};

export default GetLazyImage;
