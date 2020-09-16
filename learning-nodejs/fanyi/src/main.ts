import * as https from 'https';

export const translate = (word: string) => {
  console.log("translate -> word", word);

  const options = {
    hostname: "www.baidu.com",
    port: 443,
    path: "/",
    method: "GET",
  };

  const req = https.request(
    options,
    (res: any) => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);

      res.on("data", (d: string | Uint8Array) => {
        process.stdout.write(d);
      });
    }
  );

  req.on("error", (e: any) => {
      console.error(e);
    });
  req.end();
};
