# RooCommander User Flow

This document outlines the typical conversation flow between a user and the RooCommander mode, illustrating how the assessment, recommendation, and configuration generation process works.

## Conversation Flow

```mermaid
sequenceDiagram
    actor User
    participant Roo as RooCommander Mode
    participant Assessment as Assessment Engine
    participant Generator as Configuration Generator
    
    User->>Roo: Request to set up custom modes
    Note over Roo: Introduces purpose and process
    
    Roo->>User: Ask about project type
    User->>Roo: Provide project type
    
    Roo->>User: Ask about team size
    User->>Roo: Provide team size
    
    Roo->>User: Ask about experience level
    User->>Roo: Provide experience level
    
    Note over Roo: Determines follow-up questions based on responses
    
    loop Follow-up Questions
        Roo->>User: Ask follow-up question
        User->>Roo: Provide response
    end
    
    Roo->>Assessment: Process responses
    Assessment->>Roo: Calculate mode scores
    
    Roo->>User: Present recommended modes
    User->>Roo: Approve or adjust recommendations
    
    Roo->>Generator: Generate configuration
    Generator->>Roo: Return configuration content
    
    Roo->>User: Present and explain configuration
    User->>Roo: Final approval
    
    Note over Roo: Writes .roomodes file
```

## Assessment Logic Flow

```mermaid
flowchart TD
    start[Start Assessment] --> initialQ[Ask Initial Questions]
    initialQ --> project[Project Type]
    initialQ --> team[Team Size]
    initialQ --> exp[Experience Level]
    
    project --> followup{Determine Follow-ups}
    team --> followup
    exp --> followup
    
    followup --> techQ[Technology Questions]
    followup --> roleQ[Team Role Questions]
    followup --> focusQ[Focus Questions]
    followup --> needsQ[Specialized Needs Questions]
    
    techQ & roleQ & focusQ & needsQ --> scoring[Score Calculation]
    
    scoring --> addEssential[Add Essential Modes]
    addEssential --> calculateImpacts[Calculate Mode Impacts]
    calculateImpacts --> expAdjust[Experience-Based Adjustments]
    
    expAdjust --> thresholdFilter[Filter by Threshold]
    thresholdFilter --> teamSizeLimit[Apply Team Size Limits]
    
    teamSizeLimit --> recommendation[Generate Recommendations]
    recommendation --> explanation[Prepare Explanations]
    explanation --> endPoint[Present Results]
```

## Mode Selection Process

```mermaid
flowchart LR
    responses[Assessment Responses] --> scoring{Score Calculation}
    
    scoring --> frontend[Frontend Score]
    scoring --> backend[Backend Score]
    scoring --> architect[Architect Score]
    scoring --> qa[QA Score]
    scoring --> security[Security Score]
    scoring --> devops[DevOps Score]
    scoring --> writer[Writer Score]
    scoring --> other[Other Scores...]
    
    frontend & backend & architect & qa & security & devops & writer & other --> threshold{Apply Threshold}
    
    threshold --> selected[Selected Modes]
    threshold --> rejected[Rejected Modes]
    
    selected --> teamSize{Team Size Filter}
    
    teamSize --> final[Final Modes]
    
    final --> commander[Add Commander]
    
    commander --> config[Generate Configuration]
```

## Question Branching Logic

```mermaid
flowchart TD
    start[Start] --> projectType{Project Type?}
    
    projectType -->|Web| web[Web Questions]
    projectType -->|Mobile| mobile[Mobile Questions]
    projectType -->|Service| service[Service Questions]
    projectType -->|CLI| cli[CLI Questions]
    projectType -->|Library| library[Library Questions]
    projectType -->|Enterprise| enterprise[Enterprise Questions]
    
    web --> frontend[Frontend Framework]
    web --> backendTech[Backend Technology]
    
    mobile --> mobilePlatform[Mobile Platform]
    
    service --> database[Database]
    
    cli & library --> language[Programming Language]
    
    enterprise --> architecture[Architectural Approach]
    
    frontend & backendTech & mobilePlatform & database & language & architecture --> teamSize{Team Size?}
    
    teamSize -->|Solo| soloExp[Experience Level]
    teamSize -->|Small| smallExp[Experience Level]
    teamSize -->|Medium| mediumExp[Experience Level]
    teamSize -->|Large| largeExp[Experience Level]
    
    soloExp --> soloDev[Development Focus]
    
    smallExp --> teamRoles[Team Roles]
    
    mediumExp --> mediumRoles[Team Roles]
    mediumExp --> methodology[Development Methodology]
    
    largeExp --> largeRoles[Team Roles]
    largeExp --> largeMethod[Development Methodology]
    largeExp --> specialized[Specialized Needs]
    
    soloDev & teamRoles & mediumRoles & largeRoles & methodology & largeMethod & specialized --> finish[Complete Assessment]
```

## Configuration Generation

```mermaid
flowchart TD
    start[Start Generation] --> loadModes[Load All Available Modes]
    loadModes --> calculateScores[Calculate Mode Scores]
    calculateScores --> selectModes[Select Modes Based on Scores]
    selectModes --> addCommander[Add Commander Mode]
    addCommander --> generateFile[Generate .roomodes File]
    generateFile --> explainConfig[Explain Configuration]
    explainConfig --> endPoint[Complete]
```

## RooCommander Decision Tree

```mermaid
graph TD
    A[User Request] --> B{Project Type}
    B -->|Web| C1[Web Flow]
    B -->|Mobile| C2[Mobile Flow]
    B -->|Service| C3[Service Flow]
    B -->|CLI| C4[CLI Flow]
    B -->|Library| C5[Library Flow]
    B -->|Enterprise| C6[Enterprise Flow]
    
    C1 --> D1{Frontend?}
    D1 -->|React| E1[React]
    D1 -->|Vue| E2[Vue]
    D1 -->|Angular| E3[Angular]
    D1 -->|Other| E4[Other]
    
    C1 --> D2{Backend?}
    D2 -->|Node| F1[Node]
    D2 -->|Python| F2[Python]
    D2 -->|Java| F3[Java]
    D2 -->|Other| F4[Other]
    
    E1 & E2 & E3 & E4 & F1 & F2 & F3 & F4 --> G{Team Size}
    C2 & C3 & C4 & C5 & C6 --> G
    
    G -->|Solo| H1[Solo Flow]
    G -->|Small| H2[Small Team Flow]
    G -->|Medium| H3[Medium Team Flow]
    G -->|Large| H4[Large Team Flow]
    
    H1 & H2 & H3 & H4 --> I{Experience Level}
    
    I -->|Beginner| J1[Learning Focus]
    I -->|Intermediate| J2[Dev Focus]
    I -->|Advanced| J3[Specialized Needs]
    I -->|Mixed| J4[Learning Support]
    
    J1 & J2 & J3 & J4 --> K[Calculate Recommendations]
    K --> L[Generate Configuration]