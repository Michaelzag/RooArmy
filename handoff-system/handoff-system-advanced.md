# The Handoff System - Advanced Guide

## Overview

This guide covers the advanced implementation of the Handoff System using custom Roo-Code modes. Before proceeding, complete the [basic setup](handoff-system-basic.md) first.

The advanced implementation adds:
- Custom modes for specialized handoff and milestone management
- Rule files to guide LLM behavior
- Automation scripts for organization
- Intelligent directory location detection


## Setup Steps

After completing the basic setup, add these components to enhance your handoff system:

### 1. Add Rule Files to Project Root

- **`.clinerules`**: Add this to the .clinerules file:

  ```
  # Handoff System Rules

  Create handoffs when context becomes stale and milestones when features complete. For implementation details, refer to handoffs/0-instructions/.

  ## When to Create Documents

  1. **Create handoffs when:**
     - Context becomes ~30% irrelevant to current task
     - After completing significant project segments
     - After 10+ conversation exchanges
     - During debugging sessions exceeding 5 exchanges without resolution

  2. **Create milestones when:**
     - Completing major features or components
     - After 3-5 handoffs accumulate
     - A significant project phase concludes

  A fresh LLM session with focused context often solves problems that an overloaded session cannot.
  ```
- **`.clinerules-handoff-manager`**: Specialized rules for handoff creation
- **`.clinerules-milestone-manager`**: Specialized rules for milestone creation

### 2. Add Custom Modes Definition

Copy the `.roomodes` file to your project's root directory. This defines three specialized modes:

- **`handoff-manager`**: For creating properly formatted handoff documents
- **`milestone-manager`**: For creating milestone summaries and organizing handoffs
- **`session-restorer`**: For intelligently restoring context from handoffs and milestones

## Using Custom Modes

### Creating Handoffs with handoff-manager Mode

1. Switch to `handoff-manager` mode
2. Use one of these prompts:

```
I need to create a handoff document. Please follow the instructions in handoffs/0-instructions/prompts/CH-create-handoff.md
```

or for more control:

```
I need to create a handoff document for our current work. Please:

1. Read the handoffs/0-instructions/1-handoff-instructions.md
2. Determine the next sequential handoff number by examining ONLY the handoffs/ root directory
3. Create a properly structured handoff file with that number
```

### Creating Milestones with milestone-manager Mode

1. Switch to `milestone-manager` mode
2. Use one of these prompts:

```
I need to create a milestone. Please follow the instructions in handoffs/0-instructions/prompts/CM-create-milestone.md
```

or for more control:

```
I need to create a milestone for our completed [FEATURE/COMPONENT]. Please:

1. First, read the handoffs/0-instructions/3-milestone-scripts.md file for script options
2. Check if there are recent handoff documents in the handoffs/ root directory
3. Read the handoffs/0-instructions/2-milestone-instructions.md
4. Create the milestone directory and move handoff files using the appropriate script
5. Create the required 0-milestone-summary.md and 0-lessons-learned.md files
```

### Resuming Sessions with session-restorer Mode

1. Switch to `session-restorer` mode
2. Use this prompt:

```
I need to resume work on this project. Please follow the instructions in handoffs/0-instructions/prompts/RS-restore-session.md
```

or for more control:

```
I need to resume work on this project. Please:

1. Examine the handoffs/ directory structure
2. Check if handoff documents exist in the root directory
3. If handoffs exist, read milestone summaries first, then all handoff documents
4. If no handoffs exist, read only milestone summaries
5. Verify your understanding of the project state before proceeding
```

## Directory Location Detection

The custom modes now intelligently search for existing handoff directories rather than assuming they are in a fixed location:

1. **Search Priority**:
   - First checks for handoffs/ in the project root
   - Then searches common locations: docs/, documentation/, notes/, wiki/
   - Also checks for naming variations like handoff/ (singular) or hand-offs/

2. **Creation Logic**:
   - If no handoff directory exists, suggests creating one
   - Creates in the root by default, or in docs/ if that directory exists
   - Ensures all modes operate on the same directory structure

3. **File Pattern Matching**:
   - Edit permissions are set with flexible regex patterns
   - Allows operation regardless of where the handoffs directory is found
   - Maintains consistent structure within the discovered directory

This flexibility makes the handoff system work seamlessly in projects with different organizational structures without requiring modification.

## Configuration Structure

The advanced implementation uses these configuration layers:

### Global Rules (`.clinerules`)
Applied to all modes; provides general handoff system guidelines

### Mode-Specific Rules
- **`.clinerules-handoff-manager`**: Specialized rules for handoff creation
- **`.clinerules-milestone-manager`**: Specialized rules for milestone organization
- **`.clinerules-session-restorer`**: Specialized rules for session restoration

### Custom Mode Definitions (`.roomodes`)
Defines specialized modes with specific permissions and behaviors:
- **handoff-manager**: Creates and manages handoff documents
- **milestone-manager**: Creates and manages milestone documents
- **session-restorer**: Restores context from existing handoffs and milestones

## Best Practices

1. **Use Structured Prompts**: Reference the templates in `prompts/` directory
2. **Handoff Before Milestone**: Always create a final handoff before creating a milestone
3. **Consistent Switching**: Use the correct mode for each operation
4. **Script Automation**: Reference scripts in 3-milestone-scripts.md for milestone organization

## Related Resources

- [Custom Modes Documentation](../cheatsheets/custom-modes-llm-instruction.md)
- [Basic Implementation Guide](handoff-system-basic.md)