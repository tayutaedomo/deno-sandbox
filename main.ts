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
import vs from "https://deno.land/x/value_schema/mod.ts";

import jsx from './jsx.tsx'


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



const schemaObject = {
    q: vs.string({
        ifEmptyString: "",
        ifUndefined: "",
    }),
    limit: vs.number({
        integer: vs.NUMBER.INTEGER.FLOOR,
        minValue: 1,
        maxValue: 20,
        ifUndefined: 10,
    }),
    offset: vs.number({
        integer: vs.NUMBER.INTEGER.YES,
        minValue: {
            value: 0,
            adjusts: true,
        },
        ifUndefined: 0,
    }),
};

interface User {
    id: number
    name: string
}
const users: User[] = [
    {id: 1, name: "Pablo Picasso"},
    {id: 2, name: "Pablo Diego Picasso"},
    {id: 3, name: "Pablo Diego José Picasso"},
    {id: 4, name: "Pablo Diego José Francisco Picasso"},
    {id: 5, name: "Pablo Diego José Francisco de Paula Picasso"},
    {id: 6, name: "Pablo Diego José Francisco de Paula Juan Picasso"},
    {id: 7, name: "Pablo Diego José Francisco de Paula Juan Nepomuceno Picasso"},
    {id: 8, name: "Pablo Diego José Francisco de Paula Juan Nepomuceno Cipriano Picasso"},
    {id: 9, name: "Pablo Diego José Francisco de Paula Juan Nepomuceno Cipriano de la Santísima Picasso"},
    {id: 10, name: "Pablo Diego José Francisco de Paula Juan Nepomuceno Cipriano de la Santísima Trinidad Picasso"},
    {id: 11, name: "Pablo Diego José Francisco de Paula Juan Nepomuceno Cipriano de la Santísima Trinidad Ruiz Picasso"},
];

app.get("/users", async (req) => {
    //await req.respond({
    //    status: 200,
    //    headers: new Headers({
    //        "content-type": "application/json",
    //    }),
    //    body: JSON.stringify(users),
    //});

    const query: Record<string, string> = {};
    for (const [k, v] of req.query.entries()) {
        query[k] = v;
    }
    const normalizedQuery = vs.applySchemaObject(schemaObject, query);
    const filteredUsers = users
        .filter(user => user.name.indexOf(normalizedQuery.q) != -1)
        .slice(normalizedQuery.offset, normalizedQuery.offset + normalizedQuery.limit);

    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify(filteredUsers),
    });
});

app.get(new RegExp("^/users/(\\d+)"), async (req) => {
    const [_, id] = req.match;
    const filtered = users.filter(user => user.id === Number(id))
    if (filtered.length === 0) {
        // Note Found
        return;
    }

    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify(filtered[0]),
    });
});


app.handle("/jsx", async (req) => {
    const body = jsx.htmlHelloWorld()
    await req.respond({
        status: 200,
        headers: new Headers({
          "content-type": "text/html; charset=UTF-8",
        }),
        body: body,
    });
});



app.listen({ port: 8080 });

