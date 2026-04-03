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
  X,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DaySchedule, Lesson, ProductionProject, Insect, Beat, Artist, AiNote } from './types';

const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    day: 'Pazartesi',
    lessons: [
      { id: 's1', name: 'Gece Stüdyo Seansı', startTime: '00:00', endTime: '02:00' },
      { id: 'sleep1', name: 'Uyku', startTime: '02:00', endTime: '07:00' },
      { id: '1', name: 'MAT-10', startTime: '08:50', endTime: '09:25' },
      { id: '2', name: 'FEL-10', startTime: '09:35', endTime: '10:10' },
      { id: '3', name: 'SEN-10', startTime: '10:20', endTime: '11:40' }, // Double
      { id: '4', name: 'MVM-10', startTime: '11:50', endTime: '13:45' }, // Double with break
      { id: '5', name: 'KİM-10', startTime: '13:55', endTime: '14:35' },
      { id: '6', name: 'TDVE-10', startTime: '14:45', endTime: '15:20' },
      { id: '28', name: 'Edebiyat', startTime: '15:30', endTime: '16:10' },
    ]
  },
  {
    day: 'Salı',
    lessons: [
      { id: 's2', name: 'Gece Stüdyo Seansı', startTime: '00:00', endTime: '02:00' },
      { id: 'sleep2', name: 'Uyku', startTime: '02:00', endTime: '07:00' },
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
      { id: 'sleep3', name: 'Uyku', startTime: '02:00', endTime: '07:00' },
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
      { id: 'sleep4', name: 'Uyku', startTime: '02:00', endTime: '07:00' },
      { id: '22', name: 'EOA-10 (Otomasyon)', startTime: '08:50', endTime: '16:10' },
      { id: 'ai', name: 'Yapay Zeka (Furkan Salihoğlu)', startTime: '20:00', endTime: '21:00' },
    ]
  },
  {
    day: 'Cuma',
    lessons: [
      { id: 's5', name: 'Gece Stüdyo Seansı', startTime: '00:00', endTime: '02:00' },
      { id: 'sleep5', name: 'Uyku', startTime: '02:00', endTime: '07:00' },
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

  // Mock Data
  const [projects] = useState<ProductionProject[]>([]);
  const [insects, setInsects] = useState<Insect[]>([
    { id: 'i1', species: 'Extatosoma tiaratum', name: 'Tiaratum', lastFed: '-', nextFeeding: '-', notes: '', isFed: false, isCleaned: false },
    { id: 'i2', species: 'Telodeinopus aoutii', name: 'Telodeinopus', lastFed: '-', nextFeeding: '-', notes: '', isFed: false, isCleaned: false },
    { id: 'i3', species: 'Blaptica dubia', name: 'Dubia Hamam Böceği', lastFed: '-', nextFeeding: '-', notes: '', isFed: false, isCleaned: false },
    { id: 'i4', species: 'Porcellio laevis', name: 'Panda Isopod', lastFed: '-', nextFeeding: '-', notes: '', isFed: false, isCleaned: false },
    { id: 'i5', species: 'Pterinochilus murinus', name: 'Murinus', lastFed: '-', nextFeeding: '-', notes: '', isFed: false, isCleaned: false },
  ]);

  const [aiNotes, setAiNotes] = useState<AiNote[]>([]);
  const [showAiNoteModal, setShowAiNoteModal] = useState(false);
  const [newAiNote, setNewAiNote] = useState({ title: '', content: '' });

  const [beats, setBeats] = useState<Beat[]>([]);
  const [newBeatName, setNewBeatName] = useState('');

  const [artists, setArtists] = useState<Artist[]>([
    { id: 'a1', name: 'Tarkan', genre: 'Pop', notes: 'Vokal kayıtları tamamlandı.' },
    { id: 'a2', name: 'Ezhel', genre: 'Trap', notes: 'Beat düzenlemesi bekleniyor.' },
  ]);
  const [newArtist, setNewArtist] = useState({ name: '', genre: '', notes: '' });
  const [showArtistModal, setShowArtistModal] = useState(false);

  const [showInsectModal, setShowInsectModal] = useState(false);
  const [newInsect, setNewInsect] = useState({ name: '', species: '', notes: '' });

  const toggleFed = (id: string) => {
    setInsects(prev => prev.map(i => 
      i.id === id ? { ...i, isFed: !i.isFed, lastFed: !i.isFed ? new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : i.lastFed } : i
    ));
  };

  const toggleCleaned = (id: string) => {
    setInsects(prev => prev.map(i => 
      i.id === id ? { ...i, isCleaned: !i.isCleaned } : i
    ));
  };

  const handleAddBeat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBeatName.trim()) return;
    const beat: Beat = {
      id: Math.random().toString(36).substr(2, 9),
      name: newBeatName,
      createdAt: new Date().toLocaleDateString('tr-TR')
    };
    setBeats([beat, ...beats]);
    setNewBeatName('');
  };

  const handleAddArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtist.name.trim()) return;
    const artist: Artist = {
      id: Math.random().toString(36).substr(2, 9),
      ...newArtist
    };
    setArtists([...artists, artist]);
    setNewArtist({ name: '', genre: '', notes: '' });
    setShowArtistModal(false);
  };

  const handleAddInsect = (e: React.FormEvent) => {
    e.preventDefault();
    const insect: Insect = {
      id: Math.random().toString(36).substr(2, 9),
      ...newInsect,
      lastFed: '-',
      nextFeeding: '-',
      isFed: false,
      isCleaned: false
    };
    setInsects([...insects, insect]);
    setNewInsect({ name: '', species: '', notes: '' });
    setShowInsectModal(false);
  };

  const handleAddAiNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAiNote.title.trim()) return;
    const note: AiNote = {
      id: Math.random().toString(36).substr(2, 9),
      ...newAiNote,
      createdAt: new Date().toLocaleDateString('tr-TR')
    };
    setAiNotes([note, ...aiNotes]);
    setNewAiNote({ title: '', content: '' });
    setShowAiNoteModal(false);
  };

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
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const isSleepTime = currentHour >= 2 && currentHour < 7;
  const isEvening = currentHour >= 18 || currentHour < 6;
  const isInsectCareTime = currentHour === 20 && currentMinute < 30;

  const NavItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl transition-all duration-300 ${
        activeTab === id 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
      }`}
    >
      <Icon size={20} className={activeTab === id ? 'text-white' : 'text-slate-400'} />
      <span className="text-sm font-medium tracking-tight">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen font-sans text-slate-900 bg-slate-50/50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white/80 backdrop-blur-xl border-r border-slate-100 p-8">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200/50">
            <LayoutDashboard size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight font-display text-slate-900">Düzenli Hayat</h1>
        </div>

        <nav className="space-y-1.5 flex-1">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem id="schedule" icon={Calendar} label="Ders Programı" />
          <NavItem id="production" icon={Music} label="Müzik Stüdyosu" />
          <NavItem id="insects" icon={Bug} label="Böcek Laboratuvarı" />
          <NavItem id="ai-class" icon={Cpu} label="Yapay Zeka" />
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100">
          <div className="flex items-center gap-4 px-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200/50">
              Mİ
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900">Mercan İzgi</span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">Lise 2 Öğrencisi</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/60 backdrop-blur-md px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30 border-b border-slate-100">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-3 text-sm text-slate-600 font-semibold bg-white/60 px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
              <Clock size={16} className="text-indigo-500" />
              <span className="tabular-nums">{currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="mx-1 opacity-30">|</span>
              <span className="tracking-tight">{currentTime.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white/60 rounded-2xl transition-all">
              <Search size={20} />
            </button>
            <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white/60 rounded-2xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
            </button>
          </div>
        </header>

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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <section>
                    <h2 className="text-4xl lg:text-5xl font-extrabold font-display mb-3 tracking-tight text-slate-900">
                      Merhaba, <span className="text-indigo-600">Mercan</span> 👋
                    </h2>
                    <p className="text-slate-500 text-lg font-medium">Bugün için planların ve durumun burada.</p>
                  </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <div className={`p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white transition-all duration-700 col-span-1 md:col-span-2 lg:col-span-1 shadow-2xl relative overflow-hidden group ${
                    currentLesson?.name === 'Uyku' || isSleepTime
                      ? 'bg-slate-900'
                      : 'bg-indigo-600'
                  }`}>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-10">
                        <div className="p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/10">
                          <Clock size={28} />
                        </div>
                        <span className="text-[11px] font-bold bg-white/15 backdrop-blur-md px-4 py-2 rounded-full uppercase tracking-widest border border-white/10">
                          {currentLesson ? 'Şu An Derstesin' : 'Durum'}
                        </span>
                      </div>
                      <h3 className="text-4xl font-extrabold font-display mb-3">
                        {currentLesson ? currentLesson.name : 'Serbest Zaman'}
                      </h3>
                      <p className="text-white/80 font-medium">
                        {currentLesson ? `${currentLesson.startTime} - ${currentLesson.endTime}` : 'Dinlenme ve prodüksiyon saati.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col group hover:shadow-xl transition-all">
                    <div className="p-3 md:p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-4 md:mb-6">
                      <Music size={24} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 text-slate-900 font-display">Müzik Stüdyosu</h3>
                    <p className="text-slate-500 text-sm mb-4 md:mb-6 font-medium">{beats.length} Beat • {artists.length} Sanatçı</p>
                    <button onClick={() => setActiveTab('production')} className="mt-auto py-3 bg-slate-50 text-slate-900 font-bold rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">Detaylar</button>
                  </div>

                  <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col group hover:shadow-xl transition-all">
                    <div className="p-3 md:p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl w-fit mb-4 md:mb-6">
                      <Bug size={24} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 text-slate-900 font-display">Böcek Laboratuvarı</h3>
                    <p className="text-slate-500 text-sm mb-4 md:mb-6 font-medium">{insects.length} Tür Takipte</p>
                    <button onClick={() => setActiveTab('insects')} className="mt-auto py-3 bg-slate-50 text-slate-900 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">Detaylar</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">Haftalık Program</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {WEEKLY_SCHEDULE.map((day) => (
                    <div key={day.day} className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                      <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-900 text-lg font-display">{day.day}</h3>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-widest">{day.lessons.length} Ders</span>
                      </div>
                      <div className="p-6 space-y-4">
                        {day.lessons.map((lesson) => (
                          <div key={lesson.id} className="p-4 bg-slate-50/30 border border-slate-100 rounded-2xl">
                            <div className="font-bold text-slate-900">{lesson.name}</div>
                            <div className="text-xs text-slate-400 font-bold mt-1 tabular-nums">{lesson.startTime} — {lesson.endTime}</div>
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
                className="space-y-10"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">Müzik Stüdyosu</h2>
                  <button onClick={() => setShowArtistModal(true)} className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2">
                    <Plus size={20} /> Sanatçı Ekle
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                  <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h3 className="text-xl md:text-2xl font-bold mb-6 font-display">Beat Arşivi</h3>
                      <form onSubmit={handleAddBeat} className="flex gap-3 mb-8">
                        <input 
                          type="text" 
                          value={newBeatName}
                          onChange={e => setNewBeatName(e.target.value)}
                          placeholder="Yeni beat ismi..."
                          className="flex-1 px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        />
                        <button type="submit" className="px-6 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                          <Plus size={24} />
                        </button>
                      </form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {beats.map(beat => (
                          <div key={beat.id} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex justify-between items-center">
                            <div>
                              <div className="font-bold text-slate-900">{beat.name}</div>
                              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{beat.createdAt}</div>
                            </div>
                            <Music size={20} className="text-slate-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h3 className="text-2xl font-bold mb-6 font-display">İşbirlikleri</h3>
                      <div className="space-y-4">
                        {artists.map(artist => (
                          <div key={artist.id} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-slate-900">{artist.name}</h4>
                              <span className="text-[10px] font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full uppercase tracking-widest">{artist.genre}</span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium line-clamp-2 italic">"{artist.notes}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {showArtistModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowArtistModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-[2.5rem] p-10 w-full max-w-lg shadow-2xl">
                        <h3 className="text-3xl font-extrabold text-slate-900 font-display mb-8">Yeni Sanatçı</h3>
                        <form onSubmit={handleAddArtist} className="space-y-6">
                          <input type="text" required value={newArtist.name} onChange={e => setNewArtist({...newArtist, name: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" placeholder="Sanatçı Adı" />
                          <input type="text" value={newArtist.genre} onChange={e => setNewArtist({...newArtist, genre: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" placeholder="Müzik Türü" />
                          <textarea value={newArtist.notes} onChange={e => setNewArtist({...newArtist, notes: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all min-h-[120px]" placeholder="Notlar" />
                          <div className="flex gap-4">
                            <button type="button" onClick={() => setShowArtistModal(false)} className="flex-1 py-4 rounded-2xl font-bold text-slate-500 bg-slate-50">Vazgeç</button>
                            <button type="submit" className="flex-1 py-4 rounded-2xl font-bold text-white bg-indigo-600 shadow-xl shadow-indigo-200">Kaydet</button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'insects' && (
              <motion.div
                key="insects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">Böcek Laboratuvarı</h2>
                  <button onClick={() => setShowInsectModal(true)} className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2">
                    <Plus size={20} /> Yeni Kayıt
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {insects.map(i => (
                    <div key={i.id} className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-6 group hover:shadow-xl transition-all">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all shrink-0 mx-auto sm:mx-0">
                        <Bug size={40} className="md:hidden" />
                        <Bug size={48} className="hidden md:block" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 font-display">{i.name}</h3>
                            <p className="text-xs italic text-slate-400 font-medium">{i.species}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => toggleFed(i.id)} className={`p-2 rounded-xl border transition-all ${i.isFed ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}><CheckCircle2 size={18} /></button>
                            <button onClick={() => toggleCleaned(i.id)} className={`p-2 rounded-xl border transition-all ${i.isCleaned ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}><Settings size={18} /></button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-slate-50 rounded-2xl">
                            <div className="text-[8px] uppercase font-bold text-slate-400 mb-1">Son Besleme</div>
                            <div className="text-xs font-bold text-slate-900">{i.lastFed}</div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-2xl">
                            <div className="text-[8px] uppercase font-bold text-slate-400 mb-1">Durum</div>
                            <div className={`text-xs font-bold ${i.isCleaned ? 'text-emerald-600' : 'text-amber-600'}`}>{i.isCleaned ? 'Temiz' : 'Bakım'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {showInsectModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInsectModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-[2.5rem] p-10 w-full max-w-lg shadow-2xl">
                        <h3 className="text-3xl font-extrabold text-slate-900 font-display mb-8">Yeni Kayıt</h3>
                        <form onSubmit={handleAddInsect} className="space-y-6">
                          <input type="text" required value={newInsect.name} onChange={e => setNewInsect({...newInsect, name: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" placeholder="Böcek Adı" />
                          <input type="text" value={newInsect.species} onChange={e => setNewInsect({...newInsect, species: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" placeholder="Tür" />
                          <textarea value={newInsect.notes} onChange={e => setNewInsect({...newInsect, notes: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all min-h-[120px]" placeholder="Notlar" />
                          <div className="flex gap-4">
                            <button type="button" onClick={() => setShowInsectModal(false)} className="flex-1 py-4 rounded-2xl font-bold text-slate-500 bg-slate-50">Vazgeç</button>
                            <button type="submit" className="flex-1 py-4 rounded-2xl font-bold text-white bg-emerald-600 shadow-xl shadow-emerald-200">Kaydet</button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'ai-class' && (
              <motion.div
                key="ai-class"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 md:space-y-12 max-w-4xl mx-auto py-6 md:py-10"
              >
                <div className="text-center space-y-4 md:space-y-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-600 text-white rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl relative">
                    <Cpu size={40} className="md:hidden" />
                    <Cpu size={48} className="hidden md:block" />
                    <div className="absolute -right-1 -top-1 md:-right-2 md:-top-2 w-6 h-6 md:w-8 md:h-8 bg-emerald-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">Yapay Zeka Eğitimi</h2>
                  <p className="text-slate-500 text-lg md:text-xl font-medium px-4">Furkan Salihoğlu ile her Perşembe geleceği inşa ediyoruz.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex items-center gap-4 md:gap-5 p-5 md:p-6 bg-indigo-50 rounded-3xl">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                      <Calendar size={24} className="md:hidden" />
                      <Calendar size={28} className="hidden md:block" />
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Ders Günü</div>
                      <div className="text-base md:text-lg font-bold text-slate-900">Perşembe</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-5 p-5 md:p-6 bg-violet-50 rounded-3xl">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center text-violet-600 shadow-sm">
                      <Clock size={24} className="md:hidden" />
                      <Clock size={28} className="hidden md:block" />
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs font-bold text-violet-400 uppercase tracking-widest mb-1">Ders Saati</div>
                      <div className="text-base md:text-lg font-bold text-slate-900 tabular-nums">20:00 - 21:00</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900">Ders Notları</h3>
                    <button 
                      onClick={() => setShowAiNoteModal(true)}
                      className="w-full sm:w-auto px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 text-sm"
                    >
                      <Plus size={18} /> Not Ekle
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {aiNotes.map(note => (
                      <div key={note.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:border-indigo-200 transition-all group">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                            <FileText size={18} className="text-indigo-400" />
                            {note.title}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{note.createdAt}</span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{note.content}</p>
                      </div>
                    ))}
                    {aiNotes.length === 0 && (
                      <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                          <FileText size={24} />
                        </div>
                        <p className="text-slate-400 font-bold">Henüz ders notu eklenmemiş.</p>
                      </div>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {showAiNoteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAiNoteModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-[2.5rem] p-10 w-full max-w-lg shadow-2xl">
                        <h3 className="text-3xl font-extrabold text-slate-900 font-display mb-8">Yeni Ders Notu</h3>
                        <form onSubmit={handleAddAiNote} className="space-y-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Başlık</label>
                            <input 
                              type="text" 
                              required 
                              value={newAiNote.title} 
                              onChange={e => setNewAiNote({...newAiNote, title: e.target.value})} 
                              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" 
                              placeholder="Ders konusu..." 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">İçerik</label>
                            <textarea 
                              required
                              value={newAiNote.content} 
                              onChange={e => setNewAiNote({...newAiNote, content: e.target.value})} 
                              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all min-h-[150px]" 
                              placeholder="Notlarınızı buraya yazın..." 
                            />
                          </div>
                          <div className="flex gap-4">
                            <button type="button" onClick={() => setShowAiNoteModal(false)} className="flex-1 py-4 rounded-2xl font-bold text-slate-500 bg-slate-50">Vazgeç</button>
                            <button type="submit" className="flex-1 py-4 rounded-2xl font-bold text-white bg-indigo-600 shadow-xl shadow-indigo-200">Kaydet</button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-around items-center z-40 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === 'dashboard' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
          <LayoutDashboard size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Panel</span>
        </button>
        <button onClick={() => setActiveTab('schedule')} className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === 'schedule' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
          <Calendar size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Program</span>
        </button>
        <button onClick={() => setActiveTab('production')} className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === 'production' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
          <Music size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Stüdyo</span>
        </button>
        <button onClick={() => setActiveTab('insects')} className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === 'insects' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
          <Bug size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Böcekler</span>
        </button>
        <button onClick={() => setActiveTab('ai-class')} className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === 'ai-class' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
          <Cpu size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">AI</span>
        </button>
      </nav>
    </div>
  );
}
