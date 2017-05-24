export const types = {
  TOGGLE_SEAT_AVAILABILITY: 'TOGGLE_SEAT_AVAILABILITY',
}

export function toggleSeatAvailability(index) {
  return {
    type: types.TOGGLE_SEAT_AVAILABILITY,
    payload: index,
  }
}
