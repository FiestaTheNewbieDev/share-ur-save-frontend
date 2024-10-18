import { fetchGames } from '@/services/RAWGService';

export default async function Page() {
	const response = await fetchGames();
	const data = response.data;

	return (
		<main className="mx-auto max-w-screen-2xl p-8">
			<div className="flex w-full flex-wrap justify-center gap-8"></div>
		</main>
	);
}
