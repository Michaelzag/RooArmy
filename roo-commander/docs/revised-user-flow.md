# Revised RooCommander User Flow

This document outlines the revised conversation flow between a user and the RooCommander mode, implementing the "What-How-What" structure and improved configuration management.

## Technology-First Conversation Flow

```mermaid
sequenceDiagram
    actor User
    participant Roo as RooCommander Mode
    participant ConfigFile as Configuration File
    participant RefDocs as Reference Docs
    participant Generator as Mode Generator
    
    User->>Roo: Request to set up custom modes
    
    alt Existing Configuration
        Roo->>ConfigFile: Check for existing configuration
        ConfigFile->>Roo: Return existing settings
        Roo->>User: Ask if updating existing or creating new
    else New Configuration
        Roo->>User: Introduce purpose and process
    end
    
    Note over Roo: Phase 1 - Primary Technology (First "What")
    
    Roo->>User: Ask about main programming language
    User->>Roo: Provide main language
    
    Roo->>User: Ask about primary frameworks
    User->>Roo: Provide framework information
    
    Roo->>User: Ask about project type
    User->>Roo: Provide project type
    
    Note over Roo: Phase 2 - Team Structure ("How")
    
    Roo->>User: Ask about team size
    User->>Roo: Provide team size
    
    Roo->>User: Ask about development methodology
    User->>Roo: Provide methodology
    
    Roo->>User: Ask about experience level
    User->>Roo: Provide experience level
    
    Note over Roo: Phase 3 - Detailed Technology (Second "What")
    
    Roo->>User: Request package file if available
    User->>Roo: Provide package information
    
    Roo->>RefDocs: Check for reference documentation
    
    alt Reference Docs Available
        RefDocs->>Roo: Return matching reference docs
    else Docs Not Available
        Roo->>User: Offer to create reference documentation
        User->>Roo: Approve documentation creation
        Roo->>RefDocs: Generate new reference documentation
    end
    
    Note over Roo: Phase 4 - Recommendations & Configuration
    
    Roo->>Generator: Generate mode recommendations
    Generator->>Roo: Return recommended modes
    
    Roo->>User: Present recommended modes
    User->>Roo: Approve or adjust recommendations
    
    Roo->>Generator: Generate final configuration
    Generator->>Roo: Return configuration
    
    Roo->>ConfigFile: Save configuration for future use
    Roo->>User: Present and explain configuration
    
    User->>Roo: Final approval
```

## Revised Assessment Logic

```mermaid
flowchart TD
    start[Start Assessment] --> checkConfig[Check for Existing Configuration]
    
    checkConfig -->|New| langQ[Ask About Primary Language]
    checkConfig -->|Existing| updateQ{Update or Replace?}
    updateQ -->|Update| loadPrevious[Load Previous Settings]
    updateQ -->|Replace| langQ
    
    langQ --> frameworkQ[Ask About Frameworks]
    frameworkQ --> projectTypeQ[Ask About Project Type]
    
    projectTypeQ --> teamSizeQ[Ask About Team Size]
    teamSizeQ --> methodologyQ[Ask About Methodology]
    methodologyQ --> expLevelQ[Ask About Experience Level]
    
    expLevelQ --> packageCheck[Request Package Information]
    packageCheck --> refDocCheck[Check Reference Documentation]
    
    refDocCheck -->|Available| techProfile[Build Technology Profile]
    refDocCheck -->|Not Available| createDoc[Offer to Create Documentation]
    createDoc --> techProfile
    
    techProfile --> modeScoring[Calculate Mode Scores]
    modeScoring --> techModes[Select Technology-Specific Modes]
    techModes --> roleModes[Select Role-Based Modes]
    
    roleModes --> recommendations[Generate Recommendations]
    recommendations --> userReview[User Review]
    userReview -->|Adjustments| adjustRecs[Adjust Recommendations]
    userReview -->|Approved| finalConfig[Generate Final Configuration]
    adjustRecs --> finalConfig
    
    finalConfig --> saveConfig[Save Configuration File]
    saveConfig --> presentation[Present Results]
```

## Configuration Persistence Management

