
export const createPost = async (data: { title: string; content: string; [key: string]: unknown }) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/create`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            credentials: "include",
        });
        const res = await response.json();
        return res;
    } catch (error: unknown) {
        if (error instanceof Error && 'response' in error) {
            return (error as any).response.data.message;
        }
        return "An unknown error occurred";
    }
} 

export const getPosts = async (page?: number, limit?: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/get?limit=${limit}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            credentials: "include",
        });
        const res = await response.json();
        return res;
    } catch (error: unknown) {
        if (error instanceof Error && 'response' in error) {
            return (error as any).response.data.message;
        }
        return "An unknown error occurred";
    }
}