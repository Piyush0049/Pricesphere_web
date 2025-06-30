

export const createProject = async (data: { name: string; description: string; [key: string]: unknown }) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/project/create`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
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

export const getProject = async (page: number, limit: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/project/get?limit=${limit}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
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