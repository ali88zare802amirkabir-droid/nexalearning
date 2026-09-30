"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { settings, updateSettings, profile } = useApp();
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" subtitle="Manage your learning experience" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Profile</h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Name
              <TextInput value={profile.name} onChange={(e) => updateSettings({ profile: { ...profile, name: e.target.value } })} />
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Email
              <TextInput type="email" value={profile.email} onChange={(e) => updateSettings({ profile: { ...profile, email: e.target.value } })} />
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Role
              <Select value={profile.role} onChange={(e) => updateSettings({ profile: { ...profile, role: e.target.value as "Student" | "Instructor" | "Admin" } })}>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Admin">Admin</option>
              </Select>
            </label>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Learning Preferences</h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Daily Goal (minutes)
              <TextInput type="number" value={profile.dailyGoalMinutes} onChange={(e) => updateSettings({ profile: { ...profile, dailyGoalMinutes: Number(e.target.value) } })} />
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Preferred Difficulty
              <Select value={profile.preferredDifficulty} onChange={(e) => updateSettings({ profile: { ...profile, preferredDifficulty: e.target.value as "Beginner" | "Intermediate" | "Advanced" } })}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Select>
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Language
              <Select value={profile.language} onChange={(e) => updateSettings({ profile: { ...profile, language: e.target.value } })}>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </Select>
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Timezone
              <Select value={profile.timezone} onChange={(e) => updateSettings({ profile: { ...profile, timezone: e.target.value } })}>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Asia/Shanghai">Shanghai</option>
              </Select>
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Notifications</h2>
          <div className="flex flex-col gap-4">
            {[
              { key: "assignments", label: "Assignment Reminders", desc: "Get notified before assignments are due" },
              { key: "courses", label: "Course Announcements", desc: "New content and updates from instructors" },
              { key: "certificates", label: "Certificates", desc: "When you earn a new certificate" },
              { key: "announcements", label: "Platform Announcements", desc: "Important updates from NexaLearning" },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-ink">{n.label}</p>
                  <p className="text-[11.5px] text-ink-3">{n.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ notifications: { ...settings.notifications, [n.key]: !settings.notifications[n.key as keyof typeof settings.notifications] } })}
                  className={cn("h-8 w-12 rounded-full transition-colors", settings.notifications[n.key as keyof typeof settings.notifications] ? "bg-accent" : "bg-surface-2")}
                  aria-label={n.label}
                >
                  <span className={cn("h-6 w-6 rounded-full bg-white shadow transition-transform", settings.notifications[n.key as keyof typeof settings.notifications] ? "translate-x-4" : "translate-x-1")} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Appearance</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-ink">Dark / Light Theme</p>
                <p className="text-[11.5px] text-ink-3">Toggle between themes</p>
              </div>
              <button
                type="button"
                onClick={() => { document.documentElement.classList.toggle("light"); localStorage.setItem("nexalearning-theme", document.documentElement.classList.contains("light") ? "light" : ""); }}
                className="h-8 w-12 rounded-full bg-accent relative transition-colors"
                aria-label="Toggle theme"
              >
                <span className="absolute top-1 right-1 h-6 w-6 rounded-full bg-white shadow transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-ink">Compact Density</p>
                <p className="text-[11.5px] text-ink-3">Reduce spacing</p>
              </div>
              <button type="button" onClick={() => updateSettings({ density: !settings.density })} className={cn("h-8 w-12 rounded-full transition-colors", settings.density ? "bg-accent" : "bg-surface-2")} aria-label="Toggle density">
                <span className={cn("h-6 w-6 rounded-full bg-white shadow transition-transform", settings.density ? "translate-x-4" : "translate-x-1")} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-ink">Reduce Motion</p>
                <p className="text-[11.5px] text-ink-3">Minimize animations</p>
              </div>
              <button type="button" onClick={() => updateSettings({ reduceMotion: !settings.reduceMotion })} className={cn("h-8 w-12 rounded-full transition-colors", settings.reduceMotion ? "bg-accent" : "bg-surface-2")} aria-label="Toggle motion">
                <span className={cn("h-6 w-6 rounded-full bg-white shadow transition-transform", settings.reduceMotion ? "translate-x-4" : "translate-x-1")} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-4 left-4 rounded-xl bg-ok/90 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          Settings saved!
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <Button onClick={save}>Save Settings</Button>
      </div>
    </div>
  );
}