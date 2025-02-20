import type { CountdownEvent } from "./App.tsx";
import { CountdownList } from "./CountdownList";

interface HomePageProps {
	events: CountdownEvent[];
	onSelectEvent: (event: CountdownEvent) => void;
	onLoadMore: () => void;
}

export function HomePage(props: HomePageProps) {
	return (
		<div class="container mx-auto px-4 py-8">
			<h1 class="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>
			<CountdownList
				events={props.events.slice(0, 5)}
				onSelectEvent={props.onSelectEvent}
			/>
			{props.events.length > 5 && (
				<div class="mt-6 text-center">
					<button
						onClick={props.onLoadMore}
						class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
					>
						Load More
					</button>
				</div>
			)}
		</div>
	);
}
