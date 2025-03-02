# RooCommander v2: Advanced Mode Configuration System

This document outlines an advanced system for configuring custom modes in Roo based on project needs and team structure. The RooCommander leverages structured JSON repositories to intelligently recommend and configure custom modes.

## System Architecture

The RooCommander system consists of three main components:

1. **RooCommander Mode**: A custom mode that guides users through configuration
2. **Modes Repository**: A JSON database of available custom modes
3. **Questions Repository**: A JSON database of assessment questions

### RooCommander Mode Definition

```json
{
  "slug": "commander",
  "name": "RooCommander",
  "roleDefinition": "You are Roo, a specialized configuration assistant who helps users set up the optimal custom mode environment for their project. You have access to a comprehensive repository of specialized modes and intelligently map user needs to the most appropriate configuration.",
  "groups": [
    "read",
    "edit",
    "command"
  ],
  "customInstructions": "You have access to two JSON repositories - modes.json and questions.json. Use the questions repository to guide your assessment and the modes repository to configure the appropriate custom modes based on user responses. Always be aware of mode interdependencies and provide configurations that enable efficient mode switching."
}
```

## Modes Repository Structure (modes.json)

The modes repository contains detailed definitions of all available custom modes along with metadata about their use cases, interdependencies, and configuration details.

```json
{
  "modes": [
    {
      "slug": "arch",
      "name": "Architect",
      "roleDefinition": "You are Roo, an experienced software architect who specializes in planning and designing software systems. You excel at creating robust architectural designs, making technology decisions, and ensuring scalable, maintainable code structures.",
      "groups": [
        "read",
        ["edit", { "fileRegex": "\\.(md|drawio|json|yaml)$", "description": "Documentation and config files only" }],
        ["command", { "fileRegex": "^(diagrams|docs|ls|find).*", "description": "Documentation and planning tools only" }]
      ],
      "metadata": {
        "category": "planning",
        "experience_level": "advanced",
        "team_size": "any",
        "project_types": ["web", "mobile", "service", "enterprise"],
        "prerequisites": [],
        "complementary_modes": ["dev", "pm", "docs"],
        "usage_scenarios": [
          "Initial system design",
          "Major refactoring planning",
          "Technical decision-making",
          "Architecture documentation"
        ],
        "switching_patterns": [
          { "to": "dev", "when": "Implementation details needed" },
          { "to": "docs", "when": "Detailed documentation required" },
          { "to": "pm", "when": "Project management aspects needed" }
        ]
      },
      "rules_template": "# Architect Mode Rules\n\n1. Design Principles:\n   - Follow Domain-Driven Design principles\n   - Maintain clear separation of concerns\n   - Prioritize interfaces over implementations\n   - Design for extensibility and maintainability\n\n2. Documentation Requirements:\n   - Document all architectural decisions\n   - Include rationale for design choices\n   - Specify interfaces between components\n   - Create system diagrams for complex features"
    },
    {
      "slug": "dev",
      "name": "Developer",
      "roleDefinition": "You are Roo, a versatile developer focused on implementing features efficiently and effectively. You excel at writing clean, maintainable code that follows project patterns and best practices.",
      "groups": [
        "read",
        "edit",
        "command",
        "browser",
        "mcp"
      ],
      "metadata": {
        "category": "implementation",
        "experience_level": "any",
        "team_size": "any",
        "project_types": ["web", "mobile", "service", "cli", "library"],
        "prerequisites": [],
        "complementary_modes": ["test", "debug", "arch"],
        "usage_scenarios": [
          "Feature implementation",
          "Bug fixing",
          "Code optimization",
          "General development tasks"
        ],
        "switching_patterns": [
          { "to": "arch", "when": "Architectural decisions needed" },
          { "to": "test", "when": "Writing or fixing tests" },
          { "to": "debug", "when": "Troubleshooting issues" }
        ]
      },
      "rules_template": "# Developer Mode Rules\n\n1. Code Quality:\n   - Write clean, maintainable code\n   - Follow established project patterns\n   - Keep functions small and focused\n   - Use meaningful variable and function names\n\n2. Implementation Standards:\n   - Include appropriate error handling\n   - Write unit tests for new functionality\n   - Document complex logic or algorithms\n   - Consider edge cases and input validation"
    },
    // Additional modes would be defined here with similar structure
    {
      "slug": "nocode",
      "name": "No-Code Builder",
      "roleDefinition": "You are Roo, a supportive guide for users with limited coding experience. You excel at explaining concepts simply, generating complete working solutions, and helping users understand the basics of development.",
      "groups": [
        "read",
        "edit",
        "command",
        "browser"
      ],
      "metadata": {
        "category": "beginner-friendly",
        "experience_level": "beginner",
        "team_size": "small",
        "project_types": ["web", "simple-app"],
        "prerequisites": [],
        "complementary_modes": ["learn"],
        "usage_scenarios": [
          "Building simple applications",
          "Learning programming concepts",
          "Quick prototyping",
          "Simple website creation"
        ],
        "switching_patterns": [
          { "to": "learn", "when": "Deeper explanation of concepts needed" }
        ]
      },
      "rules_template": "# No-Code Builder Rules\n\n1. User Guidance:\n   - Explain concepts in simple, non-technical terms\n   - Provide complete, working solutions\n   - Break down complex tasks into manageable steps\n   - Focus on visual results and functionality\n\n2. Code Simplicity:\n   - Generate straightforward, well-commented code\n   - Use minimal dependencies\n   - Prioritize readability over optimization\n   - Include clear instructions for running the code"
    }
  ]
}
```

