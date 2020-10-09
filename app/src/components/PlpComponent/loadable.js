/**
 *
 * Asynchronously loads the component for PlpComponent
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
