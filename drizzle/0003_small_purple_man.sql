PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_chat_conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`messages` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_chat_conversations`("id", "user_id", "title", "messages", "created_at", "updated_at") SELECT "id", "user_id", "title", "messages", "created_at", "updated_at" FROM `chat_conversations`;--> statement-breakpoint
DROP TABLE `chat_conversations`;--> statement-breakpoint
ALTER TABLE `__new_chat_conversations` RENAME TO `chat_conversations`;--> statement-breakpoint
PRAGMA foreign_keys=ON;