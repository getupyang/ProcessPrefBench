# Evaluation interface

The executable paper-reproduction harness is being prepared for release.

The public interface will accept:

- benchmark cases conforming to `schemas/public-case.schema.json`;
- model answers keyed by case, model, condition, and generation index;
- preference-judge votes keyed by atom; and
- task-gate votes keyed by answer.

It will produce:

- per-answer preference scores;
- task-failure and fabricated-evidence flags;
- model-by-condition summaries;
- paired comparison tables; and
- the frozen tables and figures reported in the paper.

The harness will stop on malformed structured output rather than silently dropping failed cells.
