import React, { useState } from 'react';
import { SKELETON_FILES } from './data/skeletonFiles';
import { ProjectFile } from './types';
import { FileTree } from './components/FileTree';
import { CodeViewer } from './components/CodeViewer';
import { CommandGuide } from './components/CommandGuide';
import { VercelChecklist } from './components/VercelChecklist';
import { LiveAppPreview } from './components/LiveAppPreview';
import { AIStudioShowcase } from './components/AIStudioShowcase';
import { GitHubShowcase } from './components/GitHubShowcase';
import DocsPage from '../app/docs/page';
import AnalyzePage from '../app/analyze/page';
import { 
  Bot, 
  Code, 
  Terminal, 
  ShieldCheck, 
  Play, 
  BookOpen, 
  Copy, 
  Check, 
  Download, 
  Sparkles,
  Layers,
  FolderTree,
  Github,
  FileText,
  ArrowRight,
  Activity,
  Gauge,
  Radar
} from 'lucide-react';

export default function App() {
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(SKELETON_FILES[4]); // default app/layout.tsx
  const [activeTab, setActiveTab] = useState<'dashboard' | 'editor' | 'preview' | 'aistudio' | 'github' | 'docs' | 'analyze' | 'commands' | 'audit' | 'explanation'>('dashboard');
  const [copiedAll, setCopiedAll] = useState(false);
  const dashboardFiles = [
    'app/page.tsx',
    'lib/aiStudioClient.ts',
    'lib/githubClient.ts',
    'app/analyze/page.tsx',
  ]
    .map((path) => SKELETON_FILES.find((file) => file.path === path))
    .filter((file): file is ProjectFile => Boolean(file));

  const handleCopyAllFiles = () => {
    const fullProjectCode = SKELETON_FILES.map(
      (f) => `// ==========================================\n// FILE: ${f.path}\n// Description: ${f.description}\n// ==========================================\n\n${f.content}`
    ).join('\n\n\n');

    navigator.clipboard.writeText(fullProjectCode);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleDownloadZipJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SKELETON_FILES, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "pmcmark-ai-developer-skeleton.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="app-shell min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Header */}
      <header className="app-topbar border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="app-topbar-inner max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="app-brand flex items-center gap-3">
            <div className="app-brand-mark w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="app-brand-name font-extrabold text-base tracking-tight text-white">
                  PMC<span className="text-blue-400">MARK</span>
                </h1>
                <span className="app-version text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase">
                  Agentic Engine v2.6
                </span>
              </div>
              <p className="app-brand-caption text-xs text-slate-400">INTELLIGENT DEVELOPMENT WORKSPACE</p>
            </div>
          </div>

          <div className="app-header-actions flex items-center gap-2">
            <button
              onClick={handleCopyAllFiles}
              className="app-action-button hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Skopiowano Wszystkie Pliki</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-blue-400" />
                  <span>Kopiuj Cały Kod (All-in-One)</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadZipJSON}
              className="app-action-button app-action-primary flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Eksportuj (.json)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Nav Tabs */}
      <div className="app-nav-wrap border-b border-slate-800 bg-slate-900/50">
        <div className="app-nav max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`app-nav-link px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'app-nav-active bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`app-nav-link px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'editor'
                ? 'app-nav-active bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Struktura Plików & Kod</span>
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`app-nav-link px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'docs'
                ? 'app-nav-active bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Generator Dokumentacji (/docs)</span>
          </button>

          <button
            onClick={() => setActiveTab('aistudio')}
            className={`app-nav-link px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'aistudio'
                ? 'app-nav-active bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Studio SDK Client</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`app-nav-link px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'github'
                ? 'app-nav-active bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>GitHub API Client</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`app-nav-link px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'preview'
                ? 'app-nav-active bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Podgląd Na Żywo</span>
          </button>

          <button
            onClick={() => setActiveTab('commands')}
            className={`app-nav-link px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'commands'
                ? 'app-nav-active bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Komendy & Inicjalizacja</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`app-nav-link px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'audit'
                ? 'app-nav-active bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Audyt Vercel</span>
          </button>

          <button
            onClick={() => setActiveTab('analyze')}
            className={`app-nav-link px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'analyze'
                ? 'app-nav-active bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Radar className="w-4 h-4" />
            <span>AI Code Review</span>
          </button>

          <button
            onClick={() => setActiveTab('explanation')}
            className={`app-nav-link px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'explanation'
                ? 'app-nav-active bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Wyjaśnienie Plików</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="app-main flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {activeTab === 'dashboard' && (
          <div className="dashboard-view">
            <section className="dashboard-hero">
              <div className="hero-copy">
                <span className="eyebrow"><Sparkles className="w-3.5 h-3.5" /> AGENTIC ENGINE V2.6</span>
                <h2>AI <span>AGENT</span></h2>
                <p className="hero-tagline">INTELLIGENT SOFTWARE DEVELOPMENT AUTOMATION</p>
                <p className="hero-description">
                  Automatyzuj analizę kodu, odkrywaj strukturę projektu i twórz gotowe rozwiązania
                  w jednym inteligentnym środowisku.
                </p>
                <div className="hero-actions">
                  <button className="hero-primary" onClick={() => setActiveTab('editor')}>
                    START BUILDING <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="hero-secondary" onClick={() => setActiveTab('docs')}>
                    <BookOpen className="w-4 h-4" /> DOCUMENTATION
                  </button>
                </div>
              </div>
              <div className="hero-visual" aria-hidden="true">
                <div className="hero-orbit hero-orbit-one" />
                <div className="hero-orbit hero-orbit-two" />
                <div className="hero-core"><Bot className="w-10 h-10" /></div>
                <span className="hero-node hero-node-one" />
                <span className="hero-node hero-node-two" />
                <span className="hero-node hero-node-three" />
                <span className="hero-node hero-node-four" />
              </div>
              <div className="dashboard-metrics">
                <div className="metric-card">
                  <strong>{SKELETON_FILES.length.toString().padStart(2, '0')}</strong>
                  <span>SOURCE FILES</span>
                </div>
                <div className="metric-card">
                  <strong>02</strong>
                  <span>INTEGRATION MODULES</span>
                </div>
                <div className="metric-card">
                  <strong>AI</strong>
                  <span>GEMINI POWERED</span>
                </div>
                <div className="metric-card">
                  <strong>READY</strong>
                  <span>BUILD STATUS</span>
                </div>
              </div>
            </section>

            <section className="dashboard-section">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">INTELLIGENT TOOLKIT</span>
                  <h3>ENGINE CAPABILITIES</h3>
                </div>
                <span className="section-accent" />
              </div>
              <div className="capability-grid">
                <button className="capability-card" onClick={() => setActiveTab('editor')}>
                  <span className="capability-icon"><Code className="w-5 h-5" /></span>
                  <span className="capability-copy">
                    <strong>CODE AUTOMATION</strong>
                    <small>Code Generation</small>
                  </span>
                  <span className="capability-description">Przeglądaj strukturę aplikacji i pracuj z gotowymi, uporządkowanymi plikami projektu.</span>
                  <span className="capability-link">EXPLORE ENGINE <ArrowRight className="w-3.5 h-3.5" /></span>
                </button>
                <button className="capability-card" onClick={() => setActiveTab('analyze')}>
                  <span className="capability-icon"><Gauge className="w-5 h-5" /></span>
                  <span className="capability-copy">
                    <strong>PROJECT ANALYSIS</strong>
                    <small>Project Analytics</small>
                  </span>
                  <span className="capability-description">Analizuj kod z pomocą Gemini, aby uzyskać wykryte problemy i konkretne sugestie.</span>
                  <span className="capability-link">EXPLORE ENGINE <ArrowRight className="w-3.5 h-3.5" /></span>
                </button>
                <button className="capability-card" onClick={() => setActiveTab('github')}>
                  <span className="capability-icon"><Github className="w-5 h-5" /></span>
                  <span className="capability-copy">
                    <strong>GITHUB WORKSPACE</strong>
                    <small>Repository Operations</small>
                  </span>
                  <span className="capability-description">Połącz przepływ pracy z repozytoriami i operacjami GitHub dostępnymi w aplikacji.</span>
                  <span className="capability-link">EXPLORE ENGINE <ArrowRight className="w-3.5 h-3.5" /></span>
                </button>
              </div>
            </section>

            <section className="dashboard-section workspace-section">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">PROJECT WORKSPACE</span>
                  <h3>RECENT PROJECT FILES</h3>
                </div>
                <button className="section-link" onClick={() => setActiveTab('editor')}>
                  VIEW FILE TREE <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="workspace-grid">
                <div className="recent-files-grid">
                  {dashboardFiles.map((file, index) => (
                    <button
                      className={`file-preview-card file-preview-${index + 1}`}
                      key={file.path}
                      onClick={() => {
                        setSelectedFile(file);
                        setActiveTab('editor');
                      }}
                    >
                      <span className="file-preview-art"><span>{file.category.toUpperCase()}</span></span>
                      <span className="file-preview-meta">
                        <strong>{file.name}</strong>
                        <span>{file.path}</span>
                        <small>{file.description}</small>
                      </span>
                      <ArrowRight className="file-preview-arrow w-4 h-4" />
                    </button>
                  ))}
                </div>
                <aside className="system-status-card">
                  <div className="status-card-heading">
                    <span className="status-pulse"><Activity className="w-4 h-4" /></span>
                    <div><strong>PMCMARK AI ENGINE</strong><small>Workspace status</small></div>
                    <span className="status-live">READY</span>
                  </div>
                  <div className="status-card-body">
                    <div className="status-message">
                      <span className="status-message-icon"><Bot className="w-4 h-4" /></span>
                      <p>Twoje środowisko jest gotowe. Wybierz moduł, aby rozpocząć pracę z projektem.</p>
                    </div>
                    <div className="status-tags"><span>Gemini AI</span><span>GitHub API</span><span>Vite</span></div>
                  </div>
                  <button className="status-card-action" onClick={() => setActiveTab('aistudio')}>
                    OPEN AI STUDIO <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </aside>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-[600px]">
            {/* Sidebar tree */}
            <div className="lg:col-span-4 xl:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-3 overflow-y-auto">
              <FileTree
                files={SKELETON_FILES}
                selectedFile={selectedFile}
                onSelectFile={setSelectedFile}
              />
            </div>

            {/* Code viewer */}
            <div className="lg:col-span-8 xl:col-span-9 h-full">
              <CodeViewer file={selectedFile} />
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="max-w-5xl mx-auto">
            <DocsPage />
          </div>
        )}

        {activeTab === 'analyze' && (
          <div className="max-w-5xl mx-auto">
            <AnalyzePage />
          </div>
        )}

        {activeTab === 'aistudio' && (
          <div className="max-w-5xl mx-auto">
            <AIStudioShowcase />
          </div>
        )}

        {activeTab === 'github' && (
          <div className="max-w-5xl mx-auto">
            <GitHubShowcase />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="max-w-5xl mx-auto">
            <LiveAppPreview />
          </div>
        )}

        {activeTab === 'commands' && (
          <div className="max-w-4xl mx-auto">
            <CommandGuide />
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="max-w-4xl mx-auto">
            <VercelChecklist />
          </div>
        )}

        {activeTab === 'explanation' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-lg text-white">Przewodnik po Strukturyzacji Plików</h2>
              </div>
              <p className="text-sm text-slate-400">
                Poniższa lista wyjaśnia rolę każdego pliku w wygenerowanym szkieletie projektu PMCMARK AI DEVELOPER:
              </p>

              <div className="grid gap-3 pt-2">
                {SKELETON_FILES.map((file) => (
                  <div
                    key={file.path}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-blue-400">{file.path}</span>
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {file.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{file.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedFile(file);
                        setActiveTab('editor');
                      }}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium self-start sm:self-center transition-colors"
                    >
                      Zobacz kod
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer border-t border-slate-800/80 bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>PMCMARK AI DEVELOPER © 2026. ALL SYSTEMS OPERATIONAL.</span>
          <span>GEMINI AI <span className="footer-dot">◆</span> GITHUB API <span className="footer-dot">◆</span> READY TO BUILD</span>
        </div>
      </footer>
    </div>
  );
}
