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
// The type of `Result` is: "45"
const b: Result = "45";

type NumQueensToPlace = 8;
type GridSize = 8;
type Board = Problems.NQueensVisualized<
  Problems.NQueens<
    Integer.FromDecimal<NumQueensToPlace>,
    Integer.FromDecimal<GridSize>
  >,
  Integer.FromDecimal<GridSize>
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

### Why?

For fun. 😄
