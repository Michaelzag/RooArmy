/**
 * RooCommander Questions.json Assembly Script
 * 
 * This script assembles the questions.json file from components in .roo/question-components/
 */

const fs = require('fs');
const path = require('path');

// Get the script directory path
const scriptDir = __dirname;
// Get project root (assuming script is in /scripts directory)
const projectRoot = path.resolve(scriptDir, '..');

// Source and destination paths
const sourceDir = path.join(projectRoot, 'roo-commander', '.roo', 'question-components');
const destFile = path.join(projectRoot, 'roo-commander', 'questions.json');

// Helper functions
function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`Error loading JSON from ${filePath}: ${err.message}`);
    return null;
  }
}

// Main function to assemble questions.json
function assembleQuestions() {
  console.log('Assembling questions.json from components...');

  try {
    // Create the base structure
    const questions = {
      "assessment": {
        "phase1_technology": {},
        "phase2_project_complexity": {},
        "phase3_development_experience": {}, // New unified approach
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

    // Load phase1 technology
    const phase1File = path.join(sourceDir, 'phase1_technology.json');
    if (fs.existsSync(phase1File)) {
      const phase1Data = loadJSON(phase1File);
      if (phase1Data) {
        questions.assessment.phase1_technology = phase1Data;
      }
    }

    // Load phase2 complexity
    const phase2File = path.join(sourceDir, 'phase2_complexity.json');
    if (fs.existsSync(phase2File)) {
      const phase2Data = loadJSON(phase2File);
      if (phase2Data) {
        questions.assessment.phase2_project_complexity = phase2Data;
      }
    }

    // Load phase3 development experience (new unified approach)
    const phase3File = path.join(sourceDir, 'phase3_development_experience.json');
    if (fs.existsSync(phase3File)) {
      const phase3Data = loadJSON(phase3File);
      if (phase3Data) {
        questions.assessment.phase3_development_experience = phase3Data;
      }
    } else {
      // Fallback to old team/solo split for backward compatibility
      console.log('- Using fallback team/solo structure (backward compatibility)');
      const oldPhase3File = path.join(sourceDir, 'phase3_team_focus.json');
      if (fs.existsSync(oldPhase3File)) {
        const oldPhase3Data = loadJSON(oldPhase3File);
        if (oldPhase3Data) {
          // For backward compatibility, keep these fields
          questions.assessment.phase3_roles_focus = oldPhase3Data.team || {};
          questions.assessment.phase3_solo_focus = oldPhase3Data.solo || {};
        }
      }
    }

    // Load phase4 development focus
    const phase4File = path.join(sourceDir, 'phase4_development_focus.json');
    if (fs.existsSync(phase4File)) {
      const phase4Data = loadJSON(phase4File);
      if (phase4Data) {
        questions.assessment.phase4_development_focus = phase4Data;
      }
    }

    // Load phase5 existing project
    const phase5File = path.join(sourceDir, 'phase5_existing_project.json');
    if (fs.existsSync(phase5File)) {
      const phase5Data = loadJSON(phase5File);
      if (phase5Data) {
        questions.assessment.phase5_existing_project = phase5Data;
      }
    }

    // Load phase6 mode customization
    const phase6File = path.join(sourceDir, 'phase6_wizard_customization.json');
    if (fs.existsSync(phase6File)) {
      const phase6Data = loadJSON(phase6File);
      if (phase6Data) {
        questions.assessment.phase6_mode_customization = phase6Data;
      }
    }

    // Load phase transitions
    const transitionsFile = path.join(sourceDir, 'phase_transitions.json');
    if (fs.existsSync(transitionsFile)) {
      const transitionsData = loadJSON(transitionsFile);
      if (transitionsData) {
        questions.assessment.phase_transitions = transitionsData;
      }
    }

    // Write the assembled questions.json
    fs.writeFileSync(destFile, JSON.stringify(questions, null, 2));
    console.log(`Successfully assembled questions.json to ${destFile}`);
    return true;
  } catch (err) {
    console.error(`Error assembling questions.json: ${err.message}`);
    return false;
  }
}

// Execute the assembly function
assembleQuestions();