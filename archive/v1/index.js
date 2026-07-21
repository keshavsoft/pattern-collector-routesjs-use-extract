import fs from 'fs';
import path from 'path';

import getAllMatches from "pattern-collector";

const searchString = /^[ \t]*router\.(get|post|put|delete|patch|use)\b.*$/gm;

const fileNameToPull = "end-points.js";

const startFunc = ({ inFilePath }) => {
    try {
        const filePath = path.join(inFilePath, fileNameToPull);

        const fileContent = fs.readFileSync(filePath, 'utf8');

        const matches = getAllMatches({
            fileContent: fileContent, searchString
        });

        return matches.map(match => match.replace(/[\r\n]/g, ''));
    } catch (error) {
        console.error("Error running test:", error.message);
    };

    return [];
};

export default startFunc
