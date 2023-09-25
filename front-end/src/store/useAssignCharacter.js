import { create } from 'zustand';
import { PLAYERS, SPECIAL_CHARACTERS, CHARACTER } from '../utils/gameConfig';

// el array PLAYERS se traerá del useSavePlayers

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
      if (!player.character && SPECIAL_CHARACTERS.length > 0) {
        const index = Math.floor(Math.random() * SPECIAL_CHARACTERS.length);
        const selectedCharacter = SPECIAL_CHARACTERS[index];
        player.character = selectedCharacter.name;
        SPECIAL_CHARACTERS.splice(index, 1);
      } else {
         player.character = CHARACTER.CITIZEN;
      }
    });

    set({ isCharacterAssigned: true });
  },
  revertCharacterAssignment: () => {
    const players = PLAYERS.map((player) => ({
      ...player,
      character: null,
    }));

    set({ isCharacterAssigned: false, players });
  }
}));

export default useAssignCharacter;
