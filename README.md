> Collection of crazy advanced types in TypeScript. Just for fun, not intended for use in production.

TypeScript's type system is pretty powerful and as it turns out, is turing-complete, meaning any possible logic can be written with it. You may have seen types pushed to the limit in blog posts like [this](https://aphyr.com/posts/342-typing-the-technical-interview). This repository is my own collection of insane utility types.

### Example

```sh
npm install --save-dev @jakzo/type-gymnastics
```

your-code.ts:

```ts
import type { EvaluateMathExpression } from "@jakzo/type-gymnastics";

type Result = EvaluateMathExpression<"12 + 34 - 5*(6*7 % 8) + 9">;
// The type of `Result` is "45"
const b: Result = "45";
```

### Why?

For fun. 😄
