//components
import Sidebar from './Sidebar';

//types
import { FC } from 'react';

//utils
import { useRouter } from 'next/router';
import { selectUser, useAppSelector } from '@store';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const SidebarLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user.email) {
      router.push('/signin');
    }
  }, [user]);

  if (
    router.pathname.includes('signin') ||
    router.pathname.includes('signup')
  ) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: '20px',

          height: '100vh',
          overflow: 'auto',
        }}
      >
        {' '}
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
