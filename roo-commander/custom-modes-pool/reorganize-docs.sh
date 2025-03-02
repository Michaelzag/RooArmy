#!/bin/bash
# Script to reorganize reference documentation files according to the defined structure

# Define the source and target directories
SOURCE_DIR="reference-docs"
TARGET_DIR="reference-docs-new"

# Function to create directories
create_directory() {
  mkdir -p "$1"
  echo "Created directory: $1"
}

# Function to copy a file to its destination
copy_file() {
  local source="$1"
  local destination="$2"
  cp "$source" "$destination"
  echo "Copied $(basename "$source") to $destination"
}

# Print starting message
echo "Starting reference documentation reorganization"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: Source directory $SOURCE_DIR does not exist"
  exit 1
fi

# Remove target directory if it exists
if [ -d "$TARGET_DIR" ]; then
  echo "Removing existing target directory $TARGET_DIR"
  rm -rf "$TARGET_DIR"
fi

# Create target directory
mkdir -p "$TARGET_DIR"
echo "Created target directory $TARGET_DIR"

# Create directory structure
echo "Creating directory structure..."

# Create language directories
create_directory "$TARGET_DIR/languages/cpp/boost"
create_directory "$TARGET_DIR/languages/csharp/aspnet-core"
create_directory "$TARGET_DIR/languages/csharp/dotnet-maui"
create_directory "$TARGET_DIR/languages/go/gin"
create_directory "$TARGET_DIR/languages/go/echo"
create_directory "$TARGET_DIR/languages/go/fiber"
create_directory "$TARGET_DIR/languages/groovy/grails"
create_directory "$TARGET_DIR/languages/java/jakarta-ee"
create_directory "$TARGET_DIR/languages/java/spring-framework"
create_directory "$TARGET_DIR/languages/javascript/frontend/react"
create_directory "$TARGET_DIR/languages/javascript/frontend/angular"
create_directory "$TARGET_DIR/languages/javascript/frontend/vue"
create_directory "$TARGET_DIR/languages/javascript/frontend/svelte"
create_directory "$TARGET_DIR/languages/javascript/frontend/next-js"
create_directory "$TARGET_DIR/languages/javascript/backend/express"
create_directory "$TARGET_DIR/languages/javascript/runtime/deno"
create_directory "$TARGET_DIR/languages/jvm/micronaut"
create_directory "$TARGET_DIR/languages/kotlin/android-kotlin"
create_directory "$TARGET_DIR/languages/kotlin/kotlin-multiplatform"
create_directory "$TARGET_DIR/languages/kotlin/ktor"
create_directory "$TARGET_DIR/languages/php/laravel"
create_directory "$TARGET_DIR/languages/python/web/django"
create_directory "$TARGET_DIR/languages/python/web/fastapi"
create_directory "$TARGET_DIR/languages/python/web/flask"
create_directory "$TARGET_DIR/languages/python/data-science/pandas"
create_directory "$TARGET_DIR/languages/python/data-science/scikit-learn"
create_directory "$TARGET_DIR/languages/python/data-science/tensorflow"
create_directory "$TARGET_DIR/languages/python/data-science/pytorch"
create_directory "$TARGET_DIR/languages/ruby/ruby-on-rails"
create_directory "$TARGET_DIR/languages/ruby/sinatra"
create_directory "$TARGET_DIR/languages/rust/actix-web"
create_directory "$TARGET_DIR/languages/swift/ios-swift"

# Create database directories
create_directory "$TARGET_DIR/databases/relational/mysql"
create_directory "$TARGET_DIR/databases/relational/postgresql"
create_directory "$TARGET_DIR/databases/relational/sqlite"
create_directory "$TARGET_DIR/databases/document/mongodb"
create_directory "$TARGET_DIR/databases/key-value/redis"
create_directory "$TARGET_DIR/databases/graph/neo4j"
create_directory "$TARGET_DIR/databases/graph/memgraph"
create_directory "$TARGET_DIR/databases/vector/qdrant"

