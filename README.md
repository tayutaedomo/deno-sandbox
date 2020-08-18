# deno-sandbox
Try Deno

- Reference
  - https://servestjs.org/
  - https://medium.com/google-cloud/deno-on-cloud-run-89ae64d1664d
  - https://knowledge.sakura.ad.jp/24150/


## Setup
```
$ brew install deno
$ git clone git@github.com:tayutaedomo/deno-sandbox.git
```


## Local Server
```
$ cd deno-sandbox
$ deno run --allow-env --allow-net main.ts
$ open "http://localhost:8080"
```


## Docker
```
$ cd deno-sandbox
$ docker build -t deno-sandbox .
$ docker run --rm -it -e PORT=8080 -p 8080:8080 deno-sandbox
$ open "http://0.0.0.0:8080"
```


## Cloud Run
```
$ cd deno-sandbox
$ gcloud builds submit --tag gcr.io/[PROJECT-ID]/deno-sandbox
$ gcloud run deploy --image gcr.io/[PROJECT-ID]/deno-sandbox --platform managed
```

