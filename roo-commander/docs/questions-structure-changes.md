# Questions Structure Changes

## Overview

This document explains the changes made to the RooCommander questions.json structure to align with the new "What-How-What" methodology for assessing project needs and recommending custom modes.

## Key Changes

### 1. Phase-Based Structure

The question structure has been reorganized into distinct phases that follow the "What-How-What" methodology:

- **Phase 1: Primary Technology Identification** (First "What")
  - Identifies main programming language(s)
  - Determines project type
  - Identifies primary frameworks/platforms
  - Captures technology versions

- **Phase 2: Team Structure & Development Approach** ("How")
  - Evaluates team size and composition
  - Assesses development methodology
  - Identifies specialized roles

- **Phase 3: Detailed Technology Profile** (Second "What")
  - Enables package file analysis
  - Captures version-specific features
  - Identifies specialized needs and focus areas

### 2. Reference Documentation Integration

The new structure includes direct integration with the hierarchical reference documentation:

```json
"reference_doc_path": "languages/javascript/frontend/react/react-v{value}.md"
```

This allows for direct mapping between user technology choices and the appropriate reference documentation.

### 3. Controlled Phase Transitions

The structure now includes explicit transition logic between phases:

```json
"phase_transitions": {
  "phase1_to_phase2": {
    "required_fields": ["primary_language", "project_type"],
    "transition_message": "Now that we understand your technology stack, let's discuss your team structure."
  }
}
```

This ensures the assessment follows the correct sequence and gathers necessary information in each phase before proceeding.

### 4. Impact-Based Mode Selection

The mode selection logic has been enhanced to use information gathered across all phases:

- Technology-specific impacts based on version and framework
- Team-based adjustments based on size and experience
- Specialized mode additions based on development focus

### 5. Version-Specific Technology Questions

Rather than generic technology questions, the structure now includes version-specific questions for major technologies:

- React: v17, v18, v19
- Angular: v16, v17
- Django: v4.2, v5.1
- etc.

This enables precise matching to version-specific reference documentation.

## Benefits of the New Structure

1. **Technology-First Approach**: Primary technology identification happens before team structure assessment
2. **Version-Specific Guidance**: Direct mapping to version-specific reference documentation
3. **Controlled Assessment Flow**: Clear phase transitions ensure proper sequence of questions
4. **Adaptable Framework**: Easy to add new technologies or versions without structural changes
5. **Hierarchical Organization**: Mirrors the new reference documentation structure

## Implementation Notes

When implementing this structure in the RooCommander system prompt:

1. Always complete the Primary Technology phase before asking team questions
2. Use the technology information to inform which team questions are most relevant
3. Map technology choices directly to reference documentation paths
4. Use the mode_impacts data to score and select appropriate modes
5. Consider experience level when presenting mode recommendations

This new structure ensures the RooCommander follows the technology-first approach required by the "What-How-What" methodology.