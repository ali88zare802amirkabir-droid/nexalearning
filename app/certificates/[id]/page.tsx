"use client";

import { use } from "react";
import { Award, ArrowLeft, Calendar, Printer, CheckCircle2, BookOpen, Star, Hash } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { certificates } from "@/data/certificates";
import { courses } from "@/data/courses";
import { instructors } from "@/data/instructors";
import { userProfile } from "@/data/profile";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CertificateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const cert = certificates.find((c) => c.id === id);
  if (!cert) notFound();

  const course = courses.find((c) => c.id === cert.courseId);
  const instructor = instructors.find((i) => i.id === cert.instructorId);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6">
      <Link href="/certificates" className="text-[12px] text-accent hover:underline flex items-center gap-1">
        <ArrowLeft className="size-4" /> Back to Certificates
      </Link>

      <PageHeader
        title={course?.title ?? cert.title}
        subtitle={`Certificate ${cert.certificateId}`}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="success"><CheckCircle2 className="size-3.5" /> Verified</Badge>
            <Button size="sm" variant="outline" onClick={handlePrint}>
              <Printer className="ms-1.5 size-4" /> Print / PDF
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Certificate visual */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/15 via-surface to-cyan/10 p-8 sm:p-12 text-center">
            <div className="absolute inset-2 rounded-xl border border-accent/20 pointer-events-none" />
            <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-accent/15 border border-accent/30">
              <Award className="size-10 text-accent" />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-3 mb-2">NexaLearning</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-1">Certificate of Completion</h2>
            <p className="text-[13px] text-ink-3 mb-6">This certificate is proudly presented to</p>
            <p className="font-display text-xl sm:text-2xl font-bold text-accent mb-6">{userProfile.name}</p>
            <p className="text-[13px] text-ink-3 mb-1">for successfully completing</p>
            <p className="text-lg font-semibold text-ink mb-6">{course?.title ?? cert.title}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px] text-ink-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" /> Issued {formatDate(cert.issuedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Hash className="size-3.5" /> {cert.certificateId}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <Card padding="md">
            <h2 className="mb-4 font-display text-base font-bold text-ink">Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] text-ink-3">Course</span>
                <Link href={course ? `/courses/${course.id}` : "#"} className="font-medium text-ink hover:text-accent text-right">
                  <span className="flex items-center gap-1.5 justify-end"><BookOpen className="size-3.5 text-ink-3" />{course?.title ?? cert.title}</span>
                </Link>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] text-ink-3">Instructor</span>
                <span className="flex items-center gap-2">
                  <Avatar name={instructor?.name ?? "Instructor"} color={instructor?.avatarColor ?? "#55a1ff"} size="xs" />
                  <span className="font-medium text-ink">{instructor?.name}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-ink-3">Issued</span>
                <span className="text-ink-2">{formatDate(cert.issuedAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-ink-3">Certificate ID</span>
                <span className="font-mono text-[11px] text-ink-2">{cert.certificateId}</span>
              </div>
              {course && (
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-ink-3">Rating</span>
                  <span className="flex items-center gap-1 font-medium text-ink"><Star className="size-3.5 text-warn" /> {course.rating}</span>
                </div>
              )}
            </div>
          </Card>

          <Card padding="md">
            <h2 className="mb-3 font-display text-base font-bold text-ink">Share</h2>
            <p className="text-[12.5px] text-ink-3 mb-4">Print this page or save it as PDF to share your achievement.</p>
            <Button onClick={handlePrint} className="w-full">
              <Printer className="ms-1.5 size-4" /> Print / Save PDF
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
