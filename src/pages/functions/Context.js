import { createContext } from 'react'

export const Context = createContext(
  {
    battles: [],
    sortedBattles: [],
    participants: [],
    photoStatus: {},
    root: ''
  }
);