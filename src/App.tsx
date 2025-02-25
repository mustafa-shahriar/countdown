import { createSignal, createEffect, Switch, Match } from "solid-js";
import { warn, debug, trace, info, error } from "@tauri-apps/plugin-log";
import { HomePage } from "./HomePage.tsx";
import { DetailedCountdown } from "./DetailedCountdown.tsx";
import { AddCountdown } from "./AddCountdown.tsx";
import { getEvents, deleteEvent } from "./db";

export enum Page {
	Home,
	AddCountdown,
	DetailedCountdown,
}

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
	const [currentPage, setCurrentPage] = createSignal<Page>(Page.Home);
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

	const deleteEventHandler = async (id: number) => {
		try {
			await deleteEvent(id);
			await fetchEvents();
			closeDetailedView();
		} catch (err) {
			debug(String(err));
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
				datetime: new Date(
					Date.now() + Math.random() * 50 * 24 * 60 * 60 * 1000,
				).toISOString(),
			},
			{
				id: events().length + 2,
				title: `New Event ${events().length + 2}`,
				datetime: new Date(
					Date.now() + Math.random() * 50 * 24 * 60 * 60 * 1000,
				).toISOString(),
			},
		];
		setEvents([...events(), ...newEvents]);
	};

	const selectEvent = (event: CountdownEvent) => {
		setSelectedEvent(event);
		setCurrentPage(Page.DetailedCountdown);
	};

	const closeDetailedView = () => {
		setCurrentPage(Page.Home);
		setSelectedEvent(null);
	};

	return (
		<div class="min-h-screen">
			<Switch fallback={<div>Page not found</div>}>
				<Match when={currentPage() === Page.Home}>
					<HomePage
						events={events()}
						onSelectEvent={selectEvent}
						onLoadMore={loadMore}
						onAddEvent={() => setCurrentPage(Page.AddCountdown)}
					/>
				</Match>
				<Match when={currentPage() === Page.AddCountdown}>
					<AddCountdown
						onEventAdded={() => {
							fetchEvents();
							setCurrentPage(Page.Home);
						}}
						onCancelAdd={() => setCurrentPage(Page.Home)}
					/>
				</Match>
				<Match when={currentPage() === Page.DetailedCountdown}>
					<DetailedCountdown
						event={selectedEvent()!}
						onClose={closeDetailedView}
						onDelete={deleteEventHandler}
					/>
				</Match>
			</Switch>
		</div>
	);
}
