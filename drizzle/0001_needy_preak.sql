PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_favorites` (
	`user_id` text NOT NULL,
	`question_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `question_id`)
);
--> statement-breakpoint
INSERT INTO `__new_user_favorites`("user_id", "question_id") SELECT "user_id", "question_id" FROM `user_favorites`;--> statement-breakpoint
DROP TABLE `user_favorites`;--> statement-breakpoint
ALTER TABLE `__new_user_favorites` RENAME TO `user_favorites`;--> statement-breakpoint
PRAGMA foreign_keys=ON;