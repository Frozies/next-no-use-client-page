module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Disallow the use of 'use client' on page files in a Next.js app directory.",
            category: "Best Practices",
            recommended: true,
        },
        fixable: null,
        schema: [],
        messages: {
            noUseClient: 'Error: "use client" should not be used at the top of a "page" or "pages" file inside the "app" subfolder.',
        },
    },

    create(context) {
        const filename = context.getFilename();

        return {
            Program(node) {
                // Check if the file is inside an 'app' subfolder and ends with 'page.ts', 'page.js', 'pages.tsx', or 'pages.jsx'
                if (!filename.match(/\/app\/.*\/pages?\.(ts|js|tsx|jsx)$/)) {
                    return;
                }

                const sourceCode = context.getSourceCode();
                const lines = sourceCode.getLines();
                const firstNonEmptyLineIndex = lines.findIndex(line => line.trim() !== "");

                // Check if the first non-empty line contains '"use client"'
                if (lines[firstNonEmptyLineIndex].includes('"use client"')) {
                    context.report({
                        node: node.body[firstNonEmptyLineIndex], // report on the relevant node
                        messageId: "noUseClient",
                    });
                }
            },
        };
    },
};
