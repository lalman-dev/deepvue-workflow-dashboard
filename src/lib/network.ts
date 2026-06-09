export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const simulateNetworkDelay = async () => {
  const delay = Math.floor(Math.random() * 500) + 300;

  await sleep(delay);
};
