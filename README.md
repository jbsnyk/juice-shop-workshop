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

There are two ways to see if the Hooks are set up correctly. The first is going to the Terminal within Cursor, clicking output, and changing `Tasks` to `Hooks`. You will see that there are 2 project hooks configured. 

<img width="983" height="265" alt="Screenshot 2026-03-29 at 3 35 01 PM" src="https://github.com/user-attachments/assets/14a9edeb-755d-4169-a4e6-19be03b08e43" />

The second way is going into your `Cursor Settings` > `Hooks`. You will see two hooks configured like the screenshot below. 

<img width="673" height="265" alt="Screenshot 2026-03-29 at 3 37 14 PM" src="https://github.com/user-attachments/assets/15099dd6-e6fa-42c8-b202-9b58080118ee" />


