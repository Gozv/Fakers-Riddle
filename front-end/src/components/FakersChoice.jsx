import { useState } from 'react';
import useSelectPlayers from '../store/useSelectPlayers';

const FakersChoice = ({ players }) => {
  const { setSelectedPlayer } = useSelectPlayers()
  const [chooseVictim, setChooseVictim] = useState(null);

  const handleUserSelect = (user) => {
    setChooseVictim(user);
    setSelectedPlayer(user)
  };

  return (
    <div>
      <h2>Selecciona un usuario:</h2>
      <ul>
        {players.map((player) => (
          <li key={player.user}>
            {player.user}
            <button onClick={() => handleUserSelect(player)}>
              Seleccionar
            </button>
          </li>
        ))}
      </ul>
      {chooseVictim && (
        <div>
          <h3>Usuario seleccionado:</h3>
          <p>{chooseVictim.user}</p>
        </div>
      )}
    </div>
  );
};

export default FakersChoice