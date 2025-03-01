

export async function POST(request: Request) {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');
    
}