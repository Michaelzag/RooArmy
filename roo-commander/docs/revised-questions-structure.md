# Revised RooCommander Question Structure

This document outlines the revised structure for RooCommander assessment questions, following the "What-How-What" approach. The questions are organized into phases that prioritize technology identification before team structure, and then dive deeper into specific technology details.

## Phase 1: Primary Technology Identification (First "What")

### Main Programming Language
```json
{
  "id": "main_language",
  "question": "What is the main programming language for your project?",
  "type": "multiple_choice",
  "options": [
    {"value": "javascript", "label": "JavaScript/TypeScript"},
    {"value": "python", "label": "Python"},
    {"value": "java", "label": "Java"},
    {"value": "csharp", "label": "C#"},
    {"value": "go", "label": "Go"},
    {"value": "ruby", "label": "Ruby"},
    {"value": "php", "label": "PHP"},
    {"value": "rust", "label": "Rust"},
    {"value": "other", "label": "Other (please specify)"}
  ],
  "follow_ups": {
    "javascript": ["js_framework", "project_type"],
    "python": ["python_framework", "project_type"],
    "java": ["java_framework", "project_type"],
    "csharp": ["dotnet_framework", "project_type"],
    "go": ["go_framework", "project_type"],
    "ruby": ["ruby_framework", "project_type"],
    "php": ["php_framework", "project_type"],
    "rust": ["rust_framework", "project_type"],
    "other": ["project_type"]
  }
}
```

### Framework Selection (Language-Specific)
Example for JavaScript:
```json
{
  "id": "js_framework",
  "question": "Which JavaScript framework or library are you primarily using?",
  "type": "multiple_choice",
  "options": [
    {"value": "react", "label": "React"},
    {"value": "vue", "label": "Vue.js"},
    {"value": "angular", "label": "Angular"},
    {"value": "svelte", "label": "Svelte"},
    {"value": "nextjs", "label": "Next.js"},
    {"value": "nodejs", "label": "Node.js (Backend)"},
    {"value": "express", "label": "Express"},
    {"value": "vanilla", "label": "Vanilla JavaScript"},
    {"value": "other", "label": "Other (please specify)"}
  ],
  "version_follow_up": true,
  "mode_impacts": {
    "react": ["react+5", "frontend+3"],
    "vue": ["vue+5", "frontend+3"],
    "angular": ["angular+5", "frontend+3"],
    "svelte": ["svelte+5", "frontend+3"],
    "nextjs": ["nextjs+5", "frontend+3"],
    "nodejs": ["nodejs+3", "backend+3"],
    "express": ["express+5", "backend+3"],
    "vanilla": ["frontend+2"],
    "other": ["frontend+2"]
  }
}
```

### Version Selection (If framework selected)
```json
{
  "id": "framework_version",
  "question": "Which version of ${selected_framework} are you using?",
  "type": "multiple_choice",
  "dynamic_options": true,
  "reference_doc_match": true
}
```

### Project Type
```json
{
  "id": "project_type",
  "question": "What type of project are you working on?",
  "type": "multiple_choice",
  "options": [
    {"value": "web", "label": "Web Application"},
    {"value": "mobile", "label": "Mobile Application"},
    {"value": "api", "label": "API/Backend Service"},
    {"value": "desktop", "label": "Desktop Application"},
    {"value": "cli", "label": "Command Line Tool"},
    {"value": "library", "label": "Library/Framework"},
    {"value": "data", "label": "Data Processing/Analysis"},
    {"value": "ai", "label": "AI/ML Project"},
    {"value": "other", "label": "Other (please specify)"}
  ],
  "follow_ups": {
    "web": ["database"],
    "mobile": ["mobile_platform"],
    "api": ["database"],
    "desktop": ["desktop_platform"],
    "data": ["database", "data_tools"],
    "ai": ["ai_framework"]
  }
}
```

### Technology-Specific Questions
Examples based on project type:
- Mobile Platform (iOS, Android, React Native, Flutter)
- Database Selection (SQL, NoSQL, Graph)
- Desktop Platform (Electron, Qt, WPF)
- AI Framework (TensorFlow, PyTorch, scikit-learn)

## Phase 2: Team Structure & Development Approach ("How")

### Team Size
```json
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
    "solo": ["experience_level"],
    "small": ["team_roles", "experience_level"],
    "medium": ["team_roles", "experience_level", "development_methodology"],
    "large": ["team_roles", "experience_level", "development_methodology"]
  }
}
```

### Team Roles (If team size > 1)
```json
{
  "id": "team_roles",
  "question": "Which specific roles exist on your team? (select all that apply)",
  "type": "multiple_select",
  "options": [
    {"value": "frontend", "label": "Frontend Developers"},
    {"value": "backend", "label": "Backend Developers"},
    {"value": "fullstack", "label": "Full-stack Developers"},
    {"value": "designer", "label": "UI/UX Designers"},
    {"value": "devops", "label": "DevOps Engineers"},
    {"value": "qa", "label": "QA/Testing Specialists"},
    {"value": "pm", "label": "Project Managers"},
    {"value": "data", "label": "Data Engineers/Scientists"},
    {"value": "security", "label": "Security Engineers"}
  ],
  "mode_impacts": {
    "frontend": ["frontend+2"],
    "backend": ["backend+2"],
    "fullstack": ["engineer+2"],
    "designer": ["ui+3"],
    "devops": ["devops+3"],
    "qa": ["qa+3"],
    "pm": ["architect+2"],
    "data": ["dba+3"],
    "security": ["security+3"]
  }
}
```

