-- Drop unused tables
DROP TABLE IF EXISTS "ResearchPaper";
DROP TABLE IF EXISTS "Expertise";
DROP TABLE IF EXISTS "Stat";
DROP TABLE IF EXISTS "MarqueeItem";
DROP TABLE IF EXISTS "HeroSlide";
DROP TABLE IF EXISTS "Brief";
DROP TABLE IF EXISTS "TimelineEntry";
DROP TABLE IF EXISTS "Highlight";
DROP TABLE IF EXISTS "AtelierFact";
DROP TABLE IF EXISTS "PageHeroSpec";
DROP TABLE IF EXISTS "NavLink";

-- CreateTable BlogPost
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL DEFAULT '',
    "coverImage" TEXT,
    "body" TEXT NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE INDEX "BlogPost_published_publishedAt_idx" ON "BlogPost"("published", "publishedAt");

-- CreateTable Certificate
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "issuer" TEXT,
    "year" TEXT,
    "image" TEXT,
    "href" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- Project: relax NOT NULLs to match new schema defaults
ALTER TABLE "Project" ALTER COLUMN "n" SET DEFAULT '';
ALTER TABLE "Project" ALTER COLUMN "year" SET DEFAULT '';
ALTER TABLE "Project" ALTER COLUMN "desc" SET DEFAULT '';
ALTER TABLE "Project" ALTER COLUMN "tags" SET DEFAULT '[]';
ALTER TABLE "Project" ALTER COLUMN "image" SET DEFAULT '';
