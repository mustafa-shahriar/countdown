import type { CountdownEvent } from "./App";
import { Timer } from "./Timer";

interface DetailedCountdownProps {
	event: CountdownEvent;
	onClose: () => void;
}

export function DetailedCountdown(props: DetailedCountdownProps) {
	return (
		<div class="min-h-screen flex items-center justify-center">
			<div class="p-8 rounded-lg shadow-md border border-primary flex flex-col justify-center items-center gap-6">
				<h1 class="text-3xl font-bold text-center">{props.event.title}</h1>
				<Timer endDate={props.event.endDate} />
				<p class="text-center text-gray-600">
					Event Date: {props.event.endDate.toLocaleString()}
				</p>
				<div class="flex gap-6">
					<button onClick={props.onClose} class="btn btn-primary">
						Back to Home
					</button>
					<button class="btn btn-primary">Edit</button>
					<button class="btn btn-error">Delete</button>
				</div>
			</div>
		</div>
	);
}
