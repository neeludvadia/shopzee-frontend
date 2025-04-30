import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const search = url.searchParams.get('search') || '';

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/searchProducts?search=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Server Error:', response.statusText);
            return NextResponse.json({ error: response.statusText }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        // console.error('API Error:', error.message);
        return NextResponse.json({ error: (error as Error) || 'Something went wrong' }, { status: 500 });
    }
}
