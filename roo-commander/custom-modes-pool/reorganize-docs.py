#!/usr/bin/env python3
"""
Script to reorganize reference documentation files according to the defined structure.
This script will read files from the current reference-docs/ directory and 
reorganize them into a new structure in reference-docs-new/ directory.
"""

import os
import re
import shutil
import logging
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Define the source and target directories
SOURCE_DIR = Path("reference-docs")
TARGET_DIR = Path("reference-docs-new")

# Create a mapping of technology patterns to their target locations
# Format: (regex_pattern, target_directory)
FILE_MAPPINGS = [
    # C++
    (r"boost-v([\d\.]+)\.md", "languages/cpp/boost/"),
    
    # C#
    (r"aspnet-core-v([\d\.]+)\.md", "languages/csharp/aspnet-core/"),
    (r"dotnet-maui-v([\d\.]+)\.md", "languages/csharp/dotnet-maui/"),
    
    # Go
    (r"gin-v([\d\.]+)\.md", "languages/go/gin/"),
    (r"echo-v([\d\.]+)\.md", "languages/go/echo/"),
    (r"fiber-v([\d\.]+)\.md", "languages/go/fiber/"),
    
    # Groovy
    (r"grails-v([\d\.]+)\.md", "languages/groovy/grails/"),
    
    # Java
    (r"jakarta-ee-v([\d\.]+)\.md", "languages/java/jakarta-ee/"),
    (r"spring-framework-v([\d\.]+)\.md", "languages/java/spring-framework/"),
    
    # JavaScript/TypeScript - Frontend
    (r"react-v([\d\.]+)\.md", "languages/javascript/frontend/react/"),
    (r"angular-v([\d\.]+)\.md", "languages/javascript/frontend/angular/"),
    (r"vue-v([\d\.]+)\.md", "languages/javascript/frontend/vue/"),
    (r"svelte-v([\d\.]+)\.md", "languages/javascript/frontend/svelte/"),
    (r"next-js-v([\d\.]+)\.md", "languages/javascript/frontend/next-js/"),
    
    # JavaScript/TypeScript - Backend
    (r"express-v([\d\.]+)\.md", "languages/javascript/backend/express/"),
    
    # JVM
    (r"micronaut-v([\d\.]+)\.md", "languages/jvm/micronaut/"),
    
    # Kotlin
    (r"android-kotlin-v([\d\.]+)\.md", "languages/kotlin/android-kotlin/"),
    (r"kotlin-multiplatform-v([\d\.]+(-RC)?)\.md", "languages/kotlin/kotlin-multiplatform/"),
    (r"ktor-v([\d\.]+)\.md", "languages/kotlin/ktor/"),
    
    # PHP
    (r"laravel-v([\d\.]+)\.md", "languages/php/laravel/"),
    
    # Python - Web
    (r"django-v([\d\.]+)\.md", "languages/python/web/django/"),
    (r"fastapi-v([\d\.]+)\.md", "languages/python/web/fastapi/"),
    (r"flask-v([\d\.]+)\.md", "languages/python/web/flask/"),
    
    # Python - Data Science
    (r"pandas-v([\d\.]+)\.md", "languages/python/data-science/pandas/"),
    (r"scikit-learn-v([\d\.]+)\.md", "languages/python/data-science/scikit-learn/"),
    (r"tensorflow-v([\d\.]+)\.md", "languages/python/data-science/tensorflow/"),
    (r"pytorch-v([\d\.]+)\.md", "languages/python/data-science/pytorch/"),
    
    # Ruby
    (r"ruby-on-rails-v([\d\.]+)\.md", "languages/ruby/ruby-on-rails/"),
    (r"sinatra-v([\d\.]+)\.md", "languages/ruby/sinatra/"),
    
    # Rust
    (r"actix-web-v([\d\.]+)\.md", "languages/rust/actix-web/"),
    
    # Swift
    (r"ios-swift-v([\d\.]+)\.md", "languages/swift/ios-swift/"),
    
    # Databases - Relational
    (r"mysql-v([\d\.]+)\.md", "databases/relational/mysql/"),
    (r"postgresql-v([\d\.]+)\.md", "databases/relational/postgresql/"),
    (r"sqlite-v([\d\.]+)\.md", "databases/relational/sqlite/"),
    
    # Databases - Document
    (r"mongodb-v([\d\.]+)\.md", "databases/document/mongodb/"),
    
    # Databases - Key-Value
    (r"redis-v([\d\.]+)\.md", "databases/key-value/redis/"),
    
    # Databases - Graph
    (r"neo4j-v([\d\.]+)\.md", "databases/graph/neo4j/"),
    (r"neo4j-([\d\.]+)\.md", "databases/graph/neo4j/"),
    (r"memgraph-v([\d\.]+)\.md", "databases/graph/memgraph/"),
    
    # Databases - Vector
    (r"qdrant-v([\d\.]+)\.md", "databases/vector/qdrant/"),
    
    # Frameworks - Cross-platform - Mobile
    (r"flutter-v([\d\.]+)\.md", "frameworks/cross-platform/mobile/flutter/"),
    (r"react-native-v([\d\.]+)\.md", "frameworks/cross-platform/mobile/react-native/"),
    (r"xamarin-v([\d\.]+)\.md", "frameworks/cross-platform/mobile/xamarin/"),
    
    # Frameworks - Cross-platform - Desktop
    (r"qt-v([\d\.]+)\.md", "frameworks/cross-platform/desktop/qt/"),
    
    # Cloud - Providers
    (r"aws-sdk-v([\d\.]+)\.md", "cloud/providers/aws/"),
    (r"azure-v([\d\.]+)\.md", "cloud/providers/azure/"),
    (r"gcp-v([\d\.]+)\.md", "cloud/providers/gcp/"),
    
    # Special cases or files to ignore
    (r"00-schema\.md", "")  # Will be handled separately
]


