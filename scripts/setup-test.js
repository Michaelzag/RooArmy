/**
 * RooCommander Test Environment Setup Script
 * 
 * This script creates a clean test environment by:
 * 1. Creating the necessary directory structure
 * 2. Copying essential files from roo-commander to roo-army-test
 * 3. Setting up the component-based system prompt and questions architecture
 * 4. Assembling the system prompt from components
 * 5. Assembling the questions.json from components
 * 6. Copying the handoff system files and structure
 */

const fs = require('fs');
const path = require('path');

// Get the script directory path
const scriptDir = __dirname;
// Get project root (assuming script is in /scripts directory)
const projectRoot = path.resolve(scriptDir, '..');

// Directory paths (relative to this script's location)
const sourceDir = path.join(projectRoot, 'roo-commander');
const testDir = path.join(projectRoot, 'roo-army-test');

// Files to copy to test directory
const filesToCopy = [
  'commander.json',
  // 'questions.json', // We'll create this from components
  'rooconfig-template.md',
  '.roomodes',
  'README.md',
  '.clinerules-commander'
  // 'system-prompt-commander' - We'll create this by assembling components
];

// Create directories if they don't exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`- Created directory: ${dirPath}`);
  }
}

// Helper function to recursively copy a directory
function copyDir(src, dest) {
  ensureDir(dest);
  
  try {
    let entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
      let srcPath = path.join(src, entry.name);
      let destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error(`- Error copying directory: ${err.message}`);
  }
}

// Safely delete a file if it exists
function safeDeleteFile(filePath) {
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (err) {
    console.log(`- Warning: Could not delete file ${filePath}: ${err.message}`);
  }
  return false;
}

// Function to assemble system prompt from components
function assembleSystemPrompt(componentsDir, outputFile) {
  console.log('- Assembling system prompt from components...');
  
  try {
    // Component files in order (updated for flexible LLM-driven approach)
    const componentFiles = [
      'header.txt',
      'project-analysis.txt',
      'assessment-framework.txt',
      'assessment-flowchart.txt',      // Added flowchart component
      'complexity-assessment.txt',
      'technology-identification.txt',
      'solo-developer.txt',
      'wizard-customization.txt',
      'development-philosophy.txt',
      'existing-project.txt',
      'dynamic-mode-generation.txt',    // Add the new dynamic approach
      'mode-selection.txt',            // Keep for backward compatibility
      'safety-rules.txt'
    ];
    
    // Start with header
    let content = '';
    
    try {
      content = fs.readFileSync(path.join(componentsDir, 'header.txt'), 'utf8');
    } catch (err) {
      console.error(`- Error reading header.txt: ${err.message}`);
      return false;
    }
    
    // Add tool essentials section
    content += "\n\n====\n\nTOOL ESSENTIALS\n\n[Tool essentials section is added from the system]\n\n";
    
    // Add remaining components
    for (let i = 1; i < componentFiles.length; i++) {
      try {
        const componentPath = path.join(componentsDir, componentFiles[i]);
        if (fs.existsSync(componentPath)) {
          const componentContent = fs.readFileSync(componentPath, 'utf8');
          content += componentContent;
        } else {
          console.error(`- Warning: Component file not found: ${componentPath}`);
        }
      } catch (err) {
        console.error(`- Error reading component file ${componentFiles[i]}: ${err.message}`);
      }
    }
    
    // Write to output file
    fs.writeFileSync(outputFile, content);
    console.log(`- System prompt assembled to ${outputFile}`);
    return true;
  } catch (err) {
    console.error(`- Error assembling system prompt: ${err.message}`);
    return false;
  }
}

