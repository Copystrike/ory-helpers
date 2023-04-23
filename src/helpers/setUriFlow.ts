import { NextRouter } from 'next/router';

/**
 * Sets the flow id in the URI query string.
 * @param router - Next router
 * @param id - Flow id
 * @constructor - Sets the flow id in the URI query string.
 */
export const SetUriFlow = (router: NextRouter, id: string) => {
  // Check that current query flow id does not match requested one - pushing will trigger useEffect if router bound
  if (router.query.flow == id) {
    return;
  }

  router.push(`${router.pathname}?flow=${id}`, undefined, { shallow: true });
};
