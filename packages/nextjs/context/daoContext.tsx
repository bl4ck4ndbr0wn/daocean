"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define the DAO type
export interface DAO {
  id: string;
  name: string;
  daoId: string;
}

interface DaoContextProps {
  selectedDAO: DAO | null;
  setSelectedDAO: (dao: DAO) => void;
}

// Create the context
const DaoContext = createContext<DaoContextProps | undefined>(undefined);

// Provider to wrap around your app
export const DaoProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDAO, setSelectedDAO] = useState<DAO | null>(null);

  // Load the default DAO from localStorage on mount
  useEffect(() => {
    const savedDao = localStorage.getItem("selectedDAO");
    if (savedDao) {
      setSelectedDAO(JSON.parse(savedDao));
    }
  }, []);

  // Persist DAO to localStorage whenever it changes
  const handleSetSelectedDao = (dao: DAO) => {
    setSelectedDAO(dao);
    localStorage.setItem("selectedDAO", JSON.stringify(dao)); // Use JSON.stringify here
  };

  return (
    <DaoContext.Provider value={{ selectedDAO, setSelectedDAO: handleSetSelectedDao }}>{children}</DaoContext.Provider>
  );
};

// Hook to access the context
export const useDao = (): DaoContextProps => {
  const context = useContext(DaoContext);
  if (!context) {
    throw new Error("useDAO must be used within a DAOProvider");
  }
  return context;
};