# Create framework directories
create_directory "$TARGET_DIR/frameworks/cross-platform/mobile/flutter"
create_directory "$TARGET_DIR/frameworks/cross-platform/mobile/react-native"
create_directory "$TARGET_DIR/frameworks/cross-platform/mobile/xamarin"
create_directory "$TARGET_DIR/frameworks/cross-platform/desktop/qt"
create_directory "$TARGET_DIR/frameworks/cross-platform/desktop/tauri"
create_directory "$TARGET_DIR/frameworks/web/graphql"
create_directory "$TARGET_DIR/frameworks/web/webassembly"
create_directory "$TARGET_DIR/frameworks/web/webgpu"

# Create cloud directories
create_directory "$TARGET_DIR/cloud/providers/aws"
create_directory "$TARGET_DIR/cloud/providers/azure"
create_directory "$TARGET_DIR/cloud/providers/gcp"
create_directory "$TARGET_DIR/cloud/containers/kubernetes"
create_directory "$TARGET_DIR/cloud/containers/docker"
create_directory "$TARGET_DIR/cloud/serverless/aws-lambda"
create_directory "$TARGET_DIR/cloud/serverless/azure-functions"
create_directory "$TARGET_DIR/cloud/serverless/gcp-functions"
create_directory "$TARGET_DIR/cloud/services/supabase"
create_directory "$TARGET_DIR/cloud/services/firebase"

# Create tools directories
create_directory "$TARGET_DIR/tools/data-pipeline/apache-kafka"
create_directory "$TARGET_DIR/tools/data-pipeline/dagster"
create_directory "$TARGET_DIR/tools/testing/cypress"
create_directory "$TARGET_DIR/tools/testing/jest"
create_directory "$TARGET_DIR/tools/testing/playwright"
create_directory "$TARGET_DIR/tools/build/snowpack"
create_directory "$TARGET_DIR/tools/build/vite"
create_directory "$TARGET_DIR/tools/build/webpack"
create_directory "$TARGET_DIR/tools/ci-cd/github-actions"

# Copy files
echo "Copying files to new structure..."

# Process the 00-schema.md file separately
if [ -f "$SOURCE_DIR/00-schema.md" ]; then
  copy_file "$SOURCE_DIR/00-schema.md" "$TARGET_DIR/00-schema.md"
fi

# Process all other .md files
files_processed=0
files_skipped=0

