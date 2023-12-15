const { PhoenixbornTypes } = require('../../../constants');
const Card = require('../../Card.js');

class GiftedRose extends Card {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: [ability.effects.cardCannot('guard')]
        });
    }

    canAttach(card, context) {
        return card && PhoenixbornTypes.includes(card.getType()) && this.canPlayAsUpgrade();
    }

    autoTarget(context) {
        return context.player.opponent.phoenixborn;
    }
}

GiftedRose.id = 'gifted-rose';

module.exports = GiftedRose;
