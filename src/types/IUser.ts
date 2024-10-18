export default interface IUser {
    uuid: string;
    username: string;
    displayName: string | null;
    email: string;
    steamId: string | null;
    googleId: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}