#!/bin/bash

################################################################################
# Box AI Enhanced Extract Agent Example Script
# 
# This script demonstrates how to use the Box AI Enhanced Extract Agent
# to extract structured data from documents in Box.
#
# Prerequisites:
# - Box CLI installed and configured
# - A file in Box to extract data from
# - Optionally, a metadata template configured in Box
################################################################################

# Configuration - Update these values
FILE_ID="YOUR_FILE_ID_HERE"                    # The Box file ID to extract from
METADATA_TEMPLATE_KEY="InvoicePO"              # Your metadata template key
METADATA_TEMPLATE_SCOPE="enterprise"           # Usually "enterprise" or "global"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "========================================"
echo "Box AI Enhanced Extract Agent Example"
echo "========================================"
echo ""

# Check if Box CLI is installed
if ! command -v box &> /dev/null; then
    echo -e "${RED}Error: Box CLI is not installed${NC}"
    echo "Please install Box CLI first: https://github.com/box/boxcli"
    exit 1
fi

# Check if user provided file ID
if [ "$FILE_ID" == "YOUR_FILE_ID_HERE" ]; then
    echo -e "${YELLOW}Warning: Please update FILE_ID in the script with your actual file ID${NC}"
    echo ""
    read -p "Enter your Box file ID: " FILE_ID
    if [ -z "$FILE_ID" ]; then
        echo -e "${RED}Error: File ID is required${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}Using file ID: $FILE_ID${NC}"
echo ""

# Example 1: Using Enhanced Extract Agent with Metadata Template
echo "Example 1: Extract with Metadata Template"
echo "----------------------------------------"
echo "Using Enhanced Extract Agent with metadata template..."
echo ""

box ai:extract-structured \
  --items="id=$FILE_ID,type=file" \
  --metadata-template="type=metadata_template,scope=$METADATA_TEMPLATE_SCOPE,template_key=$METADATA_TEMPLATE_KEY" \
  --ai-agent='{"id":"enhanced_extract_agent","type":"ai_agent_id"}' \
  --json

echo ""
echo "========================================"
echo ""

# Example 2: Using Enhanced Extract Agent with Inline Fields
echo "Example 2: Extract with Inline Fields"
echo "---------------------------------------"
echo "Using Enhanced Extract Agent with inline field definitions..."
echo ""

box ai:extract-structured \
  --items="id=$FILE_ID,type=file" \
  --fields="key=documentTitle,type=string,description=Document title,prompt=What is the title of this document?" \
  --fields="key=documentDate,type=string,description=Document date,prompt=What is the date on this document?" \
  --fields="key=documentAuthor,type=string,description=Author name,prompt=Who is the author of this document?" \
  --ai-agent='{"id":"enhanced_extract_agent","type":"ai_agent_id"}' \
  --json

echo ""
echo "========================================"
echo ""

# Example 3: Standard Extract (without Enhanced Extract Agent)
echo "Example 3: Standard Extract (for comparison)"
echo "---------------------------------------------"
echo "Using standard extract without Enhanced Extract Agent..."
echo ""

box ai:extract-structured \
  --items="id=$FILE_ID,type=file" \
  --fields="key=documentTitle,type=string,description=Document title,prompt=What is the title of this document?" \
  --fields="key=documentDate,type=string,description=Document date,prompt=What is the date on this document?" \
  --json

echo ""
echo "========================================"
echo ""
echo -e "${GREEN}Examples completed!${NC}"
echo ""
echo "Tips:"
echo "  - Use Enhanced Extract Agent for complex documents (100+ pages, tables, images)"
echo "  - Use standard extract for shorter, simpler documents"
echo "  - The Enhanced Extract Agent provides reasoning in its responses"
echo "  - You can save output to a file by adding: --save"
echo ""
