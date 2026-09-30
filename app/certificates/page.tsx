"use client";

import { useState } from "react";
import { Award, Calendar, Download, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { certificates } from "@/data/certificates";
import { courses } from "@/data/courses";
import { instructors } from "@/data/instructors";
import { formatDate, formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CertificatesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const enrichedCerts = certificates.map((cert) => ({
    ...cert,
    course: courses.find((c) => c.id === cert.courseId),
    instructor: instructors.find((i) => i.id === cert.instructorId),
  }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Certificates"
        subtitle={`${enrichedCerts.length} certificates earned`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setView(view === "grid" ? "list" : "grid")}>
              {view === "grid" ? "List View" : "Grid View"}
            </Button>
          </div>
        }
      />

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {enrichedCerts.map((cert) => (
            <Link key={cert.id} href={`/certificates/${cert.id}`} className="card p-5 hover:shadow-md transition-shadow group">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-accent/20 to-cyan/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="size-16 text-accent/30 group-hover:text-accent/50 transition-colors" />
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <Badge variant="success">Verified</Badge>
                </div>
              </div>
              <h3 className="font-semibold text-ink mb-1 line-clamp-1">{cert.course?.title ?? cert.title}</h3>
              <p className="text-[12px] text-ink-3 mb-2">{cert.course?.category ?? "Course"}</p>
              <div className="flex items-center justify-between text-[11px] text-ink-3">
                <span>{formatDate(cert.issuedAt)}</span>
                <span>ID: {cert.certificateId.slice(-8)}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-edge">
                  {["Certificate", "Course", "Instructor", "Issued", "Certificate ID", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-ink-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enrichedCerts.map((cert) => (
                  <tr key={cert.id} className="border-b border-edge/50 hover:bg-surface-2/40">
                    <td className="px-4 py-3">
                      <Link href={`/certificates/${cert.id}`} className="font-medium text-ink hover:text-accent">{cert.course?.title ?? cert.title}</Link>
                    </td>
                    <td className="px-4 py-3 text-ink-2">{cert.course?.category}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={cert.instructor?.name ?? "Instructor"} color={cert.instructor?.avatarColor ?? "#55a1ff"} size="xs" />
                        <span>{cert.instructor?.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-2">{formatDate(cert.issuedAt)}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-ink-2">{cert.certificateId}</td>
                    <td className="px-4 py-3">
                      <Link href={`/certificates/${cert.id}`} className="text-accent hover:underline text-[12px]">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {enrichedCerts.length === 0 && (
        <div className="card p-10 text-center">
          <Award className="size-12 mx-auto text-ink-3 mb-3" />
          <h3 className="text-lg font-semibold text-ink mb-1">No certificates yet</h3>
          <p className="text-ink-3 mb-4">Complete courses to earn certificates</p>
          <Link href="/courses"><Button><Award className="ms-1.5 size-4" /> Browse Courses</Button></Link>
        </div>
      )}
    </div>
  );
}