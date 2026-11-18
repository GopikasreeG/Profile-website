# Gopika Sree G | Profile Website + CI/CD

Single-page profile site in plain HTML5, CSS3 and vanilla JS, deployed to GitHub Pages with GitHub Actions.
Design inspired by the "Personal Brand Website" reference: warm stone palette, serif headings, arch-shaped frames.

## Structure
- `index.html` all sections (#hero, #journey, #interests, #family, #hobbies, #footer)
- `css/theme.css` the ONE theme file (CSS variables only)
- `css/style.css` layout and components, uses `var()` everywhere
- `js/main.js` nav, reveal, show more, flip cards, lightbox, footer
- `.github/workflows/` validate, deploy, pr-checks, lighthouse, notify

## Add your own content
Replace the placeholder LinkedIn, GitHub and email links in `index.html`. Swap the illustrations in `images/` for your own photos whenever you like.
To use real photos, put them in `images/<section>/` and add
`<img src="images/hero/me.jpg" alt="Gopika Sree G">` (keep each `<img>` tag on one line with `alt`; the PR check needs it).

## Git workflow
```bash
git init && git add . && git commit -m "chore: initial project structure"
git branch -M main
git remote add origin https://github.com/<username>/profile-website.git
git push -u origin main
git checkout -b develop && git push -u origin develop
git checkout -b ci/setup-validation develop   # one branch per task, PR into develop
```
Branch names: `feature/hero-section`, `feature/journey-timeline`, `feature/interests-cards`, `feature/family-section`,
`feature/hobbies-gallery`, `theme/dark-mode`, `theme/warm-tones`, `ci/setup-validation`, `ci/setup-deploy`,
`ci/setup-pr-checks`, `ci/setup-lighthouse`, `ci/setup-notifications`.
Never commit directly to `main`: feature/ci branch -> PR -> `develop` -> PR -> `main`.

## GitHub settings
1. Settings -> Pages -> Source: **GitHub Actions**
2. Settings -> Branches -> Add rule for `main` -> Require status checks -> select `all-checks-passed`
3. Settings -> Secrets and variables -> Actions -> add `SLACK_WEBHOOK_URL` (then uncomment the curl lines in notify.yml)

## Theme switch exercise
`git checkout -b theme/dark-mode develop`, replace ONLY the `:root` values in `css/theme.css` with:
```css
:root {
  --color-primary: #e8d9c8;  --color-primary-light: #f3e8da;  --color-primary-dark: #cdb9a3;
  --color-bg: #17140f;  --color-bg-secondary: #221d17;  --color-bg-card: #2b251d;
  --color-text: #efe6da;  --color-text-secondary: #b3a595;  --color-text-inverse: #17140f;
  --color-accent: #d1a77a;  --color-accent-soft: #3b3022;  --color-border: #3b3328;
  --color-shadow: rgba(0, 0, 0, 0.5);  --color-overlay: rgba(0, 0, 0, 0.75);
}
```
Then: `git add css/theme.css && git commit -m "Switch to dark theme"`, push, open PR, merge.
For `theme/warm-tones`, try `--color-bg: #fbeee0; --color-accent: #c2703d; --color-primary: #5a2e1b;`.
