"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import type {
  Course,
  Lesson,
  Module,
  Instructor,
  Assignment,
  Submission,
  CalendarEvent,
  Certificate,
  NotificationItem,
  AppSettings,
  UserProfile,
  Difficulty,
  Enrollment,
  StudentProgress,
  ToastMessage,
} from "@/lib/types";
import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { modules } from "@/data/modules";
import { instructors } from "@/data/instructors";
import { studentProgress, enrollments } from "@/data/progress";
import { assignments } from "@/data/assignments";
import { submissions } from "@/data/assignments";
import { certificates } from "@/data/certificates";
import { notifications } from "@/data/notifications";
import { calendarEvents } from "@/data/calendar";
import { learningActivity } from "@/data/learningActivity";
import { userProfile, defaultSettings } from "@/data/profile";
import { formatMoney, uid, formatDate } from "@/lib/utils";

export type View =
  | "overview"
  | "my-learning"
  | "courses"
  | "calendar"
  | "assignments"
  | "certificates"
  | "instructors"
  | "analytics"
  | "settings";

interface Store {
  view: View;
  setView: (v: View) => void;
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;
  toasts: ToastMessage[];
  showToast: (t: ToastMessage) => void;
  dismissToast: (id: string) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (v: boolean) => void;
  profile: UserProfile;
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
  courses: Course[];
  lessons: Lesson[];
  modules: Module[];
  instructors: Instructor[];
  enrollments: Enrollment[];
  studentProgress: StudentProgress[];
  assignments: Assignment[];
  submissions: Submission[];
  certificates: Certificate[];
  notifications: NotificationItem[];
  calendarEvents: CalendarEvent[];
  learningActivity: typeof learningActivity;
  money: (n: number) => string;
  addEnrollment: (courseId: string) => void;
  updateLessonProgress: (courseId: string, lessonId: string, status: "Not Started" | "In Progress" | "Completed") => void;
  submitAssignment: (assignmentId: string, content: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addCalendarEvent: (event: Omit<CalendarEvent, "id">) => void;
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const router = useRouter();

  const [enrollmentData, setEnrollmentData] = useState<Enrollment[]>(enrollments);
  const [progressData, setProgressData] = useState<StudentProgress[]>(studentProgress);
  const [submissionData, setSubmissionData] = useState<Submission[]>(submissions);
  const [notificationData, setNotificationData] = useState<NotificationItem[]>(notifications);
  const [calendarEventData, setCalendarEventData] = useState<CalendarEvent[]>(calendarEvents);

  const showToast = useCallback((t: ToastMessage) => {
    const id = t.id ?? uid();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addEnrollment = useCallback((courseId: string) => {
    const exists = enrollmentData.find((e) => e.courseId === courseId && e.userId === "user-01");
    if (exists) return;
    
    const newEnrollment: Enrollment = {
      id: `enr-${uid()}`,
      userId: "user-01",
      courseId,
      status: "Active",
      enrolledAt: formatDate(new Date().toISOString()),
      progress: 0,
    };
    setEnrollmentData((prev) => [newEnrollment, ...prev]);
    showToast({ title: "Enrolled successfully", variant: "success" });
  }, [enrollmentData, showToast]);

  const updateLessonProgress = useCallback((courseId: string, lessonId: string, status: "Not Started" | "In Progress" | "Completed") => {
    setProgressData((prev) => {
      const existing = prev.find((p) => p.courseId === courseId && p.lessonId === lessonId);
      if (existing) {
        return prev.map((p) =>
          p.id === existing.id
            ? { ...p, status, completedAt: status === "Completed" ? formatDate(new Date().toISOString()) : null }
            : p
        );
      }
      return [...prev, {
        id: `sp-${uid()}`,
        userId: "user-01",
        courseId,
        lessonId,
        status,
        completedAt: status === "Completed" ? formatDate(new Date().toISOString()) : null,
        watchTimeSeconds: status === "Completed" ? 1200 : 0,
      }];
    });

    // Update enrollment progress
    setEnrollmentData((prev) =>
      prev.map((e) => {
        if (e.courseId !== courseId) return e;
        const courseLessons = lessons.filter((l) => l.courseId === courseId);
        const completed = progressData.filter(
          (p) => p.courseId === courseId && p.status === "Completed"
        ).length + (status === "Completed" ? 1 : 0);
        return { ...e, progress: courseLessons.length > 0 ? completed / courseLessons.length : 0 };
      })
    );

    if (status === "Completed") {
      showToast({ title: "Lesson completed!", variant: "success" });
    }
  }, [progressData, showToast]);

  const submitAssignment = useCallback((assignmentId: string, content: string) => {
    const existing = submissionData.find((s) => s.assignmentId === assignmentId && s.userId === "user-01");
    if (existing) {
      setSubmissionData((prev) =>
        prev.map((s) =>
          s.id === existing.id ? { ...s, content, submittedAt: formatDate(new Date().toISOString()) } : s
        )
      );
    } else {
      setSubmissionData((prev) => [
        ...prev,
        {
          id: `sub-${uid()}`,
          assignmentId,
          userId: "user-01",
          content,
          submittedAt: formatDate(new Date().toISOString()),
          score: null,
          feedback: null,
          gradedAt: null,
        },
      ]);
    }
    showToast({ title: "Assignment submitted", variant: "success" });
  }, [submissionData, showToast]);

  const markNotificationRead = useCallback((id: string) => {
    setNotificationData((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotificationData((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addCalendarEvent = useCallback((event: Omit<CalendarEvent, "id">) => {
    setCalendarEventData((prev) => [
      ...prev,
      { ...event, id: `evt-${uid()}` },
    ]);
  }, []);

  const updateSettings = useCallback((s: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...s }));
  }, []);

  const value = useMemo<Store>(() => ({
    view,
    setView,
    sidebarOpen,
    sidebarCollapsed: sidebarOpen,
    toggleSidebar: () => setSidebarOpen((o) => !o),
    mobileNavOpen,
    setMobileNavOpen,
    toasts,
    showToast,
    dismissToast,
    searchOpen,
    setSearchOpen,
    notificationsOpen,
    setNotificationsOpen,
    profile: userProfile,
    settings,
    updateSettings,
    courses,
    lessons,
    modules,
    instructors,
    enrollments: enrollmentData,
    studentProgress: progressData,
    assignments,
    submissions: submissionData,
    certificates,
    notifications: notificationData,
    calendarEvents: calendarEventData,
    learningActivity,
    money: formatMoney,
    addEnrollment,
    updateLessonProgress,
    submitAssignment,
    markNotificationRead,
    markAllNotificationsRead,
    addCalendarEvent,
  }), [
    view,
    sidebarOpen,
    mobileNavOpen,
    toasts,
    searchOpen,
    notificationsOpen,
    settings,
    enrollmentData,
    progressData,
    submissionData,
    notificationData,
    calendarEventData,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const AppStoreProvider = StoreProvider;

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useApp() {
  return useStore();
}