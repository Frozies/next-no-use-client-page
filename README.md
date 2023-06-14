# ESLint Rule: No Client on Page

This is an ESLint custom rule that disallows the use of `"use client"` directive at the top of page files in a Next.js application directory. The rule enforces that Server Components should be the default and restricts client components from being used inappropriately.

## Rule Details

This rule aims to ensure that in a Next.js application, the `"use client"` directive is not used at the top of files inside the `app` subfolder with names ending in `page.ts`, `page.js`, `pages.tsx`, or `pages.jsx`. The `"use client"` directive is used to separate server-only code and client code. Since Server Components are the default, all components are considered part of the Server Component module graph unless defined or imported into a module that starts with the `"use client"` directive.

## Installation

Before installing the custom rule, make sure you have ESLint installed:

```sh
npm install eslint --save-dev
# or
yarn add eslint --dev
```

Clone this repository and navigate to the directory where the custom rule is located. Run the following command to link the package locally:

```sh
npm link
# or
yarn link
```

Navigate to your project directory and run:

```sh
npm link eslint-plugin-no-client-on-page
# or
yarn link eslint-plugin-no-client-on-page
```

## Usage
Add the custom rule to your ESLint configuration file (.eslintrc.js or .eslintrc.json).

```js
{
    "plugins": ["no-client-on-page"],
        "rules": {
        "no-client-on-page/no-client-on-page": "error"
    }
}

```

## Testing
The custom rule comes with test cases to validate its functionality. To execute the tests, navigate to the directory where the custom rule is located and run:

```sh
npm test
# or
yarn test
```

## Examples

Valid:

```js
// File: ./app/components/page.ts
import React from 'react';
const Page = () => { return <div>Hello, Page!</div>; };
export default Page;
```

Invalid:
```js
// File: ./app/components/page.ts
"use client";
import React from 'react';
const Page = () => { return <div>Hello, Page!</div>; };
export default Page;
```

## Contributing
Contributions are welcome! Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## References
- [Next.js "use client" directive](https://nextjs.org/docs/getting-started/react-essentials#the-use-client-directive)

## Disclaimer
This custom rule is not officially supported by Next.js. It is a personal project that I created to learn more about 
ESLint custom rules and to help enforce best practices in my Next.js projects.

## Author
[Davin Young](https://github.com/Frozies)

