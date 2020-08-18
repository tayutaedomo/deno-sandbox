// @deno-types="https://servestjs.org/@v1.1.2/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://servestjs.org/@v1.1.2/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://servestjs.org/@v1.1.2/mod.ts";


function htmlHelloWorld() {
    return ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>Hello Built-in jsx!</body>
      </html>,
    )
}
//console.log(jsxHelloWorld())


export default {
    htmlHelloWorld: htmlHelloWorld
}

