const { BattlefieldTypes, CardType } = require('../../../constants.js');
const Card = require('../../Card.js');

class RaywardKnight extends Card {
    setupCardAbilities(ability) {
        this.entersPlay({
            title: 'To Arms',
            target: {
                activePromptTitle: 'Choose up to 1 ally to shuffle into your deck',
                optional: true,
                controller: 'self',
                cardType: CardType.Ally,
                location: 'discard',
                gameAction: ability.actions.moveCard({ destination: 'deck' })
            },
            effect: 'move {0} from discard to their draw pile',
            then: {
                gameAction: ability.actions.shuffleDeck()
            }
        });
        //TODO: Charge
        this.action({
            title: 'Charge',
            cost: [ability.costs.sideAction()],
            target: {
                activePromptTitle: 'Select a target to attack',
                promptTitle: 'Attack',
                controller: 'opponent',
                cardCondition: (card) => !card.anyEffect('cannotBeAttackTarget'),
                //mode: 'select',
                //numCards: 1,
                cardType: BattlefieldTypes,
                onSelect: (card) => {
                    this.game.initiateUnitAttack(card); //Attack is being initiated, but I need a way to force Attacker to be Rayward Knight
                }
            }
        });
    }
}

RaywardKnight.id = 'rayward-knight';

module.exports = RaywardKnight;
