import { types } from '../actions/seats';

const INITIAL_STATE = Array.apply(null, Array(600)).map(el => ({ available: Math.random() >= 0.5 }));

export default function seats(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.TOGGLE_SEAT_AVAILABILITY:
      return state.map((seat, index) => index === action.payload ? { available : !seat.available} : seat)
    default:
      return state;
  }
}
