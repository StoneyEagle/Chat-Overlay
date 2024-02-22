import { spamBattle } from './spamBattle.js';

export const raid = {
    name: 'raid',
    permission: 'moderator',
    type: 'command',
    storage: {},
    init: () => {},
    callback: ((channel, tags, message) => {
        if (message.startsWith('!raid')) {
            spamBattle.storage.store.clear();
        }
    }),
}