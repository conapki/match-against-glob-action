const core = require("@actions/core");
const minimatch = require("minimatch");

async function run() {
  try {
    const filenames = core.getInput("filenames");
    core.startGroup("Using filenames:");
    for (const name of filenames.split(",")) {
      core.info(name);
    }
    core.endGroup();

    const patterns = core.getInput("patterns");
    core.startGroup("Using glob patterns:");
    for (const pattern of patterns.split(",")) {
      core.info(pattern);
    }
    core.endGroup();

    const matchingFiles = [];

    for (const name of filenames.split(",")) {
      for (const pattern of patterns.split(",")) {
        if (minimatch(name, pattern)) {
          matchingFiles.push(name);
        }
      }
    }

    if (matchingFiles.length > 0) {
      core.startGroup("Files that match the glob patterns:");
      for (const file of matchingFiles.split(",")) {
        core.info(file);
      }
      core.endGroup();
      core.setOutput("match", "true");
    } else {
      core.info("No files matched the pattern");
      core.setOutput("match", "false");
    }

    core.setOutput("files", matchingFiles);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
