"use client";

import { Plus, BookOpen, Clock, Flame, Calendar, Award, CheckCircle2, XCircle, ClipboardList } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { metrics, getUpcomingAssignments, getUpcomingEvents, getRecentActivity, getWeeklyLearningHours, getCategoryDistribution, getDifficultyDistribution } from "@/lib/metrics";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatMoney, formatDuration } from "@/lib/utils";
import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { studentProgress } from "@/data/progress";
import { Button } from "@/components/ui/button";
import { SimpleTrendChart } from "@/components/charts/trend";
import { CountBarChart } from "@/components/charts/bars";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function OverviewPage() {
  const [formOpen, setFormOpen] = useState(false);
  const upcomAssignments = getUpcomingAssignments(3);
  const upcomEvents = getUpcomingEvents(3);
  const recentActivity = getRecentActivity(5);
  const activeCourses = metrics.coursesInProgress;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Overview"
        subtitle={`Welcome back — ${metrics.coursesInProgress} courses in progress, ${metrics.learningHours}h learned`}
        actions={
          <Button size="sm" onClick={() => setFormOpen(true)}>
            <Plus className="ms-1.5 size-4" /> Browse Courses
          </Button>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "In Progress", value: metrics.coursesInProgress, sub: "Active courses", icon: BookOpen, tone: "accent" as const },
          { label: "Completed", value: metrics.completedCourses, sub: "Courses finished", icon: CheckCircle2, tone: "ok" as const },
          { label: "Learning Hours", value: metrics.learningHours, sub: "Total time", icon: Clock, tone: "cyan" as const },
          { label: "Streak", value: metrics.currentStreak, sub: "Days in a row", icon: Flame, tone: "warn" as const },
          { label: "Due Soon", value: metrics.assignmentsDue, sub: "Assignments", icon: Calendar, tone: "danger" as const },
          { label: "Certificates", value: metrics.certificates, sub: "Earned", icon: Award, tone: "accent" as const },
        ].map((k) => (
          <Card key={k.label} padding="md">
            <div className="flex items-center gap-2.5">
              <span className={`flex size-9 items-center justify-center rounded-xl bg-surface-2 ${k.tone === "ok" ? "text-ok" : k.tone === "danger" ? "text-danger" : k.tone === "warn" ? "text-warn" : k.tone === "cyan" ? "text-cyan" : "text-accent"}`}>
                <k.icon className="size-4.5" />
              </span>
            </div>
            <div className="mt-3">
              <p className="text-[11.5px] text-ink-3">{k.label}</p>
              <p className="mt-1 text-2xl font-bold text-ink tracking-tight">{k.value}</p>
              <p className="mt-0.5 text-[11px] text-ink-3">{k.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Continue Learning */}
        <div className="lg:col-span-2 card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-ink">Continue Learning</h2>
            <Link href="/my-learning" className="text-[12px] text-accent hover:underline">View all →</Link>
          </div>
          {activeCourses === 0 ? (
            <EmptyState icon={<BookOpen className="size-5" />} title="No courses in progress" description="Start your learning journey by browsing courses" action={<Button size="sm" onClick={() => setFormOpen(true)}>Browse Courses</Button>} />
          ) : (
            <div className="flex flex-col gap-3">
              {courses
                .filter((c) => studentProgress.some((p) => p.courseId === c.id && p.status !== "Not Started"))
                .slice(0, 3)
                .map((c) => {
                  const progress = studentProgress.filter((p) => p.courseId === c.id && p.status === "Completed").length;
                  const total = lessons.filter((l) => l.courseId === c.id).length;
                  const pct = total > 0 ? Math.round((progress / total) * 100) : 0;
                  const currentLesson = lessons.find((l) => l.courseId === c.id && studentProgress.some((p) => p.courseId === c.id && p.lessonId === l.id && p.status === "In Progress"));
                  return (
                    <Link key={c.id} href={`/courses/${c.id}/learn`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2/60">
                      <div className="size-14 shrink-0 rounded-xl bg-surface-2 bg-center bg-cover" style={{ backgroundImage: `url(${c.thumbnail})` }} />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-ink truncate">{c.title}</p>
                        <p className="text-[12px] text-ink-3">{c.instructorId} · {c.category}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[11px] font-medium text-ink-2">{pct}%</span>
                        </div>
                        {currentLesson && <p className="mt-1 text-[11px] text-ink-3">Next: {currentLesson.title}</p>}
                      </div>
                      <Button size="sm" variant="primary">Continue</Button>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Upcoming</h2>
          <div className="space-y-3">
            {[...upcomEvents.slice(0, 2), ...upcomAssignments.slice(0, 2)]
              .sort((a, b) => {
                const dateA = "startDate" in a ? new Date(a.startDate).getTime() : new Date(a.dueDate).getTime();
                const dateB = "startDate" in b ? new Date(b.startDate).getTime() : new Date(b.dueDate).getTime();
                return dateA - dateB;
              })
              .slice(0, 4)
              .map((item) => (
                <Link key={item.id} href={("actionUrl" in item ? item.actionUrl : "/calendar") as string} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2/60">
                  <span className="text-[12px] font-mono text-ink-2 min-w-[56px]">
                    {"startDate" in item ? new Date(item.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : new Date(item.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="min-w-0 flex-1 text-[13px] font-medium text-ink truncate">{item.title}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", "type" in item && item.type === "Assignment" ? "bg-[#fbbf24]/10 text-[#fbbf24]" : "type" in item && item.type === "Exam" ? "bg-[#fb7185]/10 text-[#fb7185]" : "bg-[#55a1ff]/10 text-[#55a1ff]")}>
                    {"type" in item ? item.type : "Event"}
                  </span>
                </Link>
              ))}
            {(upcomEvents.length === 0 && upcomAssignments.length === 0) && (
              <EmptyState icon={<Calendar className="size-5" />} title="Nothing upcoming" description="All caught up for now" />
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Learning Activity */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Learning Activity (4 weeks)</h2>
          <SimpleTrendChart
            data={getWeeklyLearningHours(4).map((w) => ({ month: w.week, value: w.hours }))}
            color="#55a1ff"
            height={200}
          />
        </div>

        {/* Category Distribution */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Courses by Category</h2>
          <CountBarChart
            data={getCategoryDistribution().map((c) => ({ label: c.name, value: c.value }))}
            height={200}
            layout="horizontal"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Recommended Courses</h2>
          <div className="flex flex-col gap-2">
            {courses
              .filter((c) => !studentProgress.some((p) => p.courseId === c.id))
              .slice(0, 3)
              .map((c) => (
                <Link key={c.id} href={`/courses/${c.id}`} className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-surface-2/60">
                  <div className="size-12 shrink-0 rounded-lg bg-surface-2 bg-center bg-cover" style={{ backgroundImage: `url(${c.thumbnail})` }} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink truncate">{c.title}</p>
                    <p className="text-[11px] text-ink-3">{c.category} · {c.difficulty}</p>
                  </div>
                  <Button size="sm" variant="ghost">View</Button>
                </Link>
              ))}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Difficulty Distribution</h2>
          <CountBarChart
            data={getDifficultyDistribution().map((d) => ({ label: d.name, value: d.value, color: d.name === "Beginner" ? "#34d399" : d.name === "Intermediate" ? "#fbbf24" : "#fb7185" }))}
            height={200}
            layout="horizontal"
          />
        </div>
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Recent Activity</h2>
          <div className="flex flex-col gap-2">
            {recentActivity.map((a) => (
              <div key={a.date} className="flex items-center justify-between text-[12.5px]">
                <span className="text-ink">{a.date}</span>
                <span className="font-semibold text-ink-2">{a.hours}h · {a.lessonsCompleted} lessons</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card padding="md">
        <h2 className="mb-4 font-display text-base font-bold text-ink">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setFormOpen(true)}><Plus className="ms-1.5 size-4" /> Browse Courses</Button>
          <Button variant="outline" onClick={() => setFormOpen(true)}><BookOpen className="ms-1.5 size-4" /> My Learning</Button>
          <Button variant="outline"><ClipboardList className="ms-1.5 size-4" /> Assignments</Button>
          <Button variant="outline"><Award className="ms-1.5 size-4" /> Certificates</Button>
        </div>
      </Card>
    </div>
  );
}