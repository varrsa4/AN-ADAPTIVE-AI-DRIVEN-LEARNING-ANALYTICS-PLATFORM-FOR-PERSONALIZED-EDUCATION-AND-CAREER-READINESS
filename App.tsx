
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { StudentProfile, AptitudeResult, UserRole } from './types';
import { INITIAL_STUDENT_PROFILE, calculateProfileCompletion } from './constants';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AptitudeTestPage from './pages/AptitudeTestPage';
import RecommendationsPage from './pages/RecommendationsPage';
import CareerDetailPage from './pages/CareerDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import SearchResultsPage from './pages/SearchResultsPage';
import CollegeFinderPage from './pages/CollegeFinderPage';
import SkillLabPage from './pages/SkillLabPage';
import ScholarshipHubPage from './pages/ScholarshipHubPage';

const Sidebar = ({ userRole }: { userRole: UserRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600';

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-200 sticky top-0 z-30">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <i className="fas fa-graduation-cap text-white text-xl"></i>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">CareerPath AI</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
        {userRole === UserRole.STUDENT ? (
          <>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-4">Main Menu</div>
            <Link to="/dashboard" className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive('/dashboard')}`}>
              <i className="fas fa-th-large w-5 text-center"></i> Dashboard
            </Link>
            <Link to="/profile" className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive('/profile')}`}>
              <i className="fas fa-user w-5 text-center"></i> Profile & Marks
            </Link>
            <Link to="/aptitude" className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive('/aptitude')}`}>
              <i className="fas fa-tasks w-5 text-center"></i> Aptitude Test
            </Link>
            <Link to="/recommendations" className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive('/recommendations')}`}>
              <i className="fas fa-brain w-5 text-center"></i> AI Matches
            </Link>

            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-8">Discovery & Growth</div>
            <Link to="/college-finder" className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive('/college-finder')}`}>
              <i className="fas fa-university w-5 text-center"></i> College Finder
            </Link>
            <Link to="/skill-lab" className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive('/skill-lab')}`}>
              <i className="fas fa-lightbulb w-5 text-center"></i> AI Skill Lab
            </Link>
            <Link to="/scholarships" className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive('/scholarships')}`}>
              <i className="fas fa-hand-holding-heart w-5 text-center"></i> Scholarships
            </Link>
          </>
        ) : (
          <>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-4">Admin Console</div>
            <Link to="/admin" className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive('/admin')}`}>
              <i className="fas fa-chart-line w-5 text-center"></i> Analytics
            </Link>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 p-3 w-full text-left text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all font-medium"
        >
          <i className="fas fa-sign-out-alt w-5 text-center"></i> Sign Out
        </button>
      </div>
    </aside>
  );
};

const Header = ({ profile }: { profile: StudentProfile }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="md:hidden flex items-center gap-3">
         <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
           <i className="fas fa-graduation-cap text-white text-xs"></i>
         </div>
         <span className="font-bold text-indigo-600">CareerPath AI</span>
      </div>
      
      <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input 
          type="text" 
          placeholder="Search careers, colleges, courses..." 
          className="w-full pl-11 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-900">{profile.fullName}</div>
            <div className="text-[10px] text-slate-500 font-medium uppercase mt-0.5">
              {profile.fullName === 'Guest Student' ? 'Visitor' : 'Student'}
            </div>
          </div>
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} 
            className="w-10 h-10 rounded-xl bg-indigo-50 border border-slate-200" 
            alt="Profile" 
          />
        </div>
      </div>
    </header>
  );
};

const App = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.STUDENT);
  const [profile, setProfile] = useState<StudentProfile>({
    ...INITIAL_STUDENT_PROFILE,
    completionPercentage: calculateProfileCompletion(INITIAL_STUDENT_PROFILE)
  });
  const [aptitudeResult, setAptitudeResult] = useState<AptitudeResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('careerPathProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile({
        ...parsed,
        completionPercentage: calculateProfileCompletion(parsed)
      });
    }
    const savedApt = localStorage.getItem('careerPathAptitude');
    if (savedApt) setAptitudeResult(JSON.parse(savedApt));
  }, []);

  const updateProfile = (newProfile: StudentProfile) => {
    const profileWithCompletion = {
      ...newProfile,
      completionPercentage: calculateProfileCompletion(newProfile)
    };
    setProfile(profileWithCompletion);
    localStorage.setItem('careerPathProfile', JSON.stringify(profileWithCompletion));
  };

  const updateAptitude = (result: AptitudeResult) => {
    setAptitudeResult(result);
    localStorage.setItem('careerPathAptitude', JSON.stringify(result));
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={setUserRole} />} />
        <Route path="/*" element={
          <div className="flex min-h-screen">
            <Sidebar userRole={userRole} />
            <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
              <Header profile={profile} />
              <main className="flex-1 overflow-x-hidden p-6 lg:p-10">
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage profile={profile} aptitude={aptitudeResult} />} />
                  <Route path="/profile" element={<ProfilePage profile={profile} onUpdate={updateProfile} />} />
                  <Route path="/aptitude" element={<AptitudeTestPage onComplete={updateAptitude} />} />
                  <Route path="/recommendations" element={<RecommendationsPage profile={profile} aptitude={aptitudeResult} />} />
                  <Route path="/career/:id" element={<CareerDetailPage profile={profile} />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  
                  {/* Extra Features Routes */}
                  {/* Correcting line 192: passing missing aptitude prop to CollegeFinderPage */}
                  <Route path="/college-finder" element={<CollegeFinderPage profile={profile} aptitude={aptitudeResult} />} />
                  <Route path="/skill-lab" element={<SkillLabPage profile={profile} aptitude={aptitudeResult} />} />
                  <Route path="/scholarships" element={<ScholarshipHubPage profile={profile} />} />
                  
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
