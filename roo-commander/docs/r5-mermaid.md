# RooCommander Flow with Adaptive Exploration

```mermaid
flowchart TD
    Start([Begin]) --> PreConversation["Open-ended Project Discussion"]
    PreConversation --> ExtractInfo["Information Extraction"]
    
    %% First Breakout Point - Initial Understanding
    ExtractInfo --> NeedMoreContext{"Need more context?"}
    NeedMoreContext -->|Yes| CustomQuestions1["Ask Custom Questions"]
    CustomQuestions1 --> GatherInsights1["Gather Additional Insights"]
    GatherInsights1 --> UserReliance
    NeedMoreContext -->|No| UserReliance
    
    UserReliance["User Reliance Assessment"] --> CalibrateDepth["Calibrate Assessment Depth"]
    
    %% PHASE 1: TECHNOLOGY IDENTIFICATION
    CalibrateDepth --> TechPhase["Phase 1: Technology Identification"]
    TechPhase --> ProjectType["Project Context Assessment"]
    ProjectType --> LangFramework["Language & Framework Discovery"]
    
    %% Second Breakout Point - Technology Details
    LangFramework --> TechGaps{"Technology gaps?"}
    TechGaps -->|Yes| CustomQuestions2["Ask Technology-specific Questions"]
    CustomQuestions2 --> GatherInsights2["Explore Technical Requirements"]
    GatherInsights2 --> DBStorage
    TechGaps -->|No| DBStorage
    
    DBStorage["Storage & Database Assessment"] --> TechSummary["Technology Summary"]
    TechSummary --> TechConfirm{"Confirmation"}
    
    TechConfirm -->|No| TechRevision["Technology Revision"]
    TechRevision --> TechSummary
    
    %% PHASE 2: COMPLEXITY ASSESSMENT
    TechConfirm -->|Yes| ComplexityPhase["Phase 2: Complexity Assessment"]
    ComplexityPhase --> PatternAssessment["Pattern Familiarity Assessment"]
    PatternAssessment --> SolutionClarity["Solution Clarity Assessment"]
    
    %% Third Breakout Point - Complexity Understanding
    SolutionClarity --> ComplexityGaps{"Complexity unclear?"}
    ComplexityGaps -->|Yes| CustomQuestions3["Ask Complexity-specific Questions"]
    CustomQuestions3 --> GatherInsights3["Explore Project Challenges"]
    GatherInsights3 --> IterationExpectation
    ComplexityGaps -->|No| IterationExpectation
    
    IterationExpectation["Iteration Assessment"] --> ComplexityDerivation["Complexity Classification"]
    ComplexityDerivation --> DevApproach["Development Approach Assessment"]
    DevApproach --> QualitySpeedBalance["Quality/Speed Balance"]
    QualitySpeedBalance --> HandoffNeeds["Handoff Needs Assessment"]
    HandoffNeeds --> ComplexitySummary["Complexity Summary"]
    ComplexitySummary --> ComplexityConfirm{"Confirmation"}
    
    ComplexityConfirm -->|No| ComplexityRevision["Complexity Revision"]
    ComplexityRevision --> ComplexitySummary
    
    %% PHASE 3: EXPERIENCE ASSESSMENT
    ComplexityConfirm -->|Yes| ExperiencePhase["Phase 3: Experience Assessment"]
    ExperiencePhase --> NarrativeExperience["Narrative Experience Discussion"]
    
    %% Fourth Breakout Point - Experience Exploration
    NarrativeExperience --> ExperienceGaps{"Experience details needed?"}
    ExperienceGaps -->|Yes| CustomQuestions4["Ask Experience-specific Questions"]
    CustomQuestions4 --> GatherInsights4["Explore Technical Background"]
    GatherInsights4 --> ExperienceInference
    ExperienceGaps -->|No| ExperienceInference
    
    ExperienceInference["Experience Level Inference"] --> LearningInterests["Learning Interests Assessment"]
    LearningInterests --> DeveloperFocus["Developer Focus Assessment"]
    DeveloperFocus --> ChallengeDiscussion["Technical Challenge Discussion"]
    ChallengeDiscussion --> ExperienceSummary["Experience Summary"]
    ExperienceSummary --> ExperienceConfirm{"Confirmation"}
    
    ExperienceConfirm -->|No| ExperienceRevision["Experience Revision"]
    ExperienceRevision --> ExperienceSummary
    
    %% PHASE 4: DEVELOPMENT FOCUS
    ExperienceConfirm -->|Yes| FocusPhase["Phase 4: Development Focus"]
    FocusPhase --> DevPriorities["Development Priorities Assessment"]
    
    %% Fifth Breakout Point - Development Priorities
    DevPriorities --> PriorityGaps{"Priorities unclear?"}
    PriorityGaps -->|Yes| CustomQuestions5["Ask Priority-specific Questions"]
    CustomQuestions5 --> GatherInsights5["Explore Development Goals"]
    GatherInsights5 --> SpecializedNeeds
    PriorityGaps -->|No| SpecializedNeeds
    
    SpecializedNeeds["Specialized Needs Assessment"] --> LearningSupport["Learning Support Assessment"]
    LearningSupport --> FocusSummary["Focus Summary"]
    FocusSummary --> FocusConfirm{"Confirmation"}
    
    FocusConfirm -->|No| FocusRevision["Focus Revision"]
    FocusRevision --> FocusSummary
    
    %% CONDITIONAL PHASE 5
    FocusConfirm -->|Yes| ExistingCheck{"Existing Project?"}
    
    %% PHASE 5: EXISTING PROJECT
    ExistingCheck -->|Yes| ExistingPhase["Phase 5: Existing Project"]
    ExistingPhase --> PreservationAssessment["Preservation Assessment"]
    
    %% Sixth Breakout Point - Existing Project
    PreservationAssessment --> ExistingGaps{"Project details unclear?"}
    ExistingGaps -->|Yes| CustomQuestions6["Ask Project-specific Questions"]
    CustomQuestions6 --> GatherInsights6["Explore Project Structure"]
    GatherInsights6 --> ImprovementAssessment
    ExistingGaps -->|No| ImprovementAssessment
    
    ImprovementAssessment["Improvement Assessment"] --> ModePhase["Phase 6: Mode Generation"]
    
    %% PHASE 6: MODE GENERATION
    ExistingCheck -->|No| ModePhase
    ModePhase --> ModeGeneration["Mode Generation Based on Inputs"]
    
    %% Seventh Breakout Point - Mode Selection
    ModeGeneration --> ModeGaps{"Mode selection unclear?"}
    ModeGaps -->|Yes| CustomQuestions7["Ask Mode Preference Questions"]
    CustomQuestions7 --> GatherInsights7["Explore User Expectations"]
    GatherInsights7 --> CustomizationQuestion
    ModeGaps -->|No| CustomizationQuestion
    
    CustomizationQuestion{"Customization?"} -->|No| FinalConfig["Final Configuration"]
    CustomizationQuestion -->|Yes| ModeSelection["Mode Selection"]
    
    ModeSelection --> CustomizationAreas["Customization Areas Selection"]
    CustomizationAreas --> CustomizationEdits["Edit Selected Areas"]
    CustomizationEdits --> CustomizationReview["Customization Review"]
    CustomizationReview --> CustomizationConfirm{"Confirmation"}
    
    CustomizationConfirm -->|No| CustomizationRevision["Customization Revision"]
    CustomizationRevision --> CustomizationReview
    
    CustomizationConfirm -->|Yes| MoreModes{"More Modes?"}
    MoreModes -->|Yes| ModeSelection
    MoreModes -->|No| FinalConfig
    
    FinalConfig --> Complete([Complete])

    %% Define adaptive exploration style - Dark mode friendly colors
    classDef breakoutPoint fill:#5e4a8a,stroke:#aaa,stroke-width:2px,color:#fff;
    classDef explorationPath fill:#304f6d,stroke:#aaa,stroke-width:1px,color:#fff;
    classDef returnPath fill:#305840,stroke:#aaa,stroke-width:1px,color:#fff;
    
    class NeedMoreContext,TechGaps,ComplexityGaps,ExperienceGaps,PriorityGaps,ExistingGaps,ModeGaps breakoutPoint;
    class CustomQuestions1,CustomQuestions2,CustomQuestions3,CustomQuestions4,CustomQuestions5,CustomQuestions6,CustomQuestions7 explorationPath;
    class GatherInsights1,GatherInsights2,GatherInsights3,GatherInsights4,GatherInsights5,GatherInsights6,GatherInsights7 returnPath;