for file in "$SOURCE_DIR"/*.md; do
  filename=$(basename "$file")
  
  # Skip the schema file as we've already handled it
  if [ "$filename" = "00-schema.md" ]; then
    continue
  fi
  
  # C++
  if [[ $filename =~ boost-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/cpp/boost/$filename"
  
  # C#
  elif [[ $filename =~ aspnet-core-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/csharp/aspnet-core/$filename"
  elif [[ $filename =~ dotnet-maui-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/csharp/dotnet-maui/$filename"
  
  # Go
  elif [[ $filename =~ gin-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/go/gin/$filename"
  elif [[ $filename =~ echo-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/go/echo/$filename"
  elif [[ $filename =~ fiber-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/go/fiber/$filename"
  
  # Groovy
  elif [[ $filename =~ grails-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/groovy/grails/$filename"
  
  # Java
  elif [[ $filename =~ jakarta-ee-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/java/jakarta-ee/$filename"
  elif [[ $filename =~ spring-framework-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/java/spring-framework/$filename"
  
  # JavaScript/TypeScript - Frontend
  elif [[ $filename =~ react-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/javascript/frontend/react/$filename"
  elif [[ $filename =~ angular-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/javascript/frontend/angular/$filename"
  elif [[ $filename =~ vue-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/javascript/frontend/vue/$filename"
  elif [[ $filename =~ svelte-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/javascript/frontend/svelte/$filename"
  elif [[ $filename =~ next-js-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/javascript/frontend/next-js/$filename"
  
  # JavaScript/TypeScript - Backend
  elif [[ $filename =~ express-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/javascript/backend/express/$filename"
  
  # JVM
  elif [[ $filename =~ micronaut-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/jvm/micronaut/$filename"
  
  # Kotlin
  elif [[ $filename =~ android-kotlin-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/kotlin/android-kotlin/$filename"
  elif [[ $filename =~ kotlin-multiplatform-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/kotlin/kotlin-multiplatform/$filename"
  elif [[ $filename =~ ktor-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/kotlin/ktor/$filename"
  
  # PHP
  elif [[ $filename =~ laravel-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/php/laravel/$filename"
  
  # Python - Web
  elif [[ $filename =~ django-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/python/web/django/$filename"
  elif [[ $filename =~ fastapi-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/python/web/fastapi/$filename"
  elif [[ $filename =~ flask-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/python/web/flask/$filename"
  
  # Python - Data Science
  elif [[ $filename =~ pandas-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/python/data-science/pandas/$filename"
  elif [[ $filename =~ scikit-learn-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/python/data-science/scikit-learn/$filename"
  elif [[ $filename =~ tensorflow-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/python/data-science/tensorflow/$filename"
  elif [[ $filename =~ pytorch-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/python/data-science/pytorch/$filename"
  
  # Ruby
  elif [[ $filename =~ ruby-on-rails-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/ruby/ruby-on-rails/$filename"
  elif [[ $filename =~ sinatra-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/ruby/sinatra/$filename"
  
  # Rust
  elif [[ $filename =~ actix-web-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/rust/actix-web/$filename"
  
  # Swift
  elif [[ $filename =~ ios-swift-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/languages/swift/ios-swift/$filename"
  
  # Databases - Relational
  elif [[ $filename =~ mysql-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/databases/relational/mysql/$filename"
  elif [[ $filename =~ postgresql-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/databases/relational/postgresql/$filename"
  elif [[ $filename =~ sqlite-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/databases/relational/sqlite/$filename"
  
  # Databases - Document
  elif [[ $filename =~ mongodb-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/databases/document/mongodb/$filename"
  
  # Databases - Key-Value
  elif [[ $filename =~ redis-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/databases/key-value/redis/$filename"
  
  # Databases - Graph
  elif [[ $filename =~ neo4j-v([0-9.]+)\.md || $filename =~ neo4j-([0-9]+\.[0-9]+\.[0-9]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/databases/graph/neo4j/$filename"
  elif [[ $filename =~ memgraph-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/databases/graph/memgraph/$filename"
  
  # Databases - Vector
  elif [[ $filename =~ qdrant-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/databases/vector/qdrant/$filename"
  
  # Frameworks - Cross-platform - Mobile
  elif [[ $filename =~ flutter-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/frameworks/cross-platform/mobile/flutter/$filename"
  elif [[ $filename =~ react-native-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/frameworks/cross-platform/mobile/react-native/$filename"
  elif [[ $filename =~ xamarin-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/frameworks/cross-platform/mobile/xamarin/$filename"
  
  # Frameworks - Cross-platform - Desktop
  elif [[ $filename =~ qt-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/frameworks/cross-platform/desktop/qt/$filename"
  
  # Cloud - Providers
  elif [[ $filename =~ aws-sdk-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/cloud/providers/aws/$filename"
  elif [[ $filename =~ azure-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/cloud/providers/azure/$filename"
  elif [[ $filename =~ gcp-v([0-9.]+)\.md ]]; then
    copy_file "$file" "$TARGET_DIR/cloud/providers/gcp/$filename"
  
  # File not matched - skip
  else
    echo "Warning: No mapping found for $filename, skipping"
    ((files_skipped++))
    continue
  fi
  
  ((files_processed++))
done

echo "Processed $files_processed files, skipped $files_skipped files"
echo "Reorganization complete"
echo "Files have been reorganized into $TARGET_DIR"