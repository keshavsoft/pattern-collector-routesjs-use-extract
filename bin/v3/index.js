import getAllMatches from "pattern-collector-routesjs-use";

const startFunc = ({ inFilePath }) => {

    const matches = getAllMatches({ filePath: inFilePath });

    return matches.map(match => {
        const clean = match.replace(/[\r\n]/g, '');
        const parseRegex = /router\.use\s*\(\s*['"`]\/?([^'"`]+)['"`]\s*,\s*(\w+)/;
        const parts = clean.match(parseRegex);
        if (parts) {
            return {
                // routeName from folderName
                routeName: parts[1],
                variableName: parts[2]
            };
        }
        return null;
    }).filter(Boolean);
};

export default startFunc;