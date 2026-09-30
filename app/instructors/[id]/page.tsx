import { Star, Users, GraduationCap, Calendar, Award, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { instructors } from "@/data/instructors";
import { courses } from "@/data/courses";
import { formatMoney, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SimpleTrendChart } from "@/components/charts/trend";
import { CountBarChart } from "@/components/charts/bars";

export default async function InstructorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const instructor = instructors.find((i) => i.id === id);
  if (!instructor) notFound();

  const insCourses = courses.filter((c) => c.instructorId === instructor.id);
  const totalStudents = insCourses.reduce((s, c) => s + c.studentsCount, 0);
  const avgRating = insCourses.length > 0 ? insCourses.reduce((s, c) => s + c.rating, 0) / insCourses.length : instructor.rating;

  return (
    <div className="flex flex-col gap-6">
      <Link href="/instructors" className="text-[12px] text-accent hover:underline flex items-center gap-1">
        <ArrowLeft className="size-4" /> Back to Instructors
      </Link>

      <PageHeader title={instructor.name} subtitle={instructor.title}>
        <div className="flex items-center gap-4">
          <Avatar name={instructor.name} color={instructor.avatarColor} size="xl" />
          <div className="flex flex-wrap gap-2">
            {instructor.specialties.map((s) => (
              <Badge key={s} variant="default">{s}</Badge>
            ))}
          </div>
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <Card padding="md">
            <h2 className="mb-4 font-display text-base font-bold text-ink">About</h2>
            <p className="text-ink-3 leading-relaxed">{instructor.bio}</p>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Courses", value: instructor.coursesCount, icon: GraduationCap, color: "#55a1ff" },
              { label: "Students", value: instructor.studentsCount.toLocaleString(), icon: Users, color: "#35d3f2" },
              { label: "Rating", value: instructor.rating.toFixed(1), icon: Star, color: "#fbbf24" },
              { label: "Since", value: new Date(instructor.joinedAt).getFullYear().toString(), icon: Calendar, color: "#4ade80" },
            ].map((s) => (
              <Card key={s.label} padding="md">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`flex size-8 items-center justify-center rounded-xl bg-surface-2`} style={{ color: s.color }}>
                    <s.icon className="size-4" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-ink">{s.value}</p>
                <p className="text-[11px] text-ink-3">{s.label}</p>
              </Card>
            ))}
          </div>

          {/* Courses */}
          <Card padding="md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-ink">Courses</h2>
              <Link href={`/courses?instructor=${instructor.id}`} className="text-[12px] text-accent hover:underline">View all →</Link>
            </div>
            <div className="space-y-3">
              {insCourses.slice(0, 5).map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2/60">
                  <div className="size-12 shrink-0 rounded-lg bg-surface-2 bg-center bg-cover" style={{ backgroundImage: `url(${course.thumbnail})` }} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink truncate">{course.title}</p>
                    <p className="text-[11px] text-ink-3">{course.category} · {course.difficulty}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ink-3">
                    <Star className="size-3.5 text-warn" /> {course.rating}
                    <span>·</span>
                    <span>{course.studentsCount.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
              {insCourses.length > 5 && (
                <Link href={`/courses?instructor=${instructor.id}`} className="text-accent hover:underline text-sm mt-2 block text-center">
                  View all {insCourses.length} courses →
                </Link>
              )}
            </div>
          </Card>

          {/* Student Growth Chart */}
          <Card padding="md">
            <h2 className="mb-4 font-display text-base font-bold text-ink">Student Growth</h2>
            <SimpleTrendChart
              data={[
                { month: "Jan", value: 1200 },
                { month: "Feb", value: 1850 },
                { month: "Mar", value: 2100 },
                { month: "Apr", value: 2800 },
                { month: "May", value: 3200 },
                { month: "Jun", value: 3800 },
              ]}
              color="#55a1ff"
              height={200}
            />
          </Card>
        </div>

        <div className="space-y-6">
          {/* Profile Stats */}
          <Card padding="md">
            <h2 className="mb-4 font-display text-base font-bold text-ink">Profile</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Award className="size-4" />
                </span>
                <div>
                  <p className="text-[12px] text-ink-3">Expertise</p>
                  <p className="font-medium text-ink">{instructor.specialties.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-cyan-soft text-cyan">
                  <Star className="size-4" />
                </span>
                <div>
                  <p className="text-[12px] text-ink-3">Average Rating</p>
                  <p className="font-bold text-ink">{instructor.rating} / 5.0</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-soft text-emerald">
                  <Users className="size-4" />
                </span>
                <div>
                  <p className="text-[12px] text-ink-3">Total Students</p>
                  <p className="font-bold text-ink">{totalStudents.toLocaleString()}+</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-violet-soft text-violet">
                  <GraduationCap className="size-4" />
                </span>
                <div>
                  <p className="text-[12px] text-ink-3">Courses Published</p>
                  <p className="font-bold text-ink">{instructor.coursesCount}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Courses Chart */}
          <Card padding="md">
            <h2 className="mb-4 font-display text-base font-bold text-ink">Course Ratings</h2>
            <CountBarChart
              data={insCourses.slice(0, 6).map((c) => ({
                label: c.title.length > 15 ? c.title.slice(0, 15) + "…" : c.title,
                value: Math.round(c.rating * 20),
                color: c.rating >= 4.8 ? "#34d399" : c.rating >= 4.6 ? "#fbbf24" : "#fb7185",
              }))}
              height={220}
              layout="horizontal"
            />
          </Card>

          {/* External Links */}
          <Card padding="md">
            <h2 className="mb-4 font-display text-base font-bold text-ink">Connect</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm"><ExternalLink className="ms-1.5 size-4" /> LinkedIn</Button>
              <Button variant="outline" size="sm"><ExternalLink className="ms-1.5 size-4" /> Twitter</Button>
              <Button variant="outline" size="sm"><ExternalLink className="ms-1.5 size-4" /> GitHub</Button>
              <Button variant="outline" size="sm"><ExternalLink className="ms-1.5 size-4" /> Website</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}