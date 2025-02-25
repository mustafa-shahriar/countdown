import { createSignal, createEffect, Show } from "solid-js";
import { warn, debug, trace, info, error } from "@tauri-apps/plugin-log";
import { HomePage } from "./HomePage.tsx";
import { DetailedCountdown } from "./DetailedCountdown.tsx";
import { AddCountdown } from "./AddCountdown.tsx";
import { getEvents } from "./db";

export interface CountdownEvent {
	id: number;
	title: string;
	datetime: string;
}

export default function App() {
	const [events, setEvents] = createSignal<CountdownEvent[]>([]);
	const [selectedEvent, setSelectedEvent] = createSignal<CountdownEvent | null>(
		null,
	);
	const [showAddPage, setShowAddPage] = createSignal(false);
	const [error, setError] = createSignal<string | null>(null);
	const fetchEvents = async () => {
		try {
			const data = await getEvents();
			debug(JSON.stringify(data));

			setEvents(data);
			setError(null);
		} catch (err) {
			console.error(err);
			setError(String(err));
		}
	};

	createEffect(() => {
		fetchEvents();
	});

	const loadMore = () => {
		const newEvents = [
			{
				id: events().length + 1,
				title: `New Event ${events().length + 1}`,
				end_date: new Date(
					Date.now() + Math.random() * 50 * 24 * 60 * 60 * 1000,
				).toISOString(),
			},
			{
				id: events().length + 2,
				title: `New Event ${events().length + 2}`,
				end_date: new Date(
					Date.now() + Math.random() * 50 * 24 * 60 * 60 * 1000,
				).toISOString(),
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
			<Show when={showAddPage()}>
				<AddCountdown onEventAdded={fetchEvents} />
			</Show>
			<Show when={!showAddPage() && selectedEvent()}>
				<DetailedCountdown
					event={selectedEvent()!}
					onClose={closeDetailedView}
				/>
			</Show>
			<Show when={!showAddPage() && !selectedEvent()}>
				<HomePage
					events={events()}
					onSelectEvent={selectEvent}
					onLoadMore={loadMore}
				/>
			</Show>
			<Show when={!!error()}>
				<div class="alert alert-error">{error()}</div>
			</Show>
			<div class="fixed bottom-4 right-4">
				<button
					onClick={() => setShowAddPage(!showAddPage())}
					class="btn btn-primary"
				>
					{showAddPage() ? "Back to Home" : "Add Event"}
				</button>
			</div>
		</div>
	);
}
