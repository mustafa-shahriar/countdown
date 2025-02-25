import Database from "@tauri-apps/plugin-sql";
import { CountdownEvent } from "./App";

export async function createEvent(
	title: string,
	description: string,
	datetime: string,
) {
	const db = await Database.load("sqlite:test.db");
	await db.execute(
		"INSERT INTO events (title, description, datetime) VALUES (?, ?, ?)",
		[title, description, datetime],
	);
}

export async function getEvents(): Promise<CountdownEvent[]> {
	const db = await Database.load("sqlite:test.db");
	return db.select<CountdownEvent[]>(
		"SELECT id, title, description, datetime FROM events ORDER BY datetime",
	);
}

export async function updateEvent(
	id: number,
	title: string,
	description: string,
	datetime: string,
) {
	const db = await Database.load("sqlite:test.db");
	await db.execute(
		"UPDATE events SET title = ?, description = ?, datetime = ? WHERE id = ?",
		[title, description, datetime, id],
	);
}

export async function deleteEvent(id: number) {
	const db = await Database.load("sqlite:test.db");
	await db.execute("DELETE FROM events WHERE id = ?", [id]);
}
