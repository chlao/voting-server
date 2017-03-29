import {setEntries, next, vote, INITIAL_STATE} from './core';

/**
 * Larger applications;
 * Main reducer function only hands parts of the state to lower-level reducer functions
 * Seperate the job of finding the rigt location in the state tree from applying the update to that location
 */

export default function reducer(state = INITIAL_STATE, action){
  // Figure out which function to call and call it
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.entry, action.clientId))
      //return vote(state, action.entry)
  }
  return state;
}
