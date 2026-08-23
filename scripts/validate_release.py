#!/usr/bin/env python3
"""Validate the public release skeleton without third-party dependencies."""

from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = (
    "README.md",
    "RELEASE_STATUS.md",
    "DATA_LICENSE.md",
    "CITATION.cff",
    "LICENSE",
    "docs/benchmark.md",
    "docs/data-card.md",
    "docs/privacy-and-ethics.md",
    "schemas/public-case.schema.json",
    "examples/synthetic-demo-case.json",
)

REQUIRED_CASE_FIELDS = (
    "benchmark_version",
    "case_id",
    "language",
    "participant_alias",
    "source",
    "target",
    "preference_atoms",
    "task_gate",
    "metadata",
    "release",
)

SCAN_DIRS = ("data", "examples", "prompts", "schemas")
FORBIDDEN_MARKERS = (
    "/Users/",
    "/home/",
    "localhost:",
    "127.0.0.1",
    ".knowledge-base-extension",
    "comments.db",
    "BEGIN OPENSSH PRIVATE KEY",
    "sk-proj-",
)


def fail(message: str) -> None:
    print(f"FAIL: {message}", file=sys.stderr)
    raise SystemExit(1)


def main() -> None:
    missing = [path for path in REQUIRED_FILES if not (ROOT / path).is_file()]
    if missing:
        fail(f"missing required files: {', '.join(missing)}")

    schema_path = ROOT / "schemas/public-case.schema.json"
    example_path = ROOT / "examples/synthetic-demo-case.json"
    try:
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
        example = json.loads(example_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        fail(f"invalid JSON: {exc}")

    schema_required = tuple(schema.get("required", ()))
    if schema_required != REQUIRED_CASE_FIELDS:
        fail("schema required fields do not match the public release contract")

    missing_case_fields = [field for field in REQUIRED_CASE_FIELDS if field not in example]
    if missing_case_fields:
        fail(f"synthetic case misses fields: {', '.join(missing_case_fields)}")

    if example.get("release", {}).get("content_origin") != "synthetic":
        fail("the public demo must remain fully synthetic")

    findings: list[str] = []
    for directory in SCAN_DIRS:
        for path in sorted((ROOT / directory).rglob("*")):
            if not path.is_file():
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
            for marker in FORBIDDEN_MARKERS:
                if marker in text:
                    findings.append(f"{path.relative_to(ROOT)}: {marker}")

    if findings:
        fail("private or secret markers found:\n  " + "\n  ".join(findings))

    print("PASS: release skeleton, JSON interface, and privacy marker scan")


if __name__ == "__main__":
    main()
