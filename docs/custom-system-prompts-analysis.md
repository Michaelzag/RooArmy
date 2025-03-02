# Custom System Prompts in RooArmy: Analysis & Recommendations

## Executive Summary

This analysis evaluates how the custom system prompts feature in Roo-Code could integrate with and benefit the RooArmy project. While custom system prompts offer unprecedented control and specialization opportunities, they also introduce significant maintenance requirements and tradeoffs. This document presents a balanced assessment, identifying specific use cases where system prompt customization would provide substantial value while offering implementation recommendations that minimize downsides.

## Understanding the RooArmy Project

RooArmy is a sophisticated system for creating and managing professional custom modes in Roo. Key components include:

1. **RooCommander**: An assessment-driven guide that configures optimal custom modes for specific projects
2. **Mode Repository**: A comprehensive collection of professional development roles implemented as custom modes
3. **Assessment System**: An intelligent question framework that recommends appropriate modes
4. **Professional Role Modes**: Specialized modes covering various development roles (architects, engineers, security specialists, etc.)

The system is designed to transform Roo from a general-purpose assistant into a collection of specialized assistants tailored to specific roles in software development.

## Current Implementation of Custom System Prompts

The project already utilizes custom system prompts in at least one case:

- The `system-prompt-commander` in the roo-army-test directory implements a highly specialized workflow for the RooCommander
- This implementation replaces the standard system prompt with specialized sections like ASSESSMENT WORKFLOW and CONFIGURATION GENERATION
- It demonstrates the potential value of custom system prompts for specialized operational modes

## Potential Benefits for RooArmy

1. **Enhanced Role Specialization**
   - More deeply specialized professional roles through custom reasoning frameworks
   - Domain-specific knowledge injection directly into prompts
   - Streamlined tool usage patterns optimized for specific roles

2. **Methodology Enforcement**
   - Implement specific development methodologies within specialized roles (TDD, TOGAF, etc.)
   - Create custom decision trees unique to each professional role
   - Enforce best practices at the system prompt level

3. **Context Optimization**
   - Reduce context window consumption by eliminating unnecessary sections
   - Tailor prompts to focus only on tools and capabilities relevant to each role
   - Create more efficient operational models for specialized tasks

4. **User Experience Improvements**
   - More consistent behavior within specialized roles
   - More predictable output formats for specific tasks
   - Deeper expertise in narrow domains

## Significant Tradeoffs and Risks

1. **Maintenance Burden**
   - Each custom system prompt requires careful maintenance
   - Updates to Roo-Code may require updates to all custom system prompts
   - Risk of feature disparities between modes with and without custom prompts

2. **Tool Functionality Gaps**
   - Custom system prompts require reimplementation of tool instructions
   - Risk of incorrect tool usage if instructions are incomplete
   - Potential for inconsistent behavior across modes

3. **Quality Control Challenges**
   - Harder to ensure consistent quality across multiple custom prompts
   - Risk of removing important safety mechanisms
   - Testing burden increases significantly with each custom prompt

4. **Development Complexity**
   - Creating effective system prompts requires deep understanding of Roo's internals
   - Substantially higher skill requirement than creating custom modes or rules
   - Difficult to collaborate on or review effectively

## Strategic Recommendations

### 1. Selective Implementation Approach

Rather than implementing custom system prompts for all modes, adopt a selective approach based on these criteria:

- **Specialization Need**: Only use for roles requiring fundamentally different reasoning frameworks
- **Functionality Gap**: Implement where standard prompts severely limit role effectiveness
- **Value Ratio**: Ensure the benefits clearly outweigh the maintenance costs

### 2. Tiered Implementation Strategy

Create a three-tiered approach to role customization:

1. **Standard Tier**: Basic roles using only `.roomodes` and `.clinerules` (majority of roles)
2. **Enhanced Tier**: Moderately specialized roles using `.clinerules-[mode]` for additional guidelines
3. **Premium Tier**: Highly specialized roles using full custom system prompts (carefully selected)

### 3. Specific Role Recommendations

Based on the project's professional role modes, these roles would benefit most from custom system prompts:

| Role | Custom System Prompt Benefit | Justification |
|------|------------------------------|---------------|
| Solution Architect | HIGH | Requires specialized frameworks (TOGAF, C4, etc.) and decision trees |
| Security Engineer | HIGH | Benefits from embedded vulnerability patterns and security-specific workflows |
| SRE/DevOps Engineer | MEDIUM | Would benefit from operational runbooks and infrastructure patterns |
| QA Engineer | MEDIUM | Test methodology enforcement and quality evaluation frameworks |
| Other roles | LOW | Standard prompts with custom rules are sufficient |

### 4. Standardization Recommendations

To minimize maintenance burden while maximizing benefits:

1. **Create a Base Template**: Develop a standard base template that includes essential tool instructions
2. **Modular Design**: Build custom prompts from reusable, modular components
3. **Version Control**: Maintain strict versioning of all custom system prompts
4. **Documentation**: Document all deviations from standard prompts

