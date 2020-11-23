const Card = require('../../Card.js');

class ShadowStrike extends Card {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onAttackersDeclared: (event, context) =>
                    event.attackingPlayer === context.source.owner.opponent &&
                    event.attackingPlayer.cardsInPlay.some((c) =>
                        this.notAttacking(c, event.battles)
                    )
            },
            effect: 'deal 3 damage to a non-attacker',
            target: {
                cardType: ['Ally', 'Conjuration'],
                controller: 'opponent',
                cardCondition: (card, context) => this.notAttacking(card, context.event.battles),
                gameAction: ability.actions.dealDamage({ amount: 3 })
            }
        });
    }

    notAttacking(c, battles) {
        return !battles.some((b) => b.attacker === c);
    }
}

ShadowStrike.id = 'shadow-strike';

module.exports = ShadowStrike;
