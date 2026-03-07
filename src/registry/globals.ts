/** Base globals — light theme only, no dark/light switching */
export const globalsBase = `@import "tailwindcss";

:root {
  /* Surfaces */
  --background: hsl(0 0% 100%);
  --foreground: hsl(222 47% 11%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(222 47% 11%);
  --muted: hsl(0 0% 95.3%);
  --muted-foreground: hsl(220 17% 17%);
  --accent: hsl(240 5% 96.5%);
  --accent-foreground: hsl(222 47% 11%);

  /* Brand */
  --primary: hsl(239 84% 67%);
  --primary-light: hsl(239 84% 74%);
  --primary-foreground: hsl(0 0% 100%);
  --secondary: hsl(189 90% 36%);
  --secondary-foreground: hsl(0 0% 100%);

  /* Semantic */
  --success: hsl(142 76% 36%);
  --success-foreground: hsl(0 0% 100%);
  --destructive: hsl(0 72% 51%);
  --destructive-foreground: hsl(0 0% 100%);

  /* Borders & Inputs */
  --border: hsl(214 32% 91%);
  --input: hsl(214 32% 91%);

  /* Special Surfaces */
  --overlay: hsl(0 0% 0% / 0.18);
}

@theme inline {
  /* Surfaces */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  /* Brand */
  --color-primary: var(--primary);
  --color-primary-light: var(--primary-light);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);

  /* Semantic */
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);

  /* Borders & Inputs */
  --color-border: var(--border);
  --color-input: var(--input);

  /* Special Surfaces */
  --color-overlay: var(--overlay);
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: system-ui, -apple-system, sans-serif;
}
`

/** Dark/light theme tokens — appended to globals by `npx drivn add theme` */
export const themeTokens = `
/* Drivn Dark/Light Theme */
:root,
[data-theme="dark"] {
  /* Surfaces */
  --background: hsl(240 6% 4%);
  --foreground: hsl(0 0% 98%);
  --card: hsl(240 5% 7%);
  --card-foreground: hsl(0 0% 98%);
  --muted: hsl(240 4% 16%);
  --muted-foreground: hsl(220, 17%, 83%);
  --accent: hsl(240 4% 10%);
  --accent-foreground: hsl(0 0% 98%);

  /* Brand */
  --primary: hsl(239 84% 67%);
  --primary-light: hsl(239 84% 74%);
  --primary-foreground: hsl(0 0% 100%);
  --secondary: hsl(189 94% 53%);
  --secondary-foreground: hsl(0 0% 100%);

  /* Semantic */
  --success: hsl(142 71% 59%);
  --success-foreground: hsl(0 0% 100%);
  --destructive: hsl(0 84% 60%);
  --destructive-foreground: hsl(0 0% 100%);

  /* Borders & Inputs */
  --border: hsl(240 4% 16%);
  --input: hsl(240 4% 16%);

  /* Special Surfaces */
  --overlay: hsl(0 0% 0% / 0.5);
}

[data-theme="light"] {
  /* Surfaces */
  --background: hsl(0 0% 100%);
  --foreground: hsl(222 47% 11%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(222 47% 11%);
  --muted: hsl(0 0% 95.3%);
  --muted-foreground: hsl(220 17% 17%);
  --accent: hsl(240 5% 96.5%);
  --accent-foreground: hsl(222 47% 11%);

  /* Brand */
  --primary: hsl(239 84% 67%);
  --primary-light: hsl(239 84% 74%);
  --primary-foreground: hsl(0 0% 100%);
  --secondary: hsl(189 90% 36%);
  --secondary-foreground: hsl(0 0% 100%);

  /* Semantic */
  --success: hsl(142 76% 36%);
  --success-foreground: hsl(0 0% 100%);
  --destructive: hsl(0 72% 51%);
  --destructive-foreground: hsl(0 0% 100%);

  /* Borders & Inputs */
  --border: hsl(214 32% 91%);
  --input: hsl(214 32% 91%);

  /* Special Surfaces */
  --overlay: hsl(0 0% 0% / 0.18);
}
`
