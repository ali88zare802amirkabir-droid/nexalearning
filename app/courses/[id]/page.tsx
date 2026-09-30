"use client";

import { use, useState, useMemo } from "react";
import { Star, Users, Clock, Tag, BookOpen, CheckCircle2, Play, ChevronDown, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useApp } from "@/lib/store";
import { courses } from "@/data/courses";
import { modules } from "@/data/modules";
import { lessons } from "@/data/lessons";
import { instructors } from "@/data/instructors";
import { studentProgress } from "@/data/progress";
import { formatMoney, formatDuration, getLessonStatus, getCourseProgress } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();

  const instructor = instructors.find((i) => i.id === course.instructorId);
  const courseModules = modules.filter((m) => m.courseId === course.id).sort((a, b) => a.order - b.order);
  const courseLessons = lessons.filter((l) => l.courseId === course.id);
  const progress = getCourseProgress(course.id);
  const { enrollments, addEnrollment } = useApp();
  const enrolled = enrollments.some((e) => e.courseId === course.id && e.userId === "user-01");

  const [activeModule, setActiveModule] = useState<string | null>(courseModules[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/courses" className="text-[12px] text-accent hover:underline flex items-center gap-1">
        <ArrowLeft className="size-4" /> Back to Courses
      </Link>

      {/* Hero */}
      <div className="relative aspect-video rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${course.thumbnail})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="accent">{course.category}</Badge>
                <Badge variant={course.difficulty === "Beginner" ? "success" : course.difficulty === "Intermediate" ? "warning" : "danger"}>{course.difficulty}</Badge>
                {course.price === 0 ? <Badge variant="success">Free</Badge> : <Badge variant="default">${course.price}</Badge>}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">{course.title}</h1>
              <p className="text-white/80 max-w-2xl mb-4">{course.description}</p>
              <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
                {instructor && <span className="flex items-center gap-1"><Avatar name={instructor.name} color={instructor.avatarColor} size="xs" />{instructor.name}</span>}
                <span className="flex items-center gap-1"><Users className="size-3.5" />{course.studentsCount.toLocaleString()} students</span>
                <span className="flex items-center gap-1"><Star className="size-3.5 text-warn" />{course.rating}</span>
                <span className="flex items-center gap-1"><Clock className="size-3.5" />{formatDuration(course.durationHours * 60)}</span>
                <span className="flex items-center gap-1"><BookOpen className="size-3.5" />{course.lessonsCount} lessons</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!enrolled ? (
                <Button size="lg" onClick={() => { addEnrollment(course.id); window.location.reload(); }}>
                  <BookOpen className="ms-2 size-5" /> Start Learning
                </Button>
              ) : (
                <Link href={`/courses/${course.id}/learn`}>
                  <Button size="lg" variant="primary">
                    <Play className="ms-2 size-5" /> Continue Learning
                  </Button>
                </Link>
              )}
              <Button size="lg" variant="outline"><Star className="ms-2 size-5" /> Save</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-2 rounded-xl p-1" role="tablist">
        {["Overview", "Curriculum", "Instructor", "Reviews"].map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={false}
            className="rounded-lg px-4 py-2 text-[13px] font-medium text-ink-2 hover:text-ink hover:bg-surface transition-colors"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Curriculum */}
          <section>
            <h2 className="font-display text-lg font-bold text-ink mb-4">Course Content</h2>
            <div className="space-y-3">
              {courseModules.map((mod) => (
                <Card key={mod.id} padding="md" className={activeModule === mod.id ? "ring-1 ring-accent" : ""}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                        className="p-1"
                      >
                        {activeModule === mod.id ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                      </Button>
                      <div>
                        <h3 className="font-semibold text-ink">{mod.title}</h3>
                        <p className="text-[12px] text-ink-3">{mod.lessonsCount} lessons · {mod.description}</p>
                      </div>
                    </div>
                    <Badge variant="accent">{mod.lessonsCount} lessons</Badge>
                  </div>
                  {activeModule === mod.id && (
                    <div className="mt-3 space-y-2 pl-9 border-r border-edge">
                      {lessons
                        .filter((l) => l.moduleId === mod.id)
                        .sort((a, b) => a.order - b.order)
                        .map((lesson) => {
                          const status = getLessonStatus(course.id, lesson.id);
                          const completed = status === "Completed";
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => window.location.href = `/courses/${course.id}/learn?lesson=${lesson.id}`}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right transition-colors hover:bg-surface-2/60",
                                completed && "bg-surface-2/50"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                {completed ? (
                                  <CheckCircle2 className="size-5 text-ok" />
                                ) : (
                                  <Play className="size-5 text-ink-3" />
                                )}
                                <span className="text-[12px] font-medium text-ink min-w-[28px]">{lesson.order}.</span>
                              </div>
                              <span className="min-w-0 flex-1 text-[13px] font-medium text-ink truncate">{lesson.title}</span>
                              <span className="text-[11px] text-ink-3">{formatDuration(lesson.durationMinutes)}</span>
                              <Badge variant={completed ? "success" : "default"}>{completed ? "Done" : "Locked"}</Badge>
                            </button>
                          );
                        })}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Instructor */}
          {instructor && (
            <Card padding="md">
              <h2 className="font-display text-base font-bold text-ink mb-4">Instructor</h2>
              <div className="flex items-start gap-4">
                <Avatar name={instructor.name} color={instructor.avatarColor} size="xl" />
                <div className="flex-1">
                  <h3 className="font-semibold text-ink">{instructor.name}</h3>
                  <p className="text-[12px] text-ink-3">{instructor.title}</p>
                  <p className="mt-2 text-[13px] text-ink-3 line-clamp-3">{instructor.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {instructor.specialties.map((s) => (
                      <Badge key={s} variant="default">{s}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div><p className="text-2xl font-bold text-ink">{instructor.coursesCount}</p><p className="text-[11px] text-ink-3">Courses</p></div>
                    <div><p className="text-2xl font-bold text-ink">{instructor.studentsCount.toLocaleString()}</p><p className="text-[11px] text-ink-3">Students</p></div>
                    <div><p className="text-2xl font-bold text-ink">{instructor.rating}</p><p className="text-[11px] text-ink-3">Rating</p></div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Course Stats */}
          <Card padding="md">
            <h2 className="font-display text-base font-bold text-ink mb-4">Course Details</h2>
            <div className="space-y-3">
              {[
                { label: "Total Duration", value: formatDuration(course.durationHours * 60) },
                { label: "Lessons", value: `${course.lessonsCount} lessons` },
                { label: "Modules", value: `${courseModules.length} modules` },
                { label: "Level", value: course.difficulty },
                { label: "Language", value: "English" },
                { label: "Last Updated", value: new Date(course.updatedAt).toLocaleDateString() },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[13px] text-ink-3">{item.label}</span>
                  <span className="font-medium text-ink">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Tags */}
          <Card padding="md">
            <h2 className="font-display text-base font-bold text-ink mb-3">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="default">{tag}</Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}