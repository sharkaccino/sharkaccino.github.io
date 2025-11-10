import { writeFile } from "node:fs/promises";
import { exec } from "node:child_process";

const dir = `public/metadata`;

// write build date

const currentDate = Date.now();

console.log(`build time set as ${currentDate}`)

await writeFile(`${dir}/buildTime.txt`, currentDate.toString(), `utf-8`);

// write revision hash

exec(`git rev-parse --short HEAD`, async (err, stdout, stderr) => {
  if (err != null) {
    console.error(err);
  } else {
    console.log(`revision hash set as ${stdout}`);

    await writeFile(`${dir}/revHash.txt`, stdout, `utf-8`);
  }
});