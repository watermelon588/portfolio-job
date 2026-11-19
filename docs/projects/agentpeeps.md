# Agent Peeps — case-study sources

Reviewed 19 November 2026 against [agentpeeps at `b492ac1`](https://github.com/watermelon588/agentpeeps) (local checkout `../agent-presence`). Live site: https://www.agentpeeps.space. Sponsor link: https://www.agentpeeps.space/#sponsor.

| Claim | Source |
| --- | --- |
| Four agents, nine states, local only, hook behaviour | `README.md` (How it works), `cli.js` emit |
| 5 MB log rotation, always exit 0 | `cli.js` (`MAX_LOG`, emit) |
| 64 KB replay, rotation detection, click-through window | `overlay/main.js` |
| Backups on init, permanent copy in `~/.agent-presence/app` | `cli.js`, README Install |
| 15 packs, npm v0.1.1, VS Code extension status | README, `CHANGELOG.md`, `package.json` |
| 210 stickers, website features, npm install counter | agentpeeps.space, `website/web/src/home.js`, `stickers-page.js` |

- Not featured: sits sixth in `content.work`, after the five homepage projects.
- Case media (same in all five themes): `01-live-site.webp`, a 1600 px headless capture of the agentpeeps.space hero (19 Nov 2026), then the site's three demo clips from `media/`: `02-getting-started.mp4`, `03-customize.mp4`, `04-ask-your-agent.mp4`. Clips render through `fig()` as muted looping videos that play only while on screen.
- Thumbnail: `site-assets/mockups/scribb/scribb-laptop-logo.png` with its screen repainted to show the Agent Peeps pig (`logo.png`) and a Bricolage Grotesque wordmark (the agentpeeps site's display font), perspective-warped onto the screen. See `site-assets/mockups/agentpeeps/`.
