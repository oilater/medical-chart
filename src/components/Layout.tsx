import { css } from '@emotion/react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main css={layoutStyle}>
      <Header />
      <div css={mainContentStyle}>
        <Sidebar />
        <div css={contentAreaStyle}>
          <div css={outletContainerStyle}>
            <div css={contentStyle}>
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}

const layoutStyle = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const mainContentStyle = css`
  display: flex;
  flex: 1;
  margin-top: 60px;
  overflow: hidden;
`;

const contentAreaStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 250px;
  overflow: hidden;
`;

const outletContainerStyle = css`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const contentStyle = css`
  padding: 2rem;
`;