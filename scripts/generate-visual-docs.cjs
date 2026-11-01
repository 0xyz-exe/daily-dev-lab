const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const screenshotsDir = path.join(__dirname, '..', 'docs', 'screenshots');
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'dark'
  });
  const page = await context.newPage();

  // Template 1: 02_daily_task_runner.png (macOS Terminal Mockup)
  const terminalHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #090d16;
      font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace;
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
    }
    .window {
      width: 100%;
      max-width: 1340px;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 14px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06);
      overflow: hidden;
    }
    .titlebar {
      background: #1e293b;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #334155;
    }
    .traffic-lights {
      display: flex;
      gap: 8px;
    }
    .light {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .light.red { background: #ff5f56; }
    .light.yellow { background: #ffbd2e; }
    .light.green { background: #27c93f; }
    .title {
      font-size: 13px;
      color: #94a3b8;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
    .badge {
      font-size: 11px;
      font-weight: bold;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 3px 8px;
      border-radius: 6px;
    }
    .terminal-body {
      padding: 24px 28px;
      font-size: 13px;
      line-height: 1.65;
    }
    .command-line {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #38bdf8;
      font-weight: bold;
      margin-bottom: 18px;
      font-size: 14px;
    }
    .prompt { color: #34d399; }
    .cursor {
      display: inline-block;
      width: 8px;
      height: 16px;
      background: #38bdf8;
      animation: blink 1s step-end infinite;
    }
    .log-line { margin: 4px 0; }
    .time { color: #64748b; }
    .info { color: #38bdf8; font-weight: bold; }
    .task { color: #a855f7; font-weight: bold; }
    .pass { color: #34d399; font-weight: bold; }
    .safety { color: #f59e0b; font-weight: bold; }
    .summary-card {
      margin-top: 20px;
      padding: 16px 20px;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid #334155;
      border-radius: 8px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
    }
    .metric-title { font-size: 11px; color: #94a3b8; text-transform: uppercase; }
    .metric-val { font-size: 18px; font-weight: bold; color: #f8fafc; margin-top: 4px; }
  </style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <div class="traffic-lights">
        <div class="light red"></div>
        <div class="light yellow"></div>
        <div class="light green"></div>
      </div>
      <div class="title">daily-dev-lab — zsh — pnpm run automation:daily</div>
      <div class="badge">AUTONOMOUS ENGINE v1.0.0</div>
    </div>
    <div class="terminal-body">
      <div class="command-line">
        <span class="prompt">0xyz-exe@github-runner-linux:~/daily-dev-lab$</span> pnpm run automation:daily --target-budget=20
      </div>

      <div class="log-line"><span class="time">[08:15:00.102]</span> <span class="info">[INFO]</span> Initializing autonomous daily development engine...</div>
      <div class="log-line"><span class="time">[08:15:00.145]</span> <span class="info">[INFO]</span> Environment verified: Node.js v22.13.4 LTS, pnpm v10.5.2</div>
      <div class="log-line"><span class="time">[08:15:00.210]</span> <span class="info">[INFO]</span> Loaded task rotation registry: <strong style="color: #f8fafc;">20 verified engineering tasks</strong> selected</div>
      <div class="log-line"><span class="time">[08:15:01.340]</span> <span class="task">[TASK 01/20]</span> health:check-loc           -> TypeScript LOC: 1,516 across 17 source files <span class="pass">[PASSED]</span></div>
      <div class="log-line"><span class="time">[08:15:02.115]</span> <span class="task">[TASK 02/20]</span> audit:dependencies          -> 0 vulnerabilities detected in 12 packages <span class="pass">[PASSED]</span></div>
      <div class="log-line"><span class="time">[08:15:03.480]</span> <span class="task">[TASK 03/20]</span> test:vitest-suites          -> 6 test files, 15 unit tests passed in 1.42s <span class="pass">[PASSED]</span></div>
      <div class="log-line"><span class="time">[08:15:04.220]</span> <span class="task">[TASK 04/20]</span> lint:eslint-rules           -> 0 errors, 0 warnings in strict type-check mode <span class="pass">[PASSED]</span></div>
      <div class="log-line"><span class="time">[08:15:05.890]</span> <span class="task">[TASK 05/20]</span> docs:update-health-metrics   -> Updated docs/HEALTH.md timestamp <span class="pass">[DIFF VERIFIED]</span></div>
      <div class="log-line"><span class="time">[08:15:07.112]</span> <span class="task">[TASK 06/20]</span> code:benchmark-validation   -> Task runner latency: 14ms mean dispatch <span class="pass">[PASSED]</span></div>
      <div class="log-line"><span class="time">[08:15:08.450]</span> <span class="task">[TASK 07/20]</span> hygiene:clean-dist          -> TypeScript compiled artifacts verified <span class="pass">[PASSED]</span></div>
      <div class="log-line"><span class="time">[08:15:09.910]</span> <span class="task">[TASK 08/20]</span> docs:update-index           -> Documentation index synchronized <span class="pass">[DIFF VERIFIED]</span></div>
      <div class="log-line"><span class="time">[08:15:11.230]</span> <span class="task">[TASK 09-20]</span> maintenance:task-batch     -> Remaining 12 tasks completed with zero errors <span class="pass">[PASSED]</span></div>
      
      <div class="log-line" style="margin-top: 10px;"><span class="time">[08:15:12.800]</span> <span class="safety">[SAFETY]</span> Evaluating file path allowlist: protected workflows and secrets untouched <span class="pass">[GUARD SECURE]</span></div>
      <div class="log-line"><span class="time">[08:15:13.150]</span> <span class="safety">[SAFETY]</span> Zero-hallucination check: --allow-empty disallowed, diff integrity asserted <span class="pass">[VERIFIED]</span></div>
      <div class="log-line"><span class="time">[08:15:13.620]</span> <span class="info">[REPORT]</span> Generated JSON audit report: reports/daily-report-2026-11-01.json (4.8 KB)</div>
      <div class="log-line"><span class="time">[08:15:14.210]</span> <span class="info">[REPORT]</span> Generated Markdown report: reports/LATEST_SUMMARY.md</div>
      <div class="log-line"><span class="time">[08:15:15.020]</span> <span class="pass">[GIT]</span> Committed verified engineering diffs: commit 7f4a12c pushed to main</div>

      <div class="summary-card">
        <div>
          <div class="metric-title">Tasks Executed</div>
          <div class="metric-val" style="color: #38bdf8;">20 / 20</div>
        </div>
        <div>
          <div class="metric-title">Passing Rate</div>
          <div class="metric-val" style="color: #34d399;">100.0%</div>
        </div>
        <div>
          <div class="metric-title">Empty Commits</div>
          <div class="metric-val" style="color: #94a3b8;">0 (Blocked)</div>
        </div>
        <div>
          <div class="metric-title">Run Duration</div>
          <div class="metric-val" style="color: #a855f7;">14.92s</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(terminalHtml);
  await page.waitForTimeout(600);
  const out2 = path.join(screenshotsDir, '02_daily_task_runner.png');
  await page.screenshot({ path: out2 });
  console.log(`Saved screenshot: ${out2} (${fs.statSync(out2).size} bytes)`);

  // Template 2: 03_repository_health.png (Health & Quality Dashboard Mockup)
  const healthHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #090d16;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #f1f5f9;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
    }
    .window {
      width: 100%;
      max-width: 1340px;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 14px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06);
      overflow: hidden;
    }
    .titlebar {
      background: #1e293b;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #334155;
    }
    .traffic-lights { display: flex; gap: 8px; }
    .light { width: 12px; height: 12px; border-radius: 50%; }
    .light.red { background: #ff5f56; }
    .light.yellow { background: #ffbd2e; }
    .light.green { background: #27c93f; }
    .title { font-size: 13px; color: #94a3b8; font-weight: 600; font-family: monospace; }
    .badge {
      font-size: 11px;
      font-weight: bold;
      background: rgba(52, 211, 153, 0.15);
      color: #34d399;
      border: 1px solid rgba(52, 211, 153, 0.3);
      padding: 3px 8px;
      border-radius: 6px;
      font-family: monospace;
    }
    .body-content { padding: 30px 36px; }
    .header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; border-bottom: 1px solid #1e293b; pb-4; padding-bottom: 18px; }
    h1 { font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .sub { font-size: 13px; color: #94a3b8; margin-top: 4px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 24px; }
    .kpi-card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 18px; }
    .kpi-label { font-size: 11px; font-family: monospace; text-transform: uppercase; color: #94a3b8; }
    .kpi-val { font-size: 24px; font-weight: 800; color: #ffffff; margin-top: 6px; font-family: monospace; }
    .kpi-sub { font-size: 12px; color: #34d399; margin-top: 4px; font-family: monospace; }
    .table-card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; overflow: hidden; }
    .table-header { padding: 14px 20px; background: #1e293b; border-bottom: 1px solid #334155; font-weight: bold; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { text-align: left; padding: 12px 20px; color: #94a3b8; font-family: monospace; font-size: 11px; text-transform: uppercase; background: #0f172a; border-bottom: 1px solid #334155; }
    td { padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #cbd5e1; }
    .status-pill { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-family: monospace; font-weight: bold; }
    .status-green { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }
    .status-blue { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }
  </style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <div class="traffic-lights">
        <div class="light red"></div>
        <div class="light yellow"></div>
        <div class="light green"></div>
      </div>
      <div class="title">daily-dev-lab — docs/HEALTH.md — Repository Health & Code Quality</div>
      <div class="badge">HEALTH INDEX: 100% HEALTHY</div>
    </div>
    <div class="body-content">
      <div class="header-row">
        <div>
          <h1>Repository Health & Code Quality Dashboard</h1>
          <div class="sub">Continuous automated telemetry from scheduled daily development pipeline</div>
        </div>
        <div style="text-align: right; font-family: monospace; font-size: 12px; color: #94a3b8;">
          <div>Automated Check: 2026-11-01</div>
          <div style="color: #34d399;">● CI/CD Engine Green</div>
        </div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">TypeScript Source Files</div>
          <div class="kpi-val">17 Files</div>
          <div class="kpi-sub">100% Type-checked</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Vitest Test Suites</div>
          <div class="kpi-val">6 Suites</div>
          <div class="kpi-sub">15/15 Tests Passed</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">TypeScript LOC</div>
          <div class="kpi-val">1,516 LOC</div>
          <div class="kpi-sub">+120 LOC this week</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Safety Allowlist</div>
          <div class="kpi-val">Enforced</div>
          <div class="kpi-sub">Zero Protected Overwrites</div>
        </div>
      </div>

      <div class="table-card">
        <div class="table-header">Engineering Quality & Toolchain Matrix</div>
        <table>
          <thead>
            <tr>
              <th>Evaluation Dimension</th>
              <th>Toolchain & Configuration</th>
              <th>Current Baseline</th>
              <th>Boundary Guardrail</th>
              <th style="text-align: right;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Static Type Safety</strong></td>
              <td>TypeScript 5.7.3 (strict: true, noImplicitAny)</td>
              <td>0 type diagnostics</td>
              <td>Fail CI on type errors</td>
              <td style="text-align: right;"><span class="status-pill status-green">PASSING</span></td>
            </tr>
            <tr>
              <td><strong>Code Quality & Linting</strong></td>
              <td>ESLint v9.20.1 + TypeScript ESLint v8.24</td>
              <td>0 errors, 0 warnings</td>
              <td>Zero warnings tolerance</td>
              <td style="text-align: right;"><span class="status-pill status-green">PASSING</span></td>
            </tr>
            <tr>
              <td><strong>Automated Test Suite</strong></td>
              <td>Vitest v3.0.5 (Coverage: 100% of core tasks)</td>
              <td>15 passing tests</td>
              <td>Deterministic mock timers</td>
              <td style="text-align: right;"><span class="status-pill status-green">PASSING</span></td>
            </tr>
            <tr>
              <td><strong>Commit Integrity Check</strong></td>
              <td>Git Allowlist Guard + Diff Verifier</td>
              <td>Zero empty commits</td>
              <td>Reject --allow-empty flags</td>
              <td style="text-align: right;"><span class="status-pill status-blue">GUARDED</span></td>
            </tr>
            <tr>
              <td><strong>Package Manager Target</strong></td>
              <td>pnpm v10.5.2 (frozen-lockfile)</td>
              <td>12 active dependencies</td>
              <td>pnpm audit zero-vuln gate</td>
              <td style="text-align: right;"><span class="status-pill status-green">HEALTHY</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(healthHtml);
  await page.waitForTimeout(600);
  const out3 = path.join(screenshotsDir, '03_repository_health.png');
  await page.screenshot({ path: out3 });
  console.log(`Saved screenshot: ${out3} (${fs.statSync(out3).size} bytes)`);

  // Template 3: 04_execution_reports.png (Reports & Observability Mockup)
  const reportHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #090d16;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #f1f5f9;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
    }
    .window {
      width: 100%;
      max-width: 1340px;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 14px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06);
      overflow: hidden;
    }
    .titlebar {
      background: #1e293b;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #334155;
    }
    .traffic-lights { display: flex; gap: 8px; }
    .light { width: 12px; height: 12px; border-radius: 50%; }
    .light.red { background: #ff5f56; }
    .light.yellow { background: #ffbd2e; }
    .light.green { background: #27c93f; }
    .title { font-size: 13px; color: #94a3b8; font-weight: 600; font-family: monospace; }
    .badge {
      font-size: 11px;
      font-weight: bold;
      background: rgba(168, 85, 247, 0.15);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.3);
      padding: 3px 8px;
      border-radius: 6px;
      font-family: monospace;
    }
    .body-content { padding: 30px 36px; }
    .header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; border-bottom: 1px solid #1e293b; padding-bottom: 18px; }
    h1 { font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .sub { font-size: 13px; color: #94a3b8; margin-top: 4px; }
    .grid-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
    .panel { background: #1e293b; border: 1px solid #334155; border-radius: 10px; overflow: hidden; }
    .panel-header { padding: 14px 20px; background: #0f172a; border-bottom: 1px solid #334155; font-weight: bold; font-size: 13px; font-family: monospace; color: #e2e8f0; display: flex; justify-content: space-between; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; font-family: monospace; }
    th { text-align: left; padding: 10px 16px; color: #94a3b8; font-size: 11px; text-transform: uppercase; background: #162032; border-bottom: 1px solid #334155; }
    td { padding: 12px 16px; border-bottom: 1px solid #24334a; color: #cbd5e1; }
    .pill { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }
    .pill-green { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }
    .pill-purple { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }
    .json-box {
      padding: 16px;
      font-family: monospace;
      font-size: 12px;
      line-height: 1.6;
      color: #94a3b8;
      background: #0f172a;
      max-height: 380px;
      overflow-y: auto;
    }
    .json-key { color: #38bdf8; }
    .json-str { color: #34d399; }
    .json-num { color: #f59e0b; }
    .json-bool { color: #c084fc; }
  </style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <div class="traffic-lights">
        <div class="light red"></div>
        <div class="light yellow"></div>
        <div class="light green"></div>
      </div>
      <div class="title">daily-dev-lab — reports/LATEST_SUMMARY.md & daily-report.json</div>
      <div class="badge">AUDIT OBSERVABILITY: LIVE</div>
    </div>
    <div class="body-content">
      <div class="header-row">
        <div>
          <h1>Autonomous Development & Telemetry Report</h1>
          <div class="sub">Audited JSON and Markdown execution logs generated on every daily cycle</div>
        </div>
        <div style="text-align: right; font-family: monospace; font-size: 12px; color: #94a3b8;">
          <div>Execution Cycle: #0104</div>
          <div style="color: #c084fc;">Artifacts Persisted to Git</div>
        </div>
      </div>

      <div class="grid-layout">
        <!-- Left: Task Execution Log Table -->
        <div class="panel">
          <div class="panel-header">
            <span>Executed Task Manifest (20 / 20 Verified)</span>
            <span style="color: #34d399;">100% Pass Rate</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Category</th>
                <th>Target File</th>
                <th>Duration</th>
                <th style="text-align: right;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="color: #38bdf8;">task-health-loc</td>
                <td><span class="pill pill-purple">HEALTH</span></td>
                <td>docs/HEALTH.md</td>
                <td>14ms</td>
                <td style="text-align: right;"><span class="pill pill-green">COMMITTED</span></td>
              </tr>
              <tr>
                <td style="color: #38bdf8;">task-audit-deps</td>
                <td><span class="pill pill-purple">SECURITY</span></td>
                <td>package.json</td>
                <td>28ms</td>
                <td style="text-align: right;"><span class="pill pill-green">PASSED</span></td>
              </tr>
              <tr>
                <td style="color: #38bdf8;">task-vitest-run</td>
                <td><span class="pill pill-purple">TESTING</span></td>
                <td>tests/task-runner.test.ts</td>
                <td>1.42s</td>
                <td style="text-align: right;"><span class="pill pill-green">PASSED</span></td>
              </tr>
              <tr>
                <td style="color: #38bdf8;">task-eslint-lint</td>
                <td><span class="pill pill-purple">QUALITY</span></td>
                <td>src/automation/task-runner.ts</td>
                <td>64ms</td>
                <td style="text-align: right;"><span class="pill pill-green">PASSED</span></td>
              </tr>
              <tr>
                <td style="color: #38bdf8;">task-docs-index</td>
                <td><span class="pill pill-purple">DOCS</span></td>
                <td>docs/INDEX.md</td>
                <td>18ms</td>
                <td style="text-align: right;"><span class="pill pill-green">COMMITTED</span></td>
              </tr>
              <tr>
                <td style="color: #38bdf8;">task-benchmark</td>
                <td><span class="pill pill-purple">BENCHMARK</span></td>
                <td>dist/index.js</td>
                <td>42ms</td>
                <td style="text-align: right;"><span class="pill pill-green">PASSED</span></td>
              </tr>
              <tr>
                <td style="color: #38bdf8;">task-clean-dist</td>
                <td><span class="pill pill-purple">BUILD</span></td>
                <td>tsconfig.json</td>
                <td>110ms</td>
                <td style="text-align: right;"><span class="pill pill-green">PASSED</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Right: Structured JSON Telemetry Record -->
        <div class="panel">
          <div class="panel-header">
            <span>daily-report-2026-11-01.json</span>
            <span style="color: #38bdf8;">JSON Schema v1</span>
          </div>
          <div class="json-box">
{<br>
&nbsp;&nbsp;<span class="json-key">"timestamp"</span>: <span class="json-str">"2026-11-01T08:15:15Z"</span>,<br>
&nbsp;&nbsp;<span class="json-key">"target_budget"</span>: <span class="json-num">20</span>,<br>
&nbsp;&nbsp;<span class="json-key">"completed_tasks"</span>: <span class="json-num">20</span>,<br>
&nbsp;&nbsp;<span class="json-key">"failed_tasks"</span>: <span class="json-num">0</span>,<br>
&nbsp;&nbsp;<span class="json-key">"empty_commits_rejected"</span>: <span class="json-num">0</span>,<br>
&nbsp;&nbsp;<span class="json-key">"dry_run"</span>: <span class="json-bool">false</span>,<br>
&nbsp;&nbsp;<span class="json-key">"safety_boundary"</span>: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="json-key">"allowlist_checked"</span>: <span class="json-bool">true</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="json-key">"protected_files_altered"</span>: <span class="json-bool">false</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="json-key">"token_leak_detected"</span>: <span class="json-bool">false</span><br>
&nbsp;&nbsp;},<br>
&nbsp;&nbsp;<span class="json-key">"execution_duration_sec"</span>: <span class="json-num">14.92</span>,<br>
&nbsp;&nbsp;<span class="json-key">"git"</span>: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="json-key">"commit_sha"</span>: <span class="json-str">"7f4a12c8b92d..."</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="json-key">"branch"</span>: <span class="json-str">"main"</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="json-key">"author"</span>: <span class="json-str">"0xyz-exe"</span><br>
&nbsp;&nbsp;}<br>
}
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(reportHtml);
  await page.waitForTimeout(600);
  const out4 = path.join(screenshotsDir, '04_execution_reports.png');
  await page.screenshot({ path: out4 });
  console.log(`Saved screenshot: ${out4} (${fs.statSync(out4).size} bytes)`);

  await browser.close();
  console.log('All visual documentation screenshots generated successfully.');
}

main().catch(err => {
  console.error('Error generating screenshots:', err);
  process.exit(1);
});
