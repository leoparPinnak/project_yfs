import { useState, useEffect, useRef } from 'react'
import { Terminal, Settings, Play, Pause, Database, History, Info, Loader2, CheckCircle2, AlertCircle, RefreshCw, RotateCcw, X, Menu, Trash2, Globe } from 'lucide-react'
import { platformService, Platform, Profile } from './services/api'
import { useWebSocket } from './hooks/useWebSocket'
import { useI18n } from './i18n/useI18n'
import { motion, AnimatePresence } from 'framer-motion'
import SceneContainer, { SceneData, SceneStatus } from './components/SceneContainer'
import Branding from './components/Branding'
import GozcuPage from './components/GozcuPanel'

type ExtendedSceneStatus = SceneStatus | 'completed' | 'running' | 'rate_limited' | 'queued';

function App() {
    const [showIntro, setShowIntro] = useState<boolean>(true)
    const [introReady, setIntroReady] = useState(false)
    const [platforms, setPlatforms] = useState<Platform[]>([])
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [selectedPlatform, setSelectedPlatform] = useState('')
    const [selectedProfile, setSelectedProfile] = useState('')
    const [aspectRatio, setAspectRatio] = useState('16:9')
    const [taskCount, setTaskCount] = useState(1)
    const [prompt, setPrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState('READY')
    const [isStopping, setIsStopping] = useState(false)
    const [showTerminal, setShowTerminal] = useState(false)
    const [currentView, setCurrentView] = useState<'panel' | 'gozcu'>('panel')
    const [currentJobId, setCurrentJobId] = useState<string | null>(null)
    const [unreadLogs, setUnreadLogs] = useState(0)
    const [previewScale, setPreviewScale] = useState(65)
    const [galleryScale, setGalleryScale] = useState(55)

    // New features states
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)
    const [hoveredRect, setHoveredRect] = useState<{ x: number, y: number, width: number, height: number } | null>(null)
    const [videoCurrentTime, setVideoCurrentTime] = useState(0)
    const [videoDuration, setVideoDuration] = useState(0)
    const [previewPlaying, setPreviewPlaying] = useState(true)

    const { t, lang, toggleLang } = useI18n()
    const { messages, lastMessage, isConnected, clearMessages, addLocalMessage, sendMessage, forceReconnect, mediaTotal, mediaLoaded, messageCounter, consumePendingMessages } = useWebSocket()

    const terminalRef = useRef<HTMLDivElement>(null)
    const [downloads, setDownloads] = useState<string[]>([])
    const [newestMediaUrl, setNewestMediaUrl] = useState<string | null>(null)

    const galleryRef = useRef<HTMLDivElement>(null)
    const hoverTimeoutRef = useRef<any>(null)
    const previewVideoRef = useRef<HTMLVideoElement>(null)
    const [activeScenes, setActiveScenes] = useState<Map<string, SceneData>>(new Map())

    useEffect(() => {
        if (introReady) return
        if (mediaTotal > 0 && mediaLoaded >= mediaTotal) {
            const t = setTimeout(() => setIntroReady(true), 800)
            return () => clearTimeout(t)
        }
    }, [mediaTotal, mediaLoaded, introReady])

    useEffect(() => {
        platformService.getPlatforms().then(data => {
            setPlatforms(data)
            if (data.length > 0) setSelectedPlatform(data[0].name)
        })
    }, [])

    useEffect(() => {
        if (selectedPlatform) {
            platformService.getProfiles(selectedPlatform).then(data => {
                setProfiles(data);
                if (data.length > 0) setSelectedProfile(data[0].name);
            });
        }
    }, [selectedPlatform])

    useEffect(() => {
        const pendingMessages = consumePendingMessages();
        if (pendingMessages.length === 0) return;

        for (const lastMessage of pendingMessages) {
            if (lastMessage.type === 'status' || lastMessage.type === 'progress') {
                const sceneTag = lastMessage.scene_tag || 'unknown';
                if (sceneTag !== 'unknown') {
                    setActiveScenes(prev => {
                        const next = new Map(prev);
                        const existing = next.get(sceneTag);
                        const scene: SceneData = {
                            jobId: lastMessage.job_id || existing?.jobId || 'unknown',
                            sceneTag: sceneTag,
                            status: (lastMessage.status as SceneStatus) || existing?.status || 'generating',
                            progress: lastMessage.pct !== undefined ? lastMessage.pct : existing?.progress || 0,
                            videoSrc: lastMessage.url || existing?.videoSrc || null,
                            platform: lastMessage.platform || existing?.platform || selectedPlatform || 'grok',
                            profile: lastMessage.profile || existing?.profile,
                            tabNumber: lastMessage.tab_number || existing?.tabNumber,
                            aspectRatio: lastMessage.aspect_ratio || existing?.aspectRatio || '16:9'
                        };
                        // rate_limited durumunu SceneContainer'a aktar
                        if (lastMessage.status === 'rate_limited') {
                            scene.status = 'rate_limited' as SceneStatus;
                        }
                        // Log mesajını scene'e ekle
                        const logMsg = lastMessage.message || lastMessage.status || '';
                        scene.logs = [...(existing?.logs || []), ...(logMsg ? [logMsg] : [])].slice(-20);
                        next.set(sceneTag, scene);
                        return next;
                    });
                }
                if (lastMessage.type === 'progress') {
                    setProgress(lastMessage.pct || 0)
                    setStatus(lastMessage.status || 'GENERATING')
                } else {
                    setStatus(lastMessage.status || 'BUSY')
                }
            } else if (lastMessage.type === 'completed') {
                // Tek bir sahne tamamlandı — ama diğer sahneler hala çalışıyor olabilir
                const completedTag = lastMessage.scene_tag;
                if (completedTag) {
                    setActiveScenes(prev => {
                        const next = new Map(prev);
                        const existing = next.get(completedTag);
                        if (existing) {
                            next.set(completedTag, { ...existing, progress: 100 });
                        }
                        // Hala generating olan sahne var mı kontrol et
                        const stillRunning = Array.from(next.values()).some(s =>
                            s.status === 'generating' || s.status === 'downloading' || s.status === 'idle'
                        );
                        if (!stillRunning) {
                            setIsGenerating(false);
                        }
                        return next;
                    });
                }
                setProgress(100)
                setStatus('COMPLETED')
            } else if (lastMessage.type === 'error') {
                const errTag = lastMessage.scene_tag;
                if (errTag) {
                    setActiveScenes(prev => {
                        const next = new Map(prev);
                        const existing = next.get(errTag);
                        if (existing) {
                            next.set(errTag, { ...existing, status: 'failed', errorMessage: lastMessage.message || 'Hata oluştu', logs: [...(existing.logs || []), `❌ ${lastMessage.message || 'Hata'}`].slice(-20) });
                        }
                        const stillRunning = Array.from(next.values()).some(s => s.status === 'generating' || s.status === 'downloading' || s.status === 'idle');
                        if (!stillRunning) { setIsGenerating(false); setStatus('ERROR'); }
                        return next;
                    });
                }
            } else if (lastMessage.type === 'media') {
                const videoSrc = lastMessage.base64 ? lastMessage.base64 : lastMessage.url;
                // scene_tag'ı önce mesajdan al, yoksa dosya adından çıkar
                const sceneTagFromMsg = lastMessage.scene_tag;
                const rawFilename = lastMessage.filename || (lastMessage.url ? lastMessage.url.split('/').pop() : '');
                const cleanTagFromFile = rawFilename ? rawFilename.replace(/\.[^/.]+$/, "") : "";
                const mediaSceneTag = sceneTagFromMsg || cleanTagFromFile;

                if (videoSrc) {
                    if (mediaSceneTag) {
                        addLocalMessage({ type: 'media', scene_tag: mediaSceneTag, message: `📦 [MEDIA] ${rawFilename || mediaSceneTag} yüklendi.` });
                        setActiveScenes(prev => {
                            const next = new Map(prev);
                            const existing = next.get(mediaSceneTag);

                            if (existing) {
                                next.set(mediaSceneTag, {
                                    ...existing,
                                    videoSrc: videoSrc,
                                    status: 'ready',
                                    progress: 100
                                });
                            }
                            return next;
                        });
                    }

                    setDownloads(prev => {
                        if (prev.includes(videoSrc)) return prev;
                        return [videoSrc, ...prev];
                    });
                    setNewestMediaUrl(videoSrc);
                    setTimeout(() => { if (galleryRef.current) galleryRef.current.scrollTop = 0; }, 100);
                    setTimeout(() => setNewestMediaUrl(null), 10000);
                }
            } else if (lastMessage.type === 'scene_remove') {
                setActiveScenes(prev => {
                    const next = new Map(prev);
                    next.delete(lastMessage.scene_tag || '');
                    return next;
                });
            }

            if (showTerminal && terminalRef.current) {
                setTimeout(() => { terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: 'smooth' }) }, 50)
            } else if (!showTerminal) {
                setUnreadLogs(prev => prev + 1)
            }
        } // end for-loop
    }, [messageCounter, showTerminal, selectedPlatform])

    useEffect(() => {
        if (showTerminal) setUnreadLogs(0)
    }, [showTerminal])

    const isSubmittingRef = useRef(false);

    const handleGenerate = async () => {
        if (!selectedPlatform || !selectedProfile) {
            addLocalMessage({ type: 'error', message: 'Platform ve profil secin.' });
            return;
        }
        if (isSubmittingRef.current) {
            addLocalMessage({ type: 'warning', message: 'Onceki isler henuz kuyruga ekleniyor...' });
            return;
        }

        // Gozcuden bekleyen promptlari al
        let pendingItems: { scene_tag: string, prompt: string }[] = []
        try {
            const resp = await fetch('/api/gozcu')
            const gozcuData = await resp.json()
            pendingItems = gozcuData.pending || []
        } catch (e) {
            addLocalMessage({ type: 'error', message: 'Gozcu durumu alinamadi!' });
            return;
        }

        if (pendingItems.length === 0) {
            addLocalMessage({ type: 'warning', message: 'Bekleyen prompt yok. Once Gozcuye prompt ekleyin.' });
            return;
        }

        isSubmittingRef.current = true;
        setIsGenerating(true)
        addLocalMessage({ type: 'status', message: `[SYSTEM] ${pendingItems.length} adet is baslatiliyor...` })

        try {
            for (let i = 0; i < pendingItems.length; i++) {
                const item = pendingItems[i];
                const sceneNum = parseInt(item.scene_tag.split('_')[0]) || (i + 1);
                const res = await platformService.generateVideo(selectedPlatform, selectedProfile, item.prompt, sceneNum, aspectRatio, taskCount);
                setCurrentJobId(res.job_id);
                addLocalMessage({ type: 'info', message: `[QUEUED] Is #${i + 1} eklendi: ${item.scene_tag}` });

                setActiveScenes(prev => {
                    const next = new Map(prev);
                    next.set(res.scene_tag || item.scene_tag, {
                        jobId: res.job_id,
                        sceneTag: res.scene_tag || item.scene_tag,
                        status: 'idle',
                        progress: 0,
                        videoSrc: null,
                        platform: selectedPlatform,
                        profile: selectedProfile,
                        aspectRatio: aspectRatio
                    });
                    return next;
                });
                if (pendingItems.length > 1) await new Promise(r => setTimeout(r, 400));
            }
        } catch (error) {
            console.error("X", error);
            addLocalMessage({ type: 'error', message: '[SYSTEM] Islem baslatilamadi!' });
        } finally {
            isSubmittingRef.current = false;
        }
    }

    const handleStop = async (jobIdToStop?: string) => {
        const targetId = jobIdToStop || currentJobId;
        if (!targetId) return;
        setIsStopping(true);
        addLocalMessage({ type: 'warning', message: `🛑 [SYSTEM] İş durduruluyor: ${targetId}` });
        try {
            await platformService.stopJob(targetId);
        } catch (error) {
            console.error("Failed to stop job", error);
            addLocalMessage({ type: 'error', message: '❌ [SYSTEM] Durdurma başarısız oldu!' });
        } finally {
            if (!jobIdToStop) setIsGenerating(false);
            setIsStopping(false);
        }
    };

    const handlePause = async () => {
        if (!currentJobId) return;
        addLocalMessage({ type: 'warning', message: '⚠️ [SYSTEM] Duraklatma / Devam Etme (Toggle) isteği gönderildi...' });
        try {
            await platformService.pauseJob(currentJobId);
        } catch (error) {
            console.error("Failed to pause job", error);
            addLocalMessage({ type: 'error', message: '❌ [SYSTEM] Bekletme isteği başarısız oldu!' });
        }
    };

    return (
        <>
            {showIntro && (
                <Branding ready={introReady} onComplete={() => setShowIntro(false)} loadedCount={mediaLoaded} totalCount={mediaTotal} />
            )}

            {/* Top-Left Logo Light Beam Effect */}
            <div className="fixed top-0 left-0 w-[40vw] h-[40vw] pointer-events-none z-0 opacity-50" style={{ background: 'radial-gradient(circle at 40px 40px, rgba(168, 85, 247, 0.2) 0%, rgba(147, 51, 234, 0.05) 30%, transparent 70%)', filter: 'blur(40px)' }} />

            {/* Diagonal Spotlight Beam */}
            <div className="fixed top-[-9%] left-[-10%] w-[120%] h-[120%] pointer-events-none z-0 opacity-40 mix-blend-screen" style={{ background: 'conic-gradient(from 120deg at 0% 0%, transparent 0deg, rgba(75, 29, 82, 1) 20deg, rgba(0, 0, 0, 1) 45deg, transparent 60deg)', transform: 'rotate(-15deg)', transformOrigin: '0% 0%' }} />

            {/* Vertical Beam following the sidebar line */}
            <div className="fixed top-20 left-[80px] w-[1px] h-full pointer-events-none z-0 opacity-50" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255, 0, 255, 0.8), transparent)', boxShadow: '0 0 15px rgba(132, 0, 255, 0.4)' }} />

            <div className="h-screen bg-bullish-black text-white selection:bg-purple-500/30 selection:text-white flex overflow-hidden relative z-10" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(147,51,234,0.04) 0%, transparent 60%), transparent' }}>
                <aside className="w-[80px] flex-shrink-0 flex flex-col items-center z-50">
                    <div className="h-20 w-20 flex items-center justify-center border-b border-white/5 relative">
                        <div className="nav-logo-icon scale-[0.9]">
                            <div className="nav-shard-system">
                                <div className="nav-shard ns1"></div><div className="nav-shard ns2"></div><div className="nav-shard ns3"></div><div className="nav-play-arrow-core"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full overflow-hidden border-r border-white/5">
                        <button onClick={() => setShowTerminal(prev => !prev)} className="w-full h-full flex items-center justify-center text-white/40 hover:text-white transition-all hover:bg-white/[0.03] active:scale-90 group cursor-pointer relative">
                            <Menu size={32} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                            {unreadLogs > 0 && !showTerminal && (
                                <div className="absolute top-1/2 right-4 w-2 h-2 bg-bullish-mint rounded-full animate-pulse shadow-[0_0_8px_#18E589]" />
                            )}
                        </button>
                    </div>
                </aside>

                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    <header className="h-20 flex items-center px-10 justify-between bg-transparent backdrop-blur-sm sticky top-0 z-40 border-b border-white/5">
                        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-bullish-gray">
                            <button onClick={() => setCurrentView('panel')} className={`pb-4 -mb-4 mt-4 transition-all cursor-pointer ${currentView === 'panel' ? 'text-white' : 'hover:text-white/60'}`} style={currentView === 'panel' ? { borderBottom: '2px solid #9333ea' } : {}}>{t('nav.panel')}</button>
                            <button onClick={() => setCurrentView('gozcu')} className={`pb-4 -mb-4 mt-4 transition-all cursor-pointer ${currentView === 'gozcu' ? 'text-purple-400' : 'hover:text-white/60'}`} style={currentView === 'gozcu' ? { borderBottom: '2px solid #a855f7' } : {}}>GOZCU</button>
                        </nav>
                        <div className="flex items-center gap-3">
                            <button onClick={toggleLang} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold tracking-wider border border-white/15 bg-white/5 text-white/50 hover:text-white transition-all cursor-pointer hidden md:flex"><Globe size={12} /> {lang.toUpperCase()}</button>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-[10px] font-bold tracking-widest border border-white/10 hidden md:flex">
                                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-bullish-mint animate-pulse shadow-[0_0_8px_#18E589]' : 'bg-red-500'}`} />{isConnected ? t('nav.connected') : t('nav.disconnected')}
                            </div>
                            <button onClick={() => forceReconnect()} className={`px-3 py-1.5 rounded-full text-[9px] font-bold tracking-wider border transition-all cursor-pointer hidden md:flex items-center gap-1.5 ${isConnected ? 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10' : 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400'}`}>{isConnected ? t('nav.refresh') : t('nav.reconnect')}</button>
                        </div>
                    </header>

                    {currentView === 'gozcu' ? (
                        <GozcuPage lastWsMessage={lastMessage} onStart={handleGenerate} />
                    ) : (<>
                        <main className="flex-1 p-6 grid grid-cols-[320px_1fr] gap-6 overflow-hidden">
                            <div className="flex flex-col gap-8 overflow-y-auto pr-2 custom-scrollbar">
                                <section className="b-panel p-6 shadow-2xl">
                                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-bullish-mint mb-6 flex items-center gap-3 border-b border-white/[0.05] pb-4"><Database size={16} /> {t('gen.title')}</h2>
                                    <div className="flex flex-col gap-5">
                                        <div><label className="text-[10px] uppercase tracking-wider text-bullish-gray mb-1.5 block">{t('gen.platform')}</label><select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} className="b-input w-full bg-black cursor-pointer">{platforms.map(p => <option key={p.name} value={p.name}>{p.display_name}</option>)}</select></div>
                                        <div><label className="text-[10px] uppercase tracking-wider text-bullish-gray mb-1.5 block">{t('gen.profile')}</label><select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)} className="b-input w-full bg-black cursor-pointer">{profiles.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}</select></div>
                                        <div><label className="text-[10px] uppercase tracking-wider text-bullish-gray mb-1.5 block">Aspect Ratio</label>
                                            <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="b-input w-full bg-black cursor-pointer">
                                                <option value="16:9">Landscape (16:9)</option>
                                                <option value="9:16">Portrait (9:16)</option>
                                                <option value="1:1">Square (1:1)</option>
                                                <option value="3:2">Photo (3:2)</option>
                                                <option value="2:3">Cinema (2:3)</option>
                                            </select>
                                        </div>
                                        <div><label className="text-[10px] uppercase tracking-wider text-bullish-gray mb-1.5 block">Task</label>
                                            <select value={taskCount} onChange={(e) => setTaskCount(parseInt(e.target.value))} className="b-input w-full bg-black cursor-pointer">
                                                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                                            </select>
                                        </div>
                                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={handleGenerate} className="b-button-primary w-full mt-2 flex items-center justify-center gap-3 py-4 text-sm tracking-[0.2em] relative"><Play size={18} fill="currentColor" />{t('gen.start')}{(() => { const processing = Array.from(activeScenes.values()).filter(s => s.status === 'generating' || s.status === 'downloading' || s.status === 'idle' || s.status === 'rate_limited').length; const done = Array.from(activeScenes.values()).filter(s => s.status === 'ready').length; return (<>{processing > 0 && <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] flex items-center justify-center rounded-full bg-yellow-400 text-black text-[10px] font-black shadow-[0_0_10px_#FBBF24] animate-pulse">{processing}</span>}{done > 0 && <span className={`absolute -top-2 ${processing > 0 ? 'right-5' : '-right-2'} min-w-[22px] h-[22px] flex items-center justify-center rounded-full bg-bullish-mint text-black text-[10px] font-black shadow-[0_0_10px_#18E589]`}>{done}</span>}</>); })()}</motion.button>
                                    </div>
                                </section>
                            </div>

                            <div className="flex flex-col gap-6 overflow-hidden">
                                <div className="b-panel !bg-bullish-mint/5 border-bullish-mint/20 p-6 flex items-center justify-between backdrop-blur-3xl shadow-2xl overflow-hidden relative">
                                    <div className="flex items-center gap-6 z-10"><div className={`w-4 h-4 rounded-full ${isGenerating ? 'bg-bullish-mint animate-pulse shadow-[0_0_15px_#18E589]' : 'bg-bullish-gray/20'}`} /><div><div className="text-[11px] uppercase tracking-[0.2em] text-bullish-mint font-bold opacity-80 mb-1">{t('progress.title')}</div><div className="text-lg font-extrabold text-white flex items-center gap-3">{status === 'READY' ? t('progress.ready') : status} {status === 'COMPLETED' && <CheckCircle2 size={20} className="text-bullish-mint" />} {status === 'ERROR' && <AlertCircle size={20} className="text-red-500" />}</div></div></div>
                                    <div className="h-3 bg-white/5 flex-1 mx-12 rounded-full overflow-hidden border border-white/5 relative z-10"><motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-bullish-mint/80 to-bullish-mint shadow-[0_0_20px_#18E589]" /></div>
                                    <div className="text-2xl font-black text-white/90 min-w-[3ch] z-10 tabular-nums">{progress}%</div>
                                </div>


                                <div className="b-panel flex-1 min-h-[300px] flex flex-col overflow-hidden group">
                                    <div className="h-8 flex-shrink-0 border-b border-bullish-border flex items-center px-4 gap-2 bg-white/[0.02]">
                                        <History size={12} className="text-bullish-gray" /><span className="text-[10px] uppercase tracking-widest text-bullish-gray font-bold">{t('gallery.title')}</span><span className="text-[8px] font-mono text-bullish-mint/60 bg-bullish-mint/10 px-1.5 py-0.5 rounded-sm">{mediaTotal} ITEMS</span>
                                        <div className="ml-auto flex items-center gap-4 mr-3">
                                            <div className="flex items-center gap-1.5"><span className="text-[7px] text-bullish-gray/50 uppercase font-mono">Gal</span><input type="range" min="30" max="95" value={galleryScale} onChange={(e) => setGalleryScale(parseInt(e.target.value))} className="w-12 accent-bullish-mint h-0.5 bg-bullish-border/20 rounded-full cursor-pointer appearance-none" /><span className="text-[7px] text-bullish-mint/60 font-mono w-5">{galleryScale}%</span></div>
                                            <div className="flex items-center gap-1.5"><span className="text-[7px] text-bullish-gray/50 uppercase font-mono">Pre</span><input type="range" min="30" max="95" value={previewScale} onChange={(e) => setPreviewScale(parseInt(e.target.value))} className="w-12 accent-bullish-mint h-0.5 bg-bullish-border/20 rounded-full cursor-pointer appearance-none" /><span className="text-[7px] text-bullish-mint/60 font-mono w-5">{previewScale}%</span></div>
                                        </div>
                                        <button onClick={() => sendMessage({ action: 'fetch_gallery' })} className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-bullish-mint/70 hover:text-bullish-mint border border-bullish-mint/20"><RefreshCw size={10} /> Sync</button>
                                    </div>
                                    <div ref={galleryRef} className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                                        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(galleryScale * 2.5, 120)}px, 1fr))` }}>
                                            {/* Aktif scene'ler — galerinin başında placeholder */}
                                            {Array.from(activeScenes.values()).filter(s => s.status !== 'ready').map(scene => {
                                                const isFailed = scene.status === 'failed';
                                                const isActive = scene.status === 'generating' || scene.status === 'downloading';
                                                const logs = scene.logs || [];
                                                const lastLogs = logs.slice(-3);
                                                return (
                                                    <motion.div
                                                        key={scene.sceneTag}
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.8, opacity: 0 }}
                                                        className={`relative rounded-lg overflow-hidden w-full aspect-video flex flex-col ring-2 ${isFailed ? 'ring-red-500/60 shadow-[0_0_12px_rgba(239,68,68,0.2)] bg-red-950/30' : 'ring-yellow-400/40 shadow-[0_0_12px_rgba(251,191,36,0.15)] bg-black/70'}`}
                                                    >
                                                        {/* Üst kontrol bar */}
                                                        <div className="flex items-center justify-between px-2 py-1.5 bg-black/50 border-b border-white/[0.06]">
                                                            <span className="text-[8px] font-mono text-white/50 truncate flex-1">{scene.sceneTag}</span>
                                                            <div className="flex items-center gap-1.5 ml-2">
                                                                {isActive && <button onClick={() => handlePause()} className="w-[18px] h-[18px] rounded flex items-center justify-center bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/40 transition-all cursor-pointer text-[10px] font-bold" title="Durdur">⏸</button>}
                                                                <button onClick={() => { handleStop(scene.jobId); setActiveScenes(prev => { const n = new Map(prev); n.delete(scene.sceneTag); return n; }); }} className="w-[18px] h-[18px] rounded flex items-center justify-center bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all cursor-pointer text-[10px] font-bold" title="Kapat">✕</button>
                                                            </div>
                                                        </div>
                                                        {/* İçerik */}
                                                        <div className="flex-1 flex flex-col items-center justify-center gap-1 px-2">
                                                            {isFailed ? (
                                                                <>
                                                                    <X size={28} className="text-red-500" strokeWidth={3} />
                                                                    <span className="text-[8px] text-red-400 text-center leading-tight max-w-full truncate">{scene.errorMessage || 'Sekme kapandı'}</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {isActive && (
                                                                        <div className="relative w-10 h-10 flex items-center justify-center">
                                                                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                                                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                                                                                <circle cx="18" cy="18" r="15" fill="none" stroke={scene.status === 'downloading' ? '#18E589' : '#FBBF24'} strokeWidth="2.5" strokeDasharray={`${scene.progress * 0.94} 94`} strokeLinecap="round" className="transition-all duration-500" />
                                                                            </svg>
                                                                            <span className="text-[9px] font-black text-white/80">{scene.progress}%</span>
                                                                        </div>
                                                                    )}
                                                                    {(scene.status === 'idle' || scene.status === 'rate_limited') && <div className="w-5 h-5 rounded-full border-2 border-yellow-400/50 animate-pulse" />}
                                                                    <span className="text-[7px] font-bold uppercase tracking-widest text-yellow-400/70">{scene.status === 'rate_limited' ? '⏳ RATE LIMIT' : scene.status}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        {/* Mini log ticker — 3 satır, dikey kayma */}
                                                        {lastLogs.length > 0 && (
                                                            <div className="h-[36px] relative overflow-hidden border-t border-white/[0.05] bg-black/50" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)' }}>
                                                                <motion.div
                                                                    key={logs.length}
                                                                    initial={{ y: 12 }}
                                                                    animate={{ y: 0 }}
                                                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                                                    className="px-2 py-0.5"
                                                                >
                                                                    {lastLogs.map((log, i) => (
                                                                        <div key={`${logs.length - 3 + i}`} className="text-[7px] font-mono text-white/30 truncate leading-[12px]">{log}</div>
                                                                    ))}
                                                                </motion.div>
                                                            </div>
                                                        )}
                                                        {/* Alt progress bar */}
                                                        {scene.progress > 0 && !isFailed && (
                                                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
                                                                <div className="h-full bg-gradient-to-r from-yellow-400 to-bullish-mint transition-all duration-300" style={{ width: `${scene.progress}%` }} />
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                );
                                            })}
                                            {downloads.map((url) => {
                                                const isNewest = url === newestMediaUrl;
                                                return (
                                                    <motion.div
                                                        key={url}
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        onMouseEnter={(e) => {
                                                            const rect = e.currentTarget.getBoundingClientRect();
                                                            setHoveredRect({ x: rect.x + rect.width / 2, y: rect.y, width: rect.width, height: rect.height });
                                                            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                                                            hoverTimeoutRef.current = setTimeout(() => { setHoveredVideo(url); setPreviewPlaying(true); }, 500);
                                                        }}
                                                        onMouseLeave={() => {
                                                            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                                                            hoverTimeoutRef.current = setTimeout(() => { setHoveredVideo(null); }, 150);
                                                        }}
                                                        className={`relative cursor-pointer rounded-lg overflow-hidden w-full aspect-video transition-all duration-300 ${isNewest ? 'ring-2 ring-bullish-mint shadow-[0_0_20px_rgba(0,255,180,0.3)]' : 'ring-1 ring-bullish-border/30 hover:ring-bullish-mint/40'}`}
                                                    >
                                                        <video src={url.startsWith('data:') ? url : `${url}#t=0.1`} className="absolute inset-0 w-full h-full object-cover pointer-events-none" muted loop autoPlay playsInline />
                                                    </motion.div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </>)}
                    <footer className="h-14 border-t border-white/[0.05] bg-bullish-black flex items-center px-10 justify-between mt-auto z-50">
                        <div className="flex items-center gap-6">
                            <div className="font-extrabold text-lg flex items-center gap-2 uppercase tracking-[0.1em]">
                                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 brightness-110">VIDEO</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 italic" style={{ filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.5))' }}>RIPPER</span>
                            </div>
                            <div className="h-4 w-px bg-white/20" />
                            <div className="text-[10px] font-bold text-bullish-gray uppercase tracking-widest">PROMPT TO CINEMATIC VIDEO BOT</div>
                        </div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-bullish-gray font-bold opacity-40">VIDEO RIPPER v4.0</div>
                    </footer>
                </div>
            </div>

            <AnimatePresence>
                {hoveredVideo && hoveredRect && (() => {
                    const pw = window.innerWidth * previewScale / 100;
                    const ph = window.innerHeight * previewScale / 100;
                    const margin = 16;
                    let left = hoveredRect.x - pw / 2;
                    if (left < margin) left = margin;
                    if (left + pw > window.innerWidth - margin) left = window.innerWidth - margin - pw;
                    const thumbCenterY = hoveredRect.y + hoveredRect.height / 2;
                    let top = thumbCenterY - ph / 2;
                    if (top < margin) top = margin;
                    if (top + ph > window.innerHeight - margin) top = window.innerHeight - margin - ph;

                    return (
                        <div className="fixed inset-0 z-[9999] pointer-events-none">
                            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute pointer-events-auto flex flex-col" style={{ left: `${left}px`, top: `${top}px`, width: `${pw}px`, maxHeight: `${ph}px` }} onMouseEnter={() => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); }} onMouseLeave={() => { setHoveredVideo(null); }}>
                                <div className="b-panel bg-black/98 p-1.5 shadow-[0_0_80px_rgba(0,0,0,0.9)] border-bullish-mint/40 overflow-hidden rounded-lg flex flex-col">
                                    <video ref={previewVideoRef} src={hoveredVideo.startsWith('data:') ? hoveredVideo : `${hoveredVideo}#t=0.1`} className="w-full h-auto object-contain rounded-sm flex-1" style={{ maxHeight: `calc(${ph}px - 80px)` }} autoPlay muted loop playsInline onTimeUpdate={(e) => { setVideoCurrentTime(e.currentTarget.currentTime); setVideoDuration(e.currentTarget.duration || 0); }} onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration || 0)} />
                                    <div className="px-2 pt-1.5"><div className="relative w-full h-1 bg-bullish-border/30 rounded-full cursor-pointer" onClick={(e) => { const v = previewVideoRef.current; if (v && videoDuration > 0) { const rect = e.currentTarget.getBoundingClientRect(); v.currentTime = ((e.clientX - rect.left) / rect.width) * videoDuration; } }}><div className="absolute top-0 left-0 h-full bg-bullish-mint/60 rounded-full" style={{ width: videoDuration > 0 ? `${(videoCurrentTime / videoDuration) * 100}%` : '0%' }} /><div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-bullish-mint rounded-full shadow-[0_0_6px_rgba(24,229,137,0.6)]" style={{ left: videoDuration > 0 ? `calc(${(videoCurrentTime / videoDuration) * 100}% - 5px)` : '0%' }} /></div></div>
                                    <div className="flex items-center gap-2 px-2 py-1.5">
                                        <button onClick={() => { const v = previewVideoRef.current; if (v) { if (previewPlaying) v.pause(); else v.play(); setPreviewPlaying(!previewPlaying); } }} className="w-6 h-6 rounded-full bg-bullish-mint/10 border border-bullish-mint/30 flex items-center justify-center text-bullish-mint">{previewPlaying ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}</button>
                                        <button onClick={() => { if (previewVideoRef.current) { previewVideoRef.current.currentTime = 0; previewVideoRef.current.play(); setPreviewPlaying(true); } }} className="w-6 h-6 rounded-full bg-bullish-mint/10 border border-bullish-mint/30 flex items-center justify-center text-bullish-mint"><RotateCcw size={10} /></button>
                                        <span className="text-[9px] text-bullish-gray font-mono ml-1">{Math.floor(videoCurrentTime / 60)}:{String(Math.floor(videoCurrentTime % 60)).padStart(2, '0')} / {Math.floor(videoDuration / 60)}:{String(Math.floor(videoDuration % 60)).padStart(2, '0')}</span>
                                        <div className="ml-auto flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-bullish-mint animate-pulse" /><span className="text-[8px] text-bullish-mint font-bold uppercase tracking-[0.1em] opacity-70">Preview</span></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    );
                })()}
            </AnimatePresence>

            <AnimatePresence>{showTerminal && (<><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-[60]" onClick={() => setShowTerminal(false)} /><motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full z-[70] flex flex-col" style={{ width: '33.333vw', minWidth: '380px', maxWidth: '600px', background: 'linear-gradient(180deg, rgba(8,8,8,0.98) 0%, rgba(0,0,0,0.99) 100%)' }}><div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-bullish-mint/30 via-bullish-mint/10 to-transparent" /><div className="h-12 flex items-center px-4 justify-between border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-md flex-shrink-0"><div className="flex items-center gap-3"><button onClick={() => handleStop()} disabled={!isGenerating || isStopping} className={`w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_#FF5F57aa] ${(!isGenerating || isStopping) ? 'opacity-50' : 'cursor-pointer hover:scale-110'}`} /><div className="w-px h-4 bg-white/10 mx-1" /><Terminal size={13} className="text-bullish-mint/60" /><div className="font-extrabold text-[10px] tracking-[0.2em] uppercase">TERMINAL</div></div><div className="flex items-center gap-3"><span className="text-[9px] font-mono text-white/20">{messages.length} lines</span><button onClick={() => clearMessages()} className="p-1 hover:text-red-400 transition-colors"><Trash2 size={14} /></button><button onClick={() => setShowTerminal(false)}><X size={14} /></button></div></div><div ref={terminalRef} className="flex-1 overflow-y-auto font-mono text-[11px] p-0"><table className="w-full border-collapse"><tbody>{messages.map((m, i) => { const isError = m.type === 'error'; const isComplete = m.type === 'completed'; const isMedia = m.type === 'media'; const isProgress = m.type === 'progress'; let content = m.message || ''; const tag = m.scene_tag ? '[' + m.scene_tag + '] ' : ''; if (isProgress) { const pct = m.pct ?? 0; const bar = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5)); content = tag + bar + ' ' + pct + '% ' + (m.status || ''); } else { content = tag + (m.status || m.message || ''); } return (<tr key={i} className="hover:bg-white/[0.02] border-b border-white/[0.02] group"><td className="w-10 text-right pr-3 pl-3 text-[9px] text-white/10 select-none py-[3px] border-r border-white/[0.04] font-mono">{i + 1}</td><td className="w-6 text-center py-[6px]"><div className={`w-[5px] h-[5px] rounded-full mx-auto ${isError ? 'bg-red-500' : isComplete ? 'bg-bullish-mint' : isMedia ? 'bg-cyan-400' : 'bg-white/20'}`} /></td><td className={`py-[3px] pr-4 whitespace-nowrap ${isError ? 'text-red-400' : isComplete ? 'text-bullish-mint' : isMedia ? 'text-cyan-400' : 'text-zinc-300'}`}>{content}</td></tr>); })}</tbody></table></div><div className="h-10 border-t border-white/[0.06] bg-black/40 flex items-center px-6 gap-3 flex-shrink-0"><span className="text-bullish-mint/60 text-[10px] items-center flex font-bold gap-2"><div className="w-1.5 h-1.5 rounded-full bg-bullish-mint animate-pulse" />READY</span><span className="text-[10px] text-white/20 ml-auto font-bold uppercase tracking-widest">{status}</span></div></motion.div></>)}</AnimatePresence>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(24, 229, 137, 0.1); }
                .custom-scrollbar-h::-webkit-scrollbar { height: 4px; }
                .custom-scrollbar-h::-webkit-scrollbar-thumb { background: rgba(24, 229, 137, 0.1); }
                .nav-logo-icon { position: relative; width: 120px; height: 120px; display: flex; justify-content: center; align-items: center; }
                .nav-shard-system { position: relative; width: 70%; height: 60%; }
                .nav-shard { position: absolute; border: 1px solid rgba(255, 255, 255, 0.4); background: linear-gradient(135deg, rgba(34, 0, 0, 1), transparent); backdrop-filter: blur(4px); animation-duration: 7s; animation-iteration-count: infinite; }
                .ns1 { width: 60%; height: 100%; left: 0; clip-path: polygon(0% 0%, 100% 15%, 85% 85%, 0% 100%); animation-name: shard1v15_7s; }
                .ns2 { width: 50%; height: 85%; right: 0; top: 10%; clip-path: polygon(25% 10%, 100% 0%, 100% 100%, 0% 85%); border-color: #ef4444; animation-name: shard2v15_7s; }
                .ns3 { width: 40%; height: 40%; bottom: -10%; left: 30%; clip-path: polygon(10% 25%, 100% 5%, 85% 100%, 0% 75%); animation-name: shard3v15_7s; }
                .nav-play-arrow-core { position: absolute; top: 50%; left: 52%; transform: translate(-50%, -50%); width: 0; height: 0; border-top: 13px solid transparent; border-bottom: 13px solid transparent; border-left: 20px solid #ff0051; filter: drop-shadow(0 0 10px #ff0051); animation: pulse 1.5s infinite; }
                @keyframes shard1v15_7s { 0%, 100% { transform: translate(-60%,-30%) rotate(-20deg); opacity:0.3; } 14%, 70% { transform: translate(-4px,0) rotate(0); opacity:1; } 74% { transform: translate(-60%,-30%) rotate(-20deg); opacity:0.3; } }
                @keyframes shard2v15_7s { 0%, 100% { transform: translate(60%,30%) rotate(20deg); opacity:0.4; } 14%, 70% { transform: translate(4px,0) rotate(0); opacity:1; } 74% { transform: translate(60%,30%) rotate(20deg); opacity:0.4; } }
                @keyframes shard3v15_7s { 0%, 100% { transform: scale(0.6) translate(-15%,15%); opacity:0.2; } 14%, 70% { transform: scale(1) translate(0,0); opacity:0.5; } 74% { transform: scale(0.6) translate(-15%,15%); opacity:0.2; } }
                @keyframes pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; } 50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; } }
            `}</style>
        </>
    )
}

export default App