```mermaid
flowchart LR
    userInteraction[User Interaction] --> configCheck{Config Exists?}
    
    configCheck -->|Yes| loadConfig[Load Existing Config]
    configCheck -->|No| newConfig[Start New Config]
    
    loadConfig --> parseSettings[Parse Saved Settings]
    parseSettings --> relevanceCheck{Still Relevant?}
    
    relevanceCheck -->|Yes| prepopulate[Pre-populate Responses]
    relevanceCheck -->|Partially| hybridApproach[Hybrid Approach]
    relevanceCheck -->|No| newConfig
    
    prepopulate & hybridApproach & newConfig --> assessment[Conduct Assessment]
    
    assessment --> generateConfig[Generate Configuration]
    generateConfig --> configHistory[Update Config History]
    configHistory --> saveConfig[Save to .rooconfig.md]
    
    saveConfig --> userExplain[Explain to User]
```

## Reference Documentation Workflow

```mermaid
flowchart TD
    start[Start Doc Process] --> techIdentify[Identify Technology & Version]
    techIdentify --> docCheck{Reference Doc Exists?}
    
    docCheck -->|Yes| useExisting[Use Existing Documentation]
    docCheck -->|No| createOptions[Present Creation Options]
    
    createOptions --> autoOption[Automatic with ask_perplexity]
    createOptions --> assistedOption[Assisted Creation]
    createOptions --> manualOption[Manual Template]
    
    autoOption --> apiCheck{API Available?}
    apiCheck -->|Yes| apiGenerate[Generate via API]
    apiCheck -->|No| fallbackOptions[Fallback Options]
    
    assistedOption --> userGuidance[Guide User Through Creation]
    manualOption --> provideTemplate[Provide Template]
    
    apiGenerate & userGuidance & provideTemplate --> validateDoc[Validate Documentation]
    fallbackOptions --> assistedOption
    
    validateDoc --> saveDoc[Save to Reference Docs]
    saveDoc --> useExisting
    
    useExisting --> applyToModes[Apply to Mode Selection]
```

## Mode Reconfiguration Scenarios

```mermaid
flowchart TD
    start[Start Reconfiguration] --> assessChange{Change Type?}
    
    assessChange -->|Minor| minorPath[Minor Changes Path]
    assessChange -->|Major| majorPath[Major Changes Path]
    
    minorPath --> loadCurrent[Load Current Configuration]
    minorPath --> presentCurrent[Show Current Settings]
    presentCurrent --> targetedQuestions[Ask Targeted Questions]
    targetedQuestions --> updateSpecific[Update Specific Modes]
    
    majorPath --> preserveContext[Preserve Key Context]
    majorPath --> fullReassessment[Conduct Full Reassessment]
    preserveContext --> suggestBaseline[Suggest Baseline from Previous]
    
    updateSpecific & fullReassessment --> generateNew[Generate New Configuration]
    suggestBaseline --> fullReassessment
    
    generateNew --> diffChanges[Show Configuration Differences]
    diffChanges --> updateHistory[Update Configuration History]
    updateHistory --> saveConfig[Save New Configuration]
```

## Package Analysis Strategy

```mermaid
flowchart LR
    start[Start Analysis] --> sourceIdentify{Source?}
    
    sourceIdentify -->|Package File| parseFile[Parse Package File]
    sourceIdentify -->|User Input| collectInfo[Collect Package Info]
    sourceIdentify -->|Project Scan| scanProject[Scan Project Files]
    
    parseFile & collectInfo & scanProject --> extractCore[Extract Core Dependencies]
    
    extractCore --> versionCheck[Check Versions]
    versionCheck --> compatCheck[Compatibility Analysis]
    compatCheck --> issueDetect{Issues Found?}
    
    issueDetect -->|Yes| severityCheck{Severity?}
    issueDetect -->|No| proceedNormal[Proceed Normally]
    
    severityCheck -->|Critical| blockProceed[Block & Explain]
    severityCheck -->|Warning| warnUser[Warn But Allow]
    severityCheck -->|Info| noteIssue[Note in Recommendations]
    
    blockProceed --> suggestFix[Suggest Fixes]
    warnUser & noteIssue --> techProfile[Build Technology Profile]
    suggestFix --> userDecision{User Decision}
    
    userDecision -->|Override| warnUser
    userDecision -->|Fix| restartCheck[Restart Check]
    
    proceedNormal --> techProfile
    restartCheck --> versionCheck
    
    techProfile --> modeMatch[Match to Technology Modes]
    modeMatch --> customizeInstructions[Customize Mode Instructions]
    customizeInstructions --> complete[Complete Analysis]