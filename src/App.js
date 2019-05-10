import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';

const Test = Game({
  setup: () => ({ key0: 'value0' }),
  flow: {
    startingPhase: 'phase1',
    phases: {
      phase1: {
        // Always onTurnBegin() is called, even endPhase() is called in onPhaseBegin()
        // To call endPhaseIf(), endTurn() or endPhase() must be called
        endPhaseIf: G => {
          console.log('phase1 endPhaseIf');
          return Boolean(G.key1);
        },
        onPhaseBegin: (G, ctx) => {
          console.log('phase1 onPhaseBegin');
          G.key0 = 'value1';
          G.key1 = 'value1';
          ctx.events.endPhase();
        },
        onPhaseEnd: (G, ctx) => {
          console.log('phase1 onPhaseEnd');
        },
        onTurnBegin: (G, ctx) => {
          console.log('phase1 onTurnBegin');
          console.log(G.key1);
          // ctx.events.endTurn();
        },
        next: 'phase2'
      },
      phase2: {
        // onTurnBegin() is not called always
        // endPhaseIf() is called always
        endPhaseIf: G => {
          console.log('phase2 endPhaseIf');
          return Boolean(G.key2) && false;
        },
        onPhaseBegin: (G, ctx) => {
          console.log('phase2 onPhaseBegin');
          G.key0 = 'value2';
          G.key1 = 'value2';
          G.key2 = 'value2';
        },
        onPhaseEnd: (G, ctx) => {
          console.log('phase2 onPhaseEnd');
        },
        onTurnBegin: (G, ctx) => {
          // Not be called
          console.log('phase2 onTurnBegin');
          console.log(G.key2);
        },
        next: 'phase3'
      },
      phase3: {
        onPhaseBegin: (G, ctx) => {
          console.log('phase3 onPhaseBegin');
          G.key0 = 'value3';
          G.key1 = 'value3';
          G.key2 = 'value3';
          G.key3 = 'value3';
        },
        onPhaseEnd: (G, ctx) => {
          console.log('phase3 onPhaseEnd');
        },
        onTurnBegin: (G, ctx) => {
          console.log('phase3 onTurnBegin');
          console.log(G.key2);
          console.log(G.key3);
        }
      }
    }
  }
});

const App = Client({
  game: Test
});

export default App;
