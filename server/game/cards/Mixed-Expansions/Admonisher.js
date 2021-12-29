const Card = require('../../Card.js');

class Admonisher extends Card {
    setupCardAbilities(ability) {
        // end of round wounds pb
        this.forcedInterrupt({
            autoResolve: true,

            title: 'Rebuke 1',
            when: {
                onRoundEnded: () => true
            },
            gameAction: ability.actions.dealDamage((context) => ({
                amount: 1,
                target: context.player.opponent.phoenixborn
            }))
        });
    }
}

Admonisher.id = 'admonisher';

module.exports = Admonisher;
