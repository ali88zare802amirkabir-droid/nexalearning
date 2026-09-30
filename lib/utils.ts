import { assignments } from "@/data/assignments";
import { submissions } from "@/data/assignments";
import { studentProgress } from "@/data/progress";
import { lessons } from "@/data/lessons";

export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}

export function formatMoney(value: number, currency = "$"): string {
  if (value >= 1_000_000) return `${currency}${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${currency}${(value / 1_000).toFixed(1)}K`;
  return `${currency}${value.toLocaleString()}`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export function formatDate(date: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
}

export function formatRelativeTime(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Beginner": return "text-ok bg-ok/10";
    case "Intermediate": return "text-warn bg-warn/10";
    case "Advanced": return "text-danger bg-danger/10";
    default: return "text-ink-3 bg-surface-2";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "Published": return "text-ok bg-ok/10";
    case "Draft": return "text-ink-3 bg-surface-2";
    case "Archived": return "text-ink-3 bg-surface-2";
    case "Active": return "text-ok bg-ok/10";
    case "Completed": return "text-accent bg-accent/10";
    case "In Progress": return "text-warn bg-warn/10";
    case "Submitted": return "text-accent bg-accent/10";
    case "Graded": return "text-ok bg-ok/10";
    case "Overdue": return "text-danger bg-danger/10";
    case "Not Started": return "text-ink-3 bg-surface-2";
    default: return "text-ink-3 bg-surface-2";
  }
}

export function getEventColor(type: string): string {
  switch (type) {
    case "Class": return "#55a1ff";
    case "Assignment": return "#fbbf24";
    case "Exam": return "#fb7185";
    case "Study Session": return "#34d399";
    default: return "#55a1ff";
  }
}

export function relMins(mins: number): string {
  const m = Math.max(0, Math.round(mins));
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function getAssignmentStatus(assignmentId: string): "Not Started" | "In Progress" | "Submitted" | "Graded" | "Overdue" {
  const assignment = assignments.find((a) => a.id === assignmentId);
  if (!assignment) return "Not Started";
  const submission = submissions.find((s) => s.assignmentId === assignmentId && s.userId === "user-01");
  if (!submission || !submission.submittedAt) return "Not Started";
  if (submission.score !== null) return "Graded";
  const due = new Date(assignment.dueDate).getTime();
  if (Date.now() > due) return "Overdue";
  return "Submitted";
}

export function getAssignmentScore(assignmentId: string): number | null {
  const submission = submissions.find((s) => s.assignmentId === assignmentId && s.userId === "user-01");
  return submission?.score ?? null;
}

export function getLessonStatus(courseId: string, lessonId: string): "Not Started" | "In Progress" | "Completed" {
  const progress = studentProgress.find((p) => p.courseId === courseId && p.lessonId === lessonId);
  return progress?.status ?? "Not Started";
}

export function getCourseProgress(courseId: string): number {
  const courseLessons = lessons.filter((l) => l.courseId === courseId);
  if (courseLessons.length === 0) return 0;
  const completed = studentProgress.filter((p) => p.courseId === courseId && p.status === "Completed").length;
  return Math.round((completed / courseLessons.length) * 100);
}