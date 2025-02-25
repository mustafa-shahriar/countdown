import { createSignal, createEffect, Switch, Match } from "solid-js";
import { warn, debug, trace, info, error } from "@tauri-apps/plugin-log";
import { HomePage } from "./HomePage.tsx";
import { DetailedCountdown } from "./DetailedCountdown.tsx";
import { AddCountdown } from "./AddCountdown.tsx";
import { getEvents, deleteEvent, createEvent, updateEvent } from "./db";

export enum Page {
	Home,
	AddCountdown,
	DetailedCountdown,
	EditEvent,
}

export interface CountdownEvent {
	id: number;
	title: string;
	description: string;
	datetime: string;
}

export interface CreateEvent {
	title: string;
	description: string;
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

	const editEventHandler = async () => {
		setCurrentPage(Page.EditEvent);
	};

	createEffect(() => {
		fetchEvents();
	});

	const loadMore = () => {};

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
						onSubmitHandler={async (newEvent) => {
							await createEvent(
								newEvent.title,
								newEvent.description,
								newEvent.datetime,
							);
							await fetchEvents();
							setCurrentPage(Page.Home);
						}}
						onCancelHandler={() => setCurrentPage(Page.Home)}
						successBtnName="Add Event"
					/>
				</Match>
				<Match when={currentPage() === Page.DetailedCountdown}>
					<DetailedCountdown
						event={selectedEvent()!}
						onClose={closeDetailedView}
						onDelete={deleteEventHandler}
						onEdit={editEventHandler}
					/>
				</Match>
				<Match when={currentPage() === Page.EditEvent}>
					<AddCountdown
						onSubmitHandler={async (newEvent) => {
							await updateEvent(
								selectedEvent()?.id!,
								newEvent.title,
								newEvent.description,
								newEvent.datetime,
							);
							await fetchEvents();
							setCurrentPage(Page.Home);
						}}
						onCancelHandler={() => setCurrentPage(Page.Home)}
						successBtnName="Save"
						defaultValues={{
							title: selectedEvent()?.title!,
							description: selectedEvent()?.description!,
							datetime: selectedEvent()?.datetime!,
						}}
					/>
				</Match>
			</Switch>
		</div>
	);
}
