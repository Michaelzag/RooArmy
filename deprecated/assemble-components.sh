#!/bin/bash
# Script to assemble component files into complete system-prompt-commander

COMPONENTS_DIR="components"
OUTPUT_FILE="system-prompt-commander"
TEMP_FILE="system-prompt-temp"

echo "Assembling RooCommander system prompt components..."

# Start with header
cat "$COMPONENTS_DIR/header.txt" > "$TEMP_FILE"
echo "" >> "$TEMP_FILE"
echo "====" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"
echo "TOOL ESSENTIALS" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"
echo "[Tool essentials section is added from the system]" >> "$TEMP_FILE"

# Add assessment framework
cat "$COMPONENTS_DIR/assessment-framework.txt" >> "$TEMP_FILE"

# Add technology identification
cat "$COMPONENTS_DIR/technology-identification.txt" >> "$TEMP_FILE"

# Add team structure
cat "$COMPONENTS_DIR/team-structure.txt" >> "$TEMP_FILE"

# Add reference documentation
cat "$COMPONENTS_DIR/reference-documentation.txt" >> "$TEMP_FILE"

# Add configuration persistence
cat "$COMPONENTS_DIR/configuration-persistence.txt" >> "$TEMP_FILE"

# Add mode selection
cat "$COMPONENTS_DIR/mode-selection.txt" >> "$TEMP_FILE"

# Add safety rules
cat "$COMPONENTS_DIR/safety-rules.txt" >> "$TEMP_FILE"

# Move to final file
mv "$TEMP_FILE" "$OUTPUT_FILE"

echo "System prompt assembled to $OUTPUT_FILE"
echo "NOTE: The TOOL ESSENTIALS section is a placeholder and should be replaced with the actual tool descriptions from the system."