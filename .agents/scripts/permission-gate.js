/* eslint-disable */
const fs = require('fs');

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf-8');
  } catch (e) {
    return '';
  }
}

function evaluate(payload) {
  if (!payload || !payload.toolCall) {
    return { decision: "allow" };
  }

  const { name, args } = payload.toolCall;
  const toolArgs = args || {};

  // 1. File Inspection / Editing Tools: Deny reading or editing .env files
  if (['view_file', 'write_to_file', 'replace_file_content'].includes(name)) {
    const filePath = toolArgs.AbsolutePath || toolArgs.TargetFile || '';
    if (/(^|[/\\])\.env(\..+)?$/i.test(filePath)) {
      return {
        decision: "deny",
        reason: "Access denied: Reading or editing .env files is strictly forbidden by project security policy."
      };
    }
  }

  // 2. Command Line Execution (run_command)
  if (name === 'run_command') {
    const cmd = (toolArgs.CommandLine || '').trim();

    // Check for attempts to access or modify .env files via shell commands
    if (/(^|[/\s"'\\])\.env(\.[a-zA-Z0-9_\-]+)?(\s|$|["'])/i.test(cmd)) {
      return {
        decision: "deny",
        reason: "Access denied: Commands interacting with .env files are strictly forbidden."
      };
    }

    // Git commit or push commands: require explicit user confirmation
    if (/\bgit\s+(?:commit|push)\b/i.test(cmd)) {
      return {
        decision: "ask",
        reason: "Confirmation required: Git commit and push actions require explicit user approval."
      };
    }

    // Allowed npm commands: dev, build, start, lint
    if (/^\s*npm\s+(?:run\s+)?(dev|build|start|lint)(\s+.*)?$/i.test(cmd)) {
      return {
        decision: "allow",
        reason: "Pre-approved command: npm scripts (dev, build, start, lint) are always allowed."
      };
    }
  }

  // Default: allow other standard operations
  return { decision: "allow" };
}

if (require.main === module) {
  try {
    const inputRaw = readStdin();
    const payload = inputRaw ? JSON.parse(inputRaw) : {};
    const result = evaluate(payload);
    process.stdout.write(JSON.stringify(result));
  } catch (err) {
    // If parsing fails or unhandled, fail-safe to allow
    process.stdout.write(JSON.stringify({ decision: "allow" }));
  }
}

module.exports = { evaluate };
