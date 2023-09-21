// Definición de personajes
const personajes = ["Superviviente 1", "Superviviente 2", "Superviviente 3", "Superviviente 4", "Superviviente 5", "Superviviente 6", "Superviviente 7", "Doble Agente", "Médico", "Lobo"];

// Variable para llevar un registro de los personajes vivos
const personajesVivos = [...personajes];

// Variable para llevar un registro del día y la noche actual
let numeroDia = 1;
let numeroNoche = 1;

// Función para obtener un personaje al azar
function obtenerPersonajeAlAzar() {
  const indice = Math.floor(Math.random() * personajesVivos.length);
  return personajesVivos.splice(indice, 1)[0];
}

// Función para asignar personajes a los jugadores
function asignarPersonajesAJugadores(jugadores) {
  // Asegurarse de que haya al menos seis jugadores
  if (jugadores.length < 6) {
    throw new Error("Deben haber al menos seis jugadores para jugar.");
  }

  // Mostrar mensaje de inicio del día después del primer día
  if (numeroDia > 1) {
    console.log(`Día número ${numeroDia} se asoma en la aldea.`);
  }

  // Asignar al Lobo a un jugador al azar
  const loboIndex = Math.floor(Math.random() * jugadores.length);
  const loboJugador = jugadores[loboIndex];
  loboJugador.personaje = "Lobo";
  console.log(`${loboJugador.nombre} es el Lobo.`);

  // Asignar al Doble Agente a un jugador al azar
  const agenteIndex = Math.floor(Math.random() * jugadores.length);
  const agenteJugador = jugadores[agenteIndex];
  agenteJugador.personaje = "Doble Agente";
  console.log(`${agenteJugador.nombre} es el Doble Agente.`);

  // Asignar al Médico a un jugador al azar
  const medicoIndex = Math.floor(Math.random() * jugadores.length);
  const medicoJugador = jugadores[medicoIndex];
  medicoJugador.personaje = "Médico";
  console.log(`${medicoJugador.nombre} es el Médico.`);

  // Eliminar al jugador Lobo, Doble Agente y Médico de la lista de opciones de personajes
  const loboIndexEnPersonajes = personajesVivos.indexOf("Lobo");
  if (loboIndexEnPersonajes !== -1) {
    personajesVivos.splice(loboIndexEnPersonajes, 1);
  }
  
  const agenteIndexEnPersonajes = personajesVivos.indexOf("Doble Agente");
  if (agenteIndexEnPersonajes !== -1) {
    personajesVivos.splice(agenteIndexEnPersonajes, 1);
  }

  const medicoIndexEnPersonajes = personajesVivos.indexOf("Médico");
  if (medicoIndexEnPersonajes !== -1) {
    personajesVivos.splice(medicoIndexEnPersonajes, 1);
  }

  // Asignar a los demás jugadores
  jugadores.forEach((jugador) => {
    if (!jugador.personaje) {
      jugador.personaje = obtenerPersonajeAlAzar();
    }
    console.log(`${jugador.nombre} es ${jugador.personaje}.`);
  });
}

// Función para realizar la noche
function realizarNoche() {
  console.log(`Noche número ${numeroNoche}. El Lobo elige a su víctima.`);
  
  // Obtener al Lobo
  const lobo = jugadores.find((jugador) => jugador.personaje === "Lobo");

  // Asegurarse de que el Lobo no se elija a sí mismo
  let victima;
  do {
    victima = obtenerPersonajeAlAzar();
  } while (victima === "Lobo");
  
  console.log(`${lobo.nombre} (el Lobo) elige a ${victima.nombre}.`);

  // Obtener al Médico
  const medico = jugadores.find((jugador) => jugador.personaje === "Médico");

  // Verificar si el Médico intenta salvar a alguien y si coincide con la víctima del Lobo
  let medicoSalva;
  if (medico) {
    if (medico === victima || medico === lobo) {
      medicoSalva = victima;
    }
  }

  // Si el Médico no salvó a la víctima del Lobo, se procede con la eliminación
  if (!medicoSalva) {
    // Verificar si el Lobo ha sido eliminado
    const supervivientesVivos = jugadores.filter((jugador) => jugador.personaje !== victima);
    if (!supervivientesVivos.some((jugador) => jugador.personaje === "Lobo")) {
      console.log("¡Los supervivientes ganan!");
    } else {
      console.log(`Quedan ${supervivientesVivos.length} personajes vivos.`);
      if (supervivientesVivos.length <= 1) {
        console.log("El juego ha terminado.");
        console.log("¡El Lobo gana!");
      } else {
        console.log(`Comienza la noche número ${numeroNoche + 1}.`);
        numeroNoche++;
        habilitarChat();
      }
    }
  } else {
    console.log(`El Médico ha salvado a ${medicoSalva.nombre} del ataque del Lobo.`);
    console.log(`Comienza la noche número ${numeroNoche + 1}.`);
    numeroNoche++;
    habilitarChat();
  }
}

