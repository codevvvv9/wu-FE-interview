import * as https from "https";
import md5 from "md5";
import * as querystring from "querystring";
import { appId, appSecret } from "./private";

export const translate = (word: string) => {
  console.log("translate -> word", word)
  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);

  const query: string = querystring.stringify({
    q: word,
    from: "en",
    to: "zh",
    appid: appId,
    salt: salt,
    sign: sign,
  });
  // const options = {
  //   hostname: "www.baidu.com",
  //   port: 443,
  //   path: "/",
  //   method: "GET",
  // };
  const options = {
    hostname: "api.fanyi.baidu.com",
    port: 443,
    path: "/api/trans/vip/translate?" + query,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    res.on("data", (d: any) => {
      console.log("translate -> d", d)
      process.stdout.write(d);
    });
  });

  req.on("error", (e: any) => {
    console.error(e);
  });
  req.end();
};
