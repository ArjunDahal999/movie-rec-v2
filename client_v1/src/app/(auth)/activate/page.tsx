'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import { nodeApiClientWithoutHeader } from '@/lib/axios-config';

import { Button } from '@/components/ui/button';

const ActivatePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await nodeApiClientWithoutHeader.post(
        '/activateAccount',
        {
          email,
          token,
        }
      );
      toast.success(data.message);
      router.push('/login');
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Activate Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Click below to activate your account
          </p>
        </div>
        <form onSubmit={handleActivate} className="space-y-4">
          <Button type="submit" className="w-full">
            Activate Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ActivatePage;
