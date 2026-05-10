CREATE TYPE "public"."propertyStatus" AS ENUM('draft', 'published');--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "status" "propertyStatus" DEFAULT 'published' NOT NULL;