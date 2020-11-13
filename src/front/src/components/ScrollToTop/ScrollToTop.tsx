import React, { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';


export const ScrollToTop: FunctionComponent<PropsWithChildren<RouteComponentProps>> = ({
  children,
  location: { pathname },
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};