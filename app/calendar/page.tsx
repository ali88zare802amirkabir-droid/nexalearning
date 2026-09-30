"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar, Plus, Clock } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { calendarEvents } from "@/data/calendar";
import { courses } from "@/data/courses";
import { getEventColor, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week">("month");
  const [date, setDate] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthDays = useMemo(() => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    while (days.length < 42) days.push(null);
    return days;
  }, [date]);

  const weekDates = useMemo(() => {
    const d = new Date(date);
    const day = d.getDay();
    const start = new Date(d);
    start.setDate(d.getDate() - day);
    return Array.from({ length: 7 }, (_, i) => {
      const dt = new Date(start);
      dt.setDate(start.getDate() + i);
      return dt;
    });
  }, [date]);

  const getEventsForDate = (d: Date) => {
    const key = d.toISOString().split("T")[0];
    return calendarEvents.filter((e) => e.startDate.startsWith(key)).sort((a, b) => a.startDate.localeCompare(b.startDate));
  };

  const prev = () => {
    const nd = new Date(date);
    if (view === "month") nd.setMonth(nd.getMonth() - 1);
    else nd.setDate(nd.getDate() - 7);
    setDate(nd);
  };

  const next = () => {
    const nd = new Date(date);
    if (view === "month") nd.setMonth(nd.getMonth() + 1);
    else nd.setDate(nd.getDate() + 7);
    setDate(nd);
  };

  const goToday = () => setDate(new Date());

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Calendar"
        subtitle={view === "month" ? date.toLocaleDateString("en-US", { month: "long", year: "numeric" }) : `${weekDates[0]?.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${weekDates[6]?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToday}><Clock className="ms-1.5 size-4" /> Today</Button>
            <Button size="sm" onClick={() => setView("month")} variant={view === "month" ? "primary" : "outline"}>Month</Button>
            <Button size="sm" onClick={() => setView("week")} variant={view === "week" ? "primary" : "outline"}>Week</Button>
          </div>
        }
      />

      <div className="card overflow-hidden p-4">
        <div className="mb-4 flex items-center justify-between">
          <button type="button" onClick={prev} className="rounded-lg p-2 text-ink-2 hover:bg-surface-2">
            <ChevronRight className="size-5" />
          </button>
          <h2 className="font-display text-lg font-bold text-ink">
            {view === "month" ? date.toLocaleDateString("en-US", { month: "long", year: "numeric" }) : `${weekDates[0]?.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${weekDates[6]?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
          </h2>
          <button type="button" onClick={next} className="rounded-lg p-2 text-ink-2 hover:bg-surface-2">
            <ChevronLeft className="size-5" />
          </button>
        </div>

        {view === "month" && (
          <>
            <div className="grid grid-cols-7 gap-px bg-edge">
              {DAYS.map((d) => (
                <div key={d} className="bg-bg-soft p-2 text-center text-[11px] font-semibold text-ink-3">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-edge">
              {monthDays.map((d, i) => {
                if (!d) return <div key={`e-${i}`} className="bg-bg-soft min-h-[100px]" />;
                const isToday = d.getTime() === today.getTime();
                const dayEvents = getEventsForDate(d);
                return (
                  <div key={d.toISOString()} className={cn("min-h-[100px] bg-bg-soft p-1", isToday && "bg-accent-soft/30")}>
                    <p className={cn("text-[10.5px] font-medium", isToday ? "text-accent" : "text-ink-3")}>{d.getDate()}</p>
                    {dayEvents.slice(0, 3).map((e) => (
                      <Link key={e.id} href={e.courseId ? `/courses/${e.courseId}` : "/calendar"} className={cn("mb-1 block truncate rounded-md px-1.5 py-0.5 text-[9px] font-medium", `bg-${e.color}/20 text-${e.color}`)}>
                        {e.type === "Assignment" ? "📝" : e.type === "Exam" ? "📋" : e.type === "Class" ? "🎥" : "📚"} {e.title}
                      </Link>
                    ))}
                    {dayEvents.length > 3 && <p className="text-[9px] text-ink-3">+{dayEvents.length - 3} more</p>}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === "week" && (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 min-w-max gap-px bg-edge">
              <div className="bg-bg-soft p-2 w-20" />
              {weekDates.map((d) => (
                <div key={d.toISOString()} className="bg-bg-soft p-2 w-48 min-w-[150px]">
                  <p className={cn("text-[11px] font-semibold text-center mb-2", d.getTime() === today.getTime() ? "text-accent" : "text-ink-3")}>
                    {DAYS[d.getDay()]} {d.getDate()}
                  </p>
                  <div className="space-y-1">
                    {getEventsForDate(d).map((e) => (
                      <Link key={e.id} href={e.courseId ? `/courses/${e.courseId}` : "/calendar"} className={cn("block truncate rounded-md px-2 py-1 text-[10px] font-medium", `bg-${e.color}/20 text-${e.color}`)}>
                        {e.startDate.slice(11, 16)} {e.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Events List */}
      <div className="card p-5">
        <h2 className="mb-4 font-display text-base font-bold text-ink">Upcoming Events</h2>
        <div className="flex flex-col gap-2">
          {calendarEvents
            .filter((e) => new Date(e.startDate) >= new Date())
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            .slice(0, 10)
            .map((e) => {
              const course = courses.find((c) => c.id === e.courseId);
              return (
                <Link key={e.id} href={e.courseId ? `/courses/${e.courseId}` : "/calendar"} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2/60">
                  <div className="w-2 h-10 rounded-lg" style={{ backgroundColor: e.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink truncate">{e.title}</p>
                    <p className="text-[12px] text-ink-3">{new Date(e.startDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })} · {e.type}</p>
                    {course && <p className="text-[11px] text-ink-3">{course.title}</p>}
                  </div>
                  <Badge variant="default" style={{ backgroundColor: `${e.color}20`, color: e.color }}>{e.type}</Badge>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}