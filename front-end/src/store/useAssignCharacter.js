import { create } from 'zustand';
import { SPECIAL_CHARACTERS, CHARACTER } from '../utils/gameConfig';
import { io } from "socket.io-client";
const socket = io("http://localhost:3000")

const PLAYERS = []
socket.on('arrayUsers', (arrayUsers) => {
  PLAYERS.length = 0
  PLAYERS.push(...arrayUsers)
  console.log(PLAYERS)
})

const useAssignCharacter = create((set) => ({
  isCharacterAssigned: false, 
  players: [...PLAYERS],
  specialCharacters: [SPECIAL_CHARACTERS],
  assignCharacters: () => {
    const assignedCharacters = [...PLAYERS];

    for (let i = assignedCharacters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [assignedCharacters[i], assignedCharacters[j]] = [
        assignedCharacters[j],
        assignedCharacters[i],
      ];
    }

    assignedCharacters.forEach((player) => {
      if (!player.role && SPECIAL_CHARACTERS.length > 0) {
        const index = Math.floor(Math.random() * SPECIAL_CHARACTERS.length);
        const selectedCharacter = SPECIAL_CHARACTERS[index];
        player.role = selectedCharacter.name;
        SPECIAL_CHARACTERS.splice(index, 1);
      } else {
        player.role = CHARACTER.CITIZEN;
      }
    })
    console.log(assignedCharacters)

    set({ isCharacterAssigned: true });

    return () => {
      socket.off('arrayUsers')
     };
  },
  revertCharacterAssignment: () => {
    const players = PLAYERS.map((player) => ({
      ...player,
      role: null,
    }));

    set({ isCharacterAssigned: false, players });
  }
}));

export default useAssignCharacter;
