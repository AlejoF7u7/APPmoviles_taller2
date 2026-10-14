// Genera un id único para experiencias, educación y habilidades
export const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
