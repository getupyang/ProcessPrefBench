# ProcessPrefBench

Official repository for **ProcessPrefBench: Evaluating Cross-Task Transfer of Individual Process Preferences from Naturalistic Human--AI Interaction**.

ProcessPrefBench studies whether a language model can transfer a user's recurring process preferences across tasks. These preferences concern *how* work should be performed: what evidence is acceptable, how deeply a source should be explained, which analytical lens should organize an answer, and whether a requested artifact is actually delivered.

## What the benchmark measures

Each case links:

1. a **source interaction** that supports a reusable process preference;
2. a later **target task** from the same user that does not restate that preference;
3. one to three target-specific **preference atoms**, scored from 0 to 2; and
4. an independent **task gate** for severe errors such as fabricated evidence or failure to answer the task.

The benchmark evaluates preference **application from a known-relevant, human-paired source**. It does not evaluate retrieval of the relevant source from a long, heterogeneous interaction history.

## Paper snapshot

The paper studies 66 source--target cases from three months of natural interactions with two knowledge workers. Three language models are evaluated under target-only, full-history, distilled-preference, and external-memory conditions.

Under the benchmark judges, full-history and imperative distilled-preference prompting improve preference realization over target-only prompting by 0.204 and 0.244 points, respectively, on a 0--2 scale. Fabricated-evidence flags also increase from 5.8% under target-only prompting to 10.1% with full history and 10.4% with imperative prompting. These values describe the frozen paper evaluation; they are not population-level estimates.

## Release status

This repository is currently a **camera-ready public artifact pre-release**.

| Artifact | Status |
|---|---|
| Benchmark definition and scope | Available |
| Public case schema | Available |
| Fully synthetic demo case | Available |
| Privacy and ethics documentation | Available |
| Generation and evaluation prompts | Preparing for release |
| Evaluation and aggregation code | Preparing for release |
| De-identified benchmark cases | Item-level privacy review in progress |
| Raw interaction histories and identity mappings | Not distributed |

See [RELEASE_STATUS.md](RELEASE_STATUS.md) for the artifact-level release contract.

## Quick check

The repository currently ships a standard-library validation command:

```bash
python3 scripts/validate_release.py
```

It validates the public schema and synthetic example, checks required release files, and scans data-bearing directories for common private-path and local-database markers.

## Repository layout

```text
docs/        Benchmark, data-card, privacy, and ethics documentation
schemas/     Public case interface
examples/    Fully synthetic examples only
prompts/     Release status for generation and judging prompts
evaluation/  Evaluation interface and forthcoming executable harness
data/        Data release status; no raw histories are stored here
scripts/     Public-release validation utilities
```

## Citation

Citation metadata is provided in [CITATION.cff](CITATION.cff). The final ACL Anthology and/or arXiv record will be added when available.

## Licenses

- Code in this repository is licensed under the [Apache License 2.0](LICENSE).
- Documentation may be reused with attribution.
- No license is currently granted for the unreleased benchmark data. See [DATA_LICENSE.md](DATA_LICENSE.md).

## Authors

Yiwen Yang and Guanming Liu.