## Implementation Plan

### Phase 1: Infrastructure and Standards

1. Create a `.roo` directory structure with version control
2. Develop base templates for custom system prompts
3. Document standards and best practices for prompt creation
4. Establish maintenance protocols for system prompt updates

### Phase 2: Priority Implementation

1. Extend the existing RooCommander custom prompt
2. Implement custom system prompts for Solution Architect and Security Engineer roles
3. Test and iterate on these high-value implementations
4. Document lessons learned and refine approach

### Phase 3: Evaluation and Expansion

1. Evaluate effectiveness of custom prompts vs. maintenance costs
2. Refine the criteria for custom prompt implementation
3. Selectively expand to additional roles based on refined criteria
4. Develop tools to assist with maintenance and updates

## Design Patterns for Custom System Prompts

### 1. Component-Based Architecture

```
You are Roo, a [role definition]...

====

TOOL ESSENTIALS
[Include standardized tool usage instructions from template]

====

SPECIALIZED METHODOLOGY
[Role-specific methodology section]

====

DOMAIN KNOWLEDGE
[Role-specific knowledge injection]
```

### 2. Decision Framework Pattern

```
====

DECISION FRAMEWORK

When evaluating [domain-specific artifacts], use this decision tree:
1. If [condition A] detected → apply [approach X]
2. If [condition B] present → recommend [approach Y]
...
```

### 3. Process Enforcement Pattern

```
====

WORKFLOW ENFORCEMENT

For all [role-specific tasks], follow this precise workflow:
1. ANALYSIS: [standardized analysis approach]
2. PLANNING: [role-specific planning methodology]
3. IMPLEMENTATION: [implementation guidelines]
4. VALIDATION: [validation criteria]
```

## Example Implementation: Security Engineer

To illustrate how custom system prompts could enhance RooArmy, here's a sample implementation for the Security Engineer role:

```
You are Roo, a specialized Security Engineer with extensive experience in identifying vulnerabilities, implementing secure coding practices, and conducting security audits. Your expertise spans web application security, API security, infrastructure security, and data protection.

====

TOOL ESSENTIALS

You have access to a set of tools that are executed upon the user's approval. You can use one tool per message, and will receive the result of that tool use in the user's response. Always use tools in this sequence:

1. DISCOVERY: search_files → read_file → list_files → list_code_definition_names
2. ANALYSIS: For each file: read_file → search_files (for related code)
3. REMEDIATION: apply_diff → search_and_replace → insert_content → write_to_file
4. VALIDATION: execute_command → browser_action (if necessary)

Tool use is formatted using XML-style tags:

<read_file>
<path>src/auth/login.js</path>
</read_file>

====

SECURITY AUDIT FRAMEWORK

For every security assessment:

1. THREAT MODELING
   - Identify assets and their sensitivity level
   - Map potential threat actors and their capabilities
   - Document trust boundaries and data flows
   - Prioritize threats by impact and likelihood

2. VULNERABILITY SCANNING
   Always scan code for these vulnerability patterns:
   - Injection (SQL, NoSQL, OS command, LDAP)
   - Broken authentication mechanisms
   - Sensitive data exposure
   - XML External Entities (XXE)
   - Broken access control
   - Security misconfigurations
   - Cross-Site Scripting (XSS)
   - Insecure deserialization
   - Using components with known vulnerabilities
   - Insufficient logging and monitoring

3. REPORTING
   For each vulnerability found:
   - Assign CVSS score (Common Vulnerability Scoring System)
   - Provide exact location of vulnerable code
   - Explain potential exploit scenario
   - Suggest remediation with code example
   - Offer testing steps to verify the fix

====

SECURITY DECISION FRAMEWORK

When evaluating code or architecture for security issues:

1. If user input is processed → verify input validation and sanitization
2. If authentication is present → check for secure password storage, MFA options, and session management
3. If authorization is implemented → verify principle of least privilege and proper access controls
4. If data storage is involved → check for encryption at rest and proper key management
5. If data is transmitted → verify TLS usage and proper certificate validation
6. If APIs are exposed → check for rate limiting, proper authentication, and input validation
7. If third-party components are used → verify versions against known vulnerabilities
```

This example demonstrates how a custom system prompt can:
- Define specialized security workflows and thought processes
- Embed specific vulnerability patterns directly in the prompt
- Create a structured approach for security analysis
- Optimize tool usage for security-specific tasks
- Implement security-specific decision frameworks

## Conclusion

Custom system prompts offer a powerful enhancement to RooArmy's professional role specialization capabilities. However, the significant maintenance burden and potential for inconsistency necessitate a selective, strategic approach to implementation.

By carefully choosing which roles receive full system prompt customization, standardizing prompt components, and following structured implementation patterns, RooArmy can leverage this capability to create truly exceptional specialized modes while maintaining overall system coherence and quality.

The recommended approach balances the power of complete customization with the practicality of sustainable maintenance, offering the best of both worlds for the most critical roles while using less intensive customization methods for the majority of professional modes.