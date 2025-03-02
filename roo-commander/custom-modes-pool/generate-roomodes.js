/**
 * RooArmy Custom Modes - Configuration Generator
 * 
 * This script generates a .roomodes file from selected modes in the custom-modes-pool.
 * It can be used by the RooCommander or manually to create custom mode configurations.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const MODES_POOL_DIR = './custom-modes-pool';
const DEFAULT_OUTPUT_PATH = './.roomodes';

/**
 * Loads all available modes from the custom-modes-pool directory
 * @returns {Object} Object containing all available modes by category
 */
function loadAvailableModes() {
  const categories = {};
  
  // Read category files (skipping 00-index.json)
  const files = fs.readdirSync(MODES_POOL_DIR)
    .filter(file => file.endsWith('.json') && !file.startsWith('00-'));
  
  files.forEach(file => {
    const filePath = path.join(MODES_POOL_DIR, file);
    const categoryData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    categories[categoryData.category] = {
      description: categoryData.description,
      modes: categoryData.modes
    };
  });
  
  return categories;
}

/**
 * Generates a .roomodes file with selected modes
 * @param {Array} selectedModes Array of mode slugs to include
 * @param {string} outputPath Path to write the .roomodes file
 */
function generateRoomodesFile(selectedModes, outputPath = DEFAULT_OUTPUT_PATH) {
  const allModes = loadAvailableModes();
  const selectedModeObjects = [];
  
  // Find each selected mode in the categories
  Object.values(allModes).forEach(category => {
    category.modes.forEach(mode => {
      if (selectedModes.includes(mode.slug)) {
        selectedModeObjects.push(mode);
      }
    });
  });
  
  // Create the .roomodes content
  const roomodesContent = {
    customModes: selectedModeObjects
  };
  
  // Write the file
  fs.writeFileSync(
    outputPath, 
    JSON.stringify(roomodesContent, null, 2), 
    'utf8'
  );
  
  console.log(`Generated ${outputPath} with ${selectedModeObjects.length} modes:`);
  selectedModeObjects.forEach(mode => console.log(` - ${mode.name} (${mode.slug})`));
}

/**
 * Generates a recommended set of modes based on project type and team size
 * @param {Object} projectInfo Object containing project information
 * @returns {Array} Array of recommended mode slugs
 */
function generateRecommendation(projectInfo) {
  const { projectType, teamSize, experienceLevel, specialNeeds = [] } = projectInfo;
  
  // Always include the commander mode
  const recommended = ['commander'];
  
  // Core modes based on project type
  switch (projectType) {
    case 'web':
      recommended.push('architect', 'frontend', 'backend', 'qa');
      break;
    case 'mobile':
      recommended.push('architect', 'mobile', 'qa');
      break;
    case 'service':
      recommended.push('architect', 'backend', 'qa', 'devops');
      break;
    case 'library':
      recommended.push('architect', 'engineer', 'qa');
      break;
    default:
      recommended.push('architect', 'engineer', 'qa');
  }
  
  // Add specialized roles based on needs
  if (specialNeeds.includes('security')) {
    recommended.push('security');
  }
  
  if (specialNeeds.includes('performance')) {
    recommended.push('perf');
  }
  
  if (specialNeeds.includes('cloud')) {
    recommended.push('cloud');
  }
  
  if (specialNeeds.includes('documentation')) {
    recommended.push('writer');
  }
  
  if (specialNeeds.includes('learning')) {
    recommended.push('learn');
  }
  
  // Add or remove based on team size
  if (teamSize === 'solo') {
    // For solo developers, use full-stack instead of separate frontend/backend
    const index = recommended.indexOf('frontend');
    if (index !== -1) {
      recommended.splice(index, 1);
    }
    const backendIndex = recommended.indexOf('backend');
    if (backendIndex !== -1) {
      recommended.splice(backendIndex, 1);
    }
    if (!recommended.includes('engineer')) {
      recommended.push('engineer');
    }
  }
  
  // Limit number of roles based on team size
  const maxRoles = {
    'solo': 5,
    'small': 7,
    'medium': 10,
    'large': 15
  };
  
  const limit = maxRoles[teamSize] || 7;
  
  return recommended.slice(0, limit);
}

/**
 * Lists all available modes with descriptions
 */
function listAvailableModes() {
  const indexPath = path.join(MODES_POOL_DIR, '00-index.json');
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  
  console.log(`RooArmy Custom Modes Collection (v${index.version})`);
  console.log('='.repeat(50));
  console.log(index.description);
  console.log('-'.repeat(50));
  
  index.categories.forEach(category => {
    console.log(`\n## ${category.name}`);
    
    const categoryFile = path.join(MODES_POOL_DIR, category.file);
    const categoryData = JSON.parse(fs.readFileSync(categoryFile, 'utf8'));
    
    categoryData.modes.forEach(mode => {
      console.log(`\n- ${mode.name} (${mode.slug})`);
      console.log(`  ${mode.roleDefinition.split('.')[0]}.`);
    });
  });
}

// Export functions for use in other scripts
module.exports = {
  loadAvailableModes,
  generateRoomodesFile,
  generateRecommendation,
  listAvailableModes
};

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'list':
      listAvailableModes();
      break;
    case 'generate':
      const modes = args.slice(1);
      if (modes.length === 0) {
        console.error('Error: No modes specified. Usage: node generate-roomodes.js generate mode1 mode2 ...');
      } else {
        generateRoomodesFile(modes);
      }
      break;
    case 'recommend':
      const projectType = args[1] || 'web';
      const teamSize = args[2] || 'small';
      const recommended = generateRecommendation({ projectType, teamSize });
      console.log(`Recommended modes for ${projectType} project (${teamSize} team):`);
      recommended.forEach(mode => console.log(` - ${mode}`));
      console.log('\nTo generate .roomodes file with these recommendations:');
      console.log(`node generate-roomodes.js generate ${recommended.join(' ')}`);
      break;
    default:
      console.log('RooArmy Custom Modes - Configuration Generator');
      console.log('Usage:');
      console.log('  node generate-roomodes.js list                   - List all available modes');
      console.log('  node generate-roomodes.js generate mode1 mode2   - Generate .roomodes with specified modes');
      console.log('  node generate-roomodes.js recommend type size    - Get mode recommendations');
  }
}