"use client";

import { useState, useMemo } from "react";
import { Search, Filter, BookOpen, Star, Users, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { courses } from "@/data/courses";
import { instructors } from "@/data/instructors";
import { formatMoney, formatDuration, getDifficultyColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "price-low" | "price-high" | "rating">("popular");

  const categories = useMemo(() => [...new Set(courses.map((c) => c.category))], []);

  const filtered = useMemo(() => {
    let result = [...courses];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q)));
    }
    if (categoryFilter) result = result.filter((c) => c.category === categoryFilter);
    if (difficultyFilter) result = result.filter((c) => c.difficulty === difficultyFilter);

    result.sort((a, b) => {
      if (sortBy === "popular") return b.studentsCount - a.studentsCount;
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
    return result;
  }, [search, categoryFilter, difficultyFilter, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Courses"
        subtitle={`${filtered.length} courses available`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Filter className="ms-1.5 size-4" /> Filters</Button>
            <Button size="sm"><BookOpen className="ms-1.5 size-4" /> Browse All</Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
          <TextInput placeholder="Search courses, topics, instructors…" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
        </div>
        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
          <option value="">All Levels</option>
          {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
        </Select>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((c) => {
          const instructor = instructors.find((i) => i.id === c.instructorId);
          return (
            <Link key={c.id} href={`/courses/${c.id}`} className="card p-4 hover:shadow-md transition-shadow group">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                <div className="absolute inset-0 bg-center bg-cover bg-surface-2" style={{ backgroundImage: `url(${c.thumbnail})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button size="sm" className="flex-1"><BookOpen className="ms-1.5 size-4" /> View Course</Button>
                  <Button size="sm" variant="outline" className="flex-1"><Star className="ms-1.5 size-4" /> Save</Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="accent">{c.category}</Badge>
                <Badge variant={c.difficulty === "Beginner" ? "success" : c.difficulty === "Intermediate" ? "warning" : "danger"}>{c.difficulty}</Badge>
                {c.price === 0 && <Badge variant="success">Free</Badge>}
              </div>
              <h3 className="font-semibold text-ink line-clamp-1 group-hover:text-accent transition-colors">{c.title}</h3>
              <p className="text-[12px] text-ink-3 mb-3 line-clamp-2">{c.description}</p>
              <div className="flex items-center gap-4 text-[12px] text-ink-3">
                <span className="flex items-center gap-1"><Avatar name={instructor?.name || "Instructor"} color={instructor?.avatarColor || "#55a1ff"} size="xs" />{instructor?.name}</span>
                <span className="flex items-center gap-1"><Users className="size-3.5" />{c.studentsCount.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Star className="size-3.5 text-warn" />{c.rating}</span>
                <span className="flex items-center gap-1"><Clock className="size-3.5" />{formatDuration(c.durationHours * 60)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between pt-3 border-t border-edge">
                <span className="font-semibold text-ink">{c.price === 0 ? "Free" : `$${c.price}`}</span>
                <Button size="sm" variant="outline">Enroll</Button>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full card p-10 text-center">
            <BookOpen className="size-10 mx-auto text-ink-3 mb-3" />
            <h3 className="text-lg font-semibold text-ink mb-1">No courses found</h3>
            <p className="text-ink-3 mb-4">Try adjusting your filters or search terms</p>
            <Button variant="outline" onClick={() => { setSearch(""); setCategoryFilter(""); setDifficultyFilter(""); }}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}