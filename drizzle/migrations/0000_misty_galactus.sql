CREATE TABLE `books` (
	`book_id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`publication_date` text NOT NULL,
	`language` text NOT NULL,
	`cover_image_url` text,
	`content` text NOT NULL
);
