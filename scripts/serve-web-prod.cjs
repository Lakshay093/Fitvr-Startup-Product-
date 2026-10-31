const path = require("node:path");
const { spawn } = require("node:child_process");

const port = process.env.PORT || process.argv[2] || "3012";
const root = process.cwd();
const webCwd = path.join(root, "apps", "web");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, "start", "--port", port], {
  cwd: webCwd,
  stdio: "inherit",
  windowsHide: true
});

function shutdown() {
  child.kill();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
child.on("exit", (code) => {
  process.exit(code ?? 0);
});
