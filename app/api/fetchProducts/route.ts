import { NextResponse} from 'next/server';

export async function POST(req: Request):Promise<NextResponse> {
    try {
        const body = await req.json();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/products`, {
            method: "post",
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
    } catch (error) {
        return NextResponse.json({ error: (error as Error)?.message || 'Something went wrong' }, { status: 500 });
    }
}
