import styles from './side-bar-item.module.css';
import { Link } from "react-router-dom";
import { Icon } from 'lucide-react';

export function SideBarItem({ icon: Icon,to, label }) {
  return (
    <li>
    <Link to={to} 
      className={styles.sideBarLink}>
      <Icon className="h-5 w-5 ml-2" />
      <span className={styles.hidden}>{label}</span>
    </Link>
  </li>
  );
} 