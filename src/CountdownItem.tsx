import type { CountdownEvent } from "./App";
import { TimerForList } from "./TimerForList.tsx";

interface CountdownItemProps {
	event: CountdownEvent;
	onClick: () => void;
}

export function CountdownItem(props: CountdownItemProps) {
	return (
		<div
			class="p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow flex flex-col justify-between items-center border border-primary"
			onClick={props.onClick}
		>
			<h2 class="text-xl font-semibold mb-2">{props.event.title}</h2>

			<TimerForList datetime={props.event.datetime} />
		</div>
	);
}
