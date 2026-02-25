import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

type HubspotCaptureRecord = {
  source: string;
  endpoint: string;
  payload: unknown;
};

const DEFAULT_CAPTURE_FILE = path.join(
  process.cwd(),
  ".tmp",
  "hubspot-capture.ndjson",
);

export function isHubspotCaptureOnlyEnabled() {
  return process.env.HUBSPOT_CAPTURE_ONLY === "true";
}

export function getHubspotCaptureFilePath() {
  const customPath = process.env.HUBSPOT_CAPTURE_FILE?.trim();
  if (customPath) return customPath;
  return DEFAULT_CAPTURE_FILE;
}

export async function captureHubspotSubmission(record: HubspotCaptureRecord) {
  const filePath = getHubspotCaptureFilePath();
  const line = JSON.stringify({
    capturedAt: new Date().toISOString(),
    ...record,
  });

  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${line}\n`, "utf8");

  return filePath;
}
