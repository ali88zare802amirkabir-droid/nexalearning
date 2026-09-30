import type { Lesson } from "@/lib/types";

const makeLesson = (id: string, courseId: string, moduleId: string, title: string, order: number, duration: number): Lesson => ({
  id,
  courseId,
  moduleId,
  title,
  description: `Learn ${title.toLowerCase()} with hands-on examples and best practices.`,
  videoUrl: `https://example.com/video/${id}`,
  durationMinutes: duration,
  order,
  resources: [
    { name: "Slides", url: `https://example.com/slides/${id}.pdf` },
    { name: "Code", url: `https://github.com/nexalearning/${courseId}/tree/main/${moduleId}/${order}` },
  ],
});

const lessons: Lesson[] = [
  // Course 1 modules
  ...["Introduction", "Environment Setup", "React Basics", "JSX Deep Dive", "Components & Props", "State & Events", "Lists & Keys", "Forms"].map((t, i) =>
    makeLesson(`les-01-1-${i + 1}`, "crs-01", "mod-01-1", t, i + 1, 15 + i * 5)
  ),
  ...["Type System", "Interfaces vs Types", "Generics", "Utility Types", "Advanced Generics", "Conditional Types", "Mapped Types", "Template Literals", "Type Guards", "Declaration Merging", "Module Augmentation", "Strict Mode"].map((t, i) =>
    makeLesson(`les-01-2-${i + 1}`, "crs-01", "mod-01-2", t, i + 1, 20 + i * 3)
  ),
  ...["Composition Patterns", "Container/Presentational", "Compound Components", "Context API", "useReducer", "useCallback & useMemo", "Custom Hooks", "State Machines", "Forms with React Hook Form", "Server State", "URL State", "Optimistic Updates", "Error Boundaries", "Suspense", "Transitions"].map((t, i) =>
    makeLesson(`les-01-3-${i + 1}`, "crs-01", "mod-01-3", t, i + 1, 25)
  ),
  ...["Custom Hooks Deep Dive", "Compound Components", "Render Props", "Higher-Order Components", "Hooks for Data Fetching", "Hooks for Forms", "Hooks for Animation", "Hooks for WebSocket", "Hooks for Local Storage", "Testing Custom Hooks", "Performance Hooks", "Hook Composition"].map((t, i) =>
    makeLesson(`les-01-4-${i + 1}`, "crs-01", "mod-01-4", t, i + 1, 30)
  ),

  // Course 2 modules (abbreviated)
  ...Array.from({ length: 68 }, (_, i) => makeLesson(
    `les-02-${Math.floor(i / 12) + 1}-${(i % 12) + 1}`,
    "crs-02",
    `mod-02-${Math.floor(i / 12) + 1}`,
    `Lesson ${i + 1}`,
    (i % 12) + 1,
    20 + (i % 12) * 2
  )),

  // Course 3 modules (abbreviated)
  ...Array.from({ length: 92 }, (_, i) => makeLesson(
    `les-03-${Math.floor(i / 15) + 1}-${(i % 15) + 1}`,
    "crs-03",
    `mod-03-${Math.floor(i / 15) + 1}`,
    `Lesson ${i + 1}`,
    (i % 15) + 1,
    25 + (i % 15) * 2
  )),

  // Course 5 modules
  ...Array.from({ length: 48 }, (_, i) => makeLesson(
    `les-05-${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
    "crs-05",
    `mod-05-${Math.floor(i / 10) + 1}`,
    `Lesson ${i + 1}`,
    (i % 10) + 1,
    20 + (i % 10) * 2
  )),

  // Course 7 modules
  ...Array.from({ length: 76 }, (_, i) => makeLesson(
    `les-07-${Math.floor(i / 12) + 1}-${(i % 12) + 1}`,
    "crs-07",
    `mod-07-${Math.floor(i / 12) + 1}`,
    `Lesson ${i + 1}`,
    (i % 12) + 1,
    25 + (i % 12) * 2
  )),

  // Course 9 modules
  ...Array.from({ length: 80 }, (_, i) => makeLesson(
    `les-09-${Math.floor(i / 13) + 1}-${(i % 13) + 1}`,
    "crs-09",
    `mod-09-${Math.floor(i / 13) + 1}`,
    `Lesson ${i + 1}`,
    (i % 13) + 1,
    20 + (i % 13) * 2
  )),

  // Fill remaining courses with generated lessons (80+ more lessons to reach ~80 total across all courses)
  ...Array.from({ length: 120 }, (_, i) => {
    const courseIdx = Math.floor(i / 10) + 10;
    const moduleIdx = Math.floor((i % 10) / 2.5) + 1;
    const lessonIdx = (i % 10) % 3 + 1;
    return makeLesson(
      `les-${String(courseIdx).padStart(2, "0")}-${moduleIdx}-${lessonIdx}`,
      `crs-${courseIdx}`,
      `mod-${courseIdx}-${moduleIdx}`,
      `Lesson ${lessonIdx} - Topic ${i + 1}`,
      lessonIdx,
      20 + (i % 5) * 5
    );
  }),
];

export { lessons };