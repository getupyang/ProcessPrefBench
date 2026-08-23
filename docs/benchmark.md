# Benchmark definition

## Construct

ProcessPrefBench evaluates **cross-task transfer of individual process preferences**. A process preference is a user-specific standard for how recurring work should be performed, rather than a fact about the user. Examples include standards for evidence, depth, analytical focus, procedure, and delivery.

## Evaluation unit

Each case contains a known-relevant source--target pair:

- The **source interaction** contains a correction, prescription, or self-description that supports a reusable process standard.
- The **target task** comes from the same user and does not restate the preference.
- Human construction separately establishes source validity and target applicability.
- One to three **preference atoms** operationalize functional realization on the target.
- A separate **task gate** checks whether the answer remains usable and evidence-bounded.

## Preference score

Each applicable atom is scored on a 0--2 ordinal scale:

- `0`: absent or contradicted;
- `1`: nominal, local, or cosmetic realization; and
- `2`: functional realization that changes the answer's reasoning, organization, conclusion, or delivery.

`N/A` is used only when the atom's trigger is absent from the target or answer. Applicable atom scores are averaged within an answer.

## Task gate

The independent task gate flags severe errors:

- failure to answer the target;
- major factual or entity error;
- fabricated or target-unsupported evidence;
- violation of an explicit hard constraint; or
- a false claim that an external action was executed.

Task failure does not overwrite the preference score. This separation prevents a personalized but unusable answer from counting as success.

## Memory conditions in the paper

The frozen paper evaluation compares:

1. target-only prompting;
2. full source-history prompting;
3. imperative distilled-preference prompting;
4. conditional distilled-preference prompting; and
5. an external-memory condition based on mem0.

All conditions receive the same target-side context and supplied materials. The difference is the memory interface.

## Scope boundary

ProcessPrefBench tests whether a model can apply a known-relevant, human-paired source preference to a target task. It does **not** establish that a system can retrieve the correct preference from a long, heterogeneous history. Retrieval and application should be evaluated separately in future extensions.

## Construction quality gates

A case is retained only when:

- the source supports a reusable process preference;
- the target does not explicitly restate that preference;
- applying the preference should improve the target answer;
- the target can be answered with the supplied material or permitted tools;
- the preference can be expressed as auditable target-specific atoms; and
- privacy and provenance fields can be reviewed before release.
