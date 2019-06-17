/*
 * App Actions
 *
 * Actions change things in your application
 * Since this urban.ladder uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  WISH_LIST_COUNT,
  UPDATE_MINICART,
  RESET_REMOVEWISHLISTFLAG,
  UPDATE_PROFILE,
} from '../../constants/app/constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function updatetWishListCount(count) {
  console.log('its in the update wihslit action', count);
  return {
    type: WISH_LIST_COUNT,
    count,
  };
}

export function updatetMinicart(count) {
  console.log('Its updated MiniCart');
  return {
    type: UPDATE_MINICART,
    count,
  };
}

export function resetRemoveFromWishlistFlag(flag) {
  console.log('resetRemoveFromWishlistFlag---', flag);
  return {
    type: RESET_REMOVEWISHLISTFLAG,
    flag,
  };
}

export function updateUserProfile(userName) {
  console.log('updateUserProfile---', userName);
  return {
    type: UPDATE_PROFILE,
    userName,
  };
}
