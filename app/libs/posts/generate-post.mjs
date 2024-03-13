import { readFile, writeFile } from "node:fs";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline";

const MIN_TITLE_LENGTH = 1;
const MIN_EMOJI_LENGTH = 1;
const MIN_DESCRIPTION_LENGTH = 1; // 最低限の説明文の長さを設定
const POSTS_DIR = "./app/routes/posts";
const __dirname = resolve();
const templatePath = join(__dirname, "./app/libs/posts/template.mdx");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Main function to generate a new blog post.
 */
function generatePost() {
  function askTitle() {
    rl.question("title: ", (title) => {
      if (title.length < MIN_TITLE_LENGTH) {
        console.error("Please enter a title");
        askTitle();
      } else {
        askDescription(title);
      }
    });
  }

  /**
   * Asks the user for the description of the post and validates the input.
   */
  function askDescription(title) {
    rl.question("description: ", (description) => {
      if (description.length < MIN_DESCRIPTION_LENGTH) {
        console.error("Please enter a description");
        askDescription(title);
      } else {
        askFilePath(title, description);
      }
    });
  }

  /**
   * Asks the user for the file path where the post should be saved.
   * Uses a generated filename based on the date if the input is left blank.
   */
  function askFilePath(title, description) {
    rl.question("filepath (leave blank for default): ", (inputPath) => {
      let filename;
      if (inputPath.trim() === "") {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
        filename = `generated-post-${date.replace(/\//g, "-")}.mdx`;
      } else {
        filename = `${inputPath}.mdx`;
      }
      writePost(title, description, filename);
    });
  }

  function writePost(title, description, filename) {
    const filePath = join(__dirname, `${POSTS_DIR}/${filename}`);

    // 現在の日付を yyyy/mm/dd 形式で取得
    const currentDate = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "/");

    readFile(templatePath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      // テンプレートのプレースホルダを実際の値に置き換え、特にh1タイトル部分
      const updatedData = data
        .replace(/{{title}}/g, title) // 文書全体のタイトルプレースホルダを置き換え
        .replace(/{{description}}/g, description)
        .replace(/{{date}}/g, currentDate);

      writeFile(filePath, updatedData, (err) => {
        if (err) {
          throw err;
        }
        console.log(
          `🎉 Successfully created ${filename} with title, description, and date! 🎉`,
        );
        rl.close();
      });
    });
  }

  askTitle();
}

generatePost();
