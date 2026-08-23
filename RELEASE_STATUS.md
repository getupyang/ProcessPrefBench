# Release status

Last updated: 2026-08-23

This document is the authoritative public inventory for the ProcessPrefBench artifact. It distinguishes what is available now from what is planned and what will not be distributed.

## Available in the camera-ready pre-release

- Task and scope definition.
- Source--target construction protocol.
- Preference-atom and task-gate evaluation interface.
- Public JSON schema.
- One fully synthetic demonstration case.
- Privacy, ethics, and data-card documentation.
- Citation metadata and a code license.
- A release validation script.

## Preparing for release

- Frozen generation prompts and decoding configuration.
- Preference-judge and task-gate prompts.
- Generation, judging, aggregation, and confidence-interval code.
- De-identified per-answer outputs and judge votes needed to audit the paper tables.

Every file in this group must pass a private-path, secret, provenance, and content review before publication.

## Data release under item-level review

The paper benchmark contains 66 source--target cases derived from naturalistic interaction logs. A public export will contain only the fields required to run and audit the benchmark. It will not be produced by copying the internal research JSON files.

Release gates include:

1. confirmation of the relevant participant consent;
2. item-level review of source, target, rubric, model-output, and judge-rationale text;
3. removal of names, private URLs, local identifiers, local paths, and re-identifying context;
4. review of third-party excerpts and redistribution rights; and
5. validation against the public schema.

## Not distributed

- Raw SQLite databases or full private interaction histories.
- Private URLs, identity maps, local comment IDs, or local file paths.
- Signed consent records or contact information.
- API keys, provider credentials, internal answer keys, or unfinished blind-review mappings.
- Items that have not passed participant and privacy review.

## Versioning plan

- `v0.1.0`: camera-ready public artifact skeleton.
- `v0.2.0`: executable prompts and evaluation harness.
- `v1.0.0`: frozen, documented, de-identified paper-reproduction release.

The repository README and this file will be updated whenever release scope changes.
