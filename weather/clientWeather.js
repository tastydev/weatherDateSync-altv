import * as alt from "alt-client";

alt.on("connectionComplete", () => {
  alt.setMsPerGameMinute(60000);
});
