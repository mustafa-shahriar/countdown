import { createSignal, createEffect } from "solid-js";
import { HomePage } from "./HomePage.tsx";
import { DetailedCountdown } from "./DetailedCountdown.tsx";

export interface CountdownEvent {
	id: number;
	title: string;
	endDate: Date;
}

export default function App() {
	const [events, setEvents] = createSignal<CountdownEvent[]>([]);
	const [selectedEvent, setSelectedEvent] = createSignal<CountdownEvent | null>(
		null,
	);

	createEffect(() => {
		setEvents([
			{
				id: 1,
				title: "Next Football Match",
				endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
			},
			{
				id: 2,
				title: "Movie Release",
				endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
			},
			{
				id: 3,
				title: "Exam Date",
				endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
			},
			{
				id: 4,
				title: "Concert",
				endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
			},
			{
				id: 5,
				title: "Holiday",
				endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			},
			{
				id: 6,
				title: "Holiday",
				endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			},
		]);
	});

	const loadMore = () => {
		// Simulating loading more events
		const newEvents = [
			{
				id: events().length + 1,
				title: `New Event ${events().length + 1}`,
				endDate: new Date(
					Date.now() + Math.random() * 50 * 24 * 60 * 60 * 1000,
				),
			},
			{
				id: events().length + 2,
				title: `New Event ${events().length + 2}`,
				endDate: new Date(
					Date.now() + Math.random() * 50 * 24 * 60 * 60 * 1000,
				),
			},
		];
		setEvents([...events(), ...newEvents]);
	};

	const selectEvent = (event: CountdownEvent) => {
		setSelectedEvent(event);
	};

	const closeDetailedView = () => {
		setSelectedEvent(null);
	};

	return (
		<div class="min-h-screen">
			{selectedEvent() ? (
				<DetailedCountdown
					event={selectedEvent()!}
					onClose={closeDetailedView}
				/>
			) : (
				<HomePage
					events={events()}
					onSelectEvent={selectEvent}
					onLoadMore={loadMore}
				/>
			)}
		</div>
	);
}
