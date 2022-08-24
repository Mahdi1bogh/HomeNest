import { Link } from 'react-router-dom';
import './sidebarlink.css';

function SidebarLink({ text, Icon, pageName }) {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={text === 'Account' ? '/me/' : `/me/${text.toLowerCase()}`}
      className={pageName === text.toLowerCase() ? 'active link' : 'link'}
    >
      <Icon />
      <h3>{text}</h3>
    </Link>
  );
}
export default SidebarLink;
