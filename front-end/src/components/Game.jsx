import Timer from "./Timer";
import { useState } from "react";
import { PHASES, GAME_STATUS } from "../utils/gameConfig";
import useAssignCharacter from "../store/useAssignCharacter";
import useSelectPlayers from "../store/useSelectPlayers";
import FakersChoice from "./FakersChoice";

function Game() {
  const players = useAssignCharacter((state) => state.players)
  const isCharacterAssigned = useAssignCharacter((state) => state.isCharacterAssigned)
  const selectedPlayer = useSelectPlayers((state) => state.selectedPlayer)
  const { assignCharacters } = useAssignCharacter()
  const [currentPhase, setCurrentPhase] = useState(null)
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.STOP)

  const handleChangePhase = () => {
    if (currentPhase.order + 1 <= PHASES.length) {
      setCurrentPhase((prevPhase) => PHASES[prevPhase.order])
    } else {
      setCurrentPhase(() => PHASES[1])
    }
  }

  const handleGameStart = () => {
    assignCharacters()
    setCurrentPhase(() => PHASES[0])
    setGameStatus(() => GAME_STATUS.PLAYING)
  }

  return (
    <>
      {
        gameStatus === GAME_STATUS.PLAYING ? (
          <Timer phase={currentPhase.title} initialTime={currentPhase.initialTime} handlePhase={handleChangePhase} players={players}/>
        ) : (
          <div>
            <button onClick={handleGameStart} className="bg-curious-blue-600 hover:bg-curious-blue-400 text-curious-blue-900 font-bold py-2 px-4 rounded">
              Iniciar Juego
            </button>
          </div>
        )
      }
      {currentPhase?.phase === 'CHARACTERS' ? (
        <>
          {isCharacterAssigned ? (
            <ul>
              {players.map((player) => (
                <li key={player.userName}>
                  {player.userName} - {player.character}
                </li>
              ))}
            </ul>
          ) : null}
          <p> Personajes asignados </p>
        </>

      ) : null}
      {currentPhase?.phase === 'NIGHT' ? (
        <>
          <p> Vota el faker </p>
          <FakersChoice players={players} />
        </>

      ) : null}
      {currentPhase?.phase === 'DAWN' ? (<p> La victima del faker es: {selectedPlayer?.userName} </p>) : null}
      {currentPhase?.phase === 'DAY' ? {/* acá se activa el chat */} : null}
      {currentPhase?.phase === 'VOTE' ? <p> Faltan boletas </p> : null}
      {currentPhase?.phase === 'DUSK' ? <p> Verificar estado del juego </p> : null}
    </>
  );
}

export default Game