<p align="center">
  <img src="docs/banner.png" alt="DLSS 5 Swapper" width="100%">
</p>

<h1 align="center">DLSS 5 Swapper</h1>

<p align="center">
  Install and manage DLSS 5 Neural Rendering for compatible games and emulators.
</p>

<p align="center">
  <a href="https://github.com/rakanki911/DLSS5-Swapper/releases/latest"><img src="https://img.shields.io/github/v/release/rakanki911/DLSS5-Swapper?color=8fd400&label=release" alt="Latest release"></a>
  <a href="https://github.com/rakanki911/DLSS5-Swapper/releases"><img src="https://img.shields.io/github/downloads/rakanki911/DLSS5-Swapper/total?color=8fd400&label=downloads&cacheSeconds=300" alt="Total downloads"></a>
  <img src="https://img.shields.io/badge/Windows-10%20%2F%2011-8fd400" alt="Windows 10/11">
  <img src="https://img.shields.io/badge/languages-38-8fd400" alt="38 languages">
  <a href="https://buymeacoffee.com/rakanki911"><img src="https://img.shields.io/badge/support-555" alt="Support"></a>
  <a href="https://buymeacoffee.com/rakanki911"><img height="20" src="https://cdn.buymeacoffee.com/buttons/v2/lato-yellow.png" alt="Buy me a coffee"></a>
</p>

## Download

