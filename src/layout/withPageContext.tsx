import { NextPageContext } from 'next';
import React from 'react';

/**
 * Wraps a layout component with the page context
 * @param LayoutComponent The layout component
 */
export function withPageContext(LayoutComponent: any) {
  return class AppWithPageContext extends LayoutComponent {
    static async getInitialProps(appContext: NextPageContext) {
      const appProps = await LayoutComponent.getInitialProps(appContext);
      return { ...appProps };
    }

    render() {
      return <LayoutComponent {...this.props} />;
    }
  };
}
