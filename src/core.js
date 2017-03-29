import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries){
  return state.set("entries", List(entries));
}

function getWinners(vote){
  if (!vote) return [];
  const [a,b] = vote.get("pair");
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else return [a,b];
}

export function next(state){
  const entries = state.get('entries').concat(getWinners(state.get('vote')));

  if (entries.size === 1){
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
    // Generally a good idea to morph the old state into the new instead of building the new state from scratch
    //{"winner": entries[0]}
  }

  return state.merge({
    vote: Map({
      pair: entries.take(2),
      round: state.getIn(['vote', 'round'], 0) + 1
    }),
    entries: entries.skip(2)
  });
}

export function vote(voteState, entry){
  if (voteState.get('pair').includes(entry)){
    return voteState.updateIn(
      ['tally', entry],
      0,
      tally => tally + 1
    );
  }
  return voteState;
}