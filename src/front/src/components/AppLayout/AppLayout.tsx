import React from 'react';


// Component for assemble pages
interface AppLayoutProps {
  header: React.ReactElement;
  content: React.ReactElement;
  footer: React.ReactElement;
}

const AppLayoutComponent: React.FunctionComponent<AppLayoutProps> = ({ content, footer, header }) => {
  return (
    <>
      {header}
      {content}
      {footer}
    </>
  );
};

export default AppLayoutComponent;