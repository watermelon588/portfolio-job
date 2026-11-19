# Agent Peeps — case-study sources

Reviewed 19 November 2026 against [agentpeeps at `b492ac1`](https://github.com/watermelon588/agentpeeps) (local checkout `../agent-presence`). Live site: https://www.agentpeeps.space. Sponsor link: https://www.agentpeeps.space/#sponsor.

| Claim | Source |
| --- | --- |
| Four agents, nine states, local only, hook behaviour | `README.md` (How it works), `cli.js` emit |
| 5 MB log rotation, always exit 0 | `cli.js` (`MAX_LOG`, emit) |
| 64 KB replay, rotation detection, click-through window | `overlay/main.js` |
| Backups on init, permanent copy in `~/.agent-presence/app` | `cli.js`, README Install |
| 15 packs, npm v0.1.1, VS Code extension status | README, `CHANGELOG.md`, `package.json` |

- Not featured: sits sixth in `content.work`, after the five homepage projects.
- Case images: `docs/readme/control-room/overview.webp` and `bubble.webp`, resized to 1600 px WebP, same in all five themes.
- Thumbnail: `site-assets/mockups/scribb/scribb-laptop-logo.png` with its screen repainted to show the Agent Peeps pig (`logo.png`) and a Bricolage Grotesque wordmark (the agentpeeps site's display font), perspective-warped onto the screen. See `site-assets/mockups/agentpeeps/`.
