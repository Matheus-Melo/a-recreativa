-- CreateTable
CREATE TABLE "LessonPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalFileName" TEXT NOT NULL,
    "originalFileType" TEXT NOT NULL,
    "originalFilePath" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "discipline" TEXT,
    "gradeLevel" TEXT,
    "author" TEXT,
    "summary" TEXT,
    "objectives" TEXT,
    "skills" TEXT,
    "duration" TEXT,
    "resources" TEXT,
    "development" TEXT,
    "evaluation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
