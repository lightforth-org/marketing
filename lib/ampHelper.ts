import * as amplitude from "@amplitude/analytics-browser";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackAction = (action: string, payload: any) => {
  amplitude.track(action, {
    ...payload,
    env: process.env.PROD ? "PROD" : "DEV",
  });
};
