import { readFile, writeFile } from "fs/promises";
import * as path from "path";

import glob from "glob";
import { compile } from "json-schema-to-typescript";
import prettier from "prettier";
import YAML from "yaml";

async function run() {
  const items = glob
    .sync("./templates/*/index.ts")
    .map((item) => item.slice(12, -9));

  for (const item of items) {
    const meta = YAML.parse(
      await readFile(`./templates/${item}/meta.yaml`, "utf-8")
    );

    const types = await compile(meta.schema, "Input", {
      additionalProperties: false,
      bannerComment: "",
    });

    const logo = getLogo(`./templates/${item}/assets`);
    const screenshots = getScreenshots(`./templates/${item}/assets`);

    await writeFile(
      `./templates/${item}/meta.ts`,
      prettier.format(
        [
          `// Generated using "yarn build-templates"`,
          ``,
          `export const meta = ${JSON.stringify({
            ...meta,
            logo,
            screenshots,
          })}`,
          ``,
          types,
        ].join("\n"),
        { parser: "babel" }
      )
    );
  }

  await generateIndex(items);
}

run().catch(console.error);

async function generateIndex(items: string[]) {
  const output: string[] = [`// Generated using "yarn build-templates"`, ""];

  items.forEach((item, index) => {
    output.push(`import { meta as meta_${index} } from "./${item}/meta";`);
    output.push(`import { generate as generate_${index} } from "./${item}";`);
  });

  output.push("", "const templates = [");

  items.forEach((item, index) => {
    output.push(
      `  { slug: "${item}", meta: meta_${index}, generate: generate_${index} },`
    );
  });

  output.push("];", "", "export default templates;", "");

  await writeFile("./templates/index.ts", output.join("\n"));
}

function getLogo(dir: string) {
  const files = glob.sync(path.resolve(dir, "logo.{png,svg}"));
  return files[0]?.split("/").pop() ?? null;
}

function getScreenshots(dir: string) {
  const files = glob.sync(path.resolve(dir, "screenshot*.{png,jpg}"));
  return files.map((file) => file.split("/").pop());
}
