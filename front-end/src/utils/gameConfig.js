export const PHASES = [
  {
    order: 1,
    title:'Reparto de personajes',
    initialTime:3,
    phase: 'CHARACTERS'
  },
  {
    order: 2,
    title: 'Noche',
    initialTime: 7,
    phase: 'NIGHT'
  },
  {
    order: 3,
    title: 'Madrugada',
    initialTime: 3,
    phase: 'DAWN'
  },
  {
    order: 4,
    title: 'Día',
    initialTime: 10,
    phase: 'DAY'
  },
  {
    order: 5,
    title: 'Votacion',
    initialTime: 2,
    phase: 'VOTE'
  },
  {
    order: 6,
    title: 'Atardecer',
    initialTime: 5,
    phase: 'DUSK'
  }
]

export const GAME_STATUS = {
  START: 'start',
  STOP: 'stop',
  PLAYING: 'playing'
} 

export const SPECIAL_CHARACTERS = [
  {
    name: 'faker'
  }
]

export const CHARACTER = {
  CITIZEN: 'citizen'
}

export const PLAYERS = [
  {
    user: 'user 1',
    character: null,
    eliminated: false
  },
  {
    user: 'user 2',
    character: null,
    eliminated: false
  },
  {
    user: 'user 3',
    character: null,
    eliminated: false
  },
  {
    user: 'user 4',
    character: null,
    eliminated: false
  }
]
  