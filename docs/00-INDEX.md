# Strategic Foresight Mind Map - Documentation Index

**Master navigation for all project documentation**

Last Updated: February 5, 2025

---

## Quick Links

| Document | Purpose | Audience |
|----------|---------|----------|
| [ROADMAP.md](vision/ROADMAP.md) | Development phases & feature planning | Product/Dev |
| [ARCHITECTURE.md](technical/ARCHITECTURE.md) | System design & technical decisions | Developers |
| [SCRATCHPAD.md](development/SCRATCHPAD.md) | Session continuity & quick reference | All agents |
| [README.md](../README.md) | User-facing project overview | Public |

---

## Documentation Structure

### /vision
**Strategic direction and planning**

- **ROADMAP.md** - Development phases, feature roadmap, milestones

### /technical
**Architecture and implementation details**

- **ARCHITECTURE.md** - System architecture, component map, data flow, technical debt
- **CONTENT_STRUCTURE.md** - Data structure guide for methodologies and media
- **TOUR_DEVELOPMENT.md** - Tour system implementation, camera paths, audio integration

### /development
**Development process and session tracking**

- **SCRATCHPAD.md** - Living development notes, session continuity, quick commands
- **TEST_PLAN.md** - QA strategy, test cases, browser compatibility matrix

### /content
**Content creation and curation**

- **NARRATION_SCRIPTS.md** - Tour narration scripts for all 19 audio segments
- **CUSTOM_DIAGRAMS.md** - Custom SVG diagram specifications and design notes

### /decisions
**Architecture Decision Records (ADRs)**

- **README.md** - ADR template and guidelines
- Individual ADRs documenting significant technical decisions

### /sessions
**Development session logs**

- **README.md** - Session log index and template
- Individual session logs documenting work completed

### /archive
**Historical documentation and completed audits**

#### /archive/qa
- **COMPREHENSIVE_QA_FIXES.md** - QA fixes from November 2024
- **CONTENT_AUDIT_REPORT.md** - Content quality audit
- **BULLETPROOF_AUDIT.md** - Stability audit
- **STABILITY_FIXES.md** - Stability improvements log
- **MEDIA_REVIEW_SUMMARY.md** - Media content review

#### /archive/data
- **MEDIA_AUDIT_REPORT.json** - Structured media audit data

---

## Document Hierarchy

```
Strategic Foresight Mind Map Documentation
│
├── Vision Layer (Why?)
│   └── ROADMAP.md ────────────> What we're building and why
│
├── Technical Layer (How?)
│   ├── ARCHITECTURE.md ───────> System design and structure
│   ├── CONTENT_STRUCTURE.md ──> Data models and schemas
│   └── TOUR_DEVELOPMENT.md ───> Tour system specifics
│
├── Development Layer (Doing)
│   ├── SCRATCHPAD.md ─────────> Active session state
│   └── TEST_PLAN.md ──────────> Quality assurance
│
├── Content Layer (Creating)
│   ├── NARRATION_SCRIPTS.md ──> Audio content
│   └── CUSTOM_DIAGRAMS.md ────> Visual content
│
├── Decision Layer (Choices)
│   └── ADRs ──────────────────> Why we chose what we chose
│
└── Archive Layer (History)
    ├── qa/ ───────────────────> Past QA work
    └── data/ ─────────────────> Structured audit data
```

---

## For New Team Members

Start here:

1. **README.md** (project root) - Understand what this project is
2. **vision/ROADMAP.md** - See where we're going
3. **development/SCRATCHPAD.md** - Current status and quick commands
4. **technical/ARCHITECTURE.md** - How it all works

---

## For AI Agents

### Starting a New Session
1. Read **development/SCRATCHPAD.md** first
2. Check git status and recent commits
3. Review "In Progress / Next Up" section
4. Pick a task or ask for guidance

### Ending a Session
1. Update **development/SCRATCHPAD.md** with:
   - What was completed
   - What's next
   - Any new blockers or decisions
   - Updated "Last Session" metadata
2. Consider creating a session log in **sessions/**
3. If you made a significant technical decision, create an ADR in **decisions/**

### Creating New Documentation
- **Vision documents** → vision/
- **Technical specs** → technical/
- **Session logs** → sessions/
- **ADRs** → decisions/
- **Content specs** → content/
- **Completed audits** → archive/qa/
- **Structured data** → archive/data/

---

## Maintenance

### This Index
Update this index when:
- New directories are added to /docs
- New major documents are created
- Document purposes change significantly
- Navigation patterns need clarification

### Overall Documentation
- Review quarterly for accuracy
- Archive outdated materials to /archive
- Keep SCRATCHPAD.md current at end of each session
- Create ADRs for all significant technical decisions

---

**Documentation Principles**

1. **Clarity Above All** - Every document has a clear purpose and audience
2. **Structured Thinking** - Consistent templates and frameworks
3. **Version Control** - Track significant changes and update dates
4. **Proactive Documentation** - Document decisions as they happen
5. **Accessibility** - Format for multiple audiences and use cases

---

*This documentation structure was implemented on February 5, 2025 to improve information architecture and reduce cognitive load for all contributors.*
