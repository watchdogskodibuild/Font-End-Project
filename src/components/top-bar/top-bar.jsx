import styles from './top-bar.module.css';
import { useLocation } from "react-router-dom";

export function TopBar({ title }) {
  
  const location = useLocation();
  const getPageTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case "/":
        return "דף הבית";
      case "/templates":
        return "תבניות";
      case "/documents":
        return "המסמכים שלי";
      case "/settings":
        return "הגדרות";
      case "/profile":
        return "פרופיל";
      case "/editor":
        return "עבודה שנבחרה";
      case "/admin-settings":
        return "הגדרות מנהל";
      default:
        return "Easy2Write";
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{getPageTitle()}</h1>    
    </div>
  );
} 