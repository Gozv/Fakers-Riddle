import { create } from 'zustand'
// import { io } from "socket.io-client";
// const socket = io("http://localhost:3000")

const PLAYERS = [];

const useSavePlayers = create((set) => ({
  userInGame: false,
  setUserInGame: () => {
   
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