# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the Strategic Foresight Mind Map project.

---

## What is an ADR?

An Architecture Decision Record captures an important architectural decision made along with its context and consequences. It provides a historical trail of why certain choices were made, helping future developers understand the reasoning behind technical decisions.

---

## When to Create an ADR

Create an ADR when you make a decision that:

- Affects the overall architecture or technical direction
- Has significant impact on development or user experience
- Involves trade-offs between multiple viable options
- Changes a previous decision or pattern
- Requires explanation for future maintainers
- Resolves ambiguity in requirements or implementation

**Examples of ADR-worthy decisions:**
- Choosing between React and Vue for the UI framework
- Deciding to use Three.js instead of Babylon.js for 3D rendering
- Switching from OrbitControls to custom camera implementation
- Adopting lazy loading pattern for large components
- Selecting ElevenLabs over other TTS providers

**Not ADR-worthy:**
- Small refactorings that don't change architecture
- Bug fixes (unless they reveal architectural issues)
- Routine dependency updates
- Minor UI tweaks

---

## ADR Template

Use this template for all ADRs:

```markdown
# ADR-XXX: [Decision Title]

**Status**: [Proposed | Accepted | Deprecated | Superseded]

**Date**: YYYY-MM-DD

**Deciders**: [List of people/agents involved]

**Tags**: [technical | content | performance | ux | infrastructure]

---

## Context

What is the issue we're facing? What factors are driving this decision?

- Background information
- Current situation
- Problem statement
- Constraints and requirements

## Decision

What did we decide to do?

- Clear statement of the decision
- Key components or changes
- Scope of impact

## Options Considered

What alternatives did we evaluate?

### Option 1: [Name]
- **Pros**:
- **Cons**:
- **Verdict**:

### Option 2: [Name]
- **Pros**:
- **Cons**:
- **Verdict**:

### Option 3: [Name] (Chosen)
- **Pros**:
- **Cons**:
- **Verdict**: Why this was selected

## Consequences

What are the results of this decision?

### Positive
- Benefits gained
- Problems solved
- Improvements made

### Negative
- Trade-offs accepted
- Technical debt incurred
- Limitations introduced

### Neutral
- Changes that are neither clearly positive nor negative
- Areas requiring ongoing monitoring

## Implementation Notes

How should this decision be implemented?

- Key implementation steps
- Files or components affected
- Migration path (if applicable)
- Testing requirements

## References

- Links to related discussions
- Relevant documentation
- External resources
- Related ADRs

---

**Review Date**: [Optional: When this decision should be reviewed]
```

---

## Naming Convention

ADRs should be named:

```
ADR-001-descriptive-kebab-case-title.md
```

**Examples:**
- `ADR-001-use-threejs-for-3d-rendering.md`
- `ADR-002-custom-camera-instead-of-orbit-controls.md`
- `ADR-003-lazy-loading-large-components.md`
- `ADR-004-elevenlabs-for-narration-audio.md`

---

## ADR Statuses

- **Proposed**: Decision is under consideration, not yet finalized
- **Accepted**: Decision has been made and is being implemented
- **Deprecated**: Decision is no longer relevant or has been replaced
- **Superseded**: Decision has been replaced by a newer ADR (link to new ADR)

---

## Maintaining ADRs

### Creating a New ADR

1. Copy the template above
2. Assign the next sequential number
3. Fill in all sections with clear, concise information
4. Save in `/docs/decisions/`
5. Update this README's index (below)
6. Commit with message: `docs: Add ADR-XXX [title]`

### Updating an Existing ADR

- ADRs should generally be immutable once accepted
- If a decision changes, create a new ADR that supersedes the old one
- Update the old ADR's status to "Superseded by ADR-XXX"
- Add a note at the top linking to the new ADR

### Reviewing ADRs

- Review ADRs quarterly or when major changes occur
- Check if decisions are still valid
- Update status if needed
- Archive deprecated ADRs to `/docs/archive/decisions/`

---

## ADR Index

### Active ADRs

*No ADRs created yet. This section will be populated as decisions are documented.*

### Superseded ADRs

*None yet.*

### Deprecated ADRs

*None yet.*

---

## Historical Decisions (Pre-ADR)

The following significant decisions were made before the ADR process was established. These are documented in **development/SCRATCHPAD.md** under "Recent Decisions":

- **2025-12-05**: Content Richness Overhaul - Surface all media items prominently
- **2025-12-05**: Tab-Based Info Panels - Replace scroll with 4-tab system
- **2025-12-05**: TTS Audio Generation - Use Mac `say` command as placeholder
- **2025-11-22**: Tour Auto-Opening Nodes - Nodes auto-expand during tour
- **2025-11-22**: Changed "SKIP" to "NEXT" - Better UX language for tour controls

Consider formalizing these as retrospective ADRs if they need deeper explanation.

---

## Resources

- [Architecture Decision Records in Practice](https://adr.github.io/)
- [Why Write ADRs](https://github.blog/2020-08-13-why-write-adrs/)
- [ADR Tools](https://github.com/npryce/adr-tools)

---

**Last Updated**: February 5, 2025
