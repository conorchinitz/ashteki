const Card = require('./Card.js');
const Spectator = require('./spectator.js');
const Player = require('./player.js');
const Die = require('./Die.js');

class GameChat {
    constructor(game) {
        this.messages = [];
        this.game = game;
        this.msgSeq = 0;
    }

    pushMessage(message, activePlayer) {
        this.msgSeq++;
        const msg = { mid: this.msgSeq, date: new Date(), message: message };
        if (activePlayer) {
            msg.activePlayer = activePlayer;
        }
        this.messages.push(msg);
    }

    addChatMessage(format, player, message) {
        let args = [
            {
                name: player.name,
                argType: 'player'
            },
            message
        ];
        let formattedMessage = this.formatMessage(format, args);
        this.pushMessage(formattedMessage);
    }

    getFormattedMessage(message) {
        let args = Array.from(arguments).slice(1);
        let argList = args.map((arg) => {
            if (arg instanceof Spectator) {
                return {
                    name: arg.name,
                    argType: 'nonAvatarPlayer'
                };
            } else if (arg && arg.name && arg.argType === 'player') {
                return {
                    name: arg.name,
                    argType: arg.argType
                };
            }

            return arg;
        });

        return this.formatMessage(message, argList);
    }

    addMessage(message, ...args) {
        let formattedMessage = this.getFormattedMessage(message, ...args);
        this.pushMessage(formattedMessage, this.game.activePlayer && this.game.activePlayer.name);
    }

    addAlert(type, message, ...args) {
        let formattedMessage = this.getFormattedMessage(message, ...args);
        const alertMsg = { alert: { type: type, message: formattedMessage } };
        this.pushMessage(alertMsg, this.game.activePlayer && this.game.activePlayer.name);
    }

    formatMessage(format, args) {
        if (!format || typeof format !== 'string') {
            return '';
        }

        let messageFragments = format.split(/(\{\d+\})/);
        let returnedFraments = [];

        for (const fragment of messageFragments) {
            let argMatch = fragment.match(/\{(\d+)\}/);
            if (argMatch) {
                let arg = args[argMatch[1]];
                if (arg || arg === 0) {
                    if (Array.isArray(arg)) {
                        returnedFraments.push(this.formatArray(arg));
                    } else if (arg instanceof Card) {
                        returnedFraments.push({
                            name: arg.name,
                            id: arg.id,
                            imageStub: arg.imageStub,
                            index: arg.index,
                            argType: 'card'
                        });
                    } else if (arg instanceof Spectator || arg instanceof Player) {
                        returnedFraments.push({
                            name: arg.user.username,
                            argType: 'nonAvatarPlayer'
                        });
                    } else if (arg instanceof Die) {
                        returnedFraments.push({
                            name: arg.name,
                            argType: 'die',
                            level: arg.level,
                            magic: arg.magic
                        });
                    } else {
                        returnedFraments.push(arg);
                    }
                }

                continue;
            }

            if (fragment) {
                returnedFraments.push(fragment);
            }
        }

        return returnedFraments;
    }

    formatArray(array) {
        if (array.length === 0) {
            return '';
        }

        let format;

        if (array.length === 1) {
            format = '{0}';
        } else if (array.length === 2) {
            format = '{0} and {1}';
        } else {
            let range = [...Array(array.length - 1).keys()].map((i) => '{' + i + '}');
            format = range.join(', ') + ', and {' + (array.length - 1) + '}';
        }

        return { message: this.formatMessage(format, array) };
    }
}

module.exports = GameChat;
