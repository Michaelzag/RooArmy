# Narrative-Driven QA Implementation with Flexible Mode Generation

This document outlines the comprehensive implementation of a narrative-driven QA approach for RooCommander, transforming the configuration process from isolated questions into a cohesive storytelling experience with dynamic, LLM-driven mode generation.

## Core Philosophy

Instead of treating the configuration as a series of isolated data points, our enhanced approach:

1. Engages users in a continuous story about their project
2. Explores technology choices through natural conversation
3. Discovers complexity through project challenges and uncertainty
4. Frames mode configuration as assembling a specialized team
5. Maintains the What-How-What methodology and Cynefin framework within a storytelling context
6. Creates truly custom modes based on project needs rather than predefined categories
7. Uses the hierarchical reference structure directly rather than through rigid indices

## System Components Updated

The following system prompt components have been updated to implement the narrative approach:

### 1. Assessment Framework

Changed from a rigid phase-based structure to a narrative-driven flow that:
- Invites users to share their project story
- Frames each assessment phase as part of an ongoing conversation
- Creates natural transitions between technology, complexity, and experience explorations
- Sets the stage for the team assembly metaphor

### 2. Technology Identification

Transformed technology questioning into a "Technology Story Canvas" approach that:
- Begins with open-ended technology narratives
- Uses inference and confirmation rather than direct questioning
- Presents reference-based version options within the narrative
- Creates follow-up patterns based on context rather than rigid sequences

### 3. Complexity Assessment

Reimagined complexity assessment as "Complexity Narrative" that:
- Elicits stories about project challenges and uncertainty
- Identifies complexity indicators through narrative cues
- Maps storytelling patterns to Cynefin domains
- Uses language that naturally resonates with developers

### 4. Wizard Customization

Reframed mode configuration as "Team Assembly" that:
- Presents modes as specialized expertise areas
- Explains each mode's value in the context of the specific project
- Guides customization as refining expertise focus
- Provides clear explanations of how different expertise areas work together

### 5. Existing Project Analysis

Enhanced existing project analysis with narrative exploration that:
- Explores project history and evolution
- Uncovers conventions through their origins and rationales
- Identifies preservation priorities through storytelling
- Frames improvements as natural evolution of the project's story

### 6. Dynamic Mode Generation

Added a new component for flexible, LLM-driven mode generation that:
- Creates custom modes based directly on project narratives
- Uses the hierarchical reference structure directly without rigid indices
- Blends capabilities across traditional role boundaries
- Adapts to emerging technologies without predefined mappings
- Encourages creative combinations based on project needs

## Question Components Updated

The following question components have been completely rewritten:

### 1. phase1_technology.json (Technology Story Canvas)

- Added narrative-based technology exploration
- Implemented inference confirmation patterns
- Created contextual follow-ups based on previous answers
- Added version option presentation from reference docs
- Integrated technology ecosystem exploration

### 2. phase2_complexity.json (Complexity Narrative)

- Added project challenge storytelling
- Created comparative project complexity exploration
- Implemented uncertainty area discovery
- Maintained Cynefin mapping through narrative indicators
- Reframed development philosophy as valued practices

### 3. phase3_development_experience.json (Experience Narratives)

- Focused on solo developers by default
- Added experience storytelling through specific scenarios
- Explored learning interests and aspirations
- Maintained focus area identification through narratives
- Eliminated all team-size references

### 4. phase_transitions.json (Narrative Continuity)

- Updated transition messages to maintain story continuity
- Added project-specific context to transitions
- Created natural bridges between assessment phases
- Framed the final transition as beginning of implementation journey

### 5. phase6_wizard_customization.json (Expert Team Assembly)

- Implemented team assembly metaphor for mode selection
- Created detailed explanation of each expertise area's value
- Added expertise adjustment workflow
- Provided team collaboration guidance
- Maintained focus on project-specific expertise value

## Script Enhancements

The setup-test.js script has been updated to:

1. Copy the entire reference-docs directory structure recursively
2. Create a dummy .rooconfig.md file to avoid error messages
3. Ensure proper component assembly for the narrative approach

## Implementation Benefits

This implementation offers several key advantages:

1. **Enhanced Engagement**: Users become active participants in a story rather than passive question-answerers
2. **Deeper Context**: The narrative approach captures richer information about project needs
3. **Reduced Redundancy**: Inference and confirmation patterns eliminate unnecessary questions
4. **Knowledge Integration**: Reference documentation is naturally integrated into the conversation
5. **Intuitive Configuration**: Team assembly metaphor makes mode selection more understandable
6. **Solo Developer Focus**: Default approach aligned with most common use case
7. **Project Specificity**: All recommendations explicitly tied to project characteristics
8. **Creative Freedom**: LLM can generate truly custom modes without category constraints
9. **Future-Proof Design**: New technologies are supported without index updates
10. **Blended Capabilities**: Expertise areas can cross traditional role boundaries
11. **Domain-Appropriate Expertise**: Mode generation adapts to project complexity domain

## Next Steps

After implementation, we should:

1. Test with various project types to evaluate conversation flow
2. Validate reference documentation integration
3. Refine inference patterns based on real-world testing
4. Gather feedback on the team assembly metaphor
5. Measure engagement and completion rates compared to previous approach