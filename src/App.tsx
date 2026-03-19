import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Music, 
  Bug, 
  Cpu, 
  LayoutDashboard, 
  Clock, 
  Plus, 
  CheckCircle2, 
  ChevronRight,
  Settings,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DaySchedule, Lesson, ProductionProject, Insect } from './types';

const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    day: 'Pazartesi',
    lessons: [
      { id: 's1', name: 'Gece Stüdyo Seansı', startTime: '00:00', endTime: '02:00' },
      { id: '1', name: 'MAT-10', startTime: '08:50', endTime: '09:25' },
      { id: '2', name: 'FEL-10', startTime: '09:35', endTime: '10:10' },
      { id: '3', name: 'SEN-10', startTime: '10:20', endTime: '11:40' }, // Double
      { id: '4', name: 'MVM-10', startTime: '11:50', endTime: '13:45' }, // Double with break
      { id: '5', name: 'KİM-10', startTime: '13:55', endTime: '14:35' },
      { id: '6', name: 'TDVE-10', startTime: '14:45', endTime: '15:20' },
    ]
  },
  {
    day: 'Salı',
    lessons: [
      { id: 's2', name: 'Gece Stüdyo Seansı', startTime: '00:00', endTime: '02:00' },
      { id: '7', name: 'COĞ-10', startTime: '08:50', endTime: '09:25' },
      { id: '8', name: 'DKAB-10', startTime: '09:35', endTime: '11:00' }, // Double
      { id: '9', name: 'MAT-10', startTime: '11:05', endTime: '12:30' }, // Double
      { id: '10', name: 'S.PEYH-10', startTime: '13:10', endTime: '13:45' },
      { id: '11', name: 'S.MT-10', startTime: '13:55', endTime: '14:35' },
      { id: '12', name: 'İNG-10', startTime: '14:45', endTime: '15:20' },
      { id: '13', name: 'REH-10', startTime: '15:30', endTime: '16:10' },
    ]
  },
  {
    day: 'Çarşamba',
    lessons: [
      { id: 's3', name: 'Gece Stüdyo Seansı', startTime: '00:00', endTime: '02:00' },
      { id: '14', name: 'COĞ-10', startTime: '08:50', endTime: '09:25' },
      { id: '15', name: 'İNG-10', startTime: '09:35', endTime: '10:10' },
      { id: '16', name: 'TAR-10', startTime: '10:20', endTime: '11:00' },
      { id: '17', name: 'KİM-10', startTime: '11:05', endTime: '11:40' },
      { id: '18', name: 'SEÇ.A-10', startTime: '11:50', endTime: '12:30' },
      { id: '19', name: 'FEL-10', startTime: '13:10', endTime: '13:45' },
      { id: '20', name: 'S.STG-10', startTime: '13:55', endTime: '14:35' },
      { id: '21', name: 'FİZ-10', startTime: '14:45', endTime: '16:10' }, // Double
    ]
  },
  {
    day: 'Perşembe',
    lessons: [
      { id: 's4', name: 'Gece Stüdyo Seansı', startTime: '00:00', endTime: '02:00' },
      { id: '22', name: 'EOA-10 (Otomasyon)', startTime: '08:50', endTime: '16:10' },
      { id: 'ai', name: 'Yapay Zeka (Furkan Salihoğlu)', startTime: '20:00', endTime: '21:00' },
    ]
  },
  {
    day: 'Cuma',
    lessons: [
      { id: 's5', name: 'Gece Stüdyo Seansı', startTime: '00:00', endTime: '02:00' },
      { id: '23', name: 'TDVE-10', startTime: '08:50', endTime: '10:10' }, // Double
      { id: '24', name: 'BİY-10', startTime: '10:20', endTime: '11:40' }, // Double
      { id: '25', name: 'BE-10', startTime: '11:50', endTime: '13:45' }, // Double with break
      { id: '26', name: 'TAR-10', startTime: '13:55', endTime: '14:35' },
      { id: '27', name: 'MAT-10', startTime: '14:45', endTime: '16:10' }, // Double
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock Data (In a real app, these would come from localStorage or an API)
  const [projects] = useState<ProductionProject[]>([
    { id: 'p1', title: 'Midnight Echoes', status: 'Mixing', bpm: 124, key: 'Am' },
    { id: 'p2', title: 'Cyber Jungle', status: 'Arrangement', bpm: 140, key: 'F#m' },
  ]);

  const [insects] = useState<Insect[]>([
    { id: 'i1', species: 'Dynastes hercules', name: 'Hercules', lastFed: '2024-03-18', nextFeeding: '2024-03-20', notes: 'L3 larva stage' },
    { id: 'i2', species: 'Phyllium letiranti', name: 'Leafy', lastFed: '2024-03-19', nextFeeding: '2024-03-21', notes: 'Needs fresh bramble leaves' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getDayName = (date: Date) => {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[date.getDay()];
  };

  const getCurrentLesson = () => {
    const daySchedule = WEEKLY_SCHEDULE.find(s => s.day === getDayName(currentTime));
    if (!daySchedule) return null;

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    return daySchedule.lessons.find(lesson => {
      const [startH, startM] = lesson.startTime.split(':').map(Number);
      const [endH, endM] = lesson.endTime.split(':').map(Number);
      const startTotal = startH * 60 + startM;
      const endTotal = endH * 60 + endM;
      return currentTimeInMinutes >= startTotal && currentTimeInMinutes <= endTotal;
    });
  };

  const currentLesson = getCurrentLesson();
  const isEvening = currentTime.getHours() >= 18 || currentTime.getHours() < 6;

  const NavItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
        activeTab === id 
          ? 'bg-emerald-50 text-emerald-600 font-semibold' 
          : 'text-zinc-500 hover:bg-zinc-100'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-zinc-200 p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight font-display">LifePlanner</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem id="schedule" icon={Calendar} label="Ders Programı" />
          <NavItem id="production" icon={Music} label="Müzik Stüdyosu" />
          <NavItem id="insects" icon={Bug} label="Böcek Laboratuvarı" />
          <NavItem id="ai-class" icon={Cpu} label="Yapay Zeka" />
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-100">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">İzgi Mercan</span>
              <span className="text-xs text-zinc-400">Lise 2 Öğrencisi</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 p-6 lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                    <LayoutDashboard size={24} />
                  </div>
                  <h1 className="text-xl font-bold font-display">LifePlanner</h1>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-zinc-400">
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-2">
                <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
                <NavItem id="schedule" icon={Calendar} label="Ders Programı" />
                <NavItem id="production" icon={Music} label="Müzik Stüdyosu" />
                <NavItem id="insects" icon={Bug} label="Böcek Laboratuvarı" />
                <NavItem id="ai-class" icon={Cpu} label="Yapay Zeka" />
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-zinc-500"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-lg">
              <Clock size={14} />
              <span>{currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="mx-1 opacity-20">|</span>
              <span>{currentTime.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-lg transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-lg transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 lg:p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <section>
                  <h2 className="text-3xl font-bold font-display mb-2">Merhaba, İzgi 👋</h2>
                  <p className="text-zinc-500">Bugün için planların ve durumun burada.</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Current Class Card */}
                  <div className={`glass-card p-6 border-none text-white transition-all duration-500 ${
                    currentLesson 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-100' 
                      : isEvening 
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg shadow-indigo-100'
                        : 'bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-lg shadow-zinc-200'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        {currentLesson ? <Calendar size={20} /> : isEvening ? <Music size={20} /> : <Clock size={20} />}
                      </div>
                      <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full uppercase tracking-wider">
                        {currentLesson ? 'Şu An Derstesin' : isEvening ? 'Prodüksiyon Saati' : 'Serbest Zaman'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                      {currentLesson ? currentLesson.name : isEvening ? 'Stüdyo Zamanı' : 'Okul Bitti'}
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      {currentLesson 
                        ? `${currentLesson.startTime} - ${currentLesson.endTime} arası dersin var.` 
                        : isEvening 
                          ? 'Akşam saatleri müzik üretmek için en iyi zaman.' 
                          : 'Bugünlük okul maratonu tamamlandı.'}
                    </p>
                    <div className="flex items-center gap-2 text-2xl font-bold">
                      {currentLesson ? 'Aktif Ders' : isEvening ? 'Yaratıcılık Modu' : 'Dinlenme'}
                    </div>
                  </div>

                  {/* Music Production Card */}
                  <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600">
                        <Music size={20} />
                      </div>
                      <button className="text-zinc-400 hover:text-emerald-600 transition-colors">
                        <Plus size={20} />
                      </button>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">Müzik Projeleri</h3>
                    <p className="text-zinc-500 text-sm mb-4">Aktif olarak üzerinde çalıştığın parçalar.</p>
                    <div className="space-y-3">
                      {projects.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                          <div>
                            <div className="text-sm font-medium">{p.title}</div>
                            <div className="text-xs text-zinc-400">{p.status} • {p.bpm} BPM</div>
                          </div>
                          <ChevronRight size={16} className="text-zinc-300" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insect Care Card */}
                  <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600">
                        <Bug size={20} />
                      </div>
                      <button className="text-zinc-400 hover:text-emerald-600 transition-colors">
                        <Plus size={20} />
                      </button>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">Böcek Bakımı</h3>
                    <p className="text-zinc-500 text-sm mb-4">Besleme ve bakım hatırlatıcıları.</p>
                    <div className="space-y-3">
                      {insects.map(i => (
                        <div key={i.id} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{i.name}</div>
                            <div className="text-xs text-zinc-400">Sonraki Besleme: {i.nextFeeding}</div>
                          </div>
                          <CheckCircle2 size={16} className="text-zinc-300 hover:text-emerald-500 cursor-pointer transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Class Reminder */}
                {currentTime.getDay() === 4 && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-indigo-600 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Cpu size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Bugün Yapay Zeka Dersi Var!</h3>
                        <p className="text-indigo-100">Furkan Salihoğlu ile saat 17:00'de başlıyor.</p>
                      </div>
                    </div>
                    <button className="px-6 py-2.5 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                      Derse Katıl / Notlar
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-bold font-display">Haftalık Ders Programı</h2>
                    <p className="text-zinc-500">10-O AMP Otomasyon Sınıfı</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {WEEKLY_SCHEDULE.map((day) => (
                    <div key={day.day} className="glass-card overflow-hidden">
                      <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
                        <h3 className="font-bold text-zinc-700">{day.day}</h3>
                        <span className="text-xs font-medium text-zinc-400">{day.lessons.length} Ders</span>
                      </div>
                      <div className="p-4 space-y-4">
                        {day.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex gap-4 group">
                            <div className="flex flex-col items-center gap-1 min-w-[50px]">
                              <span className="text-xs font-bold text-zinc-400">{lesson.startTime}</span>
                              <div className="w-0.5 flex-1 bg-zinc-100 rounded-full group-last:hidden" />
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="p-3 bg-white border border-zinc-100 rounded-xl shadow-sm hover:border-emerald-200 transition-colors">
                                <div className="font-bold text-zinc-800">{lesson.name}</div>
                                <div className="text-xs text-zinc-400 mt-1">{lesson.startTime} - {lesson.endTime}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'production' && (
              <motion.div
                key="production"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold font-display">Müzik Stüdyosu</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
                    <Plus size={18} />
                    Yeni Proje
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map(p => (
                    <div key={p.id} className="glass-card p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                          <Music size={24} />
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          p.status === 'Mixing' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                      <div className="flex gap-4 text-sm text-zinc-400">
                        <span className="flex items-center gap-1"><Clock size={14} /> {p.bpm} BPM</span>
                        <span className="flex items-center gap-1"><CheckCircle2 size={14} /> {p.key}</span>
                      </div>
                      <div className="mt-6 w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full" 
                          style={{ width: p.status === 'Mixing' ? '75%' : '40%' }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'insects' && (
              <motion.div
                key="insects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold font-display">Böcek Laboratuvarı</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors">
                    <Plus size={18} />
                    Yeni Kayıt
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {insects.map(i => (
                    <div key={i.id} className="glass-card p-6 flex flex-col sm:flex-row gap-6">
                      <div className="w-full sm:w-32 h-32 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400">
                        <Bug size={48} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{i.name}</h3>
                            <p className="text-sm italic text-zinc-500">{i.species}</p>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-600 mb-4">{i.notes}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                            <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">Son Besleme</div>
                            <div className="text-sm font-medium">{i.lastFed}</div>
                          </div>
                          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                            <div className="text-[10px] uppercase tracking-wider font-bold text-amber-400 mb-1">Sıradaki</div>
                            <div className="text-sm font-medium text-amber-700">{i.nextFeeding}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'ai-class' && (
              <motion.div
                key="ai-class"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 max-w-3xl mx-auto"
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto">
                    <Cpu size={40} />
                  </div>
                  <h2 className="text-4xl font-bold font-display">Yapay Zeka Eğitimi</h2>
                  <p className="text-zinc-500">Furkan Salihoğlu ile her Perşembe geleceği inşa ediyoruz.</p>
                </div>

                <div className="glass-card p-8 space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Ders Günü</div>
                      <div className="text-lg font-bold text-indigo-900">Perşembe, 17:00 - 19:00</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-emerald-500" />
                      Öğrenilecek Konular
                    </h3>
                    <ul className="space-y-3">
                      {['Machine Learning Temelleri', 'Neural Networks & Deep Learning', 'Python ile Veri Analizi', 'LLM Entegrasyonları'].map((topic, idx) => (
                        <li key={idx} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl text-zinc-700">
                          <div className="w-6 h-6 bg-white border border-zinc-200 rounded-lg flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </div>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]">
                      Ders Notlarını Aç
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-4 py-2 flex justify-around items-center z-40 pb-safe">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'dashboard' ? 'text-emerald-600' : 'text-zinc-400'}`}
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-bold uppercase">Ana Sayfa</span>
        </button>
        <button 
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'schedule' ? 'text-emerald-600' : 'text-zinc-400'}`}
        >
          <Calendar size={20} />
          <span className="text-[10px] font-bold uppercase">Dersler</span>
        </button>
        <button 
          onClick={() => setActiveTab('production')}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'production' ? 'text-emerald-600' : 'text-zinc-400'}`}
        >
          <Music size={20} />
          <span className="text-[10px] font-bold uppercase">Stüdyo</span>
        </button>
        <button 
          onClick={() => setActiveTab('insects')}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'insects' ? 'text-emerald-600' : 'text-zinc-400'}`}
        >
          <Bug size={20} />
          <span className="text-[10px] font-bold uppercase">Böcekler</span>
        </button>
      </nav>
    </div>
  );
}
