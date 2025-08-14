import { css } from '@emotion/react';
import { Colors } from '../theme/colors';

export function Footer() {
  return (
    <footer css={footerStyle}>
      Medical Charts
    </footer>
  );
}

const footerStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${Colors.grey200};
  padding: 1rem 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${Colors.blue800};
  font-weight: bold;
`;