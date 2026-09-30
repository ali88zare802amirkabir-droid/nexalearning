import type { UserProfile, AppSettings } from "@/lib/types";

export const userProfile: UserProfile = {
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  avatarColor: "#55a1ff",
  role: "Student",
  dailyGoalMinutes: 60,
  preferredDifficulty: "Intermediate",
  language: "English",
  timezone: "America/Los_Angeles",
};

export const defaultSettings: AppSettings = {
  businessName: "NexaLearning",
  theme: "system",
  density: false,
  reduceMotion: false,
  notifications: {
    assignments: true,
    courses: true,
    certificates: true,
    announcements: true,
  },
};