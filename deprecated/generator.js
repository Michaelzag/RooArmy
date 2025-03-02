/**
 * RooCommander - Configuration Generator
 * 
 * This script helps the RooCommander generate .roomodes files based on assessment results.
 * It analyzes responses to questions, calculates mode scores, and selects the appropriate
 * modes from the custom-modes-pool directory.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const MODES_POOL_DIR = '../custom-modes-pool';
const DEFAULT_OUTPUT_PATH = './.roomodes';

/**
 * Loads all available modes from the custom-modes-pool directory
 * @returns {Object} Object containing all available modes by slug
 */
function loadAllModes() {
  const modesBySlug = {};
  
  // Read all category files (skipping 00-index.json)
  const files = fs.readdirSync(MODES_POOL_DIR)
    .filter(file => file.endsWith('.json') && !file.startsWith('00-'));
  
  files.forEach(file => {
    const filePath = path.join(MODES_POOL_DIR, file);
    const categoryData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    categoryData.modes.forEach(mode => {
      modesBySlug[mode.slug] = mode;
    });
  });
  
  return modesBySlug;
}

/**
 * Loads the assessment questions
 * @returns {Object} Assessment questions and logic
 */
function loadAssessmentQuestions() {
  const questionsPath = path.join(__dirname, 'questions.json');
  return JSON.parse(fs.readFileSync(questionsPath, 'utf8')).assessment;
}

/**
 * Calculates mode scores based on assessment responses
 * @param {Object} responses Object containing question responses
 * @returns {Object} Object with mode scores
 */
function calculateModeScores(responses) {
  const assessment = loadAssessmentQuestions();
  const scores = {};
  
  // Initialize with essential modes
  assessment.mode_selection_logic.essential_modes.forEach(mode => {
    scores[mode] = 5; // Essential modes start with a high score
  });
  
  // Process responses and their impacts
  Object.entries(responses).forEach(([questionId, response]) => {
    // Find the question
    const question = [...assessment.initial_questions, ...assessment.follow_up_questions]
      .find(q => q.id === questionId);
    
    if (!question || !question.mode_impacts) return;
    
    // Single response
    if (typeof response === 'string' && question.mode_impacts[response]) {
      question.mode_impacts[response].forEach(impact => {
        const [mode, scoreChange] = impact.split('+');
        scores[mode] = (scores[mode] || 0) + parseInt(scoreChange);
      });
    }
    
    // Multiple responses
    if (Array.isArray(response)) {
      response.forEach(value => {
        if (question.mode_impacts[value]) {
          question.mode_impacts[value].forEach(impact => {
            const [mode, scoreChange] = impact.split('+');
            scores[mode] = (scores[mode] || 0) + parseInt(scoreChange);
          });
        }
      });
    }
  });
  
  // Apply experience level adjustments
  if (responses.experience_level) {
    const mappings = assessment.mode_selection_logic.experience_mappings[responses.experience_level];
    if (mappings) {
      // Add modes
      mappings.add?.forEach(mode => {
        scores[mode] = (scores[mode] || 0) + 3;
      });
      
      // Remove modes
      mappings.remove?.forEach(mode => {
        delete scores[mode];
      });
    }
  }
  
  return scores;
}

/**
 * Selects modes based on scores and team size constraints
 * @param {Object} scores Mode scores
 * @param {string} teamSize Team size (solo, small, medium, large)
 * @returns {Array} Selected mode slugs
 */
function selectModes(scores, teamSize) {
  const assessment = loadAssessmentQuestions();
  const threshold = assessment.mode_selection_logic.threshold;
  
  // Filter modes by threshold
  const selectedModes = Object.entries(scores)
    .filter(([_, score]) => score >= threshold)
    .sort((a, b) => b[1] - a[1]) // Sort by score (descending)
    .map(([mode]) => mode);
  
  // Apply team size constraints
  const maxModes = assessment.mode_selection_logic.team_size_mappings[teamSize]?.max_modes || 7;
  
  return selectedModes.slice(0, maxModes);
}

/**
 * Generates a .roomodes file based on assessment responses
 * @param {Object} responses Assessment responses
 * @param {string} outputPath Path to write the .roomodes file
 * @returns {Array} Selected mode slugs
 */
