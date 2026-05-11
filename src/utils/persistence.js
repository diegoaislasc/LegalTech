import fs from 'fs';
import path from 'path';

const HISTORY_PATH = path.resolve('data/history.json');

export function loadHistory() {
  if (!fs.existsSync(HISTORY_PATH)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf-8'));
}

export function saveHistory(history) {
  const dir = path.dirname(HISTORY_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));
}

/**
 * Compara los acuerdos extraídos con el historial.
 * @param {string} expedienteId ID o número de expediente.
 * @param {Array} currentAgreements Lista de textos de acuerdos extraídos.
 * @returns {Array} Solo los acuerdos que son nuevos.
 */
export function getNewAgreements(expedienteId, currentAgreements) {
  const history = loadHistory();
  const oldAgreements = history[expedienteId] || [];
  
  // Filtramos: si el texto del acuerdo no estaba en el historial, es nuevo
  const newAgreements = currentAgreements.filter(agreement => !oldAgreements.includes(agreement));
  
  return newAgreements;
}

/**
 * Actualiza la base de datos con los nuevos acuerdos.
 */
export function updateHistory(expedienteId, currentAgreements) {
  const history = loadHistory();
  history[expedienteId] = currentAgreements; // Guardamos el estado actual completo
  saveHistory(history);
}
