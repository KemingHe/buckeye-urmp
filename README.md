# ⚠️ [Archived] ⚠️ Undergraduate Research Mentorship Program at The Ohio State University

> [!WARNING]
> **This repository is archived and no longer maintained.**
>
> - **Archived**: 2025-08-10 by [@KemingHe](https://github.com/KemingHe)
> - **Archive reason**: low/no usage of this platform by the Ohio State community
> - **Inquries and corrections**: email [keminghe.career@gmail.com](mailto:keminghe.career@gmail.com)

## 🛠️ Installation Steps

> [!IMPORTANT]
> This project uses the new `Node.js 22` as runtime, `TypeScript` as dev language, and `pnpm` as package manager. You can read more about these handy tools here:
>
> Node.js 22: https://nodejs.org/en/blog/release/v22.2.0
>
> TypeScript: https://nextjs.org/docs/app/building-your-application/configuring/typescript
>
> Pnpm: https://pnpm.io/

1. Set up Git; and set up Node.js 22 via `nvm`

> Download Git version control: https://git-scm.com/downloads
>
> Download Node.js 22: https://nodejs.org/en/download/package-manager

```bash
# Confirm git and node (npm) are installed correctly.
git --version
npm --verison
```

2. Clone the repository and change to the project directory.

```bash
git clone https://github.com/data-glow-gh/devosu-research-mentorship-frontend.git

cd devosu-research-mentorship-frontend
```

3. Enable `pnpm` using `corepack` and install the dependencies.

```bash
# Declare usage of pnpm and install globally using corepack.
corepack use pnpm@latest
corepack install --global pnpm@latest

# For pnpm routine updates.
corepack up
```

4. You are now ready to contribute!!

```bash
# Start the local development server after setting up .env.development.local
# according to env vars required by .env.sample.
pnpm run dev
```
