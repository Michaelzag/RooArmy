# RooCommander

RooCommander is a specialized custom mode that helps users create the optimal set of custom modes for their specific project environment and team needs.

## Overview

The RooCommander serves as a configuration consultant that analyzes project requirements and recommends appropriate custom modes from the mode pool. Rather than forcing users to understand all the available modes and their capabilities, the RooCommander guides them through a structured assessment process and generates tailored configurations automatically.

## Key Features

- **Project Technology Assessment**: Identifies languages, frameworks, and technologies in use
- **Cynefin-Based Complexity Analysis**: Classifies projects as Simple, Complicated, or Complex to tailor approaches
- **Development Philosophy Detection**: Identifies practical development approaches rather than formal methodologies
- **Existing Project Analysis**: Analyzes project structure to identify patterns when working with existing code
- **Custom Mode Recommendations**: Recommends appropriate modes based on comprehensive assessment
- **Configuration Generation**: Creates .roomodes and .clinerules files automatically
- **Handoff System Integration**: Optional integration with the handoff system for context management

## Directory Structure

- `commander.json` - The RooCommander mode definition
- `questions.json` - Assessment questions and logic for mode recommendations
- `.clinerules-commander` - Specific rules for the RooCommander mode
- `system-prompt-commander` - Custom system prompt for RooCommander
- `rooconfig-template.md` - Template for configuration persistence

## Usage

### 1. Add RooCommander to your .roomodes file

```json
{
  "customModes": [
    {
      "slug": "commander",
      "name": "RooCommander",
      "roleDefinition": "You are Roo, a specialized consultant who helps users configure the optimal set of custom modes for their project and team. You excel at understanding development environments, team structures, and project requirements to recommend and generate custom mode configurations tailored to specific needs.",
      "groups": [
        "read",
        ["edit", {
          "fileRegex": "\\.(roomodes|clinerules-.*|md|json)$",
          "description": "Mode configuration files and documentation"
        }],
        "command",
        "ask_followup_question"
      ],
      "customInstructions": "You are a specialized configuration consultant. Focus on guiding users through creating their custom modes by asking targeted questions about their project needs, team composition, and development practices. Generate complete .roomodes configurations and explain your recommendations in detail."
    }
  ]
}
```

### 2. Activate RooCommander Mode

Select the "RooCommander" mode from the mode selector in Roo.

### 3. Begin Configuration Process

Start the conversation with:

```
I'd like to set up custom modes for my development project.
```

### 4. Answer Assessment Questions

The RooCommander will ask questions about:
- Primary language and frameworks
- Project type and complexity domain
- Development philosophies
- Team size and composition
- Technical expertise levels
- Special requirements

For existing projects, RooCommander will also:
- Offer to scan project structure
- Identify existing patterns and conventions
- Ask which aspects to preserve vs. improve

### 5. Review Recommendations

The RooCommander will recommend a set of custom modes tailored to your project needs, explaining:
- Purpose of each mode
- Key capabilities
- Tool group restrictions
- How it fits into your workflow
- How it aligns with your project's complexity and philosophy

### 6. Generate Configuration Files

Once you approve the recommendations, the RooCommander will generate:
- A `.roomodes` file with all recommended modes
- `.clinerules-{mode}` files for specific guidelines (optional)
- A `.rooconfig.md` file documenting your configuration
- Example usage patterns for each mode

## Assessment Process

The RooCommander uses an enhanced "What-How-What-Why" approach to understand your needs:

1. **Primary Technology (What)**: Identify language, frameworks, versions
2. **Project Complexity & Philosophy (Why)**: Assess complexity domain and development approach
3. **Team Structure (How)**: Determine team composition and experience
4. **Detailed Requirements (What)**: Explore specific technical needs
5. **Existing Project Analysis (If applicable)**: Identify patterns to preserve or improve

### Cynefin Framework Integration

RooCommander uses the Cynefin framework to classify projects:

- **Simple Domain**: Clear cause-and-effect, established patterns work reliably
- **Complicated Domain**: Requires expertise but solutions are knowable
- **Complex Domain**: Emergent behavior, requires experimentation and adaptation

This classification helps tailor mode configurations to your project's nature.

### Development Philosophy Assessment

Rather than focusing on formal methodologies like "Agile" or "Waterfall," RooCommander identifies practical development approaches:

- Test-Driven Development (TDD)
- Behavior-Driven Development (BDD)
- Domain-Driven Design (DDD)
- Documentation-First
- Component-Based
- Feature-Focused

These practical philosophies inform how the modes are configured to work together.

## Implementation

The RooCommander leverages the custom-modes-pool directory to access available modes and uses the questions.json file to guide its assessment process. When generating configurations, it selects the appropriate modes and combines them into a cohesive .roomodes file.

Custom modes are organized into functional categories, making it easier for the RooCommander to recommend the right combination of modes for your specific needs.