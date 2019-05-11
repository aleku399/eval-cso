import { createServer } from "http";
import * as next from "next";
import routes from "./routes";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  return createServer(handler).listen(port, ()=> {
    // tslint:disable-next-line: no-console
    console.log(`> Ready on http://localhost:${port}`)
  })
  .on("error", (err: Error) => {
    throw err;
  });
});
