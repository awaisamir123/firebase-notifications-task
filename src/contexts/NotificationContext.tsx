import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { collection, onSnapshot, addDoc, updateDoc, doc } from "firebase/firestore";
import * as admin from 'firebase-admin';
import { db } from "../helpers/firebaseConfig";

interface Props {
    children?: ReactNode
}

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC = ({ children } : Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Firebase function to fetch real-time notifications
    const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot: admin.firestore.DocumentSnapshot) => {
      const notificationsData: Notification[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      setNotifications(notificationsData);
    });

    return unsubscribe;
  }, []);

    // Function to add notification
  const addNotification = async (message: string) => {
    await addDoc(collection(db, "notifications"), {
      message,
      read: false
    });
  };

    // Function to read notification
  const markAsRead = async (id: string) => {
    await updateDoc(doc(db, "notifications", id), {
      read: true
    });
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
