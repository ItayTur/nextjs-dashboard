"use client";

import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
  // useState function arg runs the initial calculation only once

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window?.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      // value can be a function to support setState function arg convention. setValue(prev => prev + 1)

      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window?.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  useEffect(() => {
    // Listen to event between browser tabs to keep the state updated between tabs.

    const handleStorageChange = () => {
      try {
        const newValue = window.localStorage.getItem(key);
        setStoredValue(newValue ? JSON.parse(newValue) : initialValue);
      } catch (error) {
        console.error("Error reading localStorage:", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};
