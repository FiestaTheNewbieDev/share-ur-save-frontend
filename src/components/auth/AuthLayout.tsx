export default function AuthLayout({
	left,
	right,
}: {
	left: React.ReactNode;
	right: React.ReactNode;
}) {
	return (
		<div className="fixed top-0 flex h-screen w-screen items-center justify-center shadow-lg">
			<div className="m-8 grid h-fit w-full max-w-screen-lg grid-cols-1 shadow-lg md:h-2/3 md:grid-cols-2">
				<div className="flex flex-col items-center justify-center bg-white p-8">
					{left}
				</div>
				<div className="flex flex-col items-center justify-center bg-anthracite p-8">
					<div className="flex flex-col gap-4">{right}</div>
				</div>
			</div>
		</div>
	);
}
