
export const createPost = async (data: any) => {
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
    } catch (error: any) {
        return error.response.data.message
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
    } catch (error: any) {
        return error.response.data.message
    }
}   