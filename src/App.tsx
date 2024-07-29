import React from "react";
import { NotificationProvider } from "./contexts/NotificationContext";
import Navbar from "./components/Navbar";
import NotificationSystem from "./components/NotificationButtons";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';

const App: React.FC = () => {
  return (
    <NotificationProvider>
        <Navbar />
        <NotificationSystem />
    </NotificationProvider>
  );
};

export default App;
