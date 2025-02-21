CREATE TABLE `chat_conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text DEFAULT '',
	`messages` text DEFAULT '[]',
	`created_at` integer,
	`updated_at` integer
);
