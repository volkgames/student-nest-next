ALTER TABLE "property" ADD COLUMN "image_color" text;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "views" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "bookings" integer DEFAULT 0 NOT NULL;