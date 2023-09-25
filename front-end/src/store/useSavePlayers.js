import { create } from 'zustand'

const PLAYERS = []

const useSavePlayers = create((set) => ({
  userInGame: false,
  setUserInGame: () => {
    //logica para conectar con los usuarios de salas y guardarlos
    set({ userInGame: true, PLAYERS })
  },
  eliminatePlayer: (playerUser) => { 
      set((state) => ({
        players: state.players.map((player) =>
        player.user === playerUser ? { ...player, eliminated: true } : player
      ),
    }))
  }
}))

export default useSavePlayers