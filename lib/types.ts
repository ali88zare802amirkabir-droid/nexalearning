export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type CourseStatus = "Published" | "Draft" | "Archived";
export type LessonStatus = "Not Started" | "In Progress" | "Completed";
export type AssignmentStatus = "Not Started" | "In Progress" | "Submitted" | "Graded" | "Overdue";
export type EnrollmentStatus = "Active" | "Completed" | "Dropped" | "Saved";
export type EventType = "Class" | "Assignment" | "Exam" | "Study Session";
export type NotificationKind = "Assignment" | "Course" | "Certificate" | "Announcement" | "Recommendation";

export interface Instructor {
  id: string;
  name: string;
  avatarColor: string;
  title: string;
  bio: string;
  specialties: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
  joinedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorId: string;
  category: string;
  difficulty: Difficulty;
  durationHours: number;
  lessonsCount: number;
  price: number;
  rating: number;
  studentsCount: number;
  status: CourseStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessonsCount: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  description: string;
  videoUrl: string;
  durationMinutes: number;
  order: number;
  resources: { name: string; url: string }[];
}

export interface StudentProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  status: LessonStatus;
  completedAt: string | null;
  watchTimeSeconds: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: string;
  maxScore: number;
  status: AssignmentStatus;
  createdAt: string;
  resources?: { name: string; url: string }[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  content: string;
  submittedAt: string;
  score: number | null;
  feedback: string | null;
  gradedAt: string | null;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  courseId: string | null;
  startDate: string;
  endDate: string;
  color: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  title: string;
  issuedAt: string;
  certificateId: string;
  instructorId: string;
}

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface LearningActivity {
  date: string;
  hours: number;
  lessonsCompleted: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarColor: string;
  role: "Student" | "Instructor" | "Admin";
  dailyGoalMinutes: number;
  preferredDifficulty: Difficulty;
  language: string;
  timezone: string;
}

export interface AppSettings {
  businessName: string;
  theme: "light" | "dark" | "system";
  density: boolean;
  reduceMotion: boolean;
  notifications: {
    assignments: boolean;
    courses: boolean;
    certificates: boolean;
    announcements: boolean;
  };
  profile?: UserProfile;
}

export interface ToastMessage {
  id?: string;
  title: string;
  desc?: string;
  variant: "success" | "info" | "danger";
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  progress: number;
}