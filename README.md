> Collection of crazy advanced types in TypeScript. Just for fun, not intended for use in production.

TypeScript's type system is pretty powerful and as it turns out, is turing-complete, meaning any possible logic can be written with it. You may have seen types pushed to the limit in blog posts like [this](https://aphyr.com/posts/342-typing-the-technical-interview). This repository is my own collection of insane utility types.

The available types are listed in the [API documentation](https://jakzo.github.io/type-gymnastics/modules.html).

### Example

```sh
npm install --save-dev @jakzo/type-gymnastics
```

your-code.ts:

```ts
import type { Math, Problems } from "@jakzo/type-gymnastics";

type Result = Math.Evaluate<"12 + 34 - 5*(6*7 % 8) + 9">;
// The type of `Result` is: 45
const b: Result = 45;

type NumQueensToPlace = 8;
type GridSize = 8;
type Board = Problems.NQueensVisualized<
  Problems.NQueens<NumQueensToPlace, GridSize>,
  GridSize
>;
// The type of `Board` is: "
// ♕ ◼️ ◻️ ◼️ ◻️ ◼️ ◻️ ◼️
// ◼️ ◻️ ◼️ ◻️ ♕ ◻️ ◼️ ◻️
// ◻️ ◼️ ◻️ ◼️ ◻️ ◼️ ◻️ ♕
// ◼️ ◻️ ◼️ ◻️ ◼️ ♕ ◼️ ◻️
// ◻️ ◼️ ♕ ◼️ ◻️ ◼️ ◻️ ◼️
// ◼️ ◻️ ◼️ ◻️ ◼️ ◻️ ♕ ◻️
// ◻️ ♕ ◻️ ◼️ ◻️ ◼️ ◻️ ◼️
// ◼️ ◻️ ◼️ ♕ ◼️ ◻️ ◼️ ◻️"
```

You can try it out at the [TypeScript Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBDAnmApnA3nAsgQxgCwBo4AFKCAIwBsUQBnOAXzgDNyQ4AiAAQCscA1gC8IAeiSoAtAHNEIAHY46MYAGM6nANwAobRLQAlFHQCuVeAF5sefADoAogDccVE3hQAeTgEYATHABqOABmABY4STgAVgAqAAoANhiAdjgAUjgADgBKQLgATk4APh1RUTgAFXw0fTgIFjgAAyNTc0a4YDoALjhQqO1VCHllOAoelrNLXqidPWQ0ADkTEABFExQUYYqIEiocVTQrTJ1agHEoYAATAGVgIUOsk-m4ACEIHChLuCsyShp6WwLNYbYYANU6biodxQlw82jgpHI1FodEBwM2dA8S1W6wx212+xQxHOV1u9yKhHhcBJN2h2hK2jKlWqCGe9Sabw+l3anR6nEZ5UAqmRwQA-pIB4P7ggG-SCXiqUyiXS0VigVKuWqxXCxWy6UqrUK+Vq7USwUqo3qg3Co26i3m23i036u2OzXKpkaw2Os32ple41OuX8oA).

### Why?

For fun. 😄

### Usage Tips

#### Restarting TypeScript server

If you're in VSCode, **use this command whenever things start going wonky**:

```
CTRL/CMD+SHIFT+P -> Restart TypeScript Server
```

The TS server will frequently get into a broken while you're in the process of typing code so you may find that you quickly memorize this command. 🙂

#### Efficiently chaining function calls

When using the library, you will notice that many exported functions have an equivalent which begins with a `_`. This is because the library uses its own representation for certain data types (most notably numbers). The `_` functions accept the internal representations so that functions can be chained together without constant converting to and from internal types.

For example, this library represents numbers as binary strings instead of TypeScript's `number` type. You can do `String.Repeat<"a", Math.Fibonacci<3>>` and it will work but if you want (or in some cases need) more efficiency, you can do this which will avoid converting the binary number to a number then back to a binary number:

```ts
type R = String._Repeat<"a", Math._Fibonacci<Integer.FromDecimal<3>>>;
```
