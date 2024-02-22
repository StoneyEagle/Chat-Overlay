import { useLocalStorage } from '../helpers.js';

export const spamBattle = {
    name: 'spam-battle',
    permission: 'everyone',
    type: 'message',
    storage: {
        players: [],
        updateScore: () => {},
        store: useLocalStorage(),
    },
    init: () => {
        
        const player1Name = document.getElementById("player1-Name");
        const player2Name = document.getElementById("player2-Name");

        const player1Score = document.getElementById("player1-Score");
        const player2Score = document.getElementById("player2-Score");

        let player1 = "";
        let player2 = "";

        spamBattle.storage.store.init();

        spamBattle.storage.players = spamBattle.storage.store.get();

        spamBattle.storage.updateScore = () => {

            spamBattle.storage.players.sort((a, b) => b.score - a.score);

            const chatters = spamBattle.storage.players.slice(0, 2);

            chatters.map((chatter, index) => {

                if(!player1Name || !player1Score || !player2Name || !player2Score) return;
                
                if (index === 0) {
                    player1Name.innerText = chatter.name;
                    player1Score.innerText = chatter.score.toString();
                    player1 = chatter.name;
                } else {
                    player2Name.innerText = chatter.name;
                    player2Score.innerText = chatter.score.toString();
                    player2 = chatter.name;
                }
            });
        }

        spamBattle.storage.updateScore();

    },
    callback: ((channel, tags, message) => {

        const player = spamBattle.storage.players.find((player) => player.user == tags.username);
        
        if (player) {

            player.score += 1;

        } else {

            spamBattle.storage.players.push({
                name: tags["display-name"],
                user: tags.username,
                score: 1,
            });
        }

        spamBattle.storage.store.save();

        spamBattle.storage.updateScore();

    }),
}