// Function to assemble questions.json from components
function assembleQuestions(componentsDir, outputFile) {
  console.log('- Assembling questions.json from components...');
  
  try {
    // Create the base structure
    const questions = {
      "assessment": {
        "phase1_technology": {},
        "phase2_project_complexity": {},
        "phase3_development_experience": {}, 
        "phase4_development_focus": {},
        "phase5_existing_project": {},
        "phase6_mode_customization": {},
        "phase_transitions": {},
        "reference_doc_mapping": {
          "pattern": "languages/{primary_language}/{type}/{framework}/{framework}-v{version}.md",
          "fallback_strategy": "closest_version",
          "creation_support": true
        },
        "mode_selection_logic": {
          "threshold": 3,
          "essential_modes": ["commander", "engineer"],
          "base_mode_limit": 7,
          "handoff_modes": ["handoff-manager", "milestone-manager", "session-restorer"],
          "mode_groups": {
            "planning": ["architect", "ui", "api"],
            "implementation": ["engineer", "frontend", "backend", "mobile", "dba"],
            "quality": ["qa", "security", "perf"],
            "operations": ["devops", "sre", "cloud"],
            "documentation": ["writer", "learn", "analyst"],
            "handoff": ["handoff-manager", "milestone-manager", "session-restorer"],
            "specialized": ["framework-tester", "vibemode", "user-story", "reviewer", "experimental"]
          }
        }
      }
    };
    
    // Helper function to load JSON
    function loadJSON(filePath) {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (err) {
        console.error(`- Error loading JSON from ${filePath}: ${err.message}`);
        return null;
      }
    }

    // Load phase1 technology
    const phase1File = path.join(componentsDir, 'phase1_technology.json');
    if (fs.existsSync(phase1File)) {
      const phase1Data = loadJSON(phase1File);
      if (phase1Data) {
        questions.assessment.phase1_technology = phase1Data;
      }
    } else {
      console.error(`- Critical component missing: phase1_technology.json not found in ${componentsDir}`);
    }

    // Load phase2 complexity
    const phase2File = path.join(componentsDir, 'phase2_complexity.json');
    if (fs.existsSync(phase2File)) {
      const phase2Data = loadJSON(phase2File);
      if (phase2Data) {
        questions.assessment.phase2_project_complexity = phase2Data;
      }
    } else {
      console.error(`- Critical component missing: phase2_complexity.json not found in ${componentsDir}`);
    }

    // Load phase3 development experience (solo-first unified approach)
    const phase3File = path.join(componentsDir, 'phase3_development_experience.json');
    if (fs.existsSync(phase3File)) {
      const phase3Data = loadJSON(phase3File);
      if (phase3Data) {
        questions.assessment.phase3_development_experience = phase3Data;
      }
    } else {
      console.error(`- Critical component missing: phase3_development_experience.json not found in ${componentsDir}`);
      // Do not fall back to the deprecated team/solo approach
      // Add placeholder for required section
      questions.assessment.phase3_development_experience = {
        "title": "Developer Experience",
        "description": "Your development experience and learning interests",
        "transition_message": "Let's discuss your development experience and learning interests.",
        "questions": []
      };
    }

    // Load phase4 development focus
    const phase4File = path.join(componentsDir, 'phase4_development_focus.json');
    if (fs.existsSync(phase4File)) {
      const phase4Data = loadJSON(phase4File);
      if (phase4Data) {
        questions.assessment.phase4_development_focus = phase4Data;
      }
    } else {
      console.error(`- Critical component missing: phase4_development_focus.json not found in ${componentsDir}`);
    }

    // Load phase5 existing project
    const phase5File = path.join(componentsDir, 'phase5_existing_project.json');
    if (fs.existsSync(phase5File)) {
      const phase5Data = loadJSON(phase5File);
      if (phase5Data) {
        questions.assessment.phase5_existing_project = phase5Data;
      }
    } else {
      console.error(`- Critical component missing: phase5_existing_project.json not found in ${componentsDir}`);
    }

    // Load phase6 mode customization
    const phase6File = path.join(componentsDir, 'phase6_wizard_customization.json');
    if (fs.existsSync(phase6File)) {
      const phase6Data = loadJSON(phase6File);
      if (phase6Data) {
        questions.assessment.phase6_mode_customization = phase6Data;
      }
    } else {
      console.error(`- Critical component missing: phase6_wizard_customization.json not found in ${componentsDir}`);
    }

    // Load phase transitions
    const transitionsFile = path.join(componentsDir, 'phase_transitions.json');
    if (fs.existsSync(transitionsFile)) {
      const transitionsData = loadJSON(transitionsFile);
      if (transitionsData) {
        questions.assessment.phase_transitions = transitionsData;
      }
    } else {
      console.error(`- Critical component missing: phase_transitions.json not found in ${componentsDir}`);
    }

    // Write the assembled questions.json
    fs.writeFileSync(outputFile, JSON.stringify(questions, null, 2));
    console.log(`- Questions.json assembled to ${outputFile}`);
    return true;
  } catch (err) {
    console.error(`- Error assembling questions.json: ${err.message}`);
    return false;
  }
}

