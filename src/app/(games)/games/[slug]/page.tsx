import { redirect } from 'next/navigation';

export default function Page(props: { params: { slug: string } }) {
	return redirect(`/game/${props.params.slug}`);
}