## Questions Repository Structure (questions.json)

The questions repository contains a structured assessment framework that guides the RooCommander in determining which modes are appropriate for a user's project and team.

```json
{
  "assessment": {
    "initial_questions": [
      {
        "id": "project_type",
        "question": "What type of project are you working on?",
        "type": "multiple_choice",
        "options": [
          {"value": "web", "label": "Web Application"},
          {"value": "mobile", "label": "Mobile Application"},
          {"value": "service", "label": "Backend Service"},
          {"value": "cli", "label": "Command Line Tool"},
          {"value": "library", "label": "Library/Framework"},
          {"value": "enterprise", "label": "Enterprise System"}
        ],
        "follow_ups": {
          "web": ["frontend_framework", "team_size", "experience_level"],
          "mobile": ["mobile_platform", "team_size", "experience_level"],
          "service": ["database", "team_size", "experience_level"],
          "cli": ["language", "team_size", "experience_level"],
          "library": ["language", "team_size", "experience_level"],
          "enterprise": ["architecture", "team_size", "experience_level"]
        }
      },
      {
        "id": "team_size",
        "question": "How many people are on your development team?",
        "type": "multiple_choice",
        "options": [
          {"value": "solo", "label": "Just me"},
          {"value": "small", "label": "2-5 people"},
          {"value": "medium", "label": "6-15 people"},
          {"value": "large", "label": "More than 15 people"}
        ],
        "follow_ups": {
          "solo": ["experience_level", "development_focus"],
          "small": ["team_roles", "experience_level"],
          "medium": ["team_roles", "experience_level", "development_methodology"],
          "large": ["team_roles", "experience_level", "development_methodology", "specialized_needs"]
        }
      },
      {
        "id": "experience_level",
        "question": "What is the overall experience level with this technology stack?",
        "type": "multiple_choice",
        "options": [
          {"value": "beginner", "label": "Beginner (learning the basics)"},
          {"value": "intermediate", "label": "Intermediate (some experience)"},
          {"value": "advanced", "label": "Advanced (experienced developers)"},
          {"value": "mixed", "label": "Mixed (various experience levels)"}
        ],
        "follow_ups": {
          "beginner": ["learning_focus"],
          "intermediate": ["development_focus"],
          "advanced": ["development_focus", "specialized_needs"],
          "mixed": ["development_focus", "learning_support"]
        }
      }
    ],
    "follow_up_questions": [
      {
        "id": "frontend_framework",
        "question": "Which frontend technology are you using?",
        "type": "multiple_choice",
        "options": [
          {"value": "react", "label": "React"},
          {"value": "vue", "label": "Vue.js"},
          {"value": "angular", "label": "Angular"},
          {"value": "vanilla", "label": "Vanilla JS/HTML/CSS"},
          {"value": "other", "label": "Other"}
        ],
        "mode_impacts": {
          "react": ["frontend+3", "ui+2"],
          "vue": ["frontend+3", "ui+2"],
          "angular": ["frontend+3", "ui+2"],
          "vanilla": ["frontend+2"]
        }
      },
      {
        "id": "development_focus",
        "question": "What are your primary development focuses? (select all that apply)",
        "type": "multiple_select",
        "options": [
          {"value": "features", "label": "Implementing new features"},
          {"value": "bugs", "label": "Fixing bugs"},
          {"value": "refactoring", "label": "Code refactoring/improvement"},
          {"value": "performance", "label": "Performance optimization"},
          {"value": "security", "label": "Security improvements"},
          {"value": "accessibility", "label": "Accessibility enhancements"}
        ],
        "mode_impacts": {
          "features": ["dev+3", "arch+1"],
          "bugs": ["debug+3", "test+2"],
          "refactoring": ["refactor+3", "arch+2"],
          "performance": ["perf+3", "dev+1"],
          "security": ["security+3"],
          "accessibility": ["a11y+3", "frontend+1"]
        }
      },
      {
        "id": "specialized_needs",
        "question": "Do you have any specialized needs? (select all that apply)",
        "type": "multiple_select",
        "options": [
          {"value": "cicd", "label": "CI/CD and Deployment Automation"},
          {"value": "docs", "label": "Documentation Generation"},
          {"value": "testing", "label": "Comprehensive Testing"},
          {"value": "analytics", "label": "Data Analytics Integration"},
          {"value": "monitoring", "label": "Monitoring and Logging"},
          {"value": "compliance", "label": "Regulatory Compliance"},
          {"value": "none", "label": "None of the above"}
        ],
        "mode_impacts": {
          "cicd": ["devops+3"],
          "docs": ["docs+3", "arch+1"],
          "testing": ["test+3"],
          "analytics": ["data+2"],
          "monitoring": ["devops+2", "debug+1"],
          "compliance": ["security+2", "docs+1"]
        }
      }
      // Additional follow-up questions would be defined here
    ],
    "mode_selection_logic": {
      "threshold": 3,
      "essential_modes": ["dev"],
      "mode_groups": {
        "planning": ["arch", "pm"],
        "implementation": ["dev", "frontend", "backend"],
        "quality": ["test", "debug", "security"],
        "specialized": ["devops", "docs", "a11y", "perf"],
        "learning": ["learn", "nocode"]
      },
      "experience_mappings": {
        "beginner": {
          "add": ["nocode", "learn"],
          "remove": ["arch", "security", "perf"]
        },
        "intermediate": {
          "add": [],
          "remove": []
        },
        "advanced": {
          "add": [],
          "remove": ["nocode"]
        },
        "mixed": {
          "add": ["learn"],
          "remove": []
        }
      },
      "team_size_mappings": {
        "solo": {
          "max_modes": 5
        },
        "small": {
          "max_modes": 7
        },
        "medium": {
          "max_modes": 10
        },
        "large": {
          "max_modes": 15
        }
      }
    }
  }
}
```

