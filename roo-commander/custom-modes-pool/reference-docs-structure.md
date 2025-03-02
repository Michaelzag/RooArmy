# Reference Documentation File Structure

```
reference-docs/
│
├── languages/
│   ├── cpp/
│   │   └── boost/
│   │       ├── boost-v1.84.0.md
│   │       └── boost-v1.87.0.md
│   │
│   ├── csharp/
│   │   ├── aspnet-core/
│   │   │   ├── aspnet-core-v8.0.md
│   │   │   └── aspnet-core-v9.0.md
│   │   └── dotnet-maui/
│   │       ├── dotnet-maui-v8.0.md
│   │       └── dotnet-maui-v9.0.md
│   │
│   ├── go/
│   │   ├── gin/
│   │   │   └── gin-v1.9.1.md
│   │   ├── echo/
│   │   │   ├── echo-v4.11.3.md
│   │   │   └── echo-v4.13.3.md
│   │   └── fiber/
│   │       └── fiber-v2.52.0.md
│   │
│   ├── groovy/
│   │   └── grails/
│   │       └── grails-v6.2.3.md
│   │
│   ├── java/
│   │   ├── jakarta-ee/
│   │   │   └── jakarta-ee-v11.md
│   │   └── spring-framework/
│   │       ├── spring-framework-v6.1.17.md
│   │       └── spring-framework-v6.2.3.md
│   │
│   ├── javascript/
│   │   ├── frontend/
│   │   │   ├── react/
│   │   │   │   ├── react-v17.md
│   │   │   │   ├── react-v18.md
│   │   │   │   └── react-v19.0.md
│   │   │   ├── angular/
│   │   │   │   ├── angular-v16.md
│   │   │   │   ├── angular-v17.0.md
│   │   │   │   └── angular-v19.0.md
│   │   │   ├── vue/
│   │   │   │   ├── vue-v3.md
│   │   │   │   └── vue-v3.5.md
│   │   │   ├── svelte/
│   │   │   │   └── svelte-v3.md
│   │   │   └── next-js/
│   │   │       ├── next-js-v13.md
│   │   │       └── next-js-v15.md
│   │   │
│   │   ├── backend/
│   │   │   └── express/
│   │   │       └── express-v5.md
│   │   │
│   │   └── runtime/
│   │       └── deno/
│   │           └── deno.md
│   │
│   ├── jvm/
│   │   └── micronaut/
│   │       ├── micronaut-v4.7.6.md
│   │       └── micronaut-v4.8.5.md
│   │
│   ├── kotlin/
│   │   ├── android-kotlin/
│   │   │   └── android-kotlin-v1.8.md
│   │   ├── kotlin-multiplatform/
│   │   │   ├── kotlin-multiplatform-v1.9.22.md
│   │   │   └── kotlin-multiplatform-v2.1.20-RC.md
│   │   └── ktor/
│   │       ├── ktor-v2.3.7.md
│   │       └── ktor-v3.1.1.md
│   │
│   ├── php/
│   │   └── laravel/
│   │       ├── laravel-v11.0.md
│   │       └── laravel-v12.0.md
│   │
│   ├── python/
│   │   ├── web/
│   │   │   ├── django/
│   │   │   │   ├── django-v4.2.md
│   │   │   │   └── django-v5.1.md
│   │   │   ├── fastapi/
│   │   │   │   └── fastapi-v0.100.md
│   │   │   └── flask/
│   │   │       └── flask-v3.1.md
│   │   │
│   │   └── data-science/
│   │       ├── pandas/
│   │       │   └── pandas-v2.0.md
│   │       ├── scikit-learn/
│   │       │   └── scikit-learn-v1.2.md
│   │       ├── tensorflow/
│   │       │   ├── tensorflow-v2.12.md
│   │       │   └── tensorflow-v2.18.md
│   │       └── pytorch/
│   │           └── pytorch-v2.6.md
│   │
│   ├── ruby/
│   │   ├── ruby-on-rails/
│   │   │   ├── ruby-on-rails-v8.0.md
│   │   │   └── ruby-on-rails-v8.0.1.md
│   │   └── sinatra/
│   │       ├── sinatra-v2.1.0.md
│   │       └── sinatra-v4.1.1.md
│   │
│   ├── rust/
│   │   └── actix-web/
│   │       ├── actix-web-v4.4.0.md
│   │       └── actix-web-v4.9.0.md
│   │
│   └── swift/
│       └── ios-swift/
│           └── ios-swift-v5.md
│
├── databases/
│   ├── relational/
│   │   ├── mysql/
│   │   │   ├── mysql-v8.2.md
│   │   │   └── mysql-v9.2.1.md
│   │   ├── postgresql/
│   │   │   ├── postgresql-v16.0.md
│   │   │   └── postgresql-v17.4.md
│   │   └── sqlite/
│   │       ├── sqlite-v3.43.md
│   │       └── sqlite-v3.49.1.md
│   │
│   ├── document/
│   │   └── mongodb/
│   │       ├── mongodb-v7.0.md
│   │       └── mongodb-v8.0.md
│   │
│   ├── key-value/
│   │   └── redis/
│   │       ├── redis-v7.2.md
│   │       └── redis-v8.0.md
│   │
│   ├── graph/
│   │   ├── neo4j/
│   │   │   ├── neo4j-v5.13.md
│   │   │   └── neo4j-2025.02.0.md
│   │   └── memgraph/
│   │       ├── memgraph-v2.11.md
│   │       └── memgraph-v3.0.md
│   │
│   └── vector/
│       └── qdrant/
│           ├── qdrant-v1.7.md
│           └── qdrant-v1.13.4.md
│
├── frameworks/
│   ├── cross-platform/
│   │   ├── mobile/
│   │   │   ├── flutter/
│   │   │   │   └── flutter-v3.md
│   │   │   ├── react-native/
│   │   │   │   └── react-native-v0.70.md
│   │   │   └── xamarin/
│   │   │       └── xamarin-v5.md
│   │   └── desktop/
│   │       ├── qt/
│   │       │   ├── qt-v6.6.2.md
│   │       │   └── qt-v6.8.md
│   │       └── tauri/
│   │           └── tauri.md
│   │
│   └── web/
│       ├── graphql/
│       │   └── graphql.md
│       ├── webassembly/
│       │   └── webassembly.md
│       └── webgpu/
│           └── webgpu.md
│
├── cloud/
│   ├── providers/
│   │   ├── aws/
│   │   │   └── aws-sdk-v3.md
│   │   ├── azure/
│   │   │   └── azure-v2023.md
│   │   └── gcp/
│   │       └── gcp-v2023.md
│   │
│   ├── containers/
│   │   ├── kubernetes/
│   │   │   └── kubernetes.md
│   │   └── docker/
│   │       └── docker-desktop.md
│   │
│   ├── serverless/
│   │   ├── aws-lambda/
│   │   │   └── aws-lambda.md
│   │   ├── azure-functions/
│   │   │   └── azure-functions.md
│   │   └── gcp-functions/
│   │       └── gcp-functions.md
│   │
│   └── services/
│       ├── supabase/
│       │   └── supabase.md
│       └── firebase/
│           └── firebase.md
│
└── tools/
    ├── data-pipeline/
    │   ├── apache-kafka/
    │   │   └── apache-kafka.md
    │   └── dagster/
    │       └── dagster.md
    │
    ├── testing/
    │   ├── cypress/
    │   │   └── cypress.md
    │   ├── jest/
    │   │   └── jest.md
    │   └── playwright/
    │       └── playwright.md
    │
    ├── build/
    │   ├── snowpack/
    │   │   └── snowpack.md
    │   ├── vite/
    │   │   └── vite.md
    │   └── webpack/
    │       └── webpack.md
    │
    └── ci-cd/
        └── github-actions/
            └── github-actions.md
```

This structure organizes all documentation files in a strict tree hierarchy where:

1. Each technology has its own dedicated folder (e.g., `react/`, `django/`, `mongodb/`)
2. Version-specific documentation files are stored directly within their respective technology folders
3. Technologies are organized by language, type, and purpose in a consistent manner
4. Multiple versions of the same technology are clearly represented as separate files within the same folder

This approach provides several benefits:
- Simplified structure for all documentation
- Easy access to all versions of a technology in one folder
- Clear organization by technology category and type
- Support for direct comparison of different versions
- Intuitive navigation for developers seeking documentation