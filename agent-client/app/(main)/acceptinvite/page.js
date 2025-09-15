'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function AcceptInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  console.log(token);
  
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const acceptInvitation = async () => {
      try {
        const response = await fetch(`/api/invite/accept?token=${token}`);
        const data = await response.json();
        
        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Invitation accepted successfully!');
        } else {
          setStatus('error');
          setMessage(data.message || 'Failed to accept invitation.');
        }
      } catch (error) {
        console.error('Error accepting invitation:', error);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    if (token) {
      acceptInvitation();
    } else {
      setStatus('error');
      setMessage('Invalid invitation link.');
    }
  }, [token]);

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Invitation {status === 'loading' ? 'Processing' : status === 'success' ? 'Accepted' : 'Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <p className="text-center text-muted-foreground">Processing your invitation...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-center text-lg font-medium">{message}</p>
              <p className="text-center text-muted-foreground">You can now access the brand dashboard.</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="flex flex-col items-center gap-4">
              <XCircle className="h-16 w-16 text-red-500" />
              <p className="text-center text-lg font-medium">{message}</p>
              <p className="text-center text-muted-foreground">Please contact the team administrator for assistance.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button 
            onClick={goToDashboard} 
            className="w-full max-w-xs"
            disabled={status === 'loading'}
          >
            {status === 'success' ? 'Go to Dashboard' : 'Return to Dashboard'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}