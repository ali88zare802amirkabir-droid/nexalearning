import {
  LayoutDashboard,
  BookOpen,
  Library,
  Calendar,
  ClipboardList,
  Award,
  Users,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  exact?: boolean;
}

export const NAV: NavItem[] = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/my-learning", label: "My Learning", icon: BookOpen },
  { href: "/courses", label: "Courses", icon: Library },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/instructors", label: "Instructors", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];