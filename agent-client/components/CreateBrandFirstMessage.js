"use client";
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';

const CreateBrandFirstMessage = ({children}) => {
    const router = useRouter();
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Create a Brand First</CardTitle>
                <CardDescription>
                    {children}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Button onClick={() => router.push('/settings/brand')}>
                    Go to Brand Settings
                </Button>
            </CardContent>
        </Card>
    )
}

export default CreateBrandFirstMessage