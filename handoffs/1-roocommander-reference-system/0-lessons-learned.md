# RooCommander Reference System Lessons Learned

## Reference Documentation Structure

**Problem:** Flat file structure became unwieldy as reference documentation expanded to multiple versions of 55+ technologies

**Solution:**
- Implemented hierarchical directory structure (languages/javascript/frontend/react/)
- Categorized technologies by type (languages, databases, cloud, tools)
- Maintained consistent file naming convention within directories ([technology]-v[version].md)
- Enabled easier navigation and discovery of related technologies

## Version-Specific Guidance

**Problem:** Generic technology documentation lacks crucial version-specific details needed for accurate guidance

**Solution:**
- Created standardized schema with dedicated sections for version-specific features
- Added "Differences From Previous Version" section for migration guidance
- Included specific version numbers for dependencies
- Documented version-specific best practices and anti-patterns

## Reference Path Resolution

**Problem:** Locating the correct reference documentation in hierarchical structure required complex path resolution

**Solution:**
- Implemented path construction based on technology type:
  ```
  Language frameworks: reference-docs/languages/[language]/[frontend|backend]/
  Databases: reference-docs/databases/[type]/
  Cloud: reference-docs/cloud/[category]/
  ```
- Created decision trees for path traversal based on technology identification
- Added fallback mechanisms for missing documentation
- Implemented closest version matching when exact match unavailable

## Custom System Prompt Architecture

**Problem:** Monolithic system prompts are difficult to maintain and update

**Solution:**
- Created component-based architecture with separate files for each section
- Organized components in logical sequence following assessment workflow
- Enabled independent updates to specific components
- Maintained consistent formatting and structure across components
- Used modular sections for easier testing and validation

## "What-How-What" Assessment Methodology

**Problem:** Traditional assessment approaches often focus on team structure before understanding technical context

**Solution:**
- Implemented technology-first approach with three phases:
  1. **First "What"**: Primary technology identification
  2. **"How"**: Team structure and development approach
  3. **Second "What"**: Detailed technology profile
- Enforced strict sequence in conversation flow
- Used technical context to inform team structure recommendations
- Made mode selection technology-driven with team-based adjustments

## Configuration Persistence

**Problem:** Configuration choices needed to be preserved and evolved as projects develop

**Solution:**
- Created standardized .rooconfig.md format with:
  - Project profile section
  - Team structure section
  - Selected modes listing
  - Configuration history
  - Reference documentation paths
- Used human-readable Markdown for easy manual editing
- Implemented change detection for incremental updates
- Created classification system for minor vs. major changes

## Reusable Patterns

1. **Hierarchical Organization Pattern**
   - Group related items in logical directory hierarchy
   - Use consistent naming conventions at each level
   - Provide navigation aids between levels
   - Balance depth vs. breadth for optimal discovery

2. **Component-Based System Design**
   - Split complex systems into discrete, single-purpose components
   - Maintain consistent interfaces between components
   - Enable independent testing and validation
   - Allow replacement of individual components without system redesign

3. **Technology-First Assessment Flow**
   - Start with concrete technical details before abstract concepts
   - Use identified technologies to inform subsequent questions
   - Build technological context incrementally before addressing process
   - Map specific technologies to specialized knowledge sources

4. **Decision Tree Navigation**
   - Create explicit decision paths for common scenarios
   - Use contextual clues to select appropriate paths
   - Provide fallback options for unexpected cases
   - Document decision criteria for future reference