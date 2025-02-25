import { createSignal, createEffect } from "solid-js";
import { warn, debug, trace, info, error } from "@tauri-apps/plugin-log";

interface TimerProps {
	datetime: string;
}

export function Timer({ datetime: endTime }: TimerProps) {
	debug(JSON.stringify(endTime));
	const target = new Date(endTime).getTime();
	const [days, setDays] = createSignal(0);
	const [hours, setHours] = createSignal(0);
	const [minutes, setMinutes] = createSignal(0);
	const [seconds, setSeconds] = createSignal(0);

	createEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = target - now;

			setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
			setHours(
				Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			);
			setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
			setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

			if (distance < 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	return (
		<div class="grid grid-cols-2 gap-5 text-center">
			<div class="flex flex-col items-center justify-center p-2 bg-neutral rounded-box text-neutral-content">
				<span class="countdown font-mono text-5xl">{days()}</span>
				days
			</div>
			<div class="flex flex-col items-center justify-center p-2 bg-neutral rounded-box text-neutral-content">
				<span class="countdown font-mono text-5xl">
					<span style={{ "--value": hours() }}></span>
				</span>
				hours
			</div>
			<div class="flex flex-col items-center justify-center p-2 bg-neutral rounded-box text-neutral-content">
				<span class="countdown font-mono text-5xl">
					<span style={{ "--value": minutes() }}></span>
				</span>
				min
			</div>
			<div class="flex flex-col items-center justify-center p-2 bg-neutral rounded-box text-neutral-content">
				<span class="countdown font-mono text-5xl">
					<span style={{ "--value": seconds() }} data-value={seconds()}></span>
				</span>
				sec
			</div>
		</div>
	);
}
