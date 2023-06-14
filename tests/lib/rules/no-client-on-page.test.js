const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-client-on-page");

const ruleTester = new RuleTester({
    parser: require.resolve("@babel/eslint-parser"),
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
});

ruleTester.run("no-client-on-page", rule, {
    valid: [
        // Valid cases (no "use client" at the top)
        {
            code: `
        import React from 'react';
        const Page = () => { return <div>Hello, Page!</div>; };
      `,
            filename: "./app/components/page.ts",
        },
        {
            code: `
        import React from 'react';
        const Pages = () => { return <div>Hello, Pages!</div>; };
      `,
            filename: "./app/components/pages.tsx",
        },
        // File not inside 'app' folder
        {
            code: `
        "use client";
        import React from 'react';
        const Page = () => { return <div>Hello, Page!</div>; };
      `,
            filename: "./components/page.ts",
        },
        // File inside 'app' folder but not a 'page' or 'pages' file
        {
            code: `
        "use client";
        import React from 'react';
        const Comp = () => { return <div>Hello, Component!</div>; };
      `,
            filename: "./app/components/component.tsx",
        },
        // File inside 'app' folder but does not contain 'use client'
        {
            code: `
        import React from 'react';
        const Page = () => { return <div>Hello, Page!</div>; };
      `,
            filename: "./app/somefolder/page.ts",
        },
    ],
    invalid: [
        // Invalid cases (contains "use client" at the top)
        {
            code: `
        "use client";
        import React from 'react';
        const Page = () => { return <div>Hello, Page!</div>; };
      `,
            filename: "./app/components/page.ts",
            errors: [{ messageId: "noUseClient" }],
        },
        {
            code: `
        "use client";
        import React from 'react';
        const Pages = () => { return <div>Hello, Pages!</div>; };
      `,
            filename: "./app/components/pages.tsx",
            errors: [{ messageId: "noUseClient" }],
        },
        // 'use client' in a '.js' file inside 'app' folder
        {
            code: `
        "use client";
        const Page = () => { return "Hello, Page!"; };
      `,
            filename: "./app/components/page.js",
            errors: [{ messageId: "noUseClient" }],
        },
        // 'use client' in a deeply nested folder inside 'app' folder
        {
            code: `
        "use client";
        import React from 'react';
        const Pages = () => { return <div>Hello, Pages!</div>; };
      `,
            filename: "./app/subfolder/anotherfolder/pages.tsx",
            errors: [{ messageId: "noUseClient" }],
        },
    ],
});
