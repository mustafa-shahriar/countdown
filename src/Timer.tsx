import { createSignal, createEffect } from "solid-js";

interface TimerProps {
	endDate: Date;
}

export function Timer({ endDate: endTime }: TimerProps) {
	const target = endTime.getTime();
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
		<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
			<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
				<span class="countdown font-mono text-5xl">
					<span style={{ "--value": days() }}></span>
				</span>
				days
			</div>
			<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
				<span class="countdown font-mono text-5xl">
					<span style={{ "--value": hours() }}></span>
				</span>
				hours
			</div>
			<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
				<span class="countdown font-mono text-5xl">
					<span style={{ "--value": minutes() }}></span>
				</span>
				min
			</div>
			<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
				<span class="countdown font-mono text-5xl">
					<span style={{ "--value": seconds() }} data-value={seconds()}></span>
				</span>
				sec
			</div>
		</div>
	);
}
