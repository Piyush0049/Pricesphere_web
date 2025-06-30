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

        if (!response.ok) {
            const errorRes = await response.json();
            return { error: errorRes.message || 'Failed to create post' };
        }

        const res = await response.json();
        return res;
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: "An unknown error occurred" };
    }
};
