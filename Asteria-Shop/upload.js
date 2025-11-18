const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { fileName, fileData } = JSON.parse(event.body);

  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = process.env.REPO_OWNER;
  const repoName = process.env.REPO_NAME;

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/images/${fileName}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${githubToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Upload ${fileName}`,
      content: fileData,
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "ok" }),
  };
};
