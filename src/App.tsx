import Dashboard from './pages/Dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, createContext } from 'react'
import Layout from './components/Layout';
import { Contact } from './pages/Contact';

type Menu = 'Dashboard' | 'Contact'

interface MenuContextConfig {
  menu: Menu;
  setMenu: (menu: Menu) => void;
}

export const MenuContext = createContext<MenuContextConfig>({
  menu: 'Dashboard', 
  setMenu: () => {},
})

function App() {
  const queryClient = new QueryClient();
  const [menu, setMenu] = useState<Menu>('Dashboard')

  return (
    <QueryClientProvider client={queryClient}>
      <MenuContext.Provider value={{ menu, setMenu }}>
        <Layout>
          {menu === 'Dashboard' && <Dashboard />}
          {menu === 'Contact' && <Contact />}
        </Layout>
      </MenuContext.Provider>
    </QueryClientProvider>
  )
}

export default App
