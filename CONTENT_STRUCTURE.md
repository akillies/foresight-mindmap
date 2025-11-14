# Strategic Foresight Mind Map - Content Structure Guide

## Purpose
This document defines the canonical data structure for methodology content. Follow this structure when enriching content to avoid syntax errors and maintain consistency.

## Methodology Object Structure

```javascript
{
  // === REQUIRED TOP-LEVEL PROPERTIES ===

  id: 'methodology-name',                    // kebab-case identifier
  label: 'Display\nName',                    // \n for line breaks in 3D
  parent: 'parent-pillar-id',                // pillar this belongs to
  description: 'One-line description',       // brief overview
  color: '#HEX',                             // inherited from pillar
  level: 2,                                  // always 2 for methodologies

  yearIntroduced: 1950,                      // year method was created

  pioneers: [                                // array of creator/contributors
    {
      name: 'Pioneer Name',
      role: 'What they did',
      organization: 'Where they worked',
      contribution: 'Specific innovation'
    }
  ],

  historicalContext: 'Brief history...',     // 1-2 sentences on origins

  // === DETAILS OBJECT (method explanation) ===

  details: {
    overview: 'Detailed explanation...',     // 2-3 paragraphs
    components: [                            // key parts/steps (array)
      'Component 1',
      'Component 2',
      'Component 3'
    ],
    application: 'How to use it',            // brief usage note
    creator: 'Name',                         // optional

    // OPTIONAL: Process guide (for enriched content)
    processGuide: {
      title: 'How to Conduct [Method Name]',
      steps: [
        {
          number: 1,
          name: 'Step name',
          description: 'Detailed instructions...',
          timeRequired: '30-60 minutes',
          deliverable: 'What you produce'
        }
        // ... more steps
      ],
      totalTime: '5-7 hours',
      facilitationTips: 'Practical advice...'
    },

    // OPTIONAL: Worked example (for enriched content)
    workedExample: {
      title: 'Example scenario title',
      context: 'Setting and situation',
      // ... example-specific fields
      analysis: 'What the method revealed',
      strategicImplication: 'So what? Now what?'
    }
  },  // ← CLOSE details with comma

  // === OPTIONAL TOP-LEVEL PROPERTIES ===

  wikipedia: 'https://en.wikipedia.org/wiki/...',  // reference link

  relatedMethodologies: [                          // connections to others
    {
      id: 'other-method-id',
      type: 'complements|builds-on|prerequisite',
      description: 'How they relate'
    }
  ],

  caseStudies: [                                   // real-world applications
    {
      title: 'Case study name',
      organization: 'Who used it',
      year: 2015,
      challenge: 'Problem they faced',
      application: 'How they used the method',
      outcome: 'Results achieved',
      insights: 'Lessons learned',
      sourceUrl: 'https://...'  // optional
    }
  ],

  facilitationGuide: {                             // workshop/implementation tips
    workshopSetup: 'Physical setup...',
    groupDynamics: 'How to manage participants...',
    commonChallenges: [
      'Challenge 1 and how to address it',
      'Challenge 2 and how to address it'
    ],
    successIndicators: 'Signs of good facilitation...'
  },

  successCriteria: {                               // quality evaluation
    processQuality: [
      'Indicator 1',
      'Indicator 2'
    ],
    outcomeQuality: [
      'Indicator 1',
      'Indicator 2'
    ]
  },

  comparativeAnalysis: {                           // method comparison
    vsOtherMethod: 'How this differs from X...',
    whenToUse: 'Use this method when...'
  },

  // === REQUIRED CLOSING PROPERTIES ===

  metadata: {                                      // practical guidance
    difficulty: 'beginner|intermediate|advanced',
    timeRequired: '2-4 hours',
    groupSize: 'individual|small|large groups',
    bestFor: [
      'Use case 1',
      'Use case 2'
    ],
    sectors: [
      'Industry 1',
      'Industry 2'
    ],
    commonPitfalls: [
      'Pitfall 1',
      'Pitfall 2'
    ]
  },

  media: [                                         // curated resources
    {
      type: 'video|image|article|document',
      title: 'Resource title',
      url: 'https://...',
      description: 'What this resource provides',
      year: 2015  // optional
    }
  ]
}
```

## Critical Rules

### 1. Object Nesting
- **INSIDE `details`:** `overview`, `components`, `application`, `creator`, `processGuide`, `workedExample`
- **OUTSIDE `details` (top-level):** `caseStudies`, `facilitationGuide`, `successCriteria`, `comparativeAnalysis`, `relatedMethodologies`, `wikipedia`, `metadata`, `media`

### 2. Comma Placement
- Every property MUST end with comma EXCEPT the last one in an object
- `details: { ... },` ← comma because more properties follow
- Last property before closing `}` has NO comma

### 3. Property Order (recommended)
1. Basic identifiers (id, label, parent, description, color, level)
2. Historical info (yearIntroduced, pioneers, historicalContext)
3. `details` object
4. `wikipedia` link
5. `relatedMethodologies`
6. `caseStudies`
7. `facilitationGuide`
8. `successCriteria`
9. `comparativeAnalysis`
10. `metadata`
11. `media`

### 4. Content Enrichment Guidelines

**Minimal (Original) Structure:**
- 150-300 words total
- Basic `details.overview`, `details.components`, `details.application`
- 3-5 media items
- Metadata present

**Museum-Level (Enriched) Structure:**
- 1,500-2,500 words total
- Enhanced `details` with `processGuide` and `workedExample`
- 2-3 `caseStudies` with full details
- `facilitationGuide` for practitioners
- `successCriteria` for evaluation
- `comparativeAnalysis` for method selection
- All original fields retained

## Testing Your Changes

After editing `mindMapData.js`, always test:

```bash
# Test syntax
npm run build

# If successful, check dev server
npm run dev
# Visit http://localhost:5173
```

## Common Errors

### Error: "Expected ',', got ':'"
**Cause:** Missing comma after closing brace
**Fix:** Add comma after `}` when more properties follow

### Error: "Unexpected token"
**Cause:** Extra closing brace or comma
**Fix:** Count opening `{` and closing `}` - must match exactly

### Error: "Property undefined"
**Cause:** Property placed at wrong nesting level
**Fix:** Check if property belongs inside `details` or at top level (see rules above)

## Example: Futures Triangle Structure

See lines 173-359 in `mindMapData.js` for complete enriched example following this structure.

Key sections:
- Lines 189-276: `details` object with `processGuide` and `workedExample`
- Lines 278-299: `caseStudies` array (top-level)
- Lines 300-310: `facilitationGuide` (top-level)
- Lines 312-325: `successCriteria` (top-level)
- Lines 327-331: `comparativeAnalysis` (top-level)

## Questions?

If uncertain about structure:
1. Check existing enriched methodology (Futures Triangle, Scenario Planning, CLA)
2. Reference this document
3. Test with `npm run build` before committing
