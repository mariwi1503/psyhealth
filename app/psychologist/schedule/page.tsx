"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MoreVertical, Video, ChevronLeft, ChevronRight, List } from "lucide-react";

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<'month' | 'day'>('month');

  // Dummy monthly dates (Oktober 2026)
  // 1 Okt 2026 is Thursday. So we need Mon, Tue, Wed from Sep (28, 29, 30)
  const generateCalendar = () => {
    let days = [];
    for(let i=28; i<=30; i++) days.push({ date: i, isCurrentMonth: false, sessions: 0 });
    for(let i=1; i<=31; i++) {
      let sessions = 0;
      if(i === 2) sessions = 2;
      if(i === 3) sessions = 1;
      if(i === 10) sessions = 3;
      if(i === 15) sessions = 1;
      if(i === 22) sessions = 2;
      days.push({ date: i, isCurrentMonth: true, sessions });
    }
    let nextMonthDay = 1;
    while(days.length < 35) {
      days.push({ date: nextMonthDay++, isCurrentMonth: false, sessions: 0 });
    }
    return days;
  };

  const monthDays = generateCalendar();
  const weekDays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  // Dummy daily hours
  const hours = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const todaysSessions = [
    { time: "10:00", duration: 1, client: "Amanda S.", type: "Konseling Pasangan", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    { time: "13:00", duration: 1.5, client: "Reza F.", type: "Konsultasi Umum", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* View Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button 
            onClick={() => setViewMode('month')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${viewMode === 'month' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
          >
            <CalendarIcon className="h-4 w-4" />
            Bulanan
          </button>
          <button 
            onClick={() => setViewMode('day')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${viewMode === 'day' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
          >
            <Clock className="h-4 w-4" />
            Harian
          </button>
        </div>

        <div className="flex justify-end gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors">
            Atur Ketersediaan
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Sinkronisasi
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Calendar/Daily Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">
            {viewMode === 'month' ? 'Oktober 2026' : 'Jumat, 02 Okt 2026'}
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 shadow-sm">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700 shadow-sm">
              Hari Ini
            </button>
            <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 shadow-sm">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* View: MONTH */}
        {viewMode === 'month' && (
          <div className="p-6">
            <div className="grid grid-cols-7 mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
              {monthDays.map((d, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    if (d.isCurrentMonth && d.date === 2) {
                      setViewMode('day'); // Dummy click to navigate to day view
                    }
                  }}
                  className={`min-h-[120px] p-3 bg-white flex flex-col gap-1 transition-colors hover:bg-slate-50 ${!d.isCurrentMonth ? 'opacity-50 bg-slate-50/50' : 'cursor-pointer'}`}
                >
                  <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full ${d.date === 2 && d.isCurrentMonth ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-700'}`}>
                    {d.date}
                  </span>
                  
                  {/* Render Session Badges */}
                  {d.sessions > 0 && d.isCurrentMonth && (
                    <div className="mt-1 space-y-1">
                      <div className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1.5 rounded-lg border border-indigo-100/50 font-medium truncate flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        {d.sessions} Sesi Terjadwal
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View: DAY (Hourly) */}
        {viewMode === 'day' && (
          <div className="flex flex-col relative h-[600px] overflow-y-auto p-6 bg-slate-50/30">
            {hours.map((hour) => {
              const session = todaysSessions.find(s => s.time === hour);
              
              return (
                <div key={hour} className="flex gap-6 min-h-[80px] relative group">
                  {/* Time label */}
                  <div className="w-16 text-right shrink-0">
                    <span className="text-sm font-medium text-slate-400 group-hover:text-slate-600 transition-colors -mt-2.5 block">{hour}</span>
                  </div>
                  
                  {/* Timeline grid line */}
                  <div className="flex-1 border-t border-slate-200/60 relative">
                    {/* Render session block if it exists for this hour */}
                    {session && (
                      <div 
                        className={`absolute top-2 w-[calc(100%-1rem)] p-4 rounded-xl border ${session.color} shadow-sm z-10 flex justify-between group/session hover:shadow-md transition-shadow cursor-pointer`}
                        style={{ height: `calc(${session.duration * 80}px - 12px)` }}
                      >
                        <div className="flex flex-col h-full justify-center">
                          <p className="font-bold text-sm mb-0.5">{session.client}</p>
                          <p className="text-xs opacity-90 font-medium flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.time} - {parseInt(session.time) + Math.floor(session.duration)}:{session.duration % 1 === 0.5 ? '30' : '00'} • {session.type}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 bg-white/50 hover:bg-white rounded-lg transition-colors text-inherit shadow-sm">
                            <Video className="h-4 w-4" />
                          </button>
                          <button className="p-2 hover:bg-black/5 rounded-lg transition-colors text-inherit opacity-0 group-hover/session:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