function generateFromAssessment(responses, outputPath = DEFAULT_OUTPUT_PATH) {
  // Calculate scores
  const scores = calculateModeScores(responses);
  
  // Select modes based on scores and team size
  const selectedModes = selectModes(scores, responses.team_size);
  
  // Always include commander in the results
  if (!selectedModes.includes('commander')) {
    selectedModes.unshift('commander');
  }
  
  // Generate the .roomodes file
  generateRoomodesFile(selectedModes, outputPath);
  
  return selectedModes;
}

/**
 * Generates a .roomodes file with selected modes
 * @param {Array} selectedModes Array of mode slugs to include
 * @param {string} outputPath Path to write the .roomodes file
 */
function generateRoomodesFile(selectedModes, outputPath = DEFAULT_OUTPUT_PATH) {
  const allModes = loadAllModes();
  
  // Commander mode is special and not in the pool
  let commanderMode;
  if (selectedModes.includes('commander')) {
    const commanderPath = path.join(__dirname, 'commander.json');
    commanderMode = JSON.parse(fs.readFileSync(commanderPath, 'utf8'));
    // Remove commander from the list to avoid duplicates
    selectedModes = selectedModes.filter(mode => mode !== 'commander');
  }
  
  // Get the selected mode objects from the pool
  const modeObjects = selectedModes
    .filter(slug => allModes[slug]) // Filter out modes that don't exist
    .map(slug => allModes[slug]);
  
  // Add commander mode if it was selected
  if (commanderMode) {
    modeObjects.unshift(commanderMode);
  }
  
  // Create the .roomodes content
  const roomodesContent = {
    customModes: modeObjects
  };
  
  // Write the file
  fs.writeFileSync(
    outputPath, 
    JSON.stringify(roomodesContent, null, 2), 
    'utf8'
  );
  
  console.log(`Generated ${outputPath} with ${modeObjects.length} modes:`);
  modeObjects.forEach(mode => console.log(` - ${mode.name} (${mode.slug})`));
}

/**
 * Explains the recommended modes and their purposes
 * @param {Array} selectedModes Array of selected mode slugs
 * @returns {string} Explanation of the recommended modes
 */
function explainRecommendation(selectedModes) {
  const allModes = loadAllModes();
  
  // Commander mode is special and not in the pool
  let commanderMode;
  if (selectedModes.includes('commander')) {
    const commanderPath = path.join(__dirname, 'commander.json');
    commanderMode = JSON.parse(fs.readFileSync(commanderPath, 'utf8'));
  }
  
  let explanation = "Based on your responses, I recommend the following custom modes:\n\n";
  
  // Add commander mode explanation if selected
  if (commanderMode && selectedModes.includes('commander')) {
    explanation += `1. **${commanderMode.name}** (${commanderMode.slug}): For configuration and mode selection\n`;
    selectedModes = selectedModes.filter(mode => mode !== 'commander');
  }
  
  // Add explanations for the rest of the modes
  let counter = commanderMode ? 2 : 1;
  selectedModes.forEach(slug => {
    const mode = allModes[slug];
    if (mode) {
      // Extract first sentence of the role definition
      const firstSentence = mode.roleDefinition.split('.')[0] + '.';
      explanation += `${counter}. **${mode.name}** (${mode.slug}): ${firstSentence}\n`;
      counter++;
    }
  });
  
  explanation += "\nEach mode has appropriate file access restrictions and tool permissions based on its intended use.";
  
  return explanation;
}

// Export functions for use in other scripts
module.exports = {
  loadAllModes,
  loadAssessmentQuestions,
  calculateModeScores,
  selectModes,
  generateFromAssessment,
  generateRoomodesFile,
  explainRecommendation
};

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'demo':
      // Demo with sample responses
      const sampleResponses = {
        project_type: 'web',
        frontend_framework: 'react',
        backend_tech: 'node',
        team_size: 'small',
        experience_level: 'intermediate',
        development_focus: ['features', 'refactoring'],
        specialized_needs: ['docs', 'testing']
      };
      
      const selectedModes = generateFromAssessment(sampleResponses);
      console.log('\nRecommendation Explanation:');
      console.log(explainRecommendation(selectedModes));
      break;
    default:
      console.log('RooCommander - Configuration Generator');
      console.log('Usage:');
      console.log('  node generator.js demo   - Run a demo with sample responses');
  }
}