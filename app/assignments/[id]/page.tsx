"use client";

import { use, useState } from "react";
import { ArrowLeft, Calendar, AlertCircle, Clock, CheckCircle2, FileText, Download, Upload, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useApp } from "@/lib/store";
import { assignments } from "@/data/assignments";
import { courses } from "@/data/courses";
import { submissions } from "@/data/assignments";
import { formatDate, getAssignmentStatus, getAssignmentScore } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { TextArea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function StatusBadge({ status, isOverdue }: { status: string; isOverdue: boolean }) {
  return (
    <Badge variant={status === "Graded" ? "success" : status === "Submitted" ? "accent" : status === "In Progress" ? "warning" : isOverdue ? "danger" : "default"}>
      {status}
    </Badge>
  );
}

function DueDateSection({ assignment, isOverdue, formatDate }: { assignment: any; isOverdue: boolean; formatDate: (d: string) => string }) {
  return (
    <div className="rounded-xl p-4 bg-surface-2 border border-edge">
      <div className="flex items-center gap-3">
        <Calendar className="size-5 text-ink-3" />
        <div>
          <p className="font-medium text-ink">Due Date</p>
          <p className="text-[12px] text-ink-3">{formatDate(assignment.dueDate)}</p>
        </div>
        {isOverdue && <AlertCircle className="size-4 text-danger ml-auto" />}
      </div>
    </div>
  );
}

function SubmittedView({ submission, assignment, formatDate }: { submission: any; assignment: any; formatDate: (d: string) => string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl p-3 bg-surface-2">
        <FileText className="size-6 text-accent" />
        <div className="flex-1">
          <p className="font-medium text-ink">Submitted</p>
          <p className="text-[12px] text-ink-3">{formatDate(submission.submittedAt)}</p>
        </div>
        <Badge variant={submission.score !== null ? "success" : "accent"}>
          {submission.score !== null ? `Score: ${submission.score}/${assignment.maxScore}` : "Pending Review"}
        </Badge>
      </div>

      {submission.score !== null && (
        <div className="space-y-3">
          <div className="rounded-xl p-4 bg-ok/10 border border-ok/20">
            <div className="flex items-center justify-between">
              <span className="font-medium text-ok">Your Score</span>
              <span className="text-2xl font-bold text-ok">{submission.score} / {assignment.maxScore}</span>
            </div>
          </div>
          {submission.feedback && (
            <div className="rounded-xl p-4 bg-surface-2 border border-edge">
              <h4 className="font-medium text-ink mb-2">Instructor Feedback</h4>
              <p className="text-ink-3">{submission.feedback}</p>
              {submission.gradedAt && <p className="text-[11px] text-ink-3 mt-2">Graded on {formatDate(submission.gradedAt)}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SubmitView({ assignment, isOverdue, canSubmit, content, setContent, submitting, handleSubmit, formatDate }: any) {
  return (
    <div className="space-y-4">
      <DueDateSection assignment={assignment} isOverdue={isOverdue} formatDate={formatDate} />
      <div>
        <label className="block text-[12px] font-medium text-ink-2 mb-2">Your Submission</label>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your response here... (Markdown supported)"
          rows={8}
          disabled={!canSubmit}
        />
      </div>
      {canSubmit && (
        <Button onClick={handleSubmit} disabled={submitting || !content.trim()} className="w-full">
          {submitting ? "Submitting..." : "Submit Assignment"}
        </Button>
      )}
      {!canSubmit && "Graded" !== "Graded" && (
        <p className="text-[12px] text-ink-3 text-center">This assignment is no longer accepting submissions.</p>
      )}
    </div>
  );
}

export default function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const assignment = assignments.find((a) => a.id === id);
  if (!assignment) notFound();

  const course = courses.find((c) => c.id === assignment.courseId);
  const submission = submissions.find((s) => s.assignmentId === assignment.id && s.userId === "user-01");
  const status = getAssignmentStatus(assignment.id);
  const score = getAssignmentScore(assignment.id);
  const isOverdue = new Date(assignment.dueDate) < new Date() && status !== "Graded" && status !== "Submitted";
  const canSubmit = status === "Not Started" || status === "In Progress" || status === "Overdue";

  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState(submission?.content || "");
  const { submitAssignment, showToast } = useApp();

  const handleSubmit = () => {
    if (!content.trim()) {
      showToast({ title: "Please add your submission", variant: "danger" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      submitAssignment(assignment.id, content);
      setSubmitting(false);
    }, 500);
  };

  const statusBadge = <StatusBadge status={status} isOverdue={isOverdue} />;

  const submissionView = submission && submission.submittedAt ? (
    <SubmittedView submission={submission} assignment={assignment} formatDate={formatDate} />
  ) : (
    <SubmitView
      assignment={assignment}
      isOverdue={isOverdue}
      canSubmit={canSubmit}
      content={content}
      setContent={setContent}
      submitting={submitting}
      handleSubmit={handleSubmit}
      formatDate={formatDate}
    />
  );

  return (
    <div className="flex flex-col gap-6">
      <Link href="/assignments" className="text-[12px] text-accent hover:underline flex items-center gap-1">
        <ArrowLeft className="size-4" /> Back to Assignments
      </Link>

      <PageHeader title={assignment.title} subtitle={course?.title}>
        <div className="flex items-center gap-2">
          {statusBadge}
          {isOverdue && <AlertCircle className="size-4 text-danger" />}
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card padding="md">
            <h2 className="mb-4 font-display text-base font-bold text-ink">Instructions</h2>
            <div className="prose text-ink-3 max-w-none">
              <p className="mb-4">{assignment.instructions}</p>
              <p className="text-[13px] text-ink-3">Max Score: {assignment.maxScore} points</p>
            </div>
          </Card>

          <Card padding="md">
            <h2 className="mb-4 font-display text-base font-bold text-ink">
              {submission ? "Your Submission" : "Submit Assignment"}
            </h2>
            {submissionView}
            {submission && !submission.submittedAt && (
              <p className="text-[12px] text-ink-3 text-center">Draft saved automatically</p>
            )}
          </Card>

          {assignment.resources && assignment.resources.length > 0 && (
            <Card padding="md">
              <h2 className="mb-3 font-display text-base font-bold text-ink">Resources</h2>
              <div className="flex flex-wrap gap-2">
                {assignment.resources.map((r) => (
                  <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-edge bg-surface px-3 py-2 text-[12px] text-ink hover:bg-surface-2">
                    <FileText className="size-4 text-ink-3" />
                    {r.name}
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card padding="md">
            <h2 className="mb-4 font-display text-base font-bold text-ink">Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-ink-3">Course</span>
                <Link href={course ? `/courses/${course.id}` : "#"} className="font-medium text-ink hover:text-accent">{course?.title ?? assignment.courseId}</Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-ink-3">Due Date</span>
                <div className="flex items-center gap-2">
                  <span className={cn("font-mono text-ink", isOverdue && "text-danger")}>{formatDate(assignment.dueDate)}</span>
                  {isOverdue && <AlertCircle className="size-4 text-danger" />}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-ink-3">Status</span>
                {statusBadge}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-ink-3">Max Score</span>
                <span className="font-medium text-ink">{assignment.maxScore} points</span>
              </div>
              {submission?.score !== null && (
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-ink-3">Your Score</span>
                  <span className="font-bold text-ok">{submission!.score} / {assignment.maxScore}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-ink-3">Created</span>
                <span className="text-ink-2">{formatDate(assignment.createdAt)}</span>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <h2 className="mb-3 font-display text-base font-bold text-ink">Course Progress</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-ink-3">Assignment Progress</span>
                <span className="font-semibold text-ink">{submission ? "Submitted" : "Not Started"}</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-ink-3">Course Completion</span>
                <span className="font-semibold text-ink">45%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}