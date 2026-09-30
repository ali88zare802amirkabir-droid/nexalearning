"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ClipboardList, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { assignments } from "@/data/assignments";
import { courses } from "@/data/courses";
import { submissions } from "@/data/assignments";
import { formatDate, getAssignmentStatus, getAssignmentScore } from "@/lib/utils";
import { Select, TextInput } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STATUSES = ["Not Started", "In Progress", "Submitted", "Graded", "Overdue"] as const;

export default function AssignmentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [sortBy, setSortBy] = useState<"due-date" | "course" | "status">("due-date");

  const myAssignments = assignments.filter((a) => courses.some((c) => c.id === a.courseId));

  const filtered = useMemo(() => {
    let result = [...myAssignments];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((a) => a.title.toLowerCase().includes(q) || a.courseId.toLowerCase().includes(q));
    }
    if (statusFilter) result = result.filter((a) => getAssignmentStatus(a.id) === statusFilter);
    if (courseFilter) result = result.filter((a) => a.courseId === courseFilter);
    result.sort((a, b) => {
      if (sortBy === "due-date") return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      if (sortBy === "course") return a.courseId.localeCompare(b.courseId);
      return 0;
    });
    return result;
  }, [search, statusFilter, courseFilter, sortBy]);

  const courseOptions = courses.filter((c) => myAssignments.some((a) => a.courseId === c.id));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Assignments"
        subtitle={`${filtered.length} assignments`}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
          <TextInput placeholder="Search assignments…" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
        <Select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
          <option value="">All Courses</option>
          {courseOptions.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </Select>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
          <option value="due-date">Sort: Due Date</option>
          <option value="course">Sort: Course</option>
          <option value="status">Sort: Status</option>
        </Select>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-edge">
                {["Assignment", "Course", "Due Date", "Status", "Score", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-ink-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const course = courses.find((c) => c.id === a.courseId);
                const status = getAssignmentStatus(a.id);
                const score = getAssignmentScore(a.id);
                const isOverdue = new Date(a.dueDate) < new Date() && status !== "Graded" && status !== "Submitted";
                return (
                  <tr key={a.id} className="border-b border-edge/50 hover:bg-surface-2/40">
                    <td className="px-4 py-3">
                      <Link href={`/assignments/${a.id}`} className="font-medium text-ink hover:text-accent">{a.title}</Link>
                      <p className="text-[11px] text-ink-3">{a.courseId}</p>
                    </td>
                    <td className="px-4 py-3 text-ink-2">{course?.title ?? a.courseId}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={cn("font-mono text-ink", isOverdue && "text-danger")}>{formatDate(a.dueDate)}</span>
                        {isOverdue && <AlertCircle className="size-3.5 text-danger" />}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={status === "Graded" ? "success" : status === "Submitted" ? "accent" : status === "In Progress" ? "warning" : status === "Overdue" ? "danger" : "default"}>
                        {status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-ink-2">{score !== null ? `${score}/100` : "—"}</td>
                    <td className="px-4 py-3">
                      <Link href={`/assignments/${a.id}`} className="text-accent hover:underline text-[12px]">View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-4 py-10 text-center text-[12.5px] text-ink-3">No assignments found.</div>
        )}
      </div>
    </div>
  );
}