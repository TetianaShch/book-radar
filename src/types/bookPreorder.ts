export interface BookPreorder {
    id: string;
    title: string;
    author: string;
    preorderDate: string | null;
    status: "saved" | "preordered" | "completed";
    url: string;
    createdAt: string;
}


