# Box AI Enhanced Extract Agent Example

This example demonstrates how to use the Box AI Enhanced Extract Agent to extract structured data from complex documents with greater accuracy. The Enhanced Extract Agent is powered by Gemini 2.5 Pro and employs chain-of-thought processing to provide both the extracted data and reasoning for its answers.

## What is the Enhanced Extract Agent?

The Enhanced Extract Agent is designed to tackle key-value pair extraction from the most complex documents with greater accuracy. It's particularly useful for:

- Long documents (100+ pages)
- Documents with complex structures (tables, images)
- Documents with complex taxonomies or barcodes
- Extracting data that requires reasoning and context

The agent not only provides the extracted values but also includes reasoning for why it believes the answer is correct, giving you confidence in the results.

## Prerequisites

1. Box CLI installed and configured
2. A Box Platform App with the 'Manage AI' Scope enabled
3. Authentication configured (JWT or OAuth)
4. A file in Box to extract data from
5. A metadata template (optional, can also define fields inline)

## Using the Enhanced Extract Agent

### Basic Usage with Metadata Template

The simplest way to use the Enhanced Extract Agent is with a metadata template:

```bash
box ai:extract-structured \
  --items="id=YOUR_FILE_ID,type=file" \
  --metadata-template="type=metadata_template,scope=enterprise,template_key=InvoicePO" \
  --ai-agent='{"id":"enhanced_extract_agent","type":"ai_agent_id"}'
```

### Using Inline Fields

You can also define fields inline without a metadata template:

```bash
box ai:extract-structured \
  --items="id=YOUR_FILE_ID,type=file" \
  --fields="key=invoiceNumber,type=string,description=Invoice number,prompt=What is the invoice number?" \
  --fields="key=totalAmount,type=string,description=Total amount,prompt=What is the total amount?" \
  --ai-agent='{"id":"enhanced_extract_agent","type":"ai_agent_id"}'
```

### Output Format

The response includes both the extracted data and reasoning:

```json
{
  "answer": {
    "invoiceNumber": "INV-12345",
    "totalAmount": "$1,234.56"
  },
  "created_at": "2025-06-24T07:25:24.366Z",
  "completion_reason": "done",
  "ai_agent_info": {
    "models": [
      {
        "name": "google__gemini_2_5_pro_001",
        "provider": "google"
      }
    ],
    "processor": "enhanced_extract"
  }
}
```

## Comparison: Standard vs Enhanced Extract

### Standard Extract
Use the standard extract endpoint (without specifying an agent) for:
- Shorter documents
- Simple document structures
- Quick extractions where high accuracy isn't critical

```bash
box ai:extract-structured \
  --items="id=YOUR_FILE_ID,type=file" \
  --metadata-template="type=metadata_template,scope=enterprise,template_key=InvoicePO"
```

### Enhanced Extract Agent
Use the Enhanced Extract Agent for:
- Complex, long documents
- Documents with tables, images, barcodes
- When you need chain-of-thought reasoning
- When accuracy is critical

```bash
box ai:extract-structured \
  --items="id=YOUR_FILE_ID,type=file" \
  --metadata-template="type=metadata_template,scope=enterprise,template_key=InvoicePO" \
  --ai-agent='{"id":"enhanced_extract_agent","type":"ai_agent_id"}'
```

## Example Use Cases

### Invoice Processing
Extract invoice details from complex multi-page invoices:

```bash
box ai:extract-structured \
  --items="id=123456,type=file" \
  --fields="key=invoiceNumber,type=string,description=Invoice number" \
  --fields="key=invoiceDate,type=string,description=Invoice date" \
  --fields="key=totalAmount,type=string,description=Total amount" \
  --fields="key=taxAmount,type=string,description=Tax amount" \
  --fields="key=vendorName,type=string,description=Vendor name" \
  --ai-agent='{"id":"enhanced_extract_agent","type":"ai_agent_id"}' \
  --json
```

### Contract Analysis
Extract key terms from lengthy contracts:

```bash
box ai:extract-structured \
  --items="id=789012,type=file" \
  --fields="key=contractDate,type=string,description=Contract effective date" \
  --fields="key=expirationDate,type=string,description=Contract expiration date" \
  --fields="key=parties,type=string,description=Contracting parties" \
  --fields="key=totalValue,type=string,description=Total contract value" \
  --ai-agent='{"id":"enhanced_extract_agent","type":"ai_agent_id"}' \
  --json
```

### Medical Records
Extract patient information from medical documents:

```bash
box ai:extract-structured \
  --items="id=345678,type=file" \
  --metadata-template="type=metadata_template,scope=enterprise,template_key=PatientRecords" \
  --ai-agent='{"id":"enhanced_extract_agent","type":"ai_agent_id"}' \
  --json
```

## Advanced Configuration

### Custom AI Agent Configuration
While the Enhanced Extract Agent uses a simple agent reference, you can also configure a custom agent with full control:

```bash
box ai:extract-structured \
  --items="id=YOUR_FILE_ID,type=file" \
  --metadata-template="type=metadata_template,scope=enterprise,template_key=InvoicePO" \
  --ai-agent='{"type":"ai_agent_extract_structured","basicText":{"model":"azure__openai__gpt_4o_mini","promptTemplate":"Extract the following data: {content}","systemMessage":"You are a helpful assistant specialized in data extraction"}}' \
  --json
```

## Best Practices

1. **Use Metadata Templates**: For recurring extraction tasks, create metadata templates in Box admin panel for consistency
2. **Validate Reasoning**: The Enhanced Extract Agent provides reasoning - use this to validate results programmatically
3. **Error Handling**: Always check the `completion_reason` field in the response
4. **File Format**: The agent works best with PDFs, but also supports Word documents and images
5. **Field Descriptions**: Provide clear, specific field descriptions and prompts for better accuracy

## Troubleshooting

### Agent Not Available
If you receive an error that the agent is not available:
- Ensure your Box app has the 'Manage AI' scope enabled
- Verify the agent ID is spelled correctly: `enhanced_extract_agent`
- Check that your enterprise has access to Box AI features

### Poor Extraction Quality
If extraction results are not accurate:
- Verify your field descriptions and prompts are clear and specific
- Check document quality (scanned documents should be OCR-enabled)
- Consider if the document is too complex - you may need to break it into sections

### Authentication Errors
If you receive authentication errors:
- Verify your Box CLI is properly configured with `box configure:environments:list`
- Ensure your app has appropriate permissions
- Check that tokens haven't expired

## Additional Resources

- [Box AI API Documentation](https://developer.box.com/guides/box-ai/)
- [Box CLI Documentation](https://github.com/box/boxcli)
- [Metadata Templates Guide](https://developer.box.com/guides/metadata/)
- [Box Developer Blog](https://medium.com/box-developer-blog)

## Disclaimer

This example is a collection of open source examples and should not be treated as an officially supported product. Use at your own risk and as a source of examples for how to use Box CLI.
