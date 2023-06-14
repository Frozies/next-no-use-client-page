/**
 * @fileoverview In NextJS app directory, disallow the use of &#34;use client&#34; on page files.
 * @author Davin Young
 */
"use strict";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports = {
    rules: {
        'no-use-client-on-page': require('./rules/no-client-on-page')
    }
};


