
export const useLocalStorage = () => {
    const players = [];

    const init = () => {
        const playersString = localStorage.getItem("players");
        if (playersString) {

            const arr = JSON.parse(playersString);
            if (Array.isArray(arr)) {

                players.push(...arr);
            }
        }
    }

    const save = () => {
        localStorage.setItem("players", JSON.stringify(players));
    }

    const clear = () => {
        console.log("clearing players");
        // localStorage.removeItem("players");
    }

    const get = () => {
        return players;
    }

    return {
        init,
        save,
        clear,
        get,
    }
}

export const levels = [
  'broadcaster',
  'moderator',
  'vip',
  'subscriber',
  'everyone',
];

export const hasMinLevel = (tags, minLevel) => {
  const userLevel = levels.findIndex((level) => tags.badges[level]);
  return userLevel <= levels.findIndex((level) => level === minLevel);
}