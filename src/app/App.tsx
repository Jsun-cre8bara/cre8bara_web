import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from '../pages/HomePage';
import { FunRunningPage } from '../pages/FunRunningPage';
import { FunRunningViewPage } from '../pages/FunRunningViewPage';
import { HomeShoppingViewPage } from '../pages/HomeShoppingViewPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/funrunning" element={<FunRunningPage />} />
          <Route path="/funrunning-view" element={<FunRunningViewPage />} />
          <Route path="/homeshopping-view" element={<HomeShoppingViewPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
