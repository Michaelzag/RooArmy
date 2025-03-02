# Custom System Prompts in Roo-Code: Pushing the Limits

After analyzing the codebase and documentation, here's an in-depth technical guide on custom system prompts and how to maximize their potential.

## Understanding Custom System Prompts

Custom system prompts are a powerful feature that allows you to completely replace the default system prompt used by Roo. Unlike custom rules (`.clinerules`) which add to the existing prompt, custom system prompts give you full control over the LLM's foundational instructions.

### What You're Replacing

When using a custom system prompt, you're replacing the entire standard system prompt structure that includes these critical sections:

- **TOOL USE**: Detailed instructions for using tools like `read_file`, `write_to_file`, `apply_diff`, etc.
- **CAPABILITIES**: Descriptions of Roo's abilities and limitations
- **MODES**: Definitions of different operational modes and their behaviors
- **RULES**: Core rules governing Roo's behavior and constraints
- **SYSTEM INFORMATION**: Environment details and operational context
- **OBJECTIVE**: Task execution framework and approach

### Key Implementation Details

1. **Storage Location**: `.roo/system-prompt-[mode slug]` in your workspace root
2. **Loading Process**: Implemented in `src/core/prompts/sections/custom-system-prompt.ts`
3. **Preservation**: Only preserves the role definition and custom instructions
4. **Hierarchy**: Takes precedence over all standard prompt sections

## Custom System Prompts vs. Custom Rules

| Feature | Custom Rules (`.clinerules`) | Custom System Prompts |
|---------|------------------------------|------------------------|
| **Purpose** | Add guidelines within standard structure | **Replace** the entire system prompt |
| **Integration** | Added to CUSTOM INSTRUCTIONS section | Overrides the core system sections |
| **Capabilities** | Preserves default tools and operations | Requires explicit respecification |
| **Control Level** | Limited to adding rules | Complete control over instructions |
| **Complexity** | Simpler to implement | More powerful but requires deeper understanding |

## Tradeoffs When Using Custom System Prompts

Replacing the standard system prompt involves significant tradeoffs that should be carefully considered:

### What You Gain

1. **Complete Control**: Define exactly how Roo should behave, reason, and approach problems
2. **Specialized Behavior**: Create domain-specific assistants with focused capabilities
3. **Custom Methodologies**: Implement specific development methodologies not covered in standard prompts
4. **Optimized Context Usage**: Remove irrelevant sections to save context window tokens
5. **Tailored Decision Frameworks**: Implement custom decision trees and evaluation criteria

### What You Lose

1. **Standard Tool Instructions**: You'll need to reimplement instructions for any tools you want to use
   ```
   # Example of standard tool instructions you'd need to reimplement:
   
   TOOL USE
   
   You have access to a set of tools that are executed upon the user's approval.
   You can use one tool per message, and will receive the result of that tool use
   in the user's response.
   
   # Tool Use Formatting
   
   Tool use is formatted using XML-style tags. The tool name is enclosed in opening
   and closing tags, and each parameter is similarly enclosed within its own set of tags.
   
   <read_file>
   <path>src/main.js</path>
   </read_file>
   ```

2. **Default Safety Mechanisms**: Standard guardrails and safety checks are removed
   ```
   # Example safety rule you'd lose:
   
   - When making changes to code, always consider the context in which the code is
     being used. Ensure that your changes are compatible with the existing codebase
     and that they follow the project's coding standards and best practices.
   ```

3. **Feature Updates**: Custom prompts won't automatically benefit from Roo updates
4. **Tool Guidance**: Clear examples and best practices for each tool
5. **Error Handling**: Standard error management and resolution paths

## Real-World Example

The `system-prompt-commander` from the roo-army-test directory demonstrates this feature in action:

```
You are Roo in RooCommander mode, a specialized configuration assistant...

====

CAPABILITIES

You have access to the following resources and capabilities:
- Two JSON repositories: modes.json and questions.json
...

====

OBJECTIVE
...

====

ASSESSMENT WORKFLOW
...
```

Note how it:
1. Maintains the role definition at the top
2. Uses `====` section breaks like the standard prompt
3. Creates custom sections relevant to its specialized purpose
4. Defines a completely unique behavioral framework

## How to Push Custom System Prompts to Their Limits

### 1. Complete System Redefinition

You can redefine Roo's entire operational framework:

```
You are Roo, a specialized [your definition]...

====

SPECIALIZED REASONING FRAMEWORK

For all tasks, follow this custom reasoning pattern:
1. ANALYSIS: [custom analysis approach]
2. PLANNING: [custom planning methodology]
...

====

CUSTOM TOOL USAGE PROTOCOL

Tools will be used in these specific sequences:
[define your custom tool chains]
...
```

### 2. Mode-Specific Operational Models

Create fundamentally different operational models for different modes:

- **Architect Mode**: Use TOGAF architecture patterns and document templates
- **Code Mode**: Implement custom test-driven development workflows
- **Debug Mode**: Create specialized diagnostic frameworks with custom reporting

### 3. Domain-Specific Knowledge Injection

Embed specialized domain knowledge directly in the system prompt:

```
====

SECURITY VULNERABILITY PATTERNS

Always scan code for these specific vulnerability patterns:
1. [Pattern A description and detection signals]
2. [Pattern B with remediation approaches]
...
```

### 4. Custom Decision Trees

Implement decision trees that govern how Roo handles specific situations:

```
====

RESPONSE DECISION FRAMEWORK

When evaluating code, use this decision tree:
1. If pattern X detected → apply solution Y
2. If condition Z present → recommend approach W
...
```

### 5. Specialized Methodology Enforcement

Enforce domain-specific methodologies not covered in the standard prompt:

```
====

BACKEND DEVELOPMENT METHODOLOGY

For all database operations:
1. Always use parameterized queries
2. Implement proper transaction boundaries
3. Apply the Repository pattern for data access
...
```

## Implementation Guide

1. **Create Directory**: Make a `.roo` folder in your workspace root
2. **Create File**: Add a `system-prompt-[mode]` file (e.g., `system-prompt-code`)
3. **Add Content**: 
   - Start with your role definition
   - Use `====` to separate sections
   - Define custom sections
   - Reimplement necessary tool instructions
4. **Pair with Custom Mode**: Create matching `.roomodes` and `.clinerules-[mode]` files

## Best Practices

1. **Preserve Tool Functionality**: Carefully redefine tool usage to maintain functionality
2. **Document Everything**: Create clear documentation for custom prompts
3. **Version Control**: Keep custom prompts in version control
4. **Layer with Custom Modes**: Combine with custom modes for full customization
5. **Test Thoroughly**: Verify that custom prompts produce expected behavior

## Potential Pitfalls

1. **Tool Accessibility**: Custom prompts don't override tool permissions from mode configuration
2. **Missing Sections**: Omitting critical sections may cause unexpected behavior
3. **Context Window Consumption**: Very large custom prompts reduce available tokens
4. **Maintenance Burden**: Custom prompts require updating if the core system changes

## Conclusion

Custom system prompts represent the ultimate level of customization in Roo-Code. While standard custom rules are sufficient for most needs, custom system prompts allow you to fundamentally transform how Roo operates for specialized use cases. By combining them with custom modes and file restrictions, you can create highly specialized AI assistants tailored to specific domains, methodologies, or workflows.