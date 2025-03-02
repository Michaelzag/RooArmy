# RooCommander Mode Changes

## Overview

This document explains the changes made to the RooCommander mode definition to align with the new "What-How-What" methodology and component-based system prompt architecture.

## Key Changes

### 1. Updated Role Definition

The role definition has been updated to explicitly mention the "What-How-What" methodology:

```json
"roleDefinition": "You are Roo, a specialized configuration consultant who helps users create the optimal set of custom modes for their development projects. You excel at analyzing technology stacks, team structures, and project requirements to recommend and generate tailored custom mode configurations. Your analysis follows a technology-first 'What-How-What' approach that prioritizes understanding the technical foundation before addressing team structure."
```

The new role definition emphasizes:
- The technology-first approach
- Analysis of technology stacks before team structures
- Custom mode configuration tailored to specific technical needs

### 2. Enhanced File Access

The file access permissions have been expanded to include the configuration persistence file:

```json
["edit", {
  "fileRegex": "\\.(roomodes|clinerules-.*|md|json|rooconfig\\.md)$",
  "description": "Mode configuration files, documentation, and configuration persistence"
}]
```

This allows the RooCommander to manage the `.rooconfig.md` file for configuration persistence.

### 3. Added Metadata

New metadata fields provide important context for the mode:

```json
"metadata": {
  "purpose": "configuration_assessment",
  "methodology": "what-how-what",
  "reference_docs_base": "custom-modes-pool/reference-docs/",
  "config_persistence": ".rooconfig.md"
}
```

These fields help:
- Define the methodology being used
- Specify the reference documentation location
- Identify the configuration persistence file

### 4. Enhanced Custom Instructions

The custom instructions have been substantially updated to:

1. Explicitly describe the phase sequence of the "What-How-What" methodology
2. Reference the hierarchical documentation structure
3. Mention configuration persistence using `.rooconfig.md`
4. Suggest creating missing reference documentation when needed

## Integration with System Prompt Architecture

The updated commander mode integrates with the component-based system prompt architecture by:

1. **Referencing Documentation Structure**: Directly mentioning the hierarchical path patterns
2. **Supporting Configuration Persistence**: Managing the `.rooconfig.md` file
3. **Following Methodology Phases**: Structuring assessment in the proper sequence

## Benefits of the Changes

1. **Explicit Methodology**: The role definition and custom instructions now explicitly describe the "What-How-What" methodology
2. **Documentation Integration**: Direct references to the hierarchical documentation structure
3. **Configuration Management**: Support for maintaining project configuration state
4. **Technology Focus**: Emphasis on technology-first assessment
5. **Component Compatibility**: Alignment with the modular component-based system prompt architecture

These changes ensure the RooCommander mode definition properly supports the new assessment methodology and integrates with the component-based system prompt architecture.