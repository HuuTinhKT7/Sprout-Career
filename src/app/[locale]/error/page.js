"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get('message') || 'An unexpected error occurred';

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-6 w-6" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{message}</p>
          <Button
            onClick={() => router.push('/onboarding')}
            className="w-full"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}