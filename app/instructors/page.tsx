"use client";

import { useState, useMemo } from "react";
import { Search, Users, Star, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { instructors } from "@/data/instructors";
import { courses } from "@/data/courses";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function InstructorsPage() {
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");

  const allSpecialties = useMemo(() => [...new Set(instructors.flatMap((i) => i.specialties))], []);

  const filtered = useMemo(() => {
    let result = [...instructors];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((i) => i.name.toLowerCase().includes(q) || i.specialties.some((s) => s.toLowerCase().includes(q)) || i.title.toLowerCase().includes(q));
    }
    if (specialtyFilter) result = result.filter((i) => i.specialties.includes(specialtyFilter));
    return result;
  }, [search, specialtyFilter]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Instructors"
        subtitle={`${filtered.length} expert instructors`}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
          <TextInput placeholder="Search instructors, specialties…" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
        </div>
        <Select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)}>
          <option value="">All Specialties</option>
          {allSpecialties.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((ins) => {
          const insCourses = courses.filter((c) => c.instructorId === ins.id);
          const avgRating = insCourses.length > 0 ? insCourses.reduce((s, c) => s + c.rating, 0) / insCourses.length : ins.rating;
          return (
            <Link key={ins.id} href={`/instructors/${ins.id}`} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <Avatar name={ins.name} color={ins.avatarColor} size="xl" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-ink truncate">{ins.name}</h3>
                  <p className="text-[12px] text-ink-3">{ins.title}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {ins.specialties.slice(0, 3).map((s) => (
                      <Badge key={s} variant="default" className="text-[10px]">{s}</Badge>
                    ))}
                    {ins.specialties.length > 3 && <Badge variant="default" className="text-[10px]">+{ins.specialties.length - 3} more</Badge>}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-surface-2 p-3">
                  <p className="text-2xl font-bold text-ink">{ins.coursesCount}</p>
                  <p className="text-[10px] text-ink-3">Courses</p>
                </div>
                <div className="rounded-xl bg-surface-2 p-3">
                  <p className="text-2xl font-bold text-ink">{ins.studentsCount.toLocaleString()}</p>
                  <p className="text-[10px] text-ink-3">Students</p>
                </div>
                <div className="rounded-xl bg-surface-2 p-3">
                  <p className="text-2xl font-bold text-ink">{avgRating.toFixed(1)}</p>
                  <p className="text-[10px] text-ink-3">Avg Rating</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-edge">
                <span className="text-[12px] text-ink-3">Joined {new Date(ins.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                <span className="flex items-center gap-1 text-[12px] text-warn font-semibold">
                  <Star className="size-3.5 fill-current" /> {avgRating.toFixed(1)}
                </span>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full card p-10 text-center">
            <Users className="size-10 mx-auto text-ink-3 mb-3" />
            <h3 className="text-lg font-semibold text-ink mb-1">No instructors found</h3>
            <p className="text-ink-3">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}