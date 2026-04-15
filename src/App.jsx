import { useState } from "react";
import Login from "./screens/Login";
import Register from "./screens/Register";
import PasswordRecovery from "./screens/PasswordRecovery";
import Home from "./screens/Home";
import Members from "./screens/Members";
import Chat from "./screens/Chat";
import Announcements from "./screens/Announcements";
import Agenda from "./screens/Agenda";
import Missions from "./screens/Missions";
import Profile from "./screens/Profile";
import Events from "./screens/Events";
import RoleManagement from "./screens/RoleManagement";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onLogin={() => navigate('home')} onRegister={() => navigate('register')} onForgotPassword={() => navigate('forgotPassword')} />;
      case 'register':
        return <Register onBack={() => navigate('login')} onLogin={() => navigate('login')} />;
      case 'forgotPassword':
        return <PasswordRecovery onBack={() => navigate('login')} />;
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'members':
        return <Members onBack={() => navigate('home')} onNavigate={navigate} />;
      case 'chat':
        return <Chat onBack={() => navigate('home')} onNavigate={navigate} />;
      case 'announcements':
        return <Announcements onBack={() => navigate('home')} onNavigate={navigate} />;
      case 'agenda':
        return <Agenda onNavigate={navigate} />;
      case 'missions':
        return <Missions onNavigate={navigate} />;
      case 'profile':
        return <Profile onNavigate={navigate} />;
      case 'events':
        return <Events onBack={() => navigate('home')} onNavigate={navigate} />;
      case 'roles':
        return <RoleManagement onBack={() => navigate('profile')} onNavigate={navigate} />;
      // Placeholder for other screens to be implemented
      default:
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-background-dark text-white p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Tela em desenvolvimento: {currentScreen}</h1>
            <button onClick={() => navigate('home')} className="bg-primary px-6 py-2 rounded-xl font-bold">Voltar para Início</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {renderScreen()}
    </div>
  );
}
