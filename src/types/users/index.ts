import { User as PrismaUser } from 'share-ur-save-common';

export type User = Omit<PrismaUser, 'password'>;
