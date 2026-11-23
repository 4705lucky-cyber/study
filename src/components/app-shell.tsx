"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Timer,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "대시보드", href: "/", icon: LayoutDashboard },
  { label: "캘린더", href: "/calendar", icon: CalendarDays },
  { label: "과제 관리", href: "/tasks", icon: CheckSquare },
  { label: "집중 모드", href: "/focus", icon: Timer },
  { label: "학습 통계", href: "/analytics", icon: BarChart3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <Link href="/" className="brand">
          <span className="brand-mark"><GraduationCap size={21} /></span>
          <span>STUDY <b>FLOW</b></span>
        </Link>
        <div className="sidebar-label">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label="주 메뉴">
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} className={`nav-link ${active ? "active" : ""}`}>
                <Icon size={18} strokeWidth={1.8} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <Link href="/settings" className={`nav-link ${pathname === "/settings" ? "active" : ""}`}>
            <Settings size={18} strokeWidth={1.8} />
            <span>설정</span>
          </Link>
          <div className="sidebar-profile">
            <div className="avatar">S</div>
            <div><strong>게스트 사용자</strong><small>체험 모드</small></div>
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="mobile-header">
          <button className="icon-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="메뉴 열기">
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <Link href="/" className="mobile-brand">STUDY <b>FLOW</b></Link>
          <div className="avatar small">S</div>
        </header>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navigation.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="nav-link">
                <Icon size={18} />{label}
              </Link>
            ))}
            <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="nav-link">
              <Settings size={18} />설정
            </Link>
          </div>
        )}
        <main className="main-content">{children}</main>
        <nav className="bottom-nav" aria-label="모바일 메뉴">
          {navigation.slice(0, 5).map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className={pathname === href ? "bottom-link active" : "bottom-link"}>
              <Icon size={19} strokeWidth={1.9} />
              <span>{label.replace(" 관리", "").replace(" 모드", "").replace(" 학습 ", "")}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
