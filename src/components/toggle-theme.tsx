import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsSun } from "react-icons/bs";
import { BsMoonStars } from "react-icons/bs";

export const ToggleTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleThemeSwitch = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <button onClick={handleThemeSwitch} title="Mudar tema">
      {theme === 'dark' ?
        <BsSun className="w-6 h-6 text-gray-800 dark:text-white" /> :
        <BsMoonStars className="w-6 h-6 text-gray-800 dark:text-white" />
      }
    </button>
  )
}