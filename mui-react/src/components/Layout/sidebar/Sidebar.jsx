import './sidebar.css';
import LeaderboardSharpIcon from '@mui/icons-material/LeaderboardSharp';
import GiteSharpIcon from '@mui/icons-material/GiteSharp';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import SidebarLink from './SidebarLink';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import UserInfoContext from '../../../contexts/userInfo';

function Sidebar() {
  const { user } = useContext(UserInfoContext);
  let location = useLocation();
  let pageName = location.pathname.slice(4);
  return (
    <div className="sidebar">
      {!user?.user?.isAdmin ? (
        <>
          <SidebarLink
            text="Estates"
            Icon={GiteSharpIcon}
            pageName={pageName}
          />
          <SidebarLink
            text="Account"
            Icon={ManageAccountsIcon}
            pageName={pageName}
          />
          <SidebarLink
            text="Settings"
            Icon={SettingsIcon}
            pageName={pageName}
          />
        </>
      ) : (
        <>
          <SidebarLink
            text="Dashboard"
            Icon={LeaderboardSharpIcon}
            pageName={pageName}
          />
          <SidebarLink
            text="Estates"
            Icon={GiteSharpIcon}
            pageName={pageName}
          />
          <SidebarLink
            text="Users"
            Icon={ManageAccountsIcon}
            pageName={pageName}
          />
          <SidebarLink
            text="Account"
            Icon={ManageAccountsIcon}
            pageName={pageName}
          />
          <SidebarLink
            text="Settings"
            Icon={SettingsIcon}
            pageName={pageName}
          />
        </>
      )}
    </div>
  );
}

export default Sidebar;
