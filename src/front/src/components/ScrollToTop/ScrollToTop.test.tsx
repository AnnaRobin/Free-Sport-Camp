import React from 'react';
import { render } from '@testing-library/react';

import { ScrollToTop } from './ScrollToTop';

describe('<ScrollToTop/>', () => {
  it('should call window.scrollTo with [0,0]', () => {
    const defaultProps = { history: {} as any, location: { pathname: '/URL' } as any, match: {} as any };
    const newProps = { ...defaultProps, location: { pathname: '/URL1' } as any };
    const { rerender } = render(<ScrollToTop {...defaultProps} />);
    rerender(<ScrollToTop {...newProps} />);

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });
});