### Development Methodology
```json
{
  "id": "development_methodology",
  "question": "Which development methodology do you follow?",
  "type": "multiple_choice",
  "options": [
    {"value": "agile", "label": "Agile/Scrum"},
    {"value": "kanban", "label": "Kanban"},
    {"value": "waterfall", "label": "Waterfall"},
    {"value": "hybrid", "label": "Hybrid approach"},
    {"value": "none", "label": "No formal methodology"}
  ],
  "mode_impacts": {
    "agile": ["architect+1"],
    "kanban": ["architect+1"],
    "waterfall": ["architect+2", "writer+1"],
    "hybrid": ["architect+1"],
    "none": []
  }
}
```

### Experience Level
```json
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
    "mixed": ["learning_support"]
  },
  "experience_mappings": {
    "beginner": {
      "add": ["learn"],
      "remove": ["architect", "security", "perf"]
    },
    "intermediate": {
      "add": [],
      "remove": []
    },
    "advanced": {
      "add": [],
      "remove": ["learn"]
    },
    "mixed": {
      "add": ["learn"],
      "remove": []
    }
  }
}
```

## Phase 3: Detailed Technology Profile (Second "What")

### Package File Analysis
```json
{
  "id": "package_file",
  "question": "Do you have a package file (package.json, requirements.txt, etc.) available?",
  "type": "multiple_choice",
  "options": [
    {"value": "yes", "label": "Yes, I can provide it"},
    {"value": "no", "label": "No, I don't have it available"}
  ],
  "follow_ups": {
    "yes": ["upload_package"],
    "no": ["manual_packages"]
  }
}
```

### Manual Package Information (If no package file)
```json
{
  "id": "manual_packages",
  "question": "Please list your main dependencies and their versions (if known)",
  "type": "text_area",
  "placeholder": "e.g., react 18.2.0, express 4.18.2, mongoose 7.0.3"
}
```

### Reference Documentation Check
```json
{
  "id": "reference_doc_check",
  "question": "We need reference documentation for your technology stack",
  "type": "display_only",
  "dynamic_processing": true
}
```

### Missing Documentation Handling
```json
{
  "id": "missing_doc_action",
  "question": "We don't have reference documentation for ${missing_technology}. How would you like to proceed?",
  "type": "multiple_choice",
  "options": [
    {"value": "create_auto", "label": "Create automatically (using ask_perplexity)"},
    {"value": "create_manual", "label": "I'll create it manually with your guidance"},
    {"value": "skip", "label": "Skip this technology"}
  ],
  "follow_ups": {
    "create_auto": ["confirm_perplexity"],
    "create_manual": ["provide_template"]
  }
}
```

## Phase 4: Development Focus & Special Needs

### Development Focus
```json
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
    {"value": "accessibility", "label": "Accessibility enhancements"},
    {"value": "devops", "label": "CI/CD and deployment"}
  ],
  "mode_impacts": {
    "features": ["engineer+3", "architect+1"],
    "bugs": ["qa+3", "engineer+2"],
    "refactoring": ["engineer+3", "architect+2"],
    "performance": ["perf+3", "engineer+1"],
    "security": ["security+3"],
    "accessibility": ["ui+3", "frontend+1"],
    "devops": ["devops+3", "sre+2"]
  }
}
```

### Specialized Needs
```json
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
    {"value": "i18n", "label": "Internationalization"},
    {"value": "none", "label": "None of the above"}
  ],
  "mode_impacts": {
    "cicd": ["devops+3"],
    "docs": ["writer+3", "architect+1"],
    "testing": ["qa+3"],
    "analytics": ["dba+2", "analyst+3"],
    "monitoring": ["sre+3", "devops+2"],
    "compliance": ["security+3", "writer+1"],
    "i18n": ["frontend+2", "ui+1"],
    "none": []
  }
}
```

## Configuration Process

### Mode Review
```json
{
  "id": "mode_review",
  "question": "Based on your responses, here are the recommended modes:",
  "type": "mode_selection",
  "dynamic_content": true,
  "allow_modification": true
}
```

### Configuration File Creation
```json
{
  "id": "config_file_creation",
  "question": "I'll create two configuration files for you",
  "type": "display_only",
  "files": [
    {
      "name": ".roomodes",
      "description": "Contains the selected custom modes"
    },
    {
      "name": ".rooconfig.md",
      "description": "Stores your project profile and mode selection history"
    }
  ]
}
```

### Future Reconfiguration
```json
{
  "id": "future_info",
  "question": "If you need to update your configuration in the future, just switch to RooCommander mode and say 'I'd like to update my project configuration'",
  "type": "display_only"
}
```

## Mode Selection Logic

The mode selection process would use these rules:

1. **Essential Modes**: Always include Commander and at least one implementation mode
2. **Language/Framework Modes**: Include specific modes for the selected language and framework versions
3. **Role-Based Modes**: Add modes based on team structure and development focus
4. **Experience Adjustment**: Modify selection based on experience level
5. **Team Size Limits**: Cap the number of modes based on team size
   - Solo: Maximum 5 modes
   - Small: Maximum 7 modes
   - Medium: Maximum 10 modes
   - Large: Maximum 15 modes
6. **Score Threshold**: Only include modes with scores above the threshold (3)
7. **Priority Order**: When limiting modes, prioritize by score

This structure creates a conversation flow that first establishes the technological foundation, then assesses team structure, and finally dives into specific technology details - aligning with the "What-How-What" approach.