import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { instructors } from "@/data/instructors";
import { studentProgress, enrollments } from "@/data/progress";
import { assignments } from "@/data/assignments";
import { submissions } from "@/data/assignments";
import { certificates } from "@/data/certificates";
import { learningActivity } from "@/data/learningActivity";
import { calendarEvents } from "@/data/calendar";
import type { LessonStatus, AssignmentStatus } from "@/lib/types";
import { calculateProgress } from "@/lib/utils";

export const metrics = {
  get coursesInProgress(): number {
    return enrollments.filter((e) => e.status === "Active").length;
  },
  get completedCourses(): number {
    return enrollments.filter((e) => e.status === "Completed").length;
  },
  get learningHours(): number {
    const totalSeconds = studentProgress.reduce((sum, p) => sum + p.watchTimeSeconds, 0);
    return Math.round(totalSeconds / 3600 * 10) / 10;
  },
  get currentStreak(): number {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split("T")[0];
      const activity = learningActivity.find((a) => a.date === dateStr);
      if (activity && activity.hours > 0) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  },
  get assignmentsDue(): number {
    const now = Date.now();
    return assignments.filter((a) => {
      const due = new Date(a.dueDate).getTime();
      return due > now && due < now + 7 * 86400000;
    }).length;
  },
  get certificates(): number {
    return certificates.length;
  },
  get totalCourses(): number {
    return courses.length;
  },
  get totalInstructors(): number {
    return instructors.length;
  },
  get averageRating(): number {
    const sum = courses.reduce((s, c) => s + c.rating, 0);
    return Math.round((sum / courses.length) * 10) / 10;
  },
};

export function getCourseProgress(courseId: string): number {
  const courseLessons = lessons.filter((l) => l.courseId === courseId);
  if (courseLessons.length === 0) return 0;
  
  const completed = studentProgress.filter(
    (p) => p.courseId === courseId && p.status === "Completed"
  ).length;
  
  return calculateProgress(completed, courseLessons.length);
}

export function getCourseCompletedLessons(courseId: string): number {
  return studentProgress.filter(
    (p) => p.courseId === courseId && p.status === "Completed"
  ).length;
}

export function getCourseTotalLessons(courseId: string): number {
  return lessons.filter((l) => l.courseId === courseId).length;
}

export function getLessonStatus(courseId: string, lessonId: string): LessonStatus {
  const progress = studentProgress.find(
    (p) => p.courseId === courseId && p.lessonId === lessonId
  );
  return progress?.status ?? "Not Started";
}

export function getUpcomingAssignments(limit = 5) {
  const now = Date.now();
  return assignments
    .filter((a) => new Date(a.dueDate).getTime() > now)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, limit);
}

export function getUpcomingEvents(limit = 5) {
  const now = Date.now();
  return calendarEvents
    .filter((e) => new Date(e.startDate).getTime() > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit);
}

export function getRecentActivity(limit = 5) {
  return learningActivity
    .filter((a) => a.hours > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getAssignmentStatus(assignmentId: string): AssignmentStatus {
  const submission = submissions.find((s) => s.assignmentId === assignmentId);
  if (!submission || !submission.submittedAt) return "Not Started";
  if (submission.score !== null) return "Graded";
  const assignment = assignments.find((a) => a.id === assignmentId);
  const due = assignment ? new Date(assignment.dueDate).getTime() : Date.now() + 86400000;
  if (Date.now() > due) return "Overdue";
  return "Submitted";
}

export function getAssignmentScore(assignmentId: string): number | null {
  const submission = submissions.find((s) => s.assignmentId === assignmentId);
  return submission?.score ?? null;
}

export function getWeeklyLearningHours(weeks = 4): { week: string; hours: number }[] {
  const result: { week: string; hours: number }[] = [];
  const now = new Date();
  
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (now.getDay() + 7 * i));
    weekStart.setHours(0, 0, 0, 0);
    
    let hours = 0;
    for (let d = 0; d < 7; d++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + d);
      const dateStr = date.toISOString().split("T")[0];
      const activity = learningActivity.find((a) => a.date === dateStr);
      if (activity) hours += activity.hours;
    }
    
    result.push({
      week: `Week ${weeks - i}`,
      hours: Math.round(hours * 10) / 10,
    });
  }
  
  return result;
}

export function getProgressOverTime(): { date: string; progress: number }[] {
  const courseIds = enrollments.filter((e) => e.status === "Active").map((e) => e.courseId);
  const result: { date: string; progress: number }[] = [];
  
  const sortedActivity = [...learningActivity].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  let cumulativeLessons = 0;
  let totalLessons = 0;
  
  courseIds.forEach((id) => {
    totalLessons += getCourseTotalLessons(id);
  });
  
  sortedActivity.forEach((day) => {
    cumulativeLessons += day.lessonsCompleted;
    const progress = totalLessons > 0 ? Math.round((cumulativeLessons / totalLessons) * 100) : 0;
    result.push({ date: day.date, progress: Math.min(progress, 100) });
  });
  
  return result;
}

export function getCourseCompletionData(): { name: string; completed: number; inProgress: number }[] {
  return courses.map((course) => {
    const progress = getCourseProgress(course.id);
    return {
      name: course.title.length > 20 ? course.title.slice(0, 20) + "..." : course.title,
      completed: progress === 100 ? 1 : 0,
      inProgress: progress > 0 && progress < 100 ? 1 : 0,
    };
  }).filter((c) => c.completed || c.inProgress);
}

export function getAssignmentPerformance(): { name: string; score: number }[] {
  return assignments
    .map((a) => ({
      name: a.title.length > 20 ? a.title.slice(0, 20) + "..." : a.title,
      score: getAssignmentScore(a.id) ?? 0,
    }))
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

export function getCategoryDistribution(): { name: string; value: number }[] {
  const categories = courses.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(categories)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getDifficultyDistribution(): { name: string; value: number }[] {
  const diffs = courses.reduce((acc, c) => {
    acc[c.difficulty] = (acc[c.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(diffs)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}