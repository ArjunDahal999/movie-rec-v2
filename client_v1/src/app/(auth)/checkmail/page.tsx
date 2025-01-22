import Link from 'next/link';

import { Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function CheckMailPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md space-y-6 p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-4">
            <Mail className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>

        <p className="text-muted-foreground">
          We&apos;ve sent you a verification link to your email address. Please
          check your inbox and follow the instructions to verify your account.
        </p>

        <div className="space-y-4">
          <Button asChild variant="default" className="w-full">
            <Link href="/login">Return to login</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
