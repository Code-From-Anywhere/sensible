# Converting to Sensible Monorepo

Put the apps (app, web, server, etc.) in the "apps" folder.
Also create a packages folder in which you create a core folder and ui folder.

Add this package.json in your project root directory

```{
    "name": "yourproject-monorepo",
    "version": "0.0.0",
    "private": true,
    "workspaces": [
      "apps/*",
      "packages/*"
    ],
    "scripts": {
      "build": "turbo run build",
      "dev": "turbo run dev --parallel",
      "lint": "turbo run lint",
      "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    },
    "devDependencies": {
      "prettier": "^2.5.1",
      "turbo": "latest"
    },
    "engines": {
      "npm": ">=7.0.0",
      "node": ">=14.0.0"
    },
    "packageManager": "pnpm@6.32.1"
  }
```

Create a turbo.json with this in your project root directory:

```
{
 "pipeline": {
   "build": {
     "dependsOn": ["^build"],
     "outputs": ["dist/**", ".next/**"]
   },
   "lint": {
     "outputs": []
   },
   "dev": {
     "cache": false
   }
 }
}
```

Add the following dependencies to your apps and packages, where needed: core, ui
And the following to devDependencies: config, tsconfig
With version `"*"`

### There's more.

This is the most important part but there are probably more things, depending on your codebase. Let us help you! Contact us to discuss this.