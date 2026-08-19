import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,

    {
        files: ["src/**/*.js"],
        languageOptions: {
            globals: globals.node
        }
    },

    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: {
                ...globals.node,
                describe: "readonly",
                test: "readonly",
                expect: "readonly"
            }
        }
    },

    {
        files: ["public/**/*.js"],
        languageOptions: {
            globals: globals.browser
        }
    },

    {
        ignores: [
            "node_modules/",
            "tasks.db"
        ]
    }
];