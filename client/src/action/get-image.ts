import React, { cache } from 'react';

import axios from 'axios';

export const getImage = cache(async ({ title }: { title: string }) => {
  try {
    const { data: imageData } = await axios.get(
      `https://www.myapifilms.com/imdb/idIMDB?title=${title}&token=e7a9efa9-2cd6-46e0-89f0-5026fd325f99`
    );
    return imageData?.data?.movies[0]?.urlPoster;
  } catch (error) {
    return '/placeholder.svg';
  }
});
