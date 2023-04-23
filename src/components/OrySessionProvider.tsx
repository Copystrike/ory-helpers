import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FrontendApi, Session } from '@ory/client';

type SessionHook = {
  oryClient: FrontendApi | undefined;
  session: Session | undefined;
  logoutUrl: string | undefined;
  error: Error | undefined;
};

const SessionContext = createContext<SessionHook>({
  oryClient: undefined,
  session: undefined,
  logoutUrl: undefined,
  error: undefined,
});

export type SessionProviderProps = {
  children: React.ReactNode;
  oryClient: FrontendApi;
};

const OrySessionProvider = ({ children, oryClient }: SessionProviderProps) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | undefined>();
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    (async () => {
      setError(undefined);
      try {
        const { data } = await oryClient.toSession();
        setSession(data);
        const { data: logoutData } = await oryClient.createBrowserLogoutFlow();
        setLogoutUrl(logoutData.logout_url);
      } catch (err) {
        setError(err as any);
      }
    })();
  }, [router.pathname]);

  return (
    <SessionContext.Provider value={{ oryClient, session, logoutUrl, error }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);

export { useSession, OrySessionProvider };
