import { createSignal } from "solid-js";
import { CreateEvent } from "./App";

interface AddCountdownProps {
	defaultValues?: CreateEvent;
	successBtnName: string;
	onSubmitHandler: (event: CreateEvent) => void;
	onCancelHandler: () => void;
}

export function AddCountdown(props: AddCountdownProps) {
	const [title, setTitle] = createSignal(props.defaultValues?.title || "");
	const [description, setDescription] = createSignal(
		props.defaultValues?.description || "",
	);
	const [defaultDate, defaultTime] =
		props.defaultValues?.datetime?.split("T") || [];
	const [date, setDate] = createSignal(defaultDate || "");
	const [time, setTime] = createSignal(defaultTime || "");
	const [error, setError] = createSignal<string | null>(null);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		try {
			props.onSubmitHandler({
				title: title(),
				description: description(),
				datetime: date() + "T" + time(),
			});
			setTitle("");
			setDescription("");
			setDate("");
			setTime("");
			setError(null);
		} catch (err) {
			setError("Failed to add event. Please try again.");
		}
	};

	return (
		<div class="container mx-auto px-4 py-8">
			<h1 class="text-3xl font-bold mb-6 text-center">
				Add New Countdown Event
			</h1>
			{error() && <div class="alert alert-error">{error()}</div>}
			<form onSubmit={handleSubmit} class="space-y-4">
				<div class="form-control">
					<label class="label">
						<span class="label-text">Title</span>
					</label>
					<input
						type="text"
						value={title()}
						onInput={(e) => setTitle(e.currentTarget.value)}
						class="input input-bordered w-full"
						required
					/>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text">Description</span>
					</label>
					<input
						type="text"
						value={description()}
						onInput={(e) => setDescription(e.currentTarget.value)}
						class="input input-bordered w-full"
						required
					/>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text">Date</span>
					</label>
					<input
						type="date"
						value={date()}
						onInput={(e) => setDate(e.currentTarget.value)}
						class="input input-bordered w-full"
						required
					/>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text">Time</span>
					</label>
					<input
						type="time"
						value={time()}
						onInput={(e) => setTime(e.currentTarget.value)}
						class="input input-bordered w-full"
						required
					/>
				</div>
				<div class="text-center flex gap-5 flex-1 justify-center">
					<button type="submit" class="btn btn-primary">
						{props.successBtnName}
					</button>
				</div>
			</form>

			<div class="text-center mt-5">
				<button class="btn btn-error" onClick={props.onCancelHandler}>
					Cancel
				</button>
			</div>
		</div>
	);
}
