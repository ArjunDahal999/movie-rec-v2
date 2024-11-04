import { Suspense } from 'react';

import { getImage } from '@/action/get-image';
import { MoviesType } from '@/types';
import { StarFilledIcon, VideoIcon } from '@radix-ui/react-icons';

import { CircleDollarSign, Clock9Icon } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogImage,
  DialogSubtitle,
  DialogTitle,
  DialogTrigger,
} from '@/components/animation/animated-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export async function DialogBasicTwo({ movieData }: { movieData: MoviesType }) {
  const imageUrl = await getImage({ title: movieData.title });
  return (
    <Dialog
      transition={{
        type: 'keyframes',
        stiffness: 200,
        damping: 24,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: '4px',
        }}
        className="rounded-sm bg-slate-100/10"
      >
        <div className="flex items-center space-x-3 p-3">
          <Suspense fallback={<span>Loadiing...</span>}>
            <DialogImage
              src={imageUrl ?? '/placeholder.svg'}
              alt="What I Talk About When I Talk About Running - book cover"
              className="h-8 w-8 object-cover object-top"
              style={{
                borderRadius: '4px',
              }}
            />
          </Suspense>
          <div className="flex flex-col items-start justify-center space-y-0">
            <DialogTitle className="font-mediumsm:text-xs text-[10px]">
              {movieData.director}
            </DialogTitle>
            <DialogSubtitle className="text-[10px]sm:text-xs">
              {movieData.title}
            </DialogSubtitle>
          </div>
        </div>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: '12px',
          }}
          className="relative z-[999] h-auto w-[500px] bg-background"
        >
          <ScrollArea className="h-[90vh]" type="scroll">
            <div className="relative p-6">
              <div className="flex justify-center py-10">
                <DialogImage
                  src={imageUrl ?? '/placeholder.svg'}
                  alt="What I Talk About When I Talk About Running - book cover"
                  className="h-auto w-[400px]"
                />
              </div>
              <div className="">
                <DialogTitle className="text-center text-3xl font-bold text-primary">
                  {movieData.title}
                </DialogTitle>
                <DialogSubtitle className="mt-6 font-light">
                  <div className="flex items-center space-x-3">
                    <VideoIcon className="text-primary" />
                    <span>Director : {movieData.director}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <StarFilledIcon className="text-primary" />
                    <span>Popularity : {movieData.popularity}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock9Icon size={16} className="text-primary" />
                    <span>Release Date : {movieData.release_date}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CircleDollarSign size={16} className="text-primary" />
                    <span>Revenue : {movieData.revenue}</span>
                  </div>
                </DialogSubtitle>
                <div className="mt-4 gap-x-3 text-sm">
                  <p>{movieData.overview}</p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogClose className="text-zinc-500" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}
