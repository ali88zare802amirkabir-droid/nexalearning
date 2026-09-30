import type { CalendarEvent } from "@/lib/types";

export const calendarEvents: CalendarEvent[] = [
  // Classes
  { id: "evt-01", title: "React & TypeScript: Advanced Hooks", type: "Class", courseId: "crs-01", startDate: "2024-04-10T10:00:00", endDate: "2024-04-10T11:30:00", color: "#55a1ff" },
  { id: "evt-02", title: "Machine Learning: Neural Networks Intro", type: "Class", courseId: "crs-02", startDate: "2024-04-11T14:00:00", endDate: "2024-04-11T15:30:00", color: "#55a1ff" },
  { id: "evt-03", title: "UX Design: Prototyping Workshop", type: "Class", courseId: "crs-05", startDate: "2024-04-12T09:00:00", endDate: "2024-04-12T10:30:00", color: "#55a1ff" },
  { id: "evt-04", title: "Kubernetes: Networking Deep Dive", type: "Class", courseId: "crs-07", startDate: "2024-04-15T16:00:00", endDate: "2024-04-15T17:30:00", color: "#55a1ff" },
  { id: "evt-05", title: "Data Science: Feature Engineering", type: "Class", courseId: "crs-09", startDate: "2024-04-16T11:00:00", endDate: "2024-04-16T12:30:00", color: "#55a1ff" },
  { id: "evt-06", title: "React & TypeScript: Redux Toolkit", type: "Class", courseId: "crs-01", startDate: "2024-04-17T10:00:00", endDate: "2024-04-17T11:30:00", color: "#55a1ff" },
  { id: "evt-07", title: "ML Fundamentals: Model Evaluation", type: "Class", courseId: "crs-02", startDate: "2024-04-18T14:00:00", endDate: "2024-04-18T15:30:00", color: "#55a1ff" },
  { id: "evt-08", title: "UX Design: Accessibility Testing", type: "Class", courseId: "crs-05", startDate: "2024-04-19T09:00:00", endDate: "2024-04-19T10:30:00", color: "#55a1ff" },

  // Assignment deadlines
  { id: "evt-09", title: "Due: Todo App Assignment", type: "Assignment", courseId: "crs-01", startDate: "2024-04-15T23:59:00", endDate: "2024-04-15T23:59:00", color: "#fbbf24" },
  { id: "evt-10", title: "Due: Linear Regression Assignment", type: "Assignment", courseId: "crs-02", startDate: "2024-03-30T23:59:00", endDate: "2024-03-30T23:59:00", color: "#fbbf24" },
  { id: "evt-11", title: "Due: User Research Plan", type: "Assignment", courseId: "crs-05", startDate: "2024-02-28T23:59:00", endDate: "2024-02-28T23:59:00", color: "#fbbf24" },
  { id: "evt-12", title: "Due: EDA Report", type: "Assignment", courseId: "crs-09", startDate: "2024-03-15T23:59:00", endDate: "2024-03-15T23:59:00", color: "#fbbf24" },
  { id: "evt-13", title: "Due: Custom Hooks Library", type: "Assignment", courseId: "crs-01", startDate: "2024-04-30T23:59:00", endDate: "2024-04-30T23:59:00", color: "#fbbf24" },
  { id: "evt-14", title: "Due: Decision Trees Assignment", type: "Assignment", courseId: "crs-02", startDate: "2024-04-15T23:59:00", endDate: "2024-04-15T23:59:00", color: "#fbbf24" },
  { id: "evt-15", title: "Due: Figma Prototype", type: "Assignment", courseId: "crs-05", startDate: "2024-03-20T23:59:00", endDate: "2024-03-20T23:59:00", color: "#fbbf24" },

  // Exams
  { id: "evt-16", title: "Midterm: React & TypeScript", type: "Exam", courseId: "crs-01", startDate: "2024-05-01T10:00:00", endDate: "2024-05-01T12:00:00", color: "#fb7185" },
  { id: "evt-17", title: "Final: Machine Learning Fundamentals", type: "Exam", courseId: "crs-02", startDate: "2024-05-10T14:00:00", endDate: "2024-05-10T16:00:00", color: "#fb7185" },
  { id: "evt-18", title: "Midterm: UX Design Principles", type: "Exam", courseId: "crs-05", startDate: "2024-04-20T09:00:00", endDate: "2024-04-20T11:00:00", color: "#fb7185" },

  // Study sessions
  { id: "evt-19", title: "Study Session: React Patterns", type: "Study Session", courseId: "crs-01", startDate: "2024-04-13T19:00:00", endDate: "2024-04-13T20:30:00", color: "#34d399" },
  { id: "evt-20", title: "Study Group: ML Algorithms", type: "Study Session", courseId: "crs-02", startDate: "2024-04-14T18:00:00", endDate: "2024-04-14T19:30:00", color: "#34d399" },
];