# Privacy and ethics

ProcessPrefBench is built from naturalistic human--AI interactions. This makes privacy protection part of the benchmark construction protocol, not a post-processing convenience.

## Release principles

1. **Data minimization.** Release only what is required to run and audit the benchmark.
2. **Item-level review.** Review source, target, rubric, model output, and judge rationale together because private details can be repeated downstream.
3. **Consent-bound use.** Release only participant material covered by the documented consent scope.
4. **No identity reconstruction.** Remove direct identifiers and contextual combinations that make a participant, employer, project, or private document recognizable.
5. **Separate licenses.** A code license does not grant rights to participant text, third-party excerpts, annotations, or model outputs.
6. **Versioned corrections.** Maintain a public changelog and remove affected items from future releases when a valid privacy or rights issue is identified.

## Content that is never part of the public release

- Signed consent records and contact information.
- Raw databases and full interaction histories.
- Private URLs, local paths, local database identifiers, and identity maps.
- Credentials, API keys, and internal operational logs.
- Unfinished blind-review answer keys or condition mappings.

## De-identification is more than string replacement

Names and URLs are only the first layer. Reviewers must also check whether a combination of employer, project, date, location, quoted text, and task context can re-identify a participant. Translation and paraphrase may reduce exposure, but they must preserve the construct being evaluated and must be documented.

## Third-party material

Public webpages may still contain copyrighted text. The public export should retain only the minimum excerpt needed to make the target answerable, link to an external public source when appropriate, or replace the material with a release-cleared summary. Private or session-bound URLs are never included.

## Model outputs and judge rationales

Generated text can repeat private source content. Every output and judge rationale included in a reproduction bundle must pass the same item-level review as human-authored text. Provider redistribution terms must also be checked before a data license is assigned.

## Gated access

Gated hosting can record users and require agreement to terms, but it is not anonymization. Material that is unsafe to disclose publicly must not be treated as safe merely because access requires a click-through request.
