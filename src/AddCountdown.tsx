import { createSignal } from "solid-js";
import { createEvent } from "./db";

interface AddCountdownProps {
	onEventAdded: () => void;
}

export function AddCountdown(props: AddCountdownProps) {
	const [title, setTitle] = createSignal("");
	const [description, setDescription] = createSignal("");
	const [datetime, setDatetime] = createSignal("");
	const [error, setError] = createSignal<string | null>(null);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		try {
			await createEvent(title(), description(), datetime());
			setTitle("");
			setDescription("");
			setDatetime("");
			setError(null);
			props.onEventAdded(); // Call the callback to refetch events
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
						<span class="label-text">End Date</span>
					</label>
					<input
						type="datetime-local"
						value={datetime()}
						onInput={(e) => setDatetime(e.currentTarget.value)}
						class="input input-bordered w-full"
						required
					/>
				</div>
				<div class="text-center">
					<button type="submit" class="btn btn-primary">
						Add Event
					</button>
				</div>
			</form>
		</div>
	);
}

