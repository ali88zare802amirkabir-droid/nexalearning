"use client";

import { use, useState, useEffect, useMemo } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, CheckCircle2, Volume2, VolumeX, Maximize, Minimize, BookOpen, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useApp } from "@/lib/store";
import { courses } from "@/data/courses";
import { modules } from "@/data/modules";
import { lessons } from "@/data/lessons";
import { studentProgress } from "@/data/progress";
import { formatDuration, getLessonStatus, getCourseProgress } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";

export default function LearnPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ lesson?: string }> }) {
  const { id } = use(params);
  const resolvedSearchParams = use(searchParams);
  const lessonId = resolvedSearchParams.lesson;

  const course = courses.find((c) => c.id === id);
  if (!course) notFound();

  const courseModules = modules.filter((m) => m.courseId === course.id).sort((a, b) => a.order - b.order);
  const courseLessons = lessons.filter((l) => l.courseId === course.id).sort((a, b) => a.order - b.order);
  const currentLesson = lessonId 
    ? courseLessons.find((l) => l.id === lessonId) 
    : courseLessons.find((l) => getLessonStatus(course.id, l.id) === "In Progress") 
    ?? courseLessons[0];

  if (!currentLesson) notFound();

  const lessonIndex = courseLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = lessonIndex > 0 ? courseLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < courseLessons.length - 1 ? courseLessons[lessonIndex + 1] : null;
  const progress = getCourseProgress(course.id);
  const lessonStatus = getLessonStatus(course.id, currentLesson.id);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { updateLessonProgress } = useApp();

  const handleComplete = () => {
    updateLessonProgress(course.id, currentLesson.id, "Completed");
  };

  const handleNext = () => {
    if (nextLesson) {
      window.location.href = `/courses/${course.id}/learn?lesson=${nextLesson.id}`;
    }
  };

  const handlePrev = () => {
    if (prevLesson) {
      window.location.href = `/courses/${course.id}/learn?lesson=${prevLesson.id}`;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Link href={`/courses/${course.id}`} className="text-[12px] text-accent hover:underline flex items-center gap-1">
        <ArrowLeft className="size-4" /> Back to Course
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main Player */}
        <div className={cn("flex flex-col", fullscreen && "fixed inset-0 z-50 bg-bg p-4")}>
          {/* Video Player */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-2">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="size-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Play className="size-10 text-accent ms-1" />
                </div>
                <h3 className="text-lg font-semibold text-ink mb-1">Video Player Placeholder</h3>
                <p className="text-ink-3">{currentLesson.title}</p>
                <p className="text-[12px] text-ink-3 mt-1">{formatDuration(currentLesson.durationMinutes)}</p>
              </div>
            </div>
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-bg/90 to-transparent">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setVideoPlaying(!videoPlaying)}>
                  {videoPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
                </Button>
                <div className="flex-1 h-1.5 rounded-full bg-surface-3 relative">
                  <div className="h-full bg-accent rounded-full" style={{ width: "35%" }} />
                  <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-white" />
                </div>
                <span className="text-[11px] text-ink-3 font-mono">12:34 / {formatDuration(currentLesson.durationMinutes)}</span>
                <Button variant="ghost" size="sm" onClick={() => setVideoMuted(!videoMuted)}>
                  {videoMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setFullscreen(!fullscreen)}>
                  {fullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="mt-4 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium text-ink-3">Lesson {lessonIndex + 1} of {courseLessons.length}</p>
                <h1 className="font-display text-xl font-bold text-ink mt-1">{currentLesson.title}</h1>
                <p className="text-ink-3 mt-1">{currentLesson.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={lessonStatus === "Completed" ? "success" : lessonStatus === "In Progress" ? "accent" : "default"}>
                  {lessonStatus}
                </Badge>
              </div>
            </div>

            {/* Resources */}
            {currentLesson.resources.length > 0 && (
              <div className="card p-4">
                <h3 className="font-semibold text-ink mb-3">Resources</h3>
                <div className="flex flex-wrap gap-2">
                  {currentLesson.resources.map((r) => (
                    <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-edge bg-surface px-3 py-2 text-[12px] text-ink hover:bg-surface-2">
                      <BookOpen className="size-4 text-ink-3" />
                      {r.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {lessonStatus !== "Completed" && (
                <Button onClick={handleComplete} className="flex-1 sm:flex-none">
                  <CheckCircle2 className="ms-2 size-5" /> Mark as Complete
                </Button>
              )}
              {lessonStatus === "Completed" && (
                <Button variant="secondary" disabled className="flex-1 sm:flex-none">
                  <CheckCircle2 className="ms-2 size-5 text-ok" /> Completed
                </Button>
              )}
              <Link href={`/courses/${course.id}`}>
                <Button variant="outline"><BookOpen className="ms-2 size-5" /> Curriculum</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar - Curriculum */}
        <div className="lg:sticky lg:top-24 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-ink">Course Content</h2>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
            </Button>
          </div>
          
          <div className={cn("space-y-2 overflow-hidden transition-all", !sidebarOpen && "max-h-0 opacity-0")}>
            {courseModules.map((mod) => (
              <div key={mod.id} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-ink-3 px-1">
                  <span>{mod.title}</span>
                  <span className="text-ink-3">{mod.lessonsCount} lessons</span>
                </div>
                <div className="space-y-1 pl-2 border-r border-edge">
                  {courseLessons
                    .filter((l) => l.moduleId === mod.id)
                    .map((lesson) => {
                      const status = getLessonStatus(course.id, lesson.id);
                      const isCurrent = lesson.id === currentLesson.id;
                      return (
                        <Link
                          key={lesson.id}
                          href={`/courses/${course.id}/learn?lesson=${lesson.id}`}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] transition-colors",
                            isCurrent ? "bg-accent-soft text-accent font-medium" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                          )}
                        >
                          {status === "Completed" ? (
                            <CheckCircle2 className="size-3.5 text-ok" />
                          ) : (
                            <span className="size-3.5" />
                          )}
                          <span className="min-w-0 truncate">{lesson.title}</span>
                          <span className="ml-auto text-[10px] text-ink-3">{formatDuration(lesson.durationMinutes)}</span>
                        </Link>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          <div className="card p-4 border-t border-edge">
            <h3 className="font-semibold text-ink mb-3">Your Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-ink-3">Overall Progress</span>
                  <span className="font-semibold text-ink">{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-ink">{courseLessons.filter((l) => getLessonStatus(course.id, l.id) === "Completed").length}</p>
                  <p className="text-[11px] text-ink-3">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink">{courseLessons.filter((l) => getLessonStatus(course.id, l.id) === "In Progress").length}</p>
                  <p className="text-[11px] text-ink-3">In Progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}