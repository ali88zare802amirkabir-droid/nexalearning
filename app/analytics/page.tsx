"use client";

import { PageHeader } from "@/components/layout/page-header";
import { CountBarChart } from "@/components/charts/bars";
import { SimpleTrendChart } from "@/components/charts/trend";
import { DonutChart } from "@/components/charts/donut";
import { StackedBarChart } from "@/components/charts/stacked";
import { metrics, getWeeklyLearningHours, getProgressOverTime, getCourseCompletionData, getAssignmentPerformance, getCategoryDistribution, getDifficultyDistribution } from "@/lib/metrics";
import { formatMoney } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
  const stats = metrics;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Analytics" subtitle={`Total learning: ${stats.learningHours}h · Streak: ${stats.currentStreak} days`} />

      {/* KPI Strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Courses in Progress", value: stats.coursesInProgress },
          { label: "Completed Courses", value: stats.completedCourses },
          { label: "Learning Hours", value: stats.learningHours },
          { label: "Current Streak", value: `${stats.currentStreak} days` },
          { label: "Assignments Due", value: stats.assignmentsDue },
          { label: "Certificates", value: stats.certificates },
          { label: "Avg Rating", value: stats.averageRating },
          { label: "Total Courses", value: stats.totalCourses },
        ].map((k) => (
          <Card key={k.label} padding="md">
            <p className="text-[11.5px] text-ink-3">{k.label}</p>
            <p className="mt-1 text-xl font-bold text-ink">{k.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Learning Activity */}
        <Card padding="md">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Learning Activity (4 Weeks)</h2>
          <SimpleTrendChart
            data={getWeeklyLearningHours(4).map((w) => ({ month: w.week, value: w.hours }))}
            color="#55a1ff"
            height={250}
          />
        </Card>

        {/* Progress Over Time */}
        <Card padding="md">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Progress Over Time</h2>
          <SimpleTrendChart
            data={getProgressOverTime().slice(-12).map((p) => ({ month: p.date.slice(5), value: p.progress }))}
            color="#34d399"
            height={250}
            showArea
          />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course Completion */}
        <Card padding="md">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Course Completion Status</h2>
          <CountBarChart
            data={getCourseCompletionData().map((c) => ({ label: c.name, value: c.completed + c.inProgress, color: c.completed ? "#34d399" : "#55a1ff" }))}
            height={250}
            layout="horizontal"
          />
        </Card>

        {/* Category Distribution */}
        <Card padding="md">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Courses by Category</h2>
          <DonutChart
            data={getCategoryDistribution().map((c) => ({ name: c.name, value: c.value }))}
            height={250}
          />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Difficulty Distribution */}
        <Card padding="md">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Difficulty Distribution</h2>
          <DonutChart
            data={getDifficultyDistribution().map((d) => ({ name: d.name, value: d.value, color: d.name === "Beginner" ? "#34d399" : d.name === "Intermediate" ? "#fbbf24" : "#fb7185" }))}
            height={250}
          />
        </Card>

        {/* Assignment Performance */}
        <Card padding="md">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Assignment Performance</h2>
          <CountBarChart
            data={getAssignmentPerformance().map((a) => ({ label: a.name, value: a.score, color: a.score >= 90 ? "#34d399" : a.score >= 75 ? "#fbbf24" : "#fb7185" }))}
            height={250}
            layout="horizontal"
          />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Learning Hours Stacked */}
        <Card padding="md">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Weekly Breakdown</h2>
          <StackedBarChart
            data={getWeeklyLearningHours(4).map((w) => ({ name: w.week, hours: w.hours }))}
            keys={["hours"]}
            colors={["#55a1ff"]}
            height={250}
          />
        </Card>

        {/* Learning Consistency */}
        <Card padding="md">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Consistency Score</h2>
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">{metrics.currentStreak}</p>
              <p className="text-ink-3">Current Streak (days)</p>
              <p className="text-[12px] text-ink-3 mt-2">Longest: 12 days</p>
            </div>
          </div>
        </Card>

        {/* Time Distribution */}
        <Card padding="md">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Time by Category</h2>
          <DonutChart
            data={[
              { name: "Programming", value: 45 },
              { name: "AI/ML", value: 25 },
              { name: "Design", value: 15 },
              { name: "Business", value: 10 },
              { name: "Other", value: 5 },
            ]}
            height={250}
          />
        </Card>
      </div>
    </div>
  );
}