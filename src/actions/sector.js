export const types = {
  TOGGLE_SEAT_AVAILABILITY: 'TOGGLE_SEAT_AVAILABILITY',
  ROTATE_SECTOR_90: 'ROTATE_SECTOR_90',
  ROTATE_SECTOR_180: 'ROTATE_SECTOR_180',
}

export function rotateSector90(id) {
  return {
    type: types.ROTATE_SECTOR_90,
  }
}

export function rotateSector180() {
  return {
    type: types.ROTATE_SECTOR_180,
  }
}

export function toggleSeatAvailability(id) {
  return {
    type: types.TOGGLE_SEAT_AVAILABILITY,
    payload: id,
  }
}
