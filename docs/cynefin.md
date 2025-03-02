Below is an example of how you might categorize different AI “agents” (roles) in a software development cycle according to the three primary Cynefin domains you mentioned: **Simple**, **Complicated**, and **Complex**. (In the broader Cynefin framework there is also **Chaotic** and **Disorder**, but here we’ll focus on the three you specifically called out.)

---

## 1. Simple (Obvious) Domain
**Key Characteristic**: Clear cause-and-effect. Best practices are known and straightforward.  
**Approach**: Sense – Categorize – Respond.

In the **simple** domain, your AI agents might be focused on well-known, repeatable tasks, where instructions and outcomes are highly predictable. These agents rely on established patterns and best practices:

1. **Basic Code Generator**  
   - Purpose: Quickly scaffold or generate boilerplate code and straightforward features.  
   - Example Tasks:
     - CRUD (Create, Read, Update, Delete) operations
     - Basic UI components, simple REST endpoints

2. **Simple Bug Fixer**  
   - Purpose: Identify and fix low-complexity issues or obvious errors.  
   - Example Tasks:
     - Linting errors
     - Minor syntax fixes
     - Standard library usage fixes

3. **Documentation Generator**  
   - Purpose: Produce documentation for simple, well-understood components.  
   - Example Tasks:
     - Auto-generate function/method docstrings
     - High-level project setup guides

4. **Basic Q&A Bot**  
   - Purpose: Answer frequently asked, straightforward questions about a codebase or framework usage.  
   - Example Tasks:
     - “How do I set up environment variables in Node.js?”
     - “What’s the command to install a Python package?”

5. **Simple Test Writer**  
   - Purpose: Generate standard unit tests for clear, predictable functions.  
   - Example Tasks:
     - Testing getter/setter methods
     - Testing obvious computational functions (e.g., add, subtract)

---

## 2. Complicated Domain
**Key Characteristic**: Known unknowns. Expert diagnosis and analysis needed, but once identified, solutions can follow good practices.  
**Approach**: Sense – Analyze – Respond.

In the **complicated** domain, tasks require specialized expertise or deeper investigation. Agents here may focus on diagnostic skills, nuanced optimization, or advanced integrations:

1. **Architect/Design Advisor**  
   - Purpose: Provide architectural guidance for more intricate systems.  
   - Example Tasks:
     - Propose design patterns for scalability
     - Evaluate microservices vs. monolith
     - Database schema design

2. **Advanced Debugger**  
   - Purpose: Identify and fix complex bugs that require deeper analysis.  
   - Example Tasks:
     - Debugging concurrency issues
     - Memory leaks or performance bottlenecks
     - Race conditions

3. **Test Engineer (Integration & Performance)**  
   - Purpose: Generate and execute comprehensive test strategies, including integration, performance, and load tests.  
   - Example Tasks:
     - Creating end-to-end test suites
     - Performance testing with JMeter or Locust
     - Ensuring compliance with service-level agreements (SLAs)

4. **Security Specialist**  
   - Purpose: Detect and remediate potential security vulnerabilities.  
   - Example Tasks:
     - Code scanning for OWASP top 10 vulnerabilities
     - Generating threat models
     - Suggesting secure coding practices

5. **DevOps/CI-CD Integrator**  
   - Purpose: Set up and maintain continuous integration and deployment pipelines for complex but structured environments.  
   - Example Tasks:
     - Configuring build pipelines
     - Containerization (Docker, Kubernetes)
     - Infrastructure as code (Terraform, Ansible)

6. **Data/Analytics Engineer**  
   - Purpose: Handle data processing, complex queries, and analytics tasks where best practices are established but require specialized knowledge.  
   - Example Tasks:
     - Building data pipelines
     - Data warehouse architecture
     - Writing complex ETL jobs

---

## 3. Complex Domain
**Key Characteristic**: Unknown unknowns. Emergent patterns. Experimentation and iteration are necessary.  
**Approach**: Probe – Sense – Respond (high emphasis on experimentation and adaptation).

In the **complex** domain, problems are dynamic, interconnected, and evolving. Agents need to experiment, gather feedback, and adapt:

1. **Research/Prototyping Agent**  
   - Purpose: Rapidly prototype new ideas or technologies where outcomes are not certain.  
   - Example Tasks:
     - Proof-of-concept development
     - Exploring new frameworks or libraries
     - Integrating emerging tech (e.g., new AI models or blockchain)

2. **Innovation & Experimentation Orchestrator**  
   - Purpose: Run experiments, collect metrics, and interpret results to find what works.  
   - Example Tasks:
     - A/B testing with real user data
     - Using canary releases to measure performance or user acceptance
     - Tracking experiments with analytics dashboards

3. **Observability & Monitoring Advisor**  
   - Purpose: Help design and interpret observability strategies for complex, distributed systems.  
   - Example Tasks:
     - Setting up distributed tracing (Jaeger, Zipkin)
     - Real-time monitoring dashboards (Grafana, Prometheus)
     - Analyzing logs and telemetry for emergent patterns

4. **Collaboration/Facilitator Bot**  
   - Purpose: Coordinate among multiple teams or stakeholders, ensuring knowledge sharing in evolving contexts.  
   - Example Tasks:
     - Agile ceremonies support (e.g., interactive retros, standups)
     - Collective decision-making, idea funneling
     - Gathering user feedback from varied sources

5. **Exploratory Testing Specialist**  
   - Purpose: Go beyond “known” test cases, uncover hidden requirements, side effects, or emergent behaviors.  
   - Example Tasks:
     - Ad-hoc testing to find unpredictable issues
     - Testing in variable production-like scenarios
     - Chaos engineering experiments (fault injection)

6. **Adaptive AI/ML Model Builder**  
   - Purpose: Build or tune ML/DL models in domains where data patterns may evolve over time.  
   - Example Tasks:
     - Online learning or streaming data pipelines
     - Iterative refinement of models based on user behavior
     - Dealing with unstructured and changing datasets

---

## Putting It All Together

When deciding which agents to deploy:

1. **Simple**:  
   - Problems are straightforward, so use agents specialized in quick, predictable tasks.  
   - Emphasize known solutions, repeatable patterns, and minimal oversight.

2. **Complicated**:  
   - Requires specialized expertise; solutions exist, but may need analysis and expert-level input.  
   - Emphasize diagnostic skills and methodical approaches.

3. **Complex**:  
   - Emergent, shifting, uncertain. Require agents that can explore, experiment, and adapt rapidly.  
   - Emphasize iterative probing, collecting feedback, and evolving solutions.

By categorizing the user’s request or problem into one of these domains, you can dynamically select which set of AI “agents” is most appropriate. This helps avoid over-engineering simple tasks, underestimating complicated ones, and ensures you have the right experimentation and feedback loops in place for complex domains.