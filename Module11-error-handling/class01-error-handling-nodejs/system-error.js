import timers from "timers/promises";

const timeoutAsync = timers.setTimeout;

// const results = ["1", "2"].map(async (it) => {
//   console.log(it, "Starting process");
//   await timeoutAsync(100);
//   console.log(it);
//   console.count(`debug ${it}`);
//   console.log(it, await Promise.resolve("timeout order!"));
//   await timeoutAsync(100);
//   console.count(`debug ${it}`);
//   return parseInt(it) * 2;
// });

// console.log("results", await Promise.all(results));

// setTimeout(async () => {
//   console.log("Starting process");
//   await timeoutAsync(100);
//   console.count("debug");
//   console.log(await Promise.resolve("timeout order!"));
//   await timeoutAsync(100);
//   console.count("debug");
//   await Promise.reject("promise rejected on timeout");
// }, 1000);

const throwError = (msg) => {
  throw new Error(msg);
};

try {
  console.log('Hello world')
  throwError('This is an error on try/catch')
} catch (err) {
  console.error('error captured on try/catch', err.message)
} finally {

}

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err);
});

// if the Promise.reject is inside another context, it will be caught by the unhandledRejection event
// but if it is in the global context, it will be caught by the uncaughtException event