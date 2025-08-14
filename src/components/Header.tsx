import { css } from '@emotion/react';
import { Colors } from '../theme/colors';

export function Header() {
  return (
    <header css={headerStyle}>
      <div css={logoStyle}>Medical Charts</div>
    </header>
  );
}

const headerStyle = css`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${Colors.grey100};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const logoStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${Colors.blue800};
`;