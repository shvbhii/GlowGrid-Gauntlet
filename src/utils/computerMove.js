
export function getComputerMove(board) {
  const emptyIndices = board
    .map((val, index) => (val === null ? index : null))
    .filter(val => val !== null);

  if (emptyIndices.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    return emptyIndices[randomIndex];
  }
  return null;
}