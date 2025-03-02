# RooArmy Custom Modes Pool

This directory contains a comprehensive collection of custom modes for Roo AI Assistant, organized by functional categories. Each file contains a group of related modes that can be combined to create tailored mode configurations for specific projects.

## Directory Structure

- `00-index.json` - Metadata about the collection and category information
- `01-configuration.json` - Configuration and assessment modes
- `02-planning-design.json` - Architecture and design-focused modes
- `03-implementation.json` - Development and implementation modes
- `04-quality-security.json` - Testing, QA, and security modes
- `05-operations.json` - Deployment and infrastructure modes
- `06-documentation.json` - Documentation and support modes
- `generate-roomodes.js` - Utility script to generate .roomodes files

## Custom Modes Generator Script

The `generate-roomodes.js` script helps you create `.roomodes` files from the mode pool. It can be used both by the RooCommander and manually to generate configurations.

### Prerequisites

- Node.js installed on your system

### Basic Usage

**List all available modes:**
```bash
node generate-roomodes.js list
```

**Generate a .roomodes file with specific modes:**
```bash
node generate-roomodes.js generate commander architect engineer qa
```

**Get mode recommendations based on project type and team size:**
```bash
node generate-roomodes.js recommend web small
```

### Advanced Usage

The script can also be used programmatically in other Node.js scripts:

```javascript
const { generateRoomodesFile, generateRecommendation } = require('./generate-roomodes.js');

// Generate recommendations
const projectInfo = {
  projectType: 'web',
  teamSize: 'small',
  experienceLevel: 'intermediate',
  specialNeeds: ['security', 'documentation']
};
const recommended = generateRecommendation(projectInfo);

// Generate .roomodes file with recommended modes
generateRoomodesFile(recommended);
```

### Customizing the Output

By default, the script creates the `.roomodes` file in the current directory. You can specify a different output path:

```bash
node generate-roomodes.js generate architect engineer qa --output ./my-project/.roomodes
```

Or programmatically:

```javascript
generateRoomodesFile(['architect', 'engineer', 'qa'], './my-project/.roomodes');
```

## Integration with RooCommander

The RooCommander mode uses this script to generate recommended mode configurations based on assessment responses. When the RooCommander analyzes project requirements, it:

1. Collects information about the project type, team size, and special needs
2. Uses the `generateRecommendation` function to determine appropriate modes
3. Calls `generateRoomodesFile` to create the configuration
4. Explains the recommended modes to the user

## Extending the Mode Pool

To add new modes to the pool:

1. Identify the appropriate category file
2. Add your new mode definition following the existing format
3. Update the `00-index.json` file to include the new mode in the category listing


```First Query - Version and Overview:

What are the most recent version details for [Technology] as of February 2025? 
Please provide:
- Latest version number and release date
- Brief description of the technology's purpose and positioning
- Major features introduced in this version
Second Query - Detailed Implementation Information:

For [Technology] version [X.Y.Z], please provide detailed information about:
- Key features specific to this version
- Best practices recommended for developers
- Related packages and dependencies with version numbers
- File types commonly used with this technology
- Skills required for developers to work effectively with it
- Major differences from the previous version
```

## Example Workflow

A typical workflow for using this system:

1. Use the RooCommander to assess project needs and generate an initial configuration
2. As project needs evolve, manually add or remove specific modes
3. Switch between roles as different development tasks arise

You can also use the script to create different configurations for different phases of your project.