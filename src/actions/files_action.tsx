export const getSignedUrls = async (data: { files: Array<{ name: string, type: string }> }) => {
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/files/upload`, {
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
        if (error instanceof Error) {
            return error.message;
        }
        return "An unknown error occurred";
    }
}