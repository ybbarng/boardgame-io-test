import { Client } from 'boardgame.io/react';
import { Game, TurnOrder } from 'boardgame.io/core';

const Test = Game({
  setup: () => ({}),
  flow: {
    startingPhase: 'phase1',
    phases: {
      phase1: {
        onPhaseBegin: (G, ctx) => {
          console.log('phase1 onPhaseBegin');
        },
        onPhaseEnd: (G, ctx) => {
          console.log('phase1 onPhaseEnd');
        },
        onTurnBegin: (G, ctx) => {
          console.log('phase1 onTurnBegin ' + ctx.currentPlayer);
          ctx.events.endTurn();
        },
        onTurnEnd: (G, ctx) => {
          console.log('phase1 onTurnEnd ' + ctx.currentPlayer);
        },
        turnOrder: TurnOrder.ONCE,
        next: 'phase2'
      },
      phase2: {
        onPhaseBegin: (G, ctx) => {
          console.log('phase2 onPhaseBegin');
        },
        onPhaseEnd: (G, ctx) => {
          console.log('phase2 onPhaseEnd');
        },
        onTurnBegin: (G, ctx) => {
          // Not be called
          console.log('phase2 onTurnBegin');
        },
        turnOrder: TurnOrder.ONCE,
      },
    }
  }
});

const App = Client({
  game: Test
});

export default App;
