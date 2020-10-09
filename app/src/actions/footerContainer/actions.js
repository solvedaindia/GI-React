/*
 *
 * FooterContainer actions
 *
 */

import { LOAD_FOOTER_DATA, LOAD_FOOTER_DATA_SUCcESS, LOAD_FOOTER_DATA_FAILURE } from '../../constants/footerContainer/constants';
export function loadFooterData() {
  return {
    type: LOAD_FOOTER_DATA,
  };
}
export function footerDataLoaded(data) {
  return {
    type: LOAD_FOOTER_DATA_SUCcESS,
    data,
  };
}

export function footerDataLoadingError(error) {
  return {
    type: LOAD_FOOTER_DATA_FAILURE,
    error,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
