import fastify from "fastify";
import { spawn } from "child_process";

const app = fastify();

app.post('/tts', async (req, res) => {
  let { name, words } = req.body;
  const tts = spawn('tts',["--text", `"${words}"`,"--out_path",`${process.env.UPLOAD_PATH}/${name}.mp3`]);
  tts.on('error', console.log);
  tts.on('exit', () => console.log("done"));
  res.send({ ok: true });
});

let host = process.env.HOST || "0.0.0.0";
let port = process.env.PORT || 4119;

app.listen({ host, port });