// Main setup function
async function setupTest() {
  try {
    console.log(`Setting up RooCommander test environment in ${testDir}...`);
    console.log(`Source directory: ${sourceDir}`);

    // Create test directory if it doesn't exist
    ensureDir(testDir);
    
    // Create .roo directory structure
    ensureDir(path.join(testDir, '.roo'));
    ensureDir(path.join(testDir, '.roo', 'components'));
    ensureDir(path.join(testDir, '.roo', 'question-components'));
    
    // Create minimal custom-modes-pool structure
    ensureDir(path.join(testDir, 'custom-modes-pool'));
    ensureDir(path.join(testDir, 'custom-modes-pool', 'reference-docs'));
    ensureDir(path.join(testDir, 'custom-modes-pool', 'reference-docs-old'));
    
    // Copy main files
    filesToCopy.forEach(file => {
      try {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(testDir, file);
        
        // Skip files that don't exist in source
        if (!fs.existsSync(sourcePath)) {
          console.log(`- Warning: Source file not found: ${sourcePath}`);
          return;
        }
        
        // Delete destination file if it exists
        safeDeleteFile(destPath);
        
        // Copy the file
        fs.copyFileSync(sourcePath, destPath);
        console.log(`- Copied ${file}`);
      } catch (err) {
        console.error(`- Error copying ${file}: ${err.message}`);
      }
    });

    // Explicitly check for and delete any existing questions.json in the test directory
    const existingQuestionsPath = path.join(testDir, 'questions.json');
    if (fs.existsSync(existingQuestionsPath)) {
      console.log('- Found existing questions.json in test directory, removing it.');
      safeDeleteFile(existingQuestionsPath);
    }

    // Explicitly check for and delete any existing questions.json in the source directory
    const sourceQuestionsPath = path.join(sourceDir, 'questions.json');
    if (fs.existsSync(sourceQuestionsPath)) {
      console.log('- WARNING: Found questions.json in source directory. This should be generated from components only.');
      // We don't delete from source, just log a warning
    }

    // Copy handoffs directory with all its contents
    try {
      const sourceHandoffsDir = path.join(sourceDir, 'handoffs');
      const targetHandoffsDir = path.join(testDir, 'handoffs');
      
      if (fs.existsSync(sourceHandoffsDir)) {
        // Ensure the target directory exists
        ensureDir(targetHandoffsDir);
        
        // Use the recursive copyDir function to copy the entire structure
        copyDir(sourceHandoffsDir, targetHandoffsDir);
        console.log('- Copied handoffs system directory and all contents');
      } else {
        console.log(`- Warning: Handoffs directory not found: ${sourceHandoffsDir}`);
      }
    } catch (err) {
      console.error(`- Error copying handoffs directory: ${err.message}`);
    }
    
    // Copy .roo/components directory
    try {
      const sourceComponentsDir = path.join(sourceDir, '.roo', 'components');
      const targetComponentsDir = path.join(testDir, '.roo', 'components');
      
      if (fs.existsSync(sourceComponentsDir)) {
        copyDir(sourceComponentsDir, targetComponentsDir);
        console.log('- Copied component files');
      } else {
        console.error(`- Source component directory not found: ${sourceComponentsDir}`);
      }
    } catch (err) {
      console.error(`- Error copying component files: ${err.message}`);
    }
    
    // Copy .roo/question-components directory
    try {
      const sourceQuestionComponentsDir = path.join(sourceDir, '.roo', 'question-components');
      const targetQuestionComponentsDir = path.join(testDir, '.roo', 'question-components');
      
      if (fs.existsSync(sourceQuestionComponentsDir)) {
        copyDir(sourceQuestionComponentsDir, targetQuestionComponentsDir);
        console.log('- Copied question component files');
      } else {
        console.error(`- Source question component directory not found: ${sourceQuestionComponentsDir}`);
      }
    } catch (err) {
      console.error(`- Error copying question component files: ${err.message}`);
    }
    
    // Copy README.md for components
    try {
      const sourceReadme = path.join(sourceDir, '.roo', 'README.md');
      const targetReadme = path.join(testDir, '.roo', 'README.md');
      
      if (fs.existsSync(sourceReadme)) {
        // Delete destination file if it exists
        safeDeleteFile(targetReadme);
        
        fs.copyFileSync(sourceReadme, targetReadme);
        console.log('- Copied component README.md');
      } else {
        console.log(`- Warning: Component README.md not found: ${sourceReadme}`);
      }
    } catch (err) {
      console.error(`- Error copying component README.md: ${err.message}`);
    }
    
    // Assemble the system prompt from components
    const componentsDir = path.join(testDir, '.roo', 'components');
    const systemPromptFile = path.join(testDir, 'system-prompt-commander');
    
    // Delete existing system-prompt-commander if it exists
    safeDeleteFile(systemPromptFile);
    
    // Assemble the system prompt
    if (assembleSystemPrompt(componentsDir, systemPromptFile)) {
      console.log('- Successfully assembled system prompt');
    } else {
      console.error('- Error assembling system prompt');
    }
    
    // Assemble the questions.json from components
    const questionComponentsDir = path.join(testDir, '.roo', 'question-components');
    const questionsFile = path.join(testDir, 'questions.json');
    
    // Delete existing questions.json if it exists (again, for safety)
    safeDeleteFile(questionsFile);
    
    // Verify question components exist in the test directory
    if (!fs.existsSync(questionComponentsDir)) {
      console.error(`- ERROR: Question components directory not found: ${questionComponentsDir}`);
      console.error('- Cannot assemble questions.json without components');
    } else {
      // List components to verify they were copied correctly
      console.log('- Question components found in test directory:');
      try {
        const files = fs.readdirSync(questionComponentsDir);
        files.forEach(file => console.log(`  - ${file}`));
      } catch (err) {
        console.error(`- Error listing question components: ${err.message}`);
      }
      
      // Assemble the questions.json
      if (assembleQuestions(questionComponentsDir, questionsFile)) {
        console.log('- Successfully assembled questions.json');
      } else {
        console.error('- Error assembling questions.json');
      }
    }
    
    // Copy entire reference-docs directory recursively
    try {
      const sourceRefDocsDir = path.join(sourceDir, 'custom-modes-pool', 'reference-docs');
      const targetRefDocsDir = path.join(testDir, 'custom-modes-pool', 'reference-docs');
      
      if (fs.existsSync(sourceRefDocsDir)) {
        // Ensure the target directory exists
        ensureDir(targetRefDocsDir);
        
        // Use the recursive copyDir function to copy the entire structure
        copyDir(sourceRefDocsDir, targetRefDocsDir);
        console.log('- Copied complete reference-docs directory and all contents');
      } else {
        console.log(`- Warning: Reference-docs directory not found: ${sourceRefDocsDir}`);
      }
    } catch (err) {
      console.error(`- Error copying reference-docs directory: ${err.message}`);
    }
    
    // Copy other essential files from custom-modes-pool
    const essentialFiles = [
      ['README.md', '']
      // Note: 00-index.json is deprecated in favor of dynamic mode generation
    ];
    
    essentialFiles.forEach(([file, subdir]) => {
      try {
        const sourceFile = path.join(sourceDir, 'custom-modes-pool', subdir, path.basename(file));
        const destFile = path.join(testDir, 'custom-modes-pool', subdir, path.basename(file));
        
        if (fs.existsSync(sourceFile)) {
          ensureDir(path.dirname(destFile));
          
          // Delete destination file if it exists
          safeDeleteFile(destFile);
          
          fs.copyFileSync(sourceFile, destFile);
          console.log(`- Copied ${file} to custom-modes-pool/${subdir}`);
        } else {
          console.log(`- Warning: Reference file not found: ${sourceFile}`);
        }
      } catch (err) {
        console.error(`- Error copying ${file}: ${err.message}`);
      }
    });
    
    // Create dummy .rooconfig.md that's explicitly placeholder data
    try {
      const dummyConfigContent = `# PLACEHOLDER CONFIGURATION FILE
      
# IMPORTANT: THIS IS NOT A REAL PROJECT CONFIGURATION

This file exists solely to prevent error messages during setup.
It contains NO actual project data and should NOT be used for
technology detection or project analysis.

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*                                                         *
*  DO NOT USE THIS FILE FOR TECHNOLOGY DETECTION          *
*  DO NOT INFER ANY PROJECT DETAILS FROM THIS FILE        *
*  THIS FILE WILL BE REPLACED DURING ACTUAL CONFIGURATION *
*                                                         *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

## Placeholder Only
Created: ${new Date().toISOString().split('T')[0]}
Purpose: Prevent configuration-related errors during testing
Action: This file should be ignored during project analysis`;
      
      const configFile = path.join(testDir, '.rooconfig.md');
      fs.writeFileSync(configFile, dummyConfigContent);
      console.log('- Created placeholder .rooconfig.md file');
    } catch (err) {
      console.error(`- Error creating placeholder .rooconfig.md: ${err.message}`);
    }

    console.log('\nRooCommander test environment setup complete!');
    console.log(`Test environment path: ${testDir}`);
    console.log('You can now open roo-army-test/ in a new window and test the RooCommander.');
    
  } catch (error) {
    console.error('Error during test setup:', error);
  }
}

// Execute the setup
setupTest();