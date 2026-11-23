"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  Flame,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";

const initialTasks = [
  { id: 1, title: "수학 문제집 3단원 풀기", subject: "수학", time: "오늘 · 오후 6:00", done: false },
  { id: 2, title: "영어 단어 30개 암기", subject: "영어", time: "오늘 · 오후 7:30", done: false },
  { id: 3, title: "과학 보고서 초안 작성", subject: "과학", time: "내일 · 오후 11:00", done: true },
];

const weeklyHours = [
  { day: "월", height: 42, value: "1.5h" },
  { day: "화", height: 68, value: "2.4h" },
  { day: "수", height: 52, value: "1.8h" },
  { day: "목", height: 84, value: "3.0h" },
  { day: "금", height: 60, value: "2.1h" },
  { day: "토", height: 96, value: "3.5h" },
  { day: "일", height: 30, value: "1.0h" },
];

export default function HomePage() {
  const [tasks, setTasks] = useState(initialTasks);
  const completed = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);
  const today = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());

  function toggleTask(id: number) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }

  return (
    <AppShell>
      <div className="page-heading">
        <div>
          <div className="eyebrow">{today}</div>
          <h1>오늘도 좋은 하루예요 <span>👋</span></h1>
          <p>작은 계획이 모여 큰 성장을 만들어요. 오늘의 목표를 확인해 보세요.</p>
        </div>
        <button className="button button-primary"><Plus size={17} />새 일정 추가</button>
      </div>

      <section className="welcome-banner">
        <div className="welcome-copy">
          <span className="banner-kicker"><Sparkles size={14} /> YOUR DAILY FLOW</span>
          <h2>오늘의 흐름을<br />만들어 볼까요?</h2>
          <p>해야 할 일을 하나씩 완료하며 나만의 페이스를 찾아보세요.</p>
          <button className="button button-light">집중 시작하기 <ArrowUpRight size={16} /></button>
        </div>
        <div className="banner-orbit orbit-one" />
        <div className="banner-orbit orbit-two" />
        <div className="banner-decoration"><BookOpen size={42} strokeWidth={1.2} /></div>
      </section>

      <section className="stats-grid" aria-label="오늘의 요약">
        <article className="stat-card">
          <div className="stat-icon blue"><Check size={19} /></div>
          <div className="stat-label">오늘 완료한 과제</div>
          <div className="stat-value">{completed}<small> / {tasks.length}개</small></div>
          <div className="stat-foot">차근차근 진행하고 있어요</div>
        </article>
        <article className="stat-card">
          <div className="stat-icon violet"><Clock3 size={19} /></div>
          <div className="stat-label">오늘 집중 시간</div>
          <div className="stat-value">1<small>시간 25분</small></div>
          <div className="stat-foot">어제보다 15분 더 집중했어요</div>
        </article>
        <article className="stat-card">
          <div className="stat-icon orange"><Flame size={19} /></div>
          <div className="stat-label">연속 학습 일수</div>
          <div className="stat-value">4<small>일</small></div>
          <div className="stat-foot">꾸준함이 실력이 돼요</div>
        </article>
        <article className="stat-card">
          <div className="stat-icon green"><Target size={19} /></div>
          <div className="stat-label">주간 목표 달성률</div>
          <div className="stat-value">72<small>%</small></div>
          <div className="progress-track"><span style={{ width: "72%" }} /></div>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel tasks-panel">
          <div className="panel-heading">
            <div><h3>오늘의 할 일</h3><p>오늘 계획한 일을 확인해 보세요.</p></div>
            <button className="text-button">전체 보기 <ArrowUpRight size={15} /></button>
          </div>
          <div className="task-list">
            {tasks.map((task) => (
              <div className={`task-row ${task.done ? "task-done" : ""}`} key={task.id}>
                <button className={`task-check ${task.done ? "checked" : ""}`} onClick={() => toggleTask(task.id)} aria-label={task.done ? "완료 취소" : "과제 완료"}>
                  {task.done && <Check size={14} />}
                </button>
                <div className="task-main"><strong>{task.title}</strong><span>{task.time}</span></div>
                <span className="subject-tag">{task.subject}</span>
              </div>
            ))}
          </div>
          <button className="add-task-button"><Plus size={16} />새로운 할 일 추가</button>
        </article>

        <article className="panel weekly-panel">
          <div className="panel-heading">
            <div><h3>이번 주 학습 시간</h3><p>하루하루 쌓이는 나의 집중 기록</p></div>
            <button className="period-button">이번 주 <CalendarDays size={14} /></button>
          </div>
          <div className="weekly-total">15<span>시간 18분</span></div>
          <div className="chart-area">
            {weeklyHours.map((item) => (
              <div className="chart-column" key={item.day}>
                <div className="chart-bar-wrap"><div className="chart-bar" style={{ height: item.height + "%" }} title={item.value} /></div>
                <span>{item.day}</span>
              </div>
            ))}
          </div>
          <div className="chart-caption"><span className="chart-dot" />일별 집중 시간</div>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="panel schedule-panel">
          <div className="panel-heading"><div><h3>다가오는 일정</h3><p>놓치지 말아야 할 중요한 일정</p></div><CalendarDays size={19} className="muted-icon" /></div>
          <div className="schedule-item"><div className="date-chip"><b>25</b><span>11월</span></div><div><strong>영어 단어 테스트</strong><span>오전 10:00 · 영어</span></div><span className="event-dot blue-dot" /></div>
          <div className="schedule-item"><div className="date-chip"><b>27</b><span>11월</span></div><div><strong>수학 과제 제출</strong><span>오후 11:59 · 수학</span></div><span className="event-dot orange-dot" /></div>
        </article>
        <article className="focus-card">
          <div className="focus-card-top"><span><Clock3 size={15} /> FOCUS TIME</span><span className="live-dot" /></div>
          <h3>집중할 준비가<br />되었나요?</h3>
          <p>짧은 집중부터 시작해 보세요.</p>
          <div className="focus-time">25:00</div>
          <button className="button button-light">타이머 시작하기 <ArrowUpRight size={16} /></button>
        </article>
      </section>

      <footer className="demo-note">현재 대시보드는 초기 UI 데모 데이터로 구성되어 있습니다. 계정 연동과 실제 데이터 저장은 다음 개발 단계에서 연결합니다.</footer>
    </AppShell>
  );
}
