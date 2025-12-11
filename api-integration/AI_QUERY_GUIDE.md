# AI Query API Guide

This guide explains how to use the unified AI query endpoint integrated with the Financial Chat AI service.

## Endpoint

```
POST /api/v1/ai/query
```

**Authentication:** Required (JWT Bearer token)

## Request Formats

The endpoint accepts two content types:

### 1. JSON Request (for Modes 1 & 2, or Mode 3 with artifactId)

```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "company-analysis",
    "level": 1,
    "query": "What are Tesla's revenue trends in 2024?"
  }'
```

### 2. Multipart Form Data (for Mode 3 with file uploads)

```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "mode=document-analysis" \
  -F "level=1" \
  -F "query=Summarize the key points from these reports" \
  -F "files=@report1.pdf" \
  -F "files=@report2.pdf"
```

## Request Parameters

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `mode` | string | Query mode: `company-analysis`, `stock-recommendations`, or `document-analysis` |
| `level` | integer | Expertise level: `1` (newbie), `2` (novice), or `3` (expert) |
| `query` | string | Your question or instruction |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `tickers` | array | Override inferred tickers (Mode 1 only) |
| `ticker` | string | Single ticker override (Mode 1 only) |
| `artifactId` | string | Reference to previously uploaded documents (Mode 3) |
| `files` | files | Multiple file uploads (Mode 3, max 10 files) |

## Modes Explained

### Mode 1: Company Analysis
Analyzes specific companies with automatic ticker inference.

**Example:**
```json
{
  "mode": "company-analysis",
  "level": 2,
  "query": "Compare Apple and Microsoft's profit margins"
}
```

**Response includes:**
- Company-specific insights
- Inferred tickers (e.g., AAPL, MSFT)
- Citations from company documents

### Mode 2: Stock Recommendations
Provides broad investment ideas across multiple companies.

**Example:**
```json
{
  "mode": "stock-recommendations",
  "level": 3,
  "query": "Which Indonesian consumer staples stocks have stable margins?"
}
```

**Response includes:**
- Multi-company analysis
- Investment recommendations
- Risk assessments
- Disclaimer about non-personalized advice

### Mode 3: Document Analysis
Analyzes only your uploaded documents.

**Example (with files):**
```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "mode=document-analysis" \
  -F "level=1" \
  -F "query=What are the main findings?" \
  -F "files=@quarterly_report.pdf"
```

**Example (with artifactId):**
```json
{
  "mode": "document-analysis",
  "level": 2,
  "query": "What were the revenue trends?",
  "artifactId": "artifact_abc123"
}
```

## Expertise Levels

The `level` parameter controls the answer style and complexity:

| Level | Name | Description | Use Case |
|-------|------|-------------|----------|
| `1` | Newbie | Simple, jargon-free explanations | Beginners, general audience |
| `2` | Novice | Moderate complexity, some technical terms | Intermediate users |
| `3` | Expert | Technical, concise, finance jargon | Financial professionals |

**Note:** Level only affects presentation style, not the depth of analysis or retrieval.

## Response Format

```json
{
  "answer": "Tesla reported revenue of approximately $X billion in 2024...",
  "sources": [
    {
      "doc_id": "TSLA__annual_report__2024-01-31__a1b2c3d4",
      "title": "Tesla, Inc. Annual Report 2024",
      "ticker": "TSLA",
      "chunk_id": "c17",
      "page": 12
    }
  ],
  "metadata": {
    "mode": "company-analysis",
    "level": 1,
    "inferred_tickers": ["TSLA"],
    "retrieval": {
      "top_k_used": 6,
      "chunks_used": 3
    },
    "timings_ms": {
      "retrieve": 220,
      "generate": 1080
    }
  }
}
```

## Complete Examples

### Example 1: Simple Company Question (Newbie Level)

**Request:**
```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "company-analysis",
    "level": 1,
    "query": "Explain Tesla revenue in simple terms"
  }'
```

**Response:**
```json
{
  "answer": "Revenue is the total money a company makes from selling products before costs. Tesla made about $X billion in 2024, up from 2023, mainly because they sold more cars. [TSLA:AR2024#c17]",
  "sources": [
    {
      "doc_id": "TSLA__annual_report__2024-01-31__a1b2c3d4",
      "ticker": "TSLA",
      "title": "Tesla, Inc. Annual Report 2024",
      "chunk_id": "c17",
      "page": 12
    }
  ],
  "metadata": {
    "mode": "company-analysis",
    "level": 1,
    "inferred_tickers": ["TSLA"]
  }
}
```

### Example 2: Expert Analysis

**Request:**
```json
{
  "mode": "company-analysis",
  "level": 3,
  "query": "Assess Tesla's 2022-2024 gross margin trajectory and FCF sensitivity"
}
```

### Example 3: Stock Recommendations

**Request:**
```json
{
  "mode": "stock-recommendations",
  "level": 2,
  "query": "Which tech stocks have strong balance sheets?"
}
```

### Example 4: Document Upload

**Request:**
```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "mode=document-analysis" \
  -F "level=1" \
  -F "query=Summarize the key financial metrics" \
  -F "files=@q4_report.pdf" \
  -F "files=@annual_report.pdf"
```

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Field 'level' is required and must be 1, 2, or 3."
}
```

### 401 Unauthorized
```json
{
  "error": "Missing or invalid token"
}
```

### 422 Unprocessable Entity
```json
{
  "detail": "Field 'query' must be a non-empty string."
}
```

### 500 Internal Server Error
```json
{
  "detail": "Failed to query AI service: connection timeout"
}
```

## File Upload Specifications

- **Supported formats:** PDF, DOCX, PPTX, TXT, HTML, CSV, XLSX
- **Max files:** 10 per request
- **Max size:** 50MB total (configured in backend)
- **Field name:** `files` (can upload multiple with same field name)

## Best Practices

1. **Choose the right mode:**
   - Use `company-analysis` for specific company questions
   - Use `stock-recommendations` for broad investment ideas
   - Use `document-analysis` for your own documents

2. **Select appropriate level:**
   - Level 1 for client-facing reports
   - Level 2 for internal team discussions
   - Level 3 for technical analysis

3. **Optimize queries:**
   - Be specific in your questions
   - Include context when needed
   - For Mode 3, ensure documents are relevant

4. **Handle responses:**
   - Check `sources` for citation verification
   - Use `metadata.timings_ms` for performance monitoring
   - Store `artifactId` for reusing uploaded documents

## Integration Notes

- The backend automatically logs all queries to the database
- User ID is extracted from JWT token
- Queries are associated with user accounts for analytics
- File uploads are forwarded to the AI service
- Response format matches OpenAPI specification

## Environment Configuration

Ensure these variables are set in your `.env`:

```env
AI_API_URL=http://your-ai-service:8000
AI_API_KEY=your-api-key-here
```

The backend will construct the full URL as: `{AI_API_URL}/v1/query`
