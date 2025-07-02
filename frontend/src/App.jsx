import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Tailwind CSS styles
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import QuestionDetail from './pages/QuestionDetail';
import UserQuestions from './pages/UserQuestions';
import EditQuestion from './pages/EditQuestion';
import AskQuestionPage from './components/AskQuestionPage';
import { Toaster } from 'react-hot-toast'; // ✅ make sure this is imported
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Toast Container */}
          <main className="pt-6 pb-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-questions" element={<UserQuestions />} />
              <Route path="/questions/:id" element={<QuestionDetail />} />
              <Route path="/questions/:id/edit" element={<EditQuestion />} />
              <Route path="/ask" element={<AskQuestionPage />} />
            </Routes>
          </main>
        </div>
        <Footer />
        {/* Footer component */}
      </Router>
    </AuthProvider>
  );
}

export default App;
