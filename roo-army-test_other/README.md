# RooCommander

RooCommander is a specialized custom mode that helps users create the optimal set of custom modes for their specific project environment and team needs.

## Overview

The RooCommander serves as a configuration consultant that analyzes project requirements and recommends appropriate custom modes from the mode pool. Rather than forcing users to understand all the available modes and their capabilities, the RooCommander guides them through a structured assessment process and generates tailored configurations automatically.

## Key Features

- **Project Assessment**: Asks targeted questions to understand your project type, team composition, and special requirements
- **Repository Analysis**: Analyzes project structure to identify languages and frameworks when available
- **Custom Mode Recommendations**: Recommends appropriate modes based on assessment results
- **Configuration Generation**: Creates .roomodes and .clinerules files automatically

## Directory Structure

- `commander.json` - The RooCommander mode definition
- `questions.json` - Assessment questions and logic for mode recommendations
- `.clinerules-commander` - Specific rules for the RooCommander mode
- `generator.js` - Utility script to generate configurations

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
- Project type and domain
- Team size and composition
- Technical expertise levels
- Development methodology
- Special requirements

### 5. Review Recommendations

The RooCommander will recommend a set of custom modes tailored to your project needs, explaining:
- Purpose of each mode
- Key capabilities
- Tool group restrictions
- How it fits into your workflow

### 6. Generate Configuration Files

Once you approve the recommendations, the RooCommander will generate:
- A `.roomodes` file with all recommended modes
- `.clinerules-{mode}` files for specific guidelines (optional)
- Example usage patterns for each mode

## Assessment Process

The RooCommander uses a structured approach to understand your needs:

1. **Initial Questions**: Determine project type, team size, and experience level
2. **Follow-up Questions**: Based on initial responses, drill down into specific needs
3. **Mode Scoring**: Calculate recommendations based on responses
4. **Experience Adjustments**: Adjust recommendations based on team experience level
5. **Team Size Limitations**: Limit the number of modes based on team size

## Implementation

The RooCommander leverages the custom-modes-pool directory to access available modes and uses the questions.json file to guide its assessment process. When generating configurations, it selects the appropriate modes and combines them into a cohesive .roomodes file.

Custom modes are organized into functional categories, making it easier for the RooCommander to recommend the right combination of modes for your specific needs.