import { ReactElement, createContext, useContext, useState } from 'react';

type HeaderContextType = {
  content: JSX.Element;
  setContent: (content: any) => void;
};

export const HeaderContext = createContext<HeaderContextType>({ content: <></>, setContent: () => {} });

export function useHeader() {
  return useContext(HeaderContext);
}

const HeaderProvider = ({ children }: { children: ReactElement }) => {
  const [content, setContent] = useState<JSX.Element>(<></>);

  return (
    <HeaderContext.Provider
      value={{ 
        setContent, 
        content,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;