def create_directory_structure():
    """Create the target directory structure."""
    logger.info("Creating directory structure...")
    
    # Get unique directory paths from mappings
    directories = set()
    for _, target_dir in FILE_MAPPINGS:
        if target_dir:  # Skip empty paths
            directories.add(target_dir)
    
    # Create each directory
    for directory in directories:
        dir_path = TARGET_DIR / directory
        dir_path.mkdir(parents=True, exist_ok=True)
        logger.debug(f"Created directory: {dir_path}")
    
    # Create any other required directories not covered by mappings
    other_dirs = [
        "frameworks/web/graphql",
        "frameworks/web/webassembly",
        "frameworks/web/webgpu",
        "cloud/containers/kubernetes",
        "cloud/containers/docker",
        "cloud/serverless/aws-lambda",
        "cloud/serverless/azure-functions",
        "cloud/serverless/gcp-functions",
        "cloud/services/supabase",
        "cloud/services/firebase",
        "tools/data-pipeline/apache-kafka",
        "tools/data-pipeline/dagster",
        "tools/testing/cypress",
        "tools/testing/jest",
        "tools/testing/playwright",
        "tools/build/snowpack",
        "tools/build/vite",
        "tools/build/webpack",
        "tools/ci-cd/github-actions",
    ]
    
    for directory in other_dirs:
        dir_path = TARGET_DIR / directory
        dir_path.mkdir(parents=True, exist_ok=True)
        logger.debug(f"Created directory: {dir_path}")


def copy_files():
    """Copy files from source directory to their appropriate locations in the target directory."""
    logger.info("Copying files to new structure...")
    
    # Get list of files in source directory
    files = [f for f in SOURCE_DIR.glob("*.md")]
    logger.info(f"Found {len(files)} files in source directory")
    
    files_processed = 0
    files_skipped = 0
    
    for file_path in files:
        file_name = file_path.name
        
        # Special handling for schema
        if file_name == "00-schema.md":
            # Copy to the root of the target directory
            shutil.copy2(file_path, TARGET_DIR / file_name)
            logger.debug(f"Copied {file_name} to root of target directory")
            files_processed += 1
            continue
        
        # Find matching pattern and target directory
        target_dir = None
        for pattern, directory in FILE_MAPPINGS:
            if re.match(pattern, file_name):
                target_dir = directory
                break
        
        if target_dir:
            # Create target directory if it doesn't exist
            full_target_dir = TARGET_DIR / target_dir
            full_target_dir.mkdir(parents=True, exist_ok=True)
            
            # Copy file to target directory
            shutil.copy2(file_path, full_target_dir / file_name)
            logger.debug(f"Copied {file_name} to {full_target_dir}")
            files_processed += 1
        else:
            logger.warning(f"No mapping found for {file_name}, skipping")
            files_skipped += 1
    
    logger.info(f"Processed {files_processed} files, skipped {files_skipped} files")


def main():
    """Main function to orchestrate the reorganization process."""
    logger.info("Starting reference documentation reorganization")
    
    # Check if source directory exists
    if not SOURCE_DIR.exists():
        logger.error(f"Source directory {SOURCE_DIR} does not exist")
        return 1
    
    # Remove target directory if it exists to start fresh
    if TARGET_DIR.exists():
        logger.info(f"Removing existing target directory {TARGET_DIR}")
        shutil.rmtree(TARGET_DIR)
    
    # Create target directory
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    
    # Create directory structure
    create_directory_structure()
    
    # Copy files
    copy_files()
    
    logger.info("Reorganization complete")
    logger.info(f"Files have been reorganized into {TARGET_DIR}")
    return 0


if __name__ == "__main__":
    exit_code = main()
    exit(exit_code)