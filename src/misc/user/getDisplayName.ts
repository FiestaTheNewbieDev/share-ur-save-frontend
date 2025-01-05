import { User } from '@/types/users';

export default function getDisplayName(user: User) {
	return user.displayName || user.username;
}
