import { create  } from "zustand";

const useSelectPlayers = create((set) => ({
    selectedPlayer: null,
    setSelectedPlayer: (user) => set({ selectedPlayer: user }),
}))

export default useSelectPlayers
