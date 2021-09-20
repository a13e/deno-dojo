// ref: https://deno.land/manual@v1.14.0/runtime/http_server_apis#handling-connections

async function handle(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    console.log(`path: ${url.pathname}`);
  }
}

const hostname = "0.0.0.0";
const port = 8080;
const server = Deno.listen({ hostname, port });
console.log(`Listening on ${hostname}:${port}`);

for await (const conn of server) {
  handle(conn);
}
