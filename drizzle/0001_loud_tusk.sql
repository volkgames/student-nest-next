CREATE TABLE "property" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price_per_month" integer NOT NULL,
	"location" text NOT NULL,
	"latitude" text NOT NULL,
	"longitude" text NOT NULL,
	"images" jsonb NOT NULL,
	"amenities" jsonb NOT NULL,
	"room_type" text NOT NULL,
	"owner_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "property_ownerId_idx" ON "property" USING btree ("owner_id");