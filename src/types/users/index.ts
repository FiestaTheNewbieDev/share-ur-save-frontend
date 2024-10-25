export type User = {
    uuid: string;
    username: string;
    displayName: string | null;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}