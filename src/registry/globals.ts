export const globals = `@import "tailwindcss";

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
  --secondary: hsl(189 94% 53%);

  /* Semantic */
  --success: hsl(142 71% 59%);
  --destructive: hsl(0 84% 60%);

  /* Borders & Inputs */
  --border: hsl(240 4% 16%);
  --input: hsl(240 4% 16%);
  --ring: hsl(239 84% 67%);

  /* Special Surfaces */
  --overlay: hsl(0 0% 0% / 0.5);
}

[data-theme="light"] {
  /* Surfaces */
  --background: hsl(0 0% 100%);
  --foreground: hsl(222 47% 11%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(222 47% 11%);
  --muted: hsl(212 30% 93.5%);
  --muted-foreground: hsl(220 17% 17%);
  --accent: hsl(210 40% 96%);
  --accent-foreground: hsl(222 47% 11%);

  /* Brand */
  --secondary: hsl(189 90% 36%);

  /* Semantic */
  --success: hsl(142 76% 36%);
  --destructive: hsl(0 72% 51%);

  /* Borders & Inputs */
  --border: hsl(214 32% 91%);
  --input: hsl(214 32% 91%);
  --ring: hsl(239 84% 67%);

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
  --color-primary: hsl(239 84% 67%);
  --color-primary-light: hsl(239 84% 74%);
  --color-primary-foreground: hsl(0 0% 100%);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: hsl(0 0% 100%);

  /* Semantic */
  --color-destructive: var(--destructive);
  --color-destructive-foreground: hsl(0 0% 100%);
  --color-success: var(--success);
  --color-success-foreground: hsl(0 0% 100%);

  /* Borders & Inputs */
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Special Surfaces */
  --color-overlay: var(--overlay);
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: system-ui, -apple-system, sans-serif;
}
`
