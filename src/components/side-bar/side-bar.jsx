import styles from './side-bar.module.css';
import { Link } from "react-router-dom";
import { Home, FileText, BookOpen, Settings, User } from "lucide-react";
import { SideBarItem } from "../side-bar/side-bar-item/side-bar-item";


export function SideBar() {
  return (
    <div className={styles.container}>
       <div className={styles.fullHeight}>
  <div className={styles.logo}></div>
  
  <nav className={styles.navBar}>
    <ul className={styles.nav}>
      <SideBarItem icon={Home} to="/" label="דף הבית"/>
      <SideBarItem icon={FileText} to="/templates" label="תבניות" />
      <SideBarItem icon={BookOpen} to="/documents" label="המסמכים שלי" />
      <SideBarItem icon={User} to="/profile" label="פרופיל" />
      <SideBarItem icon={Settings} to="/settings" label="הגדרות" /> 
      </ul>
      </nav>
    </div>
    </div>
  );
} 