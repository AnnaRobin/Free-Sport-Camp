import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import AppLayout from './AppLayout';

describe('<AppLayout />', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(
      <AppLayout
        header={<div data-testid="HEADER" />}
        content={<div data-testid="CONTENT" />}
        footer={<div data-testid="FOOTER" />}
      />,
    );
  });

  it('should render header', () => {
    const { getByTestId } = rendered;
    expect(getByTestId('HEADER')).toBeDefined();
  });

  it('should render content', () => {
    const { getByTestId } = rendered;
    expect(getByTestId('CONTENT')).toBeDefined();
  });

  it('should render footer', () => {
    const { getByTestId } = rendered;
    expect(getByTestId('FOOTER')).toBeDefined();
  });
});