[**Windows Installer**](https://github.com/rakanki911/DLSS5-Swapper/releases/latest) ·
[**Portable**](https://github.com/rakanki911/DLSS5-Swapper/releases/latest) ·
[Checksums](https://github.com/rakanki911/DLSS5-Swapper/releases/latest)

Both are on the latest release page, with `SHA256SUMS.txt` beside them.

<p align="center">
  <img src="https://raw.githubusercontent.com/rakanki911/DLSS5-Swapper/7415065e5c5437441d0e0b0a0362d0ada6d86e15/docs/screenshots/01-home.png" alt="Home" width="100%">
</p>

## Features

- **Easy installation:** native DLSS games, or compatible non-DLSS games through DLSS5-Feeder.
- **Your library:** Steam, Epic, GOG, modern Xbox Game Pass folders, and manually added games/emulators.
- **Search and filters:** combine title, graphics API, DLSS status/version and add-ons; click counters to filter.
- **Flexible layout:** group by store or show everything in one list, with game artwork and light/dark themes.
- **Controlled scanning:** full-drive scanning is **off by default**. Added folders still scan normally; enable all-drive discovery or remove scan folders in Settings.
- **Right-click shortcuts:** open/copy folder, rescan, change cover, restore originals or hide a game.
- **Backups and History:** restore original files, keep installation records, and copy History/activity/install logs.
- **Save diagnostics:** one file with the install log, the game’s own ReShade and Feeder logs, the manifest and your driver - shown to you before it is written, and ready to attach to a report.
- **In-game overlay:** press **F8** to open the app's own panel over the running game and move the real DLSS Neural Rendering sliders while you play. Supports the **DLSS5-Feeder** and **RenoDX v4.7** routes only. Drag the grip in its bottom right corner to resize it; each game remembers its own size.
- **Rendering API override:** optional, per game, with **Automatic** as the default; detection is never overwritten.
- **Custom add-ons:** the Add-ons page remains available alongside the integrated installation routes.
- **Community (BETA):** read what worked for other people on the games you own, leave your own report, and talk it over underneath it. Opt-in, and everything you leave can be edited, deleted or withdrawn.

## New in 2.2.4

A place to compare notes with other people, and eight faults fixed at the cause.

### The Community page — BETA

Compatibility is something other people already know, and until now every one of
them had to find out alone.

<p><img src="docs/screenshots/10-community.png" alt="The Community page: every game people have reported on, with its artwork, verdict and comment count" width="100%"></p>

- **What other people found, on the games you own** - the route they used, the
  rendering API, whether it worked, and the machine it worked on.
- **A thread under any result**, with reactions, replies, and `@` mentions
  limited to the people already on that game. Windows tells you when someone
  answers or names you; a game's general comments stay quiet unless you ring
  its bell, and all of it can be switched off in Settings.

<p><img src="docs/screenshots/11-community-card.png" alt="One game's card opened: a report, the machine it ran on, reactions and a reply button" width="100%"></p>

- **What you wrote stays yours.** Right-click a game in Games or Community, or
  use the buttons inside a comment, to edit or delete your own report and
  replies. Delete the last report on a game and the game leaves the list with it.

<p><img src="docs/screenshots/12-games-menu.png" alt="The right-click menu on a game card, drawn by the app, with the way into the community on it" width="100%"></p>

- **Every card is lit by the game's own artwork** - poster and banner together
  decide its colour, and the change is animated rather than switched.
- **Nothing leaves your machine unasked.** A report is filled in and sent by
  hand, with every field shown first.

<p><img src="docs/screenshots/13-community-report.png" alt="The report sheet for Battlefield 1, wearing the orange of its own poster, listing every field that will be sent" width="100%"></p>

- **Signed with a name you choose** - a display name and one of twenty-four
  icons drawn in the app, so they take their colour from your theme.
  **Remove my community activity** withdraws everything you ever left.

<p><img src="docs/screenshots/14-settings-community.png" alt="Settings: the community display name, twenty-four avatars, the notifications switch and Remove my community activity" width="100%"></p>

### And eight things that were wrong

| | |
|---|---|
| **Xbox games** | Found from `.GamingRoot` and Gaming Services instead of an all-drive scan, and the overlay installs into protected executables. Thanks to @BillyMRX1 ([#204], [#206]) |
| **Cyberpunk 2077** | Windows' own `dbghelp`/`dbgcore` no longer read as a rival mod loader, so OptiScaler installs ([#196]) |
| **Antivirus** | The overlay page names the add-on Defender took, instead of waiting forever for a game that can never attach ([#197]) |
| **Portable build** | Unpacks to `%TEMP%\DLSS5-Swapper`, one path an exclusion can keep across releases ([#197]) |
| **Skipped overlay** | The install log says why in words rather than a bare code ([#197]) |
| **Update check** | A check that could not run says so; only silence now means you are current ([#207]) |
| **Overlay panel** | Drag its bottom-right corner to resize, 0.75x to 2.5x, remembered per game ([#202]) |
| **dgVoodoo** | 4096 MB of emulated video memory, measured by @tomkolp as what SWTOR needs at 1440p ([#37]) |

[Full 2.2.4 notes →](https://github.com/rakanki911/DLSS5-Swapper/releases/tag/v2.2.4)

[#37]: https://github.com/rakanki911/DLSS5-Swapper/issues/37
[#196]: https://github.com/rakanki911/DLSS5-Swapper/issues/196
[#197]: https://github.com/rakanki911/DLSS5-Swapper/issues/197
[#202]: https://github.com/rakanki911/DLSS5-Swapper/issues/202
[#204]: https://github.com/rakanki911/DLSS5-Swapper/pull/204
[#206]: https://github.com/rakanki911/DLSS5-Swapper/pull/206
[#207]: https://github.com/rakanki911/DLSS5-Swapper/issues/207

## Earlier releases

Each one is written up in full - what broke, why, and what was changed.

| | |
|---|---|
| **2.2.3** | [Six reported faults, fixed at the cause](docs/releases/v2.2.3.md) - OptiScaler on older cards, a game's own stale shader compiler, the overlay on a scaled display |
| **2.2.2** | [The reports people sent](docs/releases/v2.2.2.md) - games it could not find, installs it refused, the overlay's own page |
| **2.2.1** | [The Overlay page](docs/releases/v2.2.1.md) - themes you can write yourself, and a preview that runs before you choose |
| **2.2.0** | [Optional OptiScaler and a smarter library](docs/releases/v2.2.0.md) |

Every release also carries its own notes and downloads on the
[releases page](https://github.com/rakanki911/DLSS5-Swapper/releases).

## Compatibility

| Category | Support |
| --- | --- |
| **System** | Windows 10/11 x64; compatible 32-bit and 64-bit games |
| **ReShade / Feeder GPUs** | RTX 20 / 30 / 40 / 50; older-series support is reported by the bundled modified runtime's author |
| **OptiScaler GPUs** | 64-bit games with native DLSS enabled. The bundled neural model runs on **Blackwell** (RTX 50 / RTX PRO Blackwell); an older card needs a modded `nvngx_dlssnr.dll` you supply, which is never overwritten. Driver **616.56** recommended |
| **DirectX 12** | Native DLSS, Feeder, or eligible OptiScaler games |
| **DirectX 11** | Feeder for 32/64-bit games; eligible OptiScaler games |
| **DirectX 9 / 8** | DX9: 32/64-bit; DX8: 32-bit, through dgVoodoo2 → DX11 → Feeder |
| **Vulkan / OpenGL** | ReShade/Feeder; eligible Vulkan games can also use OptiScaler |
| **DirectX 10** | Not directly supported by Feeder; choose DX11 when available |
| **In-game overlay** | 64-bit DirectX 11 / 12 games with ReShade add-on support; **DLSS5-Feeder and RenoDX v4.7 only** |

OptiScaler's DX11/Vulkan path uses a DX12 bridge with FSR output by default.
For Vulkan backend changes, **restore originals first**. OptiScaler is not the emulator/non-DLSS route.

## Emulators

Select the emulator folder and its active renderer, then use **ReShade/Feeder**.

<table>
  <tr><th colspan="3">Emulators</th></tr>
  <tr><td>DuckStation</td><td>PCSX2</td><td>RPCS3</td></tr>
  <tr><td>Dolphin</td><td>PPSSPP</td><td>Xenia</td></tr>
  <tr><td>Cemu</td><td>Ryujinx</td><td>yuzu / suyu / Eden / Citron / Sudachi</td></tr>
  <tr><td>shadPS4</td><td>Azahar / Citra / Lime3DS</td><td>melonDS</td></tr>
  <tr><td>Flycast</td><td>xemu</td><td>Vita3K</td></tr>
  <tr><td>RetroArch</td><td>mGBA</td><td>Snes9x</td></tr>
  <tr><td>Play!</td><td></td><td></td></tr>
</table>

Compatibility varies by renderer and game. Xenia HUD correction remains experimental.

## 38 languages

<table>
  <tr><th colspan="4">All 38 languages</th></tr>
  <tr><td>English</td><td>العربية</td><td>简体中文</td><td>繁體中文</td></tr>
  <tr><td>Español</td><td>Português</td><td>Русский</td><td>Deutsch</td></tr>
  <tr><td>Français</td><td>日本語</td><td>한국어</td><td>Italiano</td></tr>
  <tr><td>Türkçe</td><td>Polski</td><td>Українська</td><td>Nederlands</td></tr>
  <tr><td>Čeština</td><td>Magyar</td><td>Română</td><td>Ελληνικά</td></tr>
  <tr><td>Svenska</td><td>Dansk</td><td>Norsk</td><td>Suomi</td></tr>
  <tr><td>ไทย</td><td>Tiếng Việt</td><td>Bahasa Indonesia</td><td>Bahasa Melayu</td></tr>
  <tr><td>Filipino</td><td>हिन्दी</td><td>বাংলা</td><td>فارسی</td></tr>
  <tr><td>اردو</td><td>Български</td><td>Српски</td><td>Hrvatski</td></tr>
  <tr><td>Slovenčina</td><td>Català</td><td></td><td></td></tr>
</table>

**Arabic, Persian and Urdu support right-to-left layout.**

## Screenshots

<p><img src="https://raw.githubusercontent.com/rakanki911/DLSS5-Swapper/7415065e5c5437441d0e0b0a0362d0ada6d86e15/docs/screenshots/02-games.png" alt="Games" width="100%"></p>
<p><img src="https://raw.githubusercontent.com/rakanki911/DLSS5-Swapper/7415065e5c5437441d0e0b0a0362d0ada6d86e15/docs/screenshots/03-library.png" alt="Library" width="100%"></p>
<p><img src="https://raw.githubusercontent.com/rakanki911/DLSS5-Swapper/7415065e5c5437441d0e0b0a0362d0ada6d86e15/docs/screenshots/04-game.png" alt="Game details" width="100%"></p>
<p><img src="docs/screenshots/07-overlay.png" alt="The Overlay page with the Emerald, Azure and Amethyst themes" width="100%"></p>

## Before installing

- **Anti-cheat:** red warning and optional confirmation, not a blanket block. Injection can cause crashes or account bans; the app never bypasses anti-cheat.
- **Requirements:** Feeder needs Visual C++ runtimes (x64, plus x86 for 32-bit games). Some components download on first use.
- **Compatibility is not guaranteed.** Keep backups; existing mods may conflict. Not every reported game crash is fixed.
- **Linux/Proton:** experimental community source only; no Linux binaries in this release.

## Community and privacy

- Opening the Community page downloads public game reports. A live connection
  count is held only in memory; no connection identifiers are stored.
- A report is sent only after you review and submit the fields shown in its
  dialog: game, route, rendering API, result, optional comment, GPU, driver,
  CPU, OS and app version.
- The app uses a random install ID to prevent duplicate votes. The server stores
  only its hash. **Remove my community activity** hides all your reports and
  replies and resets your public community profile.
- The owner-only administrator access code is verified by the community server
  and stored locally with Windows encrypted storage. It is never written to the
  public profile or the normal community settings file.

## Support

DLSS 5 Swapper is free and MIT licensed. If it saved you an evening of
fiddling, you can buy me a coffee.

<p><a href="https://buymeacoffee.com/rakanki911"><img height="44" src="https://cdn.buymeacoffee.com/buttons/v2/lato-yellow.png" alt="Buy me a coffee"></a></p>

---

Built by **Rakan Alkhaldi** · MIT · [Third-party credits and licences](THIRD_PARTY_NOTICES.md)
