/*
 * std_http
 */
//import {
//  serve,
//} from "https://deno.land/std/http/mod.ts";
//
//const server = serve({ port: 8080 });
//
//for await (const req of server) {
//  await req.respond({
//    status: 200,
//    headers: new Headers({
//      "content-type": "text/plain",
//    }),
//    body: "hello deno!",
//  });
//}


/*
 * Servest
 */
import {createApp} from "https://servestjs.org/@v1.1.2/mod.ts";

const app = createApp();

app.handle("/", async (req) => {
  await req.respond({
      status: 200,
      headers: new Headers({
            "content-type": "text/plain",
          }),
      body: "hello deno!",
    });
});

app.listen({ port: 8080 });

