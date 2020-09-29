import app from "./app";

async function main() {
  await app.listen(8080);
  console.log("server on port 8080");
}

main();
