*[original Juice Shop readme](./JUICESHOP_README.md)*

# Snyk Juice Shop - Cursor Async CLI Hooks

Automatically scans for security vulnerabilities as the agent writes code. Runs `snyk code test` via CLIin the background, tracks which lines the agent modified, and blocks the agent from finishing if it introduced new vulnerabilities -- prompting it to fix them first.

## Features
- **Background SAST scanning**: Launches `snyk code test` in the background on every file edit 
-- non-blocking, the agent keeps working
- **New-only filtering**: Tracks which lines the agent modified and filters scan results to only 
report vulnerabilities on those lines
- **Automatic fix loop**: When new vulnerabilities are found, the agent is blocked from stopping and 
given a detailed vuln table to fix. After fixing, the cycle repeats until clean
- **Per-file state management**: Clean files are removed from tracking; only files with unresolved 
vulns stay tracked
- **MCP fallback**: If the CLI scan times out, falls back to prompting the agent to use the 
`snyk_code_scan` MCP tool
- **Manifest tracking**: Detects changes to dependency manifests (package.json, requirements.txt, 
etc.) and prompts for SCA scanning
- **Loop prevention**: Caps scan-fix cycles at 3 to prevent infinite loops
- **Stale scan detection**: Re-scans automatically if edits happen after the running scan started

## Setup and Files

These files are already included in this branch, `cursor-async-cli-hooks`. If you want to see the files that were added, you can do so by going to the directory mentioned below:
 
 ```
.cursor/hooks/
├── snyk_secure_at_inception.py   # Entry point, line tracking, vuln filtering
└── lib/
    ├── scan_runner.py            # Scan lifecycle, SARIF parsing
    └── scan_worker.py            # Background subprocess
```
The only think you will need to do is run `chmod +x .cursor/hooks/snyk_secure_at_inception.py`

# How to Know Cursor Hook are Set Up Correctly


