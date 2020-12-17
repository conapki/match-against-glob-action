const core = require("@actions/core");
const glob = require("@actions/glob");

const globOptions = {
  followSymbolicLinks:
    core.getInput("follow-symbolic-links").toLowerCase() !== "false",
};

async function run() {
  try {
    const filenames = core.getInput("filenames");
    core.startGroup("Using filenames:\n");
    for (const name of filenames) {
      core.info(name + "\n");
    }
    core.endGroup();

    const patterns = core.getInput("patterns");

    core.startGroup("Using glob patterns:\n");
    for (const pattern of patterns) {
      core.info(pattern + "\n");
    }
    core.endGroup();

    const globber = await glob.create(filenames, globOptions);
    const matchingFiles = await globber.glob();

    core.startGroup("Files that match the glob patterns:\n");
    for (const file of matchingFiles) {
      core.info(file + "\n");
    }
    core.endGroup();

    if (matchingFiles.length > 0) {
      core.setOutput("match", "true");
    }

    core.setOutput("files", matchingFiles);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
