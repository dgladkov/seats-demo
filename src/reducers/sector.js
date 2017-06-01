import { types } from '../actions/sector';
import immutable from 'immutable';

const SEAT_IDS = [...Array(600).keys()];
const SEATS_PER_ROW = 100;

const SeatRecord = immutable.Record({
  id: null,
  available: null,
  row: null,
  column: null,
})

function rotateMatrix(matrix, rowSize) {
  const newSize = matrix.length / rowSize;
  const result = [];
  for (var i = 0; i < rowSize; i++) {
    for (var j = newSize - 1; j >= 0; j--) {
      console.log(i + j * rowSize)
      result.push(matrix[i + j * rowSize]);
    }
  }
  return result;
}

const INITIAL_STATE = {
  seats: immutable.Map(SEAT_IDS.map(n => ([
    n, SeatRecord({
      id: n,
      available: Math.random() >= 0.5,
      row: Math.floor(n / SEATS_PER_ROW) + 1,
      column: n % SEATS_PER_ROW + 1,
    })
  ]))),
  order: SEAT_IDS,
  seatsPerRow: SEATS_PER_ROW,
};

function seatsReducer(state, action) {
  switch (action.type) {
    case types.TOGGLE_SEAT_AVAILABILITY:
      return state.updateIn([action.payload, 'available'], x => !x);
    default:
      return state;
  }
}

function orderReducer(state, action, globalState) {
  switch (action.type) {
    case types.ROTATE_SECTOR_90:
      return rotateMatrix(state, globalState.seatsPerRow);
    case types.ROTATE_SECTOR_180:
      return state.reverse();
    default:
      return state;
  }
}

function seatsPerRowReducer(state, action, globalState) {
  switch (action.type) {
    case types.ROTATE_SECTOR_90:
      return globalState.order.length / state;
    default:
      return state;
  }
}

export default function sectorReducer(state = INITIAL_STATE, action) {
  return {
    ...state,
    seats: seatsReducer(state.seats, action, state),
    order: orderReducer(state.order, action, state),
    seatsPerRow: seatsPerRowReducer(state.seatsPerRow, action, state),
  }
}
