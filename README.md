# RooArmy: Advanced Custom Mode Configuration System
# This isn't really a fully functional project yet. It's a concept of an idea, and i've done some light testing. Use it at your own risk. 

RooArmy is a sophisticated system for creating and managing professional custom modes in Roo AI Assistant. It offers an intelligent, assessment-driven approach to configuring Roo for specific development environments, teams, and projects.

## Project Overview

The core concept behind RooArmy is to transform Roo from a general-purpose AI assistant into a collection of specialized assistants, each designed for specific professional roles in software development. These specialized modes work together seamlessly, allowing users to switch between roles as their tasks change.

## Key Components

### 1. RooCommander

At the heart of RooArmy is the **RooCommander** - a specialized custom mode that guides users through configuring the optimal set of custom modes for their specific project:

- Conducts structured assessments to understand project requirements
- Analyzes team composition and development practices
- Recommends appropriate modes based on assessment results
- Generates properly configured .roomodes and .clinerules files

### 2. Mode Repository (modes.json)

A comprehensive collection of professional software development roles, each implemented as a custom mode with:

- Specialized role definitions
- Appropriate tool group restrictions
- Detailed metadata about use cases and dependencies
- Customized rules templates

### 3. Assessment System (questions.json)

An intelligent question framework that:

- Asks targeted questions about project type, team size, and experience levels
- Follows branching paths based on responses
- Calculates scores for each mode based on answers
- Applies adjustments based on experience level and team size

### 4. Testing Environment (roo-army-test)

A sandbox for testing and refining the RooCommander and its configurations.

## Professional Role Modes

RooArmy implements a diverse range of professional software engineering roles, including:

- **Solution Architect**: Designs system architecture and makes strategic technology decisions
- **Software Engineer**: Implements features and maintains code quality
- **Frontend Engineer**: Specializes in UI implementation and client-side functionality
- **Backend Engineer**: Focuses on server-side logic, APIs, and data management
- **Site Reliability Engineer**: Ensures system stability, performance, and scalability
- **Security Engineer**: Identifies vulnerabilities and implements security controls
- **QA Engineer**: Creates test strategies and ensures software quality
- **DevOps Engineer**: Automates workflows and manages deployment processes
- **Database Administrator**: Optimizes database performance and ensures data integrity

...and many other specialized roles.

## How It Works

1. The user activates the RooCommander mode
2. RooCommander conducts an assessment through targeted questions
3. Based on answers, RooCommander recommends appropriate modes
4. After user review and adjustments, it generates configuration files
5. The user can now switch between specialized modes based on their current task

## Usage

To use RooArmy:

1. Activate the RooCommander mode:
   ```
   /mode commander
   ```

2. Begin the assessment:
   ```
   I'd like to set up custom modes for my development project.
   ```

3. Answer the questions about your project type, team size, development practices, etc.

4. Review the recommended modes and make any adjustments

5. Let the RooCommander generate your custom configuration

6. Start using your specialized modes by switching between them as needed

## Design Principles

RooArmy follows several key design principles:

1. **Professional Role Specialization**: Each mode represents a distinct professional role with specific responsibilities
   
2. **Natural Workflow Integration**: Modes are designed to work together in a typical development workflow

3. **Appropriate Access Restrictions**: Each mode has carefully tailored file access permissions

4. **Intelligent Recommendations**: The system recommends modes based on specific project needs

5. **Flexibility and Customization**: Users can adjust recommendations to match their specific requirements

## Extending RooArmy

The system is designed to be extensible:

- Add new professional roles to modes.json
- Modify the assessment logic in questions.json
- Create new .clinerules files for specialized guidance
- Customize role definitions for specific domains

## Getting Started

To begin using RooArmy, simply add the .roomodes file from this project to your repository and activate the commander mode. Follow the guided assessment process to create your own custom configuration.

---

RooArmy turns Roo into a collaborative team of specialized AI assistants, each with their own professional identity, expertise, and responsibilities - working together to help you build better software.
