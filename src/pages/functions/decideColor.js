export default function decideColor({participants, voteExpDate, battleExpDate}, photoStatus = 0) {
  const count = participants.reduce((acc, p) => acc + photoStatus[p] || 0, 0);

  const date = Date.now();

  if ((date < new Date(voteExpDate)) || (date < new Date(battleExpDate))) {
    if (count === participants.length) {
      return `green`;
    }

    if (count === 0) {
      return `red`;
    }

    return `yellow`;
  }

  return 0;
}