# ProcessPrefBench data card

## Dataset summary

ProcessPrefBench is an idiographic diagnostic benchmark constructed from longitudinal human--AI interactions. The frozen paper benchmark contains 66 source--target cases derived from three months of use by two adult knowledge workers.

The public data files are not yet included in this camera-ready pre-release. This card documents the intended public interface and the release gates that must be met first.

## Languages

- Original interactions: primarily Chinese, with some English technical material.
- Paper examples and planned public documentation: English translations accompanied by provenance notes where release is permitted.

## Data fields

The planned public export follows `schemas/public-case.schema.json` and contains only the fields required to run and audit the evaluation:

- pseudonymous case and participant identifiers;
- release-cleared source and target content;
- preference atoms and score definitions;
- task-gate criteria;
- evaluation metadata needed for stratified analysis; and
- release and provenance metadata that do not expose private locations or identities.

## Collection and annotation

Source interactions are naturalistic product traces rather than conversations elicited for the benchmark. Preference owners judge whether their own words support a reusable standard and separately judge whether that standard should affect a later target. Rubrics are source-anchored and target-specific.

## Intended uses

- Evaluate whether memory interfaces improve functional realization of process preferences.
- Audit trade-offs between preference realization and task validity.
- Study construction, annotation, and evaluation methods for idiographic benchmarks.
- Provide a schema and protocol that other researchers can instantiate on separately consented data.

## Out-of-scope uses

- Population-level claims about user preferences.
- Claims that a system retrieves relevant memories from long histories.
- Psychological profiling or inference beyond the released task construct.
- Identification of participants or reconstruction of their private work histories.
- Training on the benchmark test cases and then reporting results on the same cases without disclosure.

## Known limitations

- Two participants and an imbalanced per-user case distribution.
- Concentration in research, sensemaking, and decision tasks.
- Repeated sources and targets across some cases.
- Human-paired relevant sources rather than long-history retrieval.
- LLM-based preference and task judging, with a separate human-validation study.
- Some original interaction model versions were not logged.

## Privacy and release

The internal research data contain raw trajectories, local identifiers, private URLs, and other fields that are not part of the public interface. Public release is blocked until participant consent, item-level privacy review, and redistribution-rights review are complete. Gating access, if used, will not substitute for de-identification.

## License

No license is currently granted for the unreleased benchmark data. See `DATA_LICENSE.md`.
