// import Http from "http";

// let county = 1;
// async function handler(req, res) {
//   county++;
//   try {
//     if (county % 2 === 0) {
//       await Promise.reject("Error inside handler");
//     }
//     for await (const data of req) {
//       if (county % 2 !== 0) {
//         await Promise.reject("Error inside for loop");
//       }
//       res.end();
//     }
//   } catch (e) {
//     console.log("a server error occurred", e);
//     res.writeHead(500);
//     res.write(JSON.stringify({ message: "internal server error" }));
//     res.end();
//   }
// }

// Http.createServer(handler).listen(3000, () =>
//   console.log("Server running on port 3000")
// );

// the try/catch block is not enough to handle errors in all cases.
// due to the asynchronous nature of the code, the try/catch block is not able to catch errors that occur in the for loop.
import Http from "http";

let county = 1;
async function handler(req, res) {
  county++;
  try {
    if (county % 2 === 0) {
      await Promise.reject("Error inside handler");
    }
    for await (const data of req) {
      try {
        if (county % 2 !== 0) {
          await Promise.reject("Error inside for loop");
        }
        // res.end();
      } catch (e) {
        console.log("a server error occurred", e);
        res.writeHead(500);
        res.write(JSON.stringify({ message: "internal server error" }));
        // res.end();
      } finally {
        res.end();
      }
    }
  } catch (e) {
    console.log("a server error occurred", e);
    res.writeHead(500);
    res.write(JSON.stringify({ message: "internal server error" }));
    res.end();
  }
}

Http.createServer(handler).listen(3000, () =>
  console.log("Server running on port 3000")
);
