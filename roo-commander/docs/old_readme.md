# Roo Code Memory Bank

A requirements-driven development system that maintains project context through specialized roles and a shared Memory Bank, optimizing LLM context management.

## Overview

The Memory Bank system provides persistent memory across chat sessions through a hierarchical role structure:

```
Requirements Engineer (RE)
         ↓
    Project Owner (PO)
         ↓
    Task Manager (TM)
         ↓
Software Engineer (SWE)
         ↓
    Developer (Dev)
```

Technical Architect (TA) operates independently at project milestones to create comprehensive documentation.

## Core Concept

LLMs have a fundamental limitation - they don't maintain state between responses and have limited context windows. This system solves that by:
1. Using focused roles to limit context scope
2. Storing key facts in the Memory Bank
3. Maintaining lean documentation during development
4. Creating comprehensive snapshots at milestones

## Roles and Responsibilities

### Requirements Engineer (RE)
Primary role for understanding and documenting verified requirements.
- **Files in memory-bank/re/:**
  * requirements.md: Core requirements
  * constraints.md: Project limitations
  * projectScope.md: Project boundaries
- **When to Use:**
  * "What are the project requirements..."
  * "What features are needed..."
  * "Analyze the package dependencies..."

### Project Owner (PO)
Approves and documents implementation patterns.
- **Files in memory-bank/po/:**
  * systemPatterns.md: Approved patterns and implementation rules
- **When to Use:**
  * "Review this pattern proposal..."
  * "Update system patterns..."
  * "Approve implementation approach..."

### Task Manager (TM)
Tracks current state of tasks.
- **Files in memory-bank/tm/:**
  * taskStatus.md: Tasks completed, in progress, and pending
- **When to Use:**
  * "What tasks are done?"
  * "What's being worked on?"
  * "What tasks are pending?"

### Software Engineer (SWE)
Plans implementation details.
- **Files in memory-bank/swe/:**
  * designPatterns.md: Implementation steps and integration points
- **When to Use:**
  * "How should we implement this..."
  * "What's the integration approach..."
  * "Plan this implementation..."

### Developer (Dev)
Implements code according to specifications.
- **Files in memory-bank/dev/:**
  * implementationGuides.md: Implementation details and code locations
- **When to Use:**
  * "Add this feature..."
  * "Fix this bug..."
  * "Implement this functionality..."

### Technical Architect (TA)
Creates comprehensive documentation at project milestones.
- **Files in memory-bank/ta/:**
  * architecture.md: System structure and evolution
- **When to Use:**
  * At version releases
  * After major changes
  * At phase completion
  * For system snapshots

## Commands

### Update Memory Bank
Updates project documentation in a coordinated manner:

1. Full Update: `update memory bank`
   - RE reviews and gets user approval
   - Cascades through roles in order
   - Each role updates their documentation
   - Maintains project alignment

2. Role-Specific: `update memory bank for [role]`
   - RE validates against requirements
   - Only specified role updates
   - Updates shared files as needed

## Best Practices

1. Lean Documentation:
   - Keep daily notes minimal
   - Focus on immediate needs
   - Document key decisions
   - Wait for TA snapshots

2. Follow Hierarchy:
   - Respect role order
   - Wait for approvals
   - Maintain coordination

3. Use Appropriate Role:
   - Match task to role
   - Switch when needed
   - Stay focused

4. Milestone Documentation:
   - Use TA for comprehensive docs
   - Capture system state
   - Record architecture
   - Maintain history

## FAQ

### When should I use each mode?

#### Requirements Engineer (RE) Mode
Use for new features or project scope:
```
"I want to add a dark mode feature"
"What dependencies does this project need?"
```

#### Project Owner (PO) Mode
Use for pattern and architecture decisions:
```
"Is this the right pattern for dark mode?"
"How should we structure the theme system?"
```

#### Task Manager (TM) Mode
Use for tracking task status:
```
"What tasks are done?"
"What's being worked on?"
```

#### Software Engineer (SWE) Mode
Use for implementation planning:
```
"How should we implement the theme switcher?"
"What's the best way to integrate this?"
```

#### Developer (Dev) Mode
Use for implementation and debugging:
```
"Add the dark mode toggle button"
"Fix the CSS variable inheritance"
```

#### Technical Architect (TA) Mode
Use at project milestones:
```
"Document the v1.0 release architecture"
"Create system snapshot after theme implementation"
```

### Which mode for debugging?
Use Dev mode because:
- Has command access for testing
- Can use browser_action to verify
- Can modify implementation
- Documents actual implementation details

### Which mode for new features?
Start in RE mode because:
- Documents verified requirements
- Gets explicit user confirmation
- Maintains project scope
- Prevents feature creep

The process then flows:
RE → PO → TM → SWE → Dev
1. RE verifies requirements
2. PO approves patterns
3. TM tracks progress
4. SWE plans implementation
5. Dev builds it

TA documents at completion.