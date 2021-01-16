const Card = require('../../Card.js');

class SympathyPain extends Card {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onAddToken: (event, context) =>
                    // it's my pb
                    event.card == context.player.phoenixborn &&
                    // it's a wound
                    event.type == 'damage' &&
                    event.context.player == context.player.opponent
            },
            effect: 'deal 2 damage to oppponents unit or phoenixborn',
            target: {
                cardType: ['Ally', 'Conjuration', 'Phoenixborn'],
                controller: 'opponent',
                gameAction: ability.actions.dealDamage({ amount: 2 })
            }
        });
    }
}

SympathyPain.id = 'sympathy-pain';

module.exports = SympathyPain;
