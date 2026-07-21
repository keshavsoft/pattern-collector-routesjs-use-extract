import getAllMatches from "pattern-collector-routesjs-use";

const parseRegex = /router\.use\s*\(\s*['"`]\/?([^'"`]+)['"`]\s*,\s*(\w+)/;

const startFunc = ({ fileContent }) => {

    const matches = getAllMatches({ fileContent });

    return matches.map(match => {
        const clean = match.line.replace(/[\r\n]/g, '');

        const parts = clean.match(parseRegex);
        if (parts) {
            return {
                routeName: parts[1],
                variableName: parts[2],
                line: match.line,
                lineNumber: match.lineNumber
            };
        }
        return null;
    }).filter(Boolean);
};

export default startFunc;