import React from 'react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'navbar' | 'floating';
}

// Light and Dark mode toggles permanently removed per user requirement
export const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  return null;
};
