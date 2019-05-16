import * as compression  from "compression";
import * as express from 'express';
import * as next from "next";
import routes from "./routes";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()
  server.use(compression())

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  server.listen(port, ()=> {
    // tslint:disable-next-line: no-console
    console.log(`> Ready on http://localhost:${port}`)
  })
  .on("error", (err: Error) => {
    throw err;
  });
});
