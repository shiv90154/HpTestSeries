-- Site of the latest login; emails use it (falling back to signupSite) so a student who moved to pb gets pb links.
ALTER TABLE "user" ADD COLUMN "lastSite" TEXT;
