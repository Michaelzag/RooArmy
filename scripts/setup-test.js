/**
 * RooCommander Test Environment Setup Script
 * 
 * This script creates a clean test environment by:
 * 1. Creating the necessary directory structure
 * 2. Copying essential files from roo-commander to roo-army-test
 * 3. Setting up the component-based system prompt architecture
 * 4. Assembling the system prompt from components
 * 5. Copying the handoff system files and structure
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
  'questions.json',
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
    // Component files in order (must match what was in assemble-components.sh)
    const componentFiles = [
      'header.txt',
      'assessment-framework.txt',
      'technology-identification.txt',
      'team-structure.txt',
      'reference-documentation.txt',
      'configuration-persistence.txt',
      'mode-selection.txt',
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

// Main setup function
async function setupTest() {
  try {
    console.log(`Setting up test environment in ${testDir}...`);
    console.log(`Source directory: ${sourceDir}`);

    // Create test directory if it doesn't exist
    ensureDir(testDir);
    
    // Create .roo directory structure
    ensureDir(path.join(testDir, '.roo'));
    ensureDir(path.join(testDir, '.roo', 'components'));
    
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
    
    // Copy essential reference files from custom-modes-pool
    const essentialFiles = [
      ['00-index.json', ''],
      ['README.md', ''],
      ['reference-docs/00-schema.md', 'reference-docs/']
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

    console.log('\nTest environment setup complete!');
    console.log(`Test environment path: ${testDir}`);
    console.log('You can now open roo-army-test/ in a new window and test the RooCommander.');
    
  } catch (error) {
    console.error('Error during test setup:', error);
  }
}

// Execute the setup
setupTest();