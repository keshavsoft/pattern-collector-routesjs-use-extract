import getAllMatches from "pattern-collector-endpointsjs-use";

const startFunc = ({ inFilePath }) => {

    const matches = getAllMatches({ filePath: inFilePath });

    return matches.map(match => {
        const clean = match.replace(/[\r\n]/g, '');
        const parseRegex = /router\.(get|post|put|delete|patch|use)\s*\(\s*['"`]([^'"`]+)['"`]/;
        const parts = clean.match(parseRegex);
        if (parts) {
            return {
                method: parts[1],
                endpoint: parts[2]
            };
        }
        return null;
    }).filter(Boolean);
};

export default startFunc;