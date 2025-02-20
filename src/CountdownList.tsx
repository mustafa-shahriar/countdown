import { For } from "solid-js";
import { CountdownItem } from "./CountdownItem";
import type { CountdownEvent } from "./App";

interface CountdownListProps {
	events: CountdownEvent[];
	onSelectEvent: (event: CountdownEvent) => void;
}

export function CountdownList(props: CountdownListProps) {
	return (
		<div class="space-y-4">
			<For
				each={props.events.sort(
					(a, b) => a.endDate.getTime() - b.endDate.getTime(),
				)}
			>
				{(event) => (
					<CountdownItem
						event={event}
						onClick={() => props.onSelectEvent(event)}
					/>
				)}
			</For>
		</div>
	);
}
