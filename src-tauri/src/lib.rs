use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "create Events Table",
        sql: "CREATE TABLE IF NOT EXISTS events (  
                id INTEGER PRIMARY KEY AUTOINCREMENT,  
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                datetime datetime NOT NULL  
            )",
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:test.db", migrations)
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
