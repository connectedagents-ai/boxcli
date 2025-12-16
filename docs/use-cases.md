# Box CLI Use Cases

This guide covers common integration patterns and use cases for the Box CLI, including serverless deployments, AI-powered document pipelines, and multi-agent applications.

## Table of Contents

- [Overview](#overview)
- [Serverless Deployments](#serverless-deployments)
  - [Vercel Integration](#vercel-integration)
  - [AWS Lambda Integration](#aws-lambda-integration)
  - [Other Serverless Platforms](#other-serverless-platforms)
- [Document Pipelines with Box AI](#document-pipelines-with-box-ai)
  - [Text Extraction](#text-extraction)
  - [Metadata Extraction](#metadata-extraction)
  - [Document Q&A](#document-qa)
- [Multi-Agent Applications](#multi-agent-applications)
- [Integration Examples](#integration-examples)

## Overview

The Box CLI can be used to automate document workflows, build data pipelines, and integrate with various platforms. This guide provides patterns for common integration scenarios.

## Serverless Deployments

### Vercel Integration

Integrating Box with Vercel-deployed applications enables document management capabilities in your web applications.

#### Prerequisites

1. A Box Platform Application with [Server Authentication (JWT)](authentication.md#server-auth-with-jwt) or [Client Credentials Grant (CCG)](authentication.md#server-auth-with-ccg)
2. A Vercel project with environment variables configured

#### Environment Setup

Store your Box credentials as Vercel environment variables:

```bash
# In Vercel Dashboard or CLI:
# BOX_CLIENT_ID - Your Box application client ID
# BOX_CLIENT_SECRET - Your Box application client secret
# BOX_ENTERPRISE_ID - Your Box enterprise ID
# BOX_PRIVATE_KEY - Your JWT private key (base64 encoded)
```

#### Using Box CLI in Vercel Functions

For Vercel serverless functions, use the [Box Node SDK](https://github.com/box/box-node-sdk) directly:

```javascript
// api/documents.js
import BoxSDK from 'box-node-sdk';

const sdk = new BoxSDK({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET,
  appAuth: {
    keyID: process.env.BOX_KEY_ID,
    privateKey: Buffer.from(process.env.BOX_PRIVATE_KEY, 'base64').toString(),
    passphrase: process.env.BOX_PASSPHRASE
  }
});

export default async function handler(req, res) {
  const client = sdk.getAppAuthClient('enterprise', process.env.BOX_ENTERPRISE_ID);
  
  // List files in a folder
  const items = await client.folders.getItems('0');
  res.json(items);
}
```

#### CLI for Local Development and Scripting

Use Box CLI for local development, testing, and automation scripts:

```bash
# Configure CLI with your Box app
box configure:environments:add path/to/config.json --name vercel-dev

# Test file operations locally
box files:get FILE_ID --json

# Use in CI/CD scripts
box files:upload ./build/output.pdf --parent-folder FOLDER_ID
```

### AWS Lambda Integration

Similar patterns apply for AWS Lambda deployments:

```bash
# Store credentials in AWS Secrets Manager or Parameter Store
# Use Box Node SDK in Lambda function code
# Use Box CLI in build/deployment scripts
```

### Other Serverless Platforms

The Box CLI and SDKs work with any serverless platform:

- **Netlify Functions** - Similar to Vercel setup
- **Google Cloud Functions** - Use environment variables or Secret Manager
- **Azure Functions** - Use Azure Key Vault for credentials

## Document Pipelines with Box AI

Box AI enables intelligent document processing directly through the CLI.

### Text Extraction

Extract and analyze text content from documents:

```bash
# Ask questions about a document
box ai:ask --items "id=FILE_ID,type=file" --prompt "Summarize this document"

# Generate text based on document content
box ai:text-gen --items "id=FILE_ID,type=file" --prompt "Write an executive summary"
```

### Metadata Extraction

Extract structured data from documents:

```bash
# Extract key-value pairs
box ai:extract --items "id=FILE_ID,type=file" \
  --prompt "firstName, lastName, email, company"

# Extract with metadata template
box ai:extract-structured --items "id=FILE_ID,type=file" \
  --metadata-template "type=metadata_template,scope=enterprise,template_key=contract_info"
```

### Document Q&A

Build interactive document Q&A systems:

```bash
# Interactive Q&A with context
box ai:ask --items "id=FILE_ID,type=file" \
  --prompt "What are the payment terms in this contract?"

# Multi-document analysis
box ai:ask --items "id=FILE_ID_1,type=file" --items "id=FILE_ID_2,type=file" \
  --prompt "Compare the pricing between these two proposals"
```

### Building Data Pipelines

Combine CLI commands for automated document processing:

```bash
#!/bin/bash
# process-documents.sh

# Get all files in a folder
FILES=$(box folders:items FOLDER_ID --json | jq -r '.entries[].id')

for FILE_ID in $FILES; do
  # Extract metadata from each document
  box ai:extract --items "id=$FILE_ID,type=file" \
    --prompt "documentType, date, parties, value" \
    --json >> extracted_data.json
done
```

## Multi-Agent Applications

Box AI can power multi-agent architectures for complex document workflows.

### Agent Configuration

Configure AI agents for specific tasks using custom instructions:

```bash
# Use custom AI agent configurations
box ai:ask --items "id=FILE_ID,type=file" \
  --prompt "Analyze this contract" \
  --ai-agent '{"type":"ai_agent_ask","basicText":{"model":"azure__openai__gpt_4o_mini"}}'
```

### Example: Contract Review Agent

```bash
# Extract contract clauses
box ai:extract-structured --items "id=CONTRACT_ID,type=file" \
  --fields "key=parties,type=string" \
  --fields "key=effective_date,type=date" \
  --fields "key=termination_clause,type=string" \
  --fields "key=payment_terms,type=string"
```

### Example: Document Classification Agent

```bash
# Classify document type
box ai:ask --items "id=FILE_ID,type=file" \
  --prompt "Classify this document into one of: invoice, contract, report, correspondence"
```

### Orchestrating Multiple Agents

Use scripting to coordinate multiple AI operations:

```bash
#!/bin/bash
# multi-agent-workflow.sh

FILE_ID=$1

# Agent 1: Document Classification
DOC_TYPE=$(box ai:ask --items "id=$FILE_ID,type=file" \
  --prompt "Classify: invoice, contract, or report" --json | jq -r '.answer')

# Agent 2: Extract based on type
case $DOC_TYPE in
  "invoice")
    box ai:extract --items "id=$FILE_ID,type=file" \
      --prompt "vendor, amount, due_date, invoice_number"
    ;;
  "contract")
    box ai:extract --items "id=$FILE_ID,type=file" \
      --prompt "parties, effective_date, term, value"
    ;;
  "report")
    box ai:ask --items "id=$FILE_ID,type=file" \
      --prompt "Summarize the key findings"
    ;;
esac
```

## Integration Examples

### Web Application Backend

Use Box CLI in backend automation while using SDKs for real-time operations:

```javascript
// Next.js API route example
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  const { fileId, prompt } = req.body;
  
  try {
    // Use CLI for complex operations
    const { stdout } = await execAsync(
      `box ai:ask --items "id=${fileId},type=file" --prompt "${prompt}" --json`
    );
    
    res.json(JSON.parse(stdout));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### CI/CD Pipeline Integration

Automate document workflows in your deployment pipeline:

```yaml
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Box CLI
        run: npm install -g @box/cli
        
      - name: Configure Box CLI
        run: |
          echo "$BOX_CONFIG" > box_config.json
          box configure:environments:add box_config.json --name ci
        env:
          BOX_CONFIG: ${{ secrets.BOX_CONFIG }}
          
      - name: Upload documentation
        run: |
          box files:upload ./docs/README.md --parent-folder $FOLDER_ID
        env:
          FOLDER_ID: ${{ vars.BOX_DOCS_FOLDER_ID }}
```

### Figma to Box Integration

Automate design asset management:

```bash
#!/bin/bash
# sync-figma-exports.sh

# Export Figma designs (using Figma API separately)
# Then upload to Box

EXPORT_DIR="./figma-exports"
BOX_FOLDER_ID="DESIGN_ASSETS_FOLDER_ID"

# Upload all exported files
for file in $EXPORT_DIR/*; do
  box files:upload "$file" --parent-folder $BOX_FOLDER_ID
  echo "Uploaded: $file"
done
```

## Related Documentation

- [Authentication Guide](authentication.md)
- [AI Commands](ai.md)
- [Bulk Actions](Bulk%20actions/README.md)
- [Sample Scripts](../examples/README.md)

## Questions and Support

- [Box Developer Forum](https://community.box.com/t5/Developer-Forum/bd-p/DeveloperForum)
- [Box CLI GitHub Issues](https://github.com/box/boxcli/issues)
