import js from "@eslint/js";

export default [
  js.configs.recommended,          // eslint/js의 권장 규칙 세트를 그대로 사용 
  {
    languageOptions: {
      ecmaVersion: 2024,           // 최신 JS 문법 허용
      sourceType: "module",        // ESM, strict mode
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-unused-vars": [        // 사용하지 않는 변수 경고
        "warn",
        { argsIgnorePattern: "^_" },  // ^_(_로 시작하는 문자열), 일부러 쓰지 않는 인자 나타냄
      ],
      "no-console": "off",      // 'console' is not defined 방지
      "prefer-const": "error",  // 재할당하지 않는 변수 const 강제
      "no-var": "error",        // var 사용 금지
    },
  },
];