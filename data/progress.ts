import type { StudentProgress, Enrollment, EnrollmentStatus } from "@/lib/types";

const progresses: StudentProgress[] = [
  // User enrolled in courses with varying progress
  { id: "sp-01", userId: "user-01", courseId: "crs-01", lessonId: "les-01-1-1", status: "Completed", completedAt: "2024-03-15", watchTimeSeconds: 1200 },
  { id: "sp-02", userId: "user-01", courseId: "crs-01", lessonId: "les-01-1-2", status: "Completed", completedAt: "2024-03-15", watchTimeSeconds: 900 },
  { id: "sp-03", userId: "user-01", courseId: "crs-01", lessonId: "les-01-1-3", status: "Completed", completedAt: "2024-03-16", watchTimeSeconds: 1500 },
  { id: "sp-04", userId: "user-01", courseId: "crs-01", lessonId: "les-01-1-4", status: "Completed", completedAt: "2024-03-16", watchTimeSeconds: 1800 },
  { id: "sp-05", userId: "user-01", courseId: "crs-01", lessonId: "les-01-1-5", status: "Completed", completedAt: "2024-03-17", watchTimeSeconds: 2100 },
  { id: "sp-06", userId: "user-01", courseId: "crs-01", lessonId: "les-01-1-6", status: "In Progress", completedAt: null, watchTimeSeconds: 600 },
  { id: "sp-07", userId: "user-01", courseId: "crs-01", lessonId: "les-01-1-7", status: "Not Started", completedAt: null, watchTimeSeconds: 0 },
  { id: "sp-08", userId: "user-01", courseId: "crs-01", lessonId: "les-01-1-8", status: "Not Started", completedAt: null, watchTimeSeconds: 0 },
  // TypeScript module - partially done
  { id: "sp-09", userId: "user-01", courseId: "crs-01", lessonId: "les-01-2-1", status: "Completed", completedAt: "2024-03-18", watchTimeSeconds: 1800 },
  { id: "sp-10", userId: "user-01", courseId: "crs-01", lessonId: "les-01-2-2", status: "Completed", completedAt: "2024-03-18", watchTimeSeconds: 1600 },
  { id: "sp-11", userId: "user-01", courseId: "crs-01", lessonId: "les-01-2-3", status: "Completed", completedAt: "2024-03-19", watchTimeSeconds: 2000 },
  { id: "sp-12", userId: "user-01", courseId: "crs-01", lessonId: "les-01-2-4", status: "In Progress", completedAt: null, watchTimeSeconds: 800 },
  // Course 2 - Machine Learning
  { id: "sp-13", userId: "user-01", courseId: "crs-02", lessonId: "les-02-1-1", status: "Completed", completedAt: "2024-02-10", watchTimeSeconds: 1500 },
  { id: "sp-14", userId: "user-01", courseId: "crs-02", lessonId: "les-02-1-2", status: "Completed", completedAt: "2024-02-11", watchTimeSeconds: 1800 },
  { id: "sp-15", userId: "user-01", courseId: "crs-02", lessonId: "les-02-1-3", status: "Completed", completedAt: "2024-02-12", watchTimeSeconds: 2100 },
  // Course 5 - UX Design
  { id: "sp-16", userId: "user-01", courseId: "crs-05", lessonId: "les-05-1-1", status: "Completed", completedAt: "2024-01-20", watchTimeSeconds: 1400 },
  { id: "sp-17", userId: "user-01", courseId: "crs-05", lessonId: "les-05-1-2", status: "Completed", completedAt: "2024-01-21", watchTimeSeconds: 1600 },
  { id: "sp-18", userId: "user-01", courseId: "crs-05", lessonId: "les-05-1-3", status: "In Progress", completedAt: null, watchTimeSeconds: 500 },
  // Course 7 - Kubernetes
  { id: "sp-19", userId: "user-01", courseId: "crs-07", lessonId: "les-07-1-1", status: "Completed", completedAt: "2024-03-01", watchTimeSeconds: 1800 },
  { id: "sp-20", userId: "user-01", courseId: "crs-07", lessonId: "les-07-1-2", status: "Completed", completedAt: "2024-03-02", watchTimeSeconds: 2200 },
  // Course 9 - Data Science
  { id: "sp-21", userId: "user-01", courseId: "crs-09", lessonId: "les-09-1-1", status: "Completed", completedAt: "2024-02-01", watchTimeSeconds: 1500 },
  { id: "sp-22", userId: "user-01", courseId: "crs-09", lessonId: "les-09-1-2", status: "Completed", completedAt: "2024-02-02", watchTimeSeconds: 1800 },
  { id: "sp-23", userId: "user-01", courseId: "crs-09", lessonId: "les-09-1-3", status: "Completed", completedAt: "2024-02-03", watchTimeSeconds: 1600 },
  { id: "sp-24", userId: "user-01", courseId: "crs-09", lessonId: "les-09-1-4", status: "Completed", completedAt: "2024-02-04", watchTimeSeconds: 2000 },
  { id: "sp-25", userId: "user-01", courseId: "crs-09", lessonId: "les-09-1-5", status: "Completed", completedAt: "2024-02-05", watchTimeSeconds: 1900 },
];

export const studentProgress = progresses;

export const enrollments: Enrollment[] = [
  { id: "enr-01", userId: "user-01", courseId: "crs-01", status: "Active" as EnrollmentStatus, enrolledAt: "2024-03-10", progress: 0.32 },
  { id: "enr-02", userId: "user-01", courseId: "crs-02", status: "Active" as EnrollmentStatus, enrolledAt: "2024-02-01", progress: 0.18 },
  { id: "enr-03", userId: "user-01", courseId: "crs-05", status: "Active" as EnrollmentStatus, enrolledAt: "2024-01-15", progress: 0.25 },
  { id: "enr-04", userId: "user-01", courseId: "crs-07", status: "Active" as EnrollmentStatus, enrolledAt: "2024-02-20", progress: 0.12 },
  { id: "enr-05", userId: "user-01", courseId: "crs-09", status: "Completed" as EnrollmentStatus, enrolledAt: "2024-01-20", progress: 1.0 },
  { id: "enr-06", userId: "user-01", courseId: "crs-03", status: "Active" as EnrollmentStatus, enrolledAt: "2024-04-01", progress: 0.05 },
  { id: "enr-07", userId: "user-01", courseId: "crs-15", status: "Active" as EnrollmentStatus, enrolledAt: "2024-03-25", progress: 0.08 },
  { id: "enr-08", userId: "user-01", courseId: "crs-11", status: "Saved" as EnrollmentStatus, enrolledAt: "2024-04-01", progress: 0.0 },
];