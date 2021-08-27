import * as alt from 'alt';

alt.on('connectionComplete', () => {
    alt.setMsPerGameMinute(60000);
});
