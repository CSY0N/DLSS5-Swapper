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

## Download 2.2.1

[**Windows Installer**](https://github.com/rakanki911/DLSS5-Swapper/releases/download/v2.2.1/DLSS5-Swapper-Setup-2.2.1.exe) ·
[**Portable**](https://github.com/rakanki911/DLSS5-Swapper/releases/download/v2.2.1/DLSS5-Swapper-2.2.1-portable.exe) ·
[Checksums](https://github.com/rakanki911/DLSS5-Swapper/releases/download/v2.2.1/SHA256SUMS.txt)

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
- **In-game overlay:** press **F8** to open the app's own panel over the running game and move the real DLSS Neural Rendering sliders while you play. Supports the **DLSS5-Feeder** and **RenoDX v4.7** routes only.
- **Rendering API override:** optional, per game, with **Automatic** as the default; detection is never overwritten.
- **Custom add-ons:** the Add-ons page remains available alongside the integrated installation routes.

## New in 2.2.1

- **⭐ In-game overlay:** press **F8** and the app's own panel appears over the
  running game — the same HTML, fonts and sliders as the preview, connected to
  the pinned RenoDX v4.7 build so the controls move the settings that are really
  loaded. **While the panel is open the game receives no mouse or keyboard
  input**, so the camera holds still and a slider can be judged on one fixed
  shot, exactly as ReShade does for its own overlay. Install it together with
  DLSS from one switch, choose your hotkey, or remove it on its own.
  **It supports DLSS5-Feeder and RenoDX v4.7 only** — the panel is built around
  that exact, hash-verified build and is not offered for OptiScaler.
- **Overlay themes, including your own:** Emerald, Azure and Amethyst, plus
  **Create theme** — pick an accent colour and the panel's other shades are
  derived from it, in the app and in the game alike.
- **Per-game rendering API override:** now **optional**, with **Automatic** as
  the default. Pick DirectX 8/9/10/11/12, Vulkan or OpenGL for a game that
  reports the wrong renderer; automatic detection is left untouched.
- **Artwork for everyone:** posters and banners come from Steam's public
  endpoints with no key, so every user sees the same covers and heroes.
- **Some issues were fixed**, including the overlay connection line that
  contradicted the CONNECTED badge, dialogs that stayed dark in the light theme,
  theme cards misaligned in Arabic/Persian/Urdu, and an updated overlay build
  that refused to install over the previous one.

[Full 2.2.1 notes →](https://github.com/rakanki911/DLSS5-Swapper/releases/tag/v2.2.1) ·
[What arrived in 2.2.0 →](docs/releases/v2.2.0.md)

### The Overlay page

<p><img src="docs/screenshots/07-overlay.png" alt="Overlay page with the Emerald, Azure and Amethyst themes" width="100%"></p>

### Create your own theme

Pick an accent colour and the panel's other shades follow it. The preview is the
real panel, not a colour swatch.

<p><img src="docs/screenshots/08-overlay-create-theme.png" alt="Create a theme dialog with a live panel preview" width="100%"></p>

### Preview before you choose

<p><img src="docs/screenshots/09-overlay-preview.png" alt="Interactive overlay preview" width="100%"></p>

## Compatibility

| Category | Support |
| --- | --- |
| **System** | Windows 10/11 x64; compatible 32-bit and 64-bit games |
| **ReShade / Feeder GPUs** | RTX 20 / 30 / 40 / 50; older-series support is reported by the bundled modified runtime's author |
| **OptiScaler GPUs** | RTX 50 only, 64-bit games with native DLSS enabled; NVIDIA driver **616.56+** recommended |
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

## Before installing

- **Anti-cheat:** red warning and optional confirmation, not a blanket block. Injection can cause crashes or account bans; the app never bypasses anti-cheat.
- **Requirements:** Feeder needs Visual C++ runtimes (x64, plus x86 for 32-bit games). Some components download on first use.
- **Compatibility is not guaranteed.** Keep backups; existing mods may conflict. Not every reported game crash is fixed.
- **Linux/Proton:** experimental community source only; no Linux binaries in this release.

## Support

DLSS 5 Swapper is free and MIT licensed. If it saved you an evening of
fiddling, you can buy me a coffee.

<p><a href="https://buymeacoffee.com/rakanki911"><img height="44" src="https://cdn.buymeacoffee.com/buttons/v2/lato-yellow.png" alt="Buy me a coffee"></a></p>

---

Built by **Rakan Alkhaldi** · MIT · [Third-party credits and licences](THIRD_PARTY_NOTICES.md)
