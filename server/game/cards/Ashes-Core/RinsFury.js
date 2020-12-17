const { BattlefieldTypes } = require('../../../constants.js');
const Card = require('../../Card.js');

class RinsFury extends Card {
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onDamageDealt: (event, context) =>
                    event.context.player === context.player.opponent &&
                    BattlefieldTypes.includes(event.card.type) &&
                    event.fightEvent
                // check the fightevent is from a unit?
            },
            gameAction: ability.actions.changeEvent((context) => ({
                event: context.event,
                cancel: true
            })),
            then: (context) => ({
                gameAction: ability.actions.destroy({
                    target: context.event.damageSource
                })
            })
        });
    }
}

RinsFury.id = 'rins-fury';

module.exports = RinsFury;
