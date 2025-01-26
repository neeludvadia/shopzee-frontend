import { NextResponse} from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body)
            
        });

        if (!response.ok) {
            console.log(response.statusText,"server error message")
            throw new Error(`Error: ${response.statusText}`);
        }

        const Response = await response.json();
        return NextResponse.json(Response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Something went wrong' }).status;
    }
}