## RooCommander Operational Flow

### 1. Assessment Phase

The RooCommander begins by loading its question and mode repositories, then conducting a structured assessment:

1. Start with initial questions from the questions repository
2. Based on answers, follow the `follow_ups` paths to ask targeted questions
3. For each answer, calculate mode scores based on `mode_impacts`
4. Apply adjustments based on `experience_mappings` and `team_size_mappings`
5. Select modes that exceed the `threshold` value, respecting the `max_modes` constraint

### 2. Configuration Generation

After determining the appropriate modes:

1. Retrieve full mode definitions from the modes repository
2. Generate a `.roomodes` file containing the selected modes
3. For each mode, generate a `.clinerules-{mode}` file based on its `rules_template`
4. Create a README file explaining the configuration and when to use each mode

### 3. Explanation and Documentation

The RooCommander provides a comprehensive explanation of the generated configuration:

1. Overview of selected modes and why they were chosen
2. Instructions for using each mode and when to switch between them
3. Explanation of the file permissions and tool groups for each mode
4. Guidance on extending or customizing the configuration further

## Example Implementation

### RooCommander Activation

To activate the RooCommander, create a `.roomodes` file with just the RooCommander definition:

```json
{
  "customModes": [
    {
      "slug": "commander",
      "name": "RooCommander",
      "roleDefinition": "You are Roo, a specialized configuration assistant who helps users set up the optimal custom mode environment for their project. You have access to a comprehensive repository of specialized modes and intelligently map user needs to the most appropriate configuration.",
      "groups": [
        "read",
        "edit",
        "command"
      ],
      "customInstructions": "You have access to two JSON repositories - modes.json and questions.json. Use the questions repository to guide your assessment and the modes repository to configure the appropriate custom modes based on user responses."
    }
  ]
}
```

### JSON Repository Files

Create two files in your project:

1. `roo-army/modes.json` - Contains all mode definitions as per the structure above
2. `roo-army/questions.json` - Contains the assessment framework as per the structure above

### Using RooCommander

1. Switch to RooCommander mode
2. Request configuration assistance: "Help me configure custom modes for my project"
3. Answer the assessment questions
4. RooCommander will generate:
   - An updated `.roomodes` file with your selected modes
   - Mode-specific `.clinerules-{mode}` files
   - A `README-modes.md` with documentation

## Advanced Features

### Mode Interdependencies

The RooCommander is aware of mode interdependencies through:

1. `complementary_modes` - Other modes that work well with this mode
2. `switching_patterns` - When to switch to another mode
3. `prerequisites` - Modes that should be included if this mode is selected

This ensures that the generated configuration enables efficient workflow through appropriate mode switching.

### Custom Rules Integration

The RooCommander intelligently generates mode-specific rules files (`.clinerules-{mode}`) based on:

1. The mode's `rules_template`
2. Project-specific information gathered during assessment
3. Interdependencies with other selected modes

### Configuration Optimization

The RooCommander optimizes configurations by:

1. Limiting the number of modes based on team size
2. Adjusting selected modes based on experience level
3. Prioritizing modes that directly address stated development focuses
4. Ensuring complementary mode sets that cover the full development lifecycle

## Conclusion

The RooCommander v2 system provides a sophisticated approach to custom mode configuration that adapts to the specific needs of each project and team. By leveraging structured repositories of modes and assessment questions, it creates targeted configurations that enhance productivity and focus throughout the development lifecycle.

This approach transforms Roo from a general-purpose AI assistant into a highly specialized development companion perfectly tailored to each unique development environment.