import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`resume_experience_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume_experience\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_experience_highlights_order_idx\` ON \`resume_experience_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_experience_highlights_parent_id_idx\` ON \`resume_experience_highlights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_experience\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`company\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`url\` text,
  	\`start_date\` text NOT NULL,
  	\`end_date\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_experience_order_idx\` ON \`resume_experience\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_experience_parent_id_idx\` ON \`resume_experience\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_education\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`institution\` text NOT NULL,
  	\`degree\` text NOT NULL,
  	\`start_date\` text,
  	\`end_date\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_education_order_idx\` ON \`resume_education\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_education_parent_id_idx\` ON \`resume_education\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_skills_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume_skills\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_skills_items_order_idx\` ON \`resume_skills_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_skills_items_parent_id_idx\` ON \`resume_skills_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_skills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_skills_order_idx\` ON \`resume_skills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_skills_parent_id_idx\` ON \`resume_skills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_certifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`issuer\` text,
  	\`date\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_certifications_order_idx\` ON \`resume_certifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_certifications_parent_id_idx\` ON \`resume_certifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`headline\` text,
  	\`summary\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`resume_experience_highlights\`;`)
  await db.run(sql`DROP TABLE \`resume_experience\`;`)
  await db.run(sql`DROP TABLE \`resume_education\`;`)
  await db.run(sql`DROP TABLE \`resume_skills_items\`;`)
  await db.run(sql`DROP TABLE \`resume_skills\`;`)
  await db.run(sql`DROP TABLE \`resume_certifications\`;`)
  await db.run(sql`DROP TABLE \`resume\`;`)
}