// Función para habilitar el chat antes de la votación del día
function habilitarChat() {
  console.log("Se ha habilitado el chat. Los personajes pueden chatear antes de la votación.");
  console.log("¡Comienza el chat!");

  // Los personajes chatean
  jugadores.forEach((jugador) => {
    console.log(`${jugador.nombre} (${jugador.personaje}): ¡Hola a todos, estoy listo para el chat!`);
  });

  // Simulación de tiempo de chat
  setTimeout(() => {
    console.log("El chat ha terminado. ¡Hora de votar!");
    votacionDelDia();
  }, 5000); // Simulamos 5 segundos de chat antes de la votación
}

// Función para realizar la votación del día
function votacionDelDia() {
  console.log(`Día número ${numeroDia}. ¡Hora de votar! Los personajes participan en la votación.`);
  const votos = {};

  // Los personajes emiten sus votos
  jugadores.forEach((jugador) => {
    // En este ejemplo, cada personaje elige a quién votar
    const voto = obtenerPersonajeAlAzar();
    console.log(`${jugador.nombre} (${jugador.personaje}) vota por ${voto}.`);

    // Registra el voto (maneja votos nulos)
    if (voto) {
      if (!votos[voto]) {
        votos[voto] = 1;
      } else {
        votos[voto]++;
      }
    } else {
      console.log(`${jugador.nombre} (${jugador.personaje}) emitió un voto nulo.`);
    }
  });

  // Determinar al expulsado (el personaje con más votos)
  let expulsado = null;
  let maxVotos = 0;

  for (const personaje in votos) {
    if (votos[personaje] > maxVotos) {
      maxVotos = votos[personaje];
      expulsado = personaje;
    }
  }

  // Expulsar al personaje con más votos (si no hay empate)
  if (maxVotos > 1) {
    console.log("Hay un empate en la votación. Nadie es expulsado.");
  } else {
    console.log(`El personaje expulsado es: ${expulsado}`);
    if (expulsado === "Lobo") {
      console.log("¡Los supervivientes ganan!");
    } else {
      // Eliminar al jugador correspondiente
      const jugadorExpulsado = jugadores.find((jugador) => jugador.personaje === expulsado);
      const index = jugadores.indexOf(jugadorExpulsado);
      jugadores.splice(index, 1);

      // Verificar si el Doble Agente fue expulsado
      if (expulsado === "Doble Agente") {
        console.log("¡El Doble Agente gana! Convenció a los demás de que era el Lobo.");
      }
    }
  }

  // Verificar si quedan 1 o menos supervivientes
  if (jugadores.length <= 1) {
    console.log("El juego ha terminado.");
    console.log("¡El Lobo gana!");
  } else {
    console.log(`Comienza el día número ${numeroDia + 1}.`);
    numeroDia++;
    iniciarNoche();
  }
}

// Función para iniciar el juego durante el día
function iniciarDia() {
  console.log(`Día número ${numeroDia} el sol se asoma en la aldea.`);
  asignarPersonajesAJugadores(jugadores);
  habilitarChat();
}

// Función para iniciar la noche después del día
function iniciarNoche() {
  console.log(`Noche número ${numeroNoche}.`);
  realizarNoche();
}

// Definición de jugadores (deben ser al menos 6)
const jugadores = [
  { nombre: "Jugador 1" },
  { nombre: "Jugador 2" },
  { nombre: "Jugador 3" },
  { nombre: "Jugador 4" },
  { nombre: "Jugador 5" },
  { nombre: "Jugador 6" },
];

// Iniciar el juego durante el día
iniciarDia();
