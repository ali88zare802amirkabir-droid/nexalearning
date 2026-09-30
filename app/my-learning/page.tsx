"use client";

import { useState, useMemo } from "react";
import { Search, Filter, BookOpen, CheckCircle2, Bookmark, Plus } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { studentProgress } from "@/data/progress";
import { formatMoney, formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "in-progress", label: "In Progress", icon: BookOpen },
  { id: "completed", label: "Completed", icon: CheckCircle2 },
  { id: "saved", label: "Saved", icon: Bookmark },
] as const;

type TabId = typeof TABS[number]["id"];

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState<TabId>("in-progress");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [progressFilter, setProgressFilter] = useState("");
  const { enrollments } = useApp();

  const filtered = useMemo(() => {
    let result = enrollments.filter((e) => {
      if (activeTab === "in-progress") return e.status === "Active";
      if (activeTab === "completed") return e.status === "Completed";
      if (activeTab === "saved") return e.status === "Saved";
      return true;
    });

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((e) => {
        const c = courses.find((c) => c.id === e.courseId);
        return c?.title.toLowerCase().includes(q);
      });
    }
    if (categoryFilter) {
      result = result.filter((e) => {
        const c = courses.find((c) => c.id === e.courseId);
        return c?.category === categoryFilter;
      });
    }
    if (difficultyFilter) {
      result = result.filter((e) => {
        const c = courses.find((c) => c.id === e.courseId);
        return c?.difficulty === difficultyFilter;
      });
    }
    if (progressFilter) {
      result = result.filter((e) => {
        if (progressFilter === "not-started") return e.progress === 0;
        if (progressFilter === "in-progress") return e.progress > 0 && e.progress < 1;
        if (progressFilter === "completed") return e.progress === 1;
        return true;
      });
    }
    return result;
  }, [activeTab, search, categoryFilter, difficultyFilter, progressFilter, enrollments]);

  const categories = [...new Set(courses.map((c) => c.category))];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="My Learning"
        subtitle={`${filtered.length} courses`}
        actions={
          <Link href="/courses">
            <Button size="sm"><Plus className="ms-1.5 size-4" /> Browse Courses</Button>
          </Link>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-2 rounded-xl p-1" role="tablist">
        {TABS.map((tab) => {
          const count = enrollments.filter((e) => {
            if (tab.id === "in-progress") return e.status === "Active";
            if (tab.id === "completed") return e.status === "Completed";
            if (tab.id === "saved") return e.status === "Saved";
            return false;
          }).length;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-surface text-ink shadow-sm"
                  : "text-ink-2 hover:text-ink"
              )}
            >
              <tab.icon className="size-4" />
              {tab.label}
              <span className="rounded-full bg-accent/10 text-accent px-1.5 py-0.5 text-[10px] font-bold">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
          <TextInput placeholder="Search courses…" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
        </div>
        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
          <option value="">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </Select>
        <Select value={progressFilter} onChange={(e) => setProgressFilter(e.target.value)}>
          <option value="">All Progress</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
      </div>

      {/* Course Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((e) => {
          const c = courses.find((c) => c.id === e.courseId);
          if (!c) return null;
          const progress = Math.round(e.progress * 100);
          const totalLessons = lessons.filter((l) => l.courseId === c.id).length;
          const completedLessons = Math.round((e.progress * totalLessons));
          return (
            <Link key={e.id} href={`/courses/${c.id}`} className="card p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="size-16 shrink-0 rounded-xl bg-surface-2 bg-center bg-cover" style={{ backgroundImage: `url(${c.thumbnail})` }} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-ink truncate">{c.title}</h3>
                  <p className="text-[12px] text-ink-3">{c.category} · {c.difficulty}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-ink-3">{progress}% complete</span>
                  <span className="text-ink-2">{completedLessons}/{totalLessons} lessons</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Button size="sm" variant={e.status === "Active" ? "primary" : "outline"}>
                  {e.status === "Active" ? "Continue" : e.status === "Completed" ? "Review" : "Resume"}
                </Button>
                <Badge variant={e.status === "Completed" ? "success" : e.status === "Active" ? "accent" : "default"}>
                  {e.status}
                </Badge>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full card p-10 text-center">
            <BookOpen className="size-10 mx-auto text-ink-3 mb-3" />
            <h3 className="text-lg font-semibold text-ink mb-1">No courses found</h3>
            <p className="text-ink-3 mb-4">Try adjusting your filters or browse the catalog</p>
            <Link href="/courses"><Button>Browse Courses</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
}