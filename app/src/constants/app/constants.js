/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'App/LOAD_REPOS_ERROR';
export const API_URL = 'http://localhost:8002/api/v1';
export const WISH_LIST_COUNT = 'App/WISH_LIST_COUNT';
export const UPDATE_MINICART = 'App/UPDATE_MINICART';
export const RESET_REMOVEWISHLISTFLAG = 'App/RESET_REMOVEWISHLISTFLAG';
export const UPDATE_PROFILE = 'App/UPDATE_PROFILE';

export const LOAD_FOOTER_DATA = 'app/FooterContainer/LOAD_FOOTER_DATA';
export const LOAD_FOOTER_DATA_SUCcESS =
  'app/FooterContainer/LOAD_FOOTER_DATA_SUCcESS';
export const LOAD_FOOTER_DATA_FAILURE =
  'app/FooterContainer/LOAD_FOOTER_DATA_FAILURE';
export const GET_CART_FETCHED = 'app/CartContainer/GET_CART_FETCHED';
export const GET_CART_REQUESTED = 'app/CartContainer/GET_CART_REQUESTED';
export const RESET_RWDHEADER = 'App/RESET_RWDHEADER';
export const SHAREWISHLISTURL_RWD = 'APP/SHAREWISHLISTURL_RWD'
export const UPDATED_RWD_HEADER = 'APP/UPDATED_RWD_HEADER'
