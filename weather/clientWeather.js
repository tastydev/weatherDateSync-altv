import * as alt from 'alt';
import * as game from 'natives';

alt.onServer('disableClock', ()=>{
    game.pauseClock(true);
    alt.log('paused clock');
});
