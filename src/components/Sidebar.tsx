// src/components/Sidebar.tsx
import { css } from '@emotion/react';
import { Colors } from '../theme/colors';
import { useContext } from 'react';
import { MenuContext } from '../App';

export function Sidebar() {
  const { menu, setMenu } = useContext(MenuContext);

  return (
    <aside css={sidebarStyle}>
      <ul css={menuListStyle}>
        <li>
          <button 
            css={menu === 'Dashboard' ? menuItemActiveStyle : menuItemStyle}
            onClick={() => setMenu('Dashboard')}
          >
            대시보드
          </button>
        </li>
        <li>
          <button 
            css={menu === 'Contact' ? menuItemActiveStyle : menuItemStyle}
            onClick={() => setMenu('Contact')}
          >
            문의
          </button>
        </li>
      </ul>
    </aside>
  );
}

const sidebarStyle = css`
  width: 250px;
  height: calc(100vh - 60px);
  border-right: 1px solid ${Colors.grey200};
  padding: 2rem 0;
  position: fixed;
  top: 60px;
  left: 0;
`;

const menuListStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const menuItemStyle = css`
  padding: 0.75rem 2rem;
  color: ${Colors.grey600};
  cursor: pointer;
  transition: all 0.25s;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  
  &:hover {
    background-color: ${Colors.grey100};
    color: ${Colors.blue600};
  }
`;

const menuItemActiveStyle = css`
  ${menuItemStyle}
  background-color: ${Colors.blue50};
  color: ${Colors.blue600};
  border-right: 2px solid ${Colors.blue500};
`;