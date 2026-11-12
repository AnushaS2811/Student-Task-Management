
const fs = require("fs");
const path = require("path");

// Source and destination folders
const sourceFolder = path.join(__dirname, "..", "src");
const outputFolder = path.join(__dirname, "..", "dist");

try {
    // Check whether the source folder exists
    if (!fs.existsSync(sourceFolder)) {
        throw new Error("Source folder not found!");
    }

    // Remove the previous build
    fs.rmSync(outputFolder, {
        recursive: true,
        force: true
    });

    // Create a fresh dist folder
    fs.mkdirSync(outputFolder, {
        recursive: true
    });

    // Copy application files into dist
    fs.cpSync(sourceFolder, outputFolder, {
        recursive: true
    });

    console.log("================================");
    console.log(" BUILD COMPLETED SUCCESSFULLY!");
    console.log(" Application files copied to dist.");
    console.log("================================");

} catch (error) {
    console.error("BUILD FAILED:", error.message);
    process.exit(1);
}
