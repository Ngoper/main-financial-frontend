# AI Query API - Quick Reference

## Endpoint
```
POST /api/v1/ai/query
Authorization: Bearer <JWT_TOKEN>
```

## Request Parameters

| Field | Type | Required | Values | Description |
|-------|------|----------|--------|-------------|
| `mode` | string | ✅ | `company-analysis`, `stock-recommendations`, `document-analysis` | Query mode |
| `level` | integer | ✅ | `1`, `2`, `3` | Expertise level (1=newbie, 2=novice, 3=expert) |
| `query` | string | ✅ | any | Your question |
| `tickers` | array | ❌ | `["AAPL", "MSFT"]` | Override inferred tickers (Mode 1) |
| `ticker` | string | ❌ | `"AAPL"` | Single ticker override (Mode 1) |
| `artifactId` | string | ❌ | `"artifact_123"` | Reference to uploaded docs (Mode 3) |
| `files` | files | ❌ | PDF, DOCX, etc. | Upload files (Mode 3, max 10) |

## Quick Examples

### Mode 1: Company Analysis (JSON)
```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"company-analysis","level":1,"query":"Tesla revenue?"}'
```

### Mode 2: Stock Recommendations (JSON)
```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"stock-recommendations","level":2,"query":"Best tech stocks?"}'
```

### Mode 3: Document Analysis (Multipart)
```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer TOKEN" \
  -F "mode=document-analysis" \
  -F "level=1" \
  -F "query=Summarize this" \
  -F "files=@report.pdf"
```

## Response Structure
```json
{
  "answer": "Your answer with inline citations [TSLA:AR2024#c17]",
  "sources": [
    {
      "doc_id": "TSLA__annual_report__2024-01-31__abc123",
      "title": "Tesla Annual Report 2024",
      "ticker": "TSLA",
      "chunk_id": "c17",
      "page": 12
    }
  ],
  "metadata": {
    "mode": "company-analysis",
    "level": 1,
    "inferred_tickers": ["TSLA"],
    "retrieval": {"top_k_used": 6, "chunks_used": 3},
    "timings_ms": {"retrieve": 220, "generate": 1080}
  }
}
```

## Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| 400 | Bad Request | Missing required field |
| 401 | Unauthorized | Invalid/missing JWT token |
| 422 | Validation Error | Empty query string |
| 500 | Server Error | AI service unavailable |

## Level Guide

| Level | Name | Use For | Example Query |
|-------|------|---------|---------------|
| 1 | Newbie | Beginners, simple explanations | "What is revenue?" |
| 2 | Novice | Intermediate users | "Compare profit margins" |
| 3 | Expert | Financial professionals | "Assess FCF sensitivity to COGS" |

## Mode Guide

| Mode | Use For | Ticker Required? | Files Allowed? |
|------|---------|------------------|----------------|
| `company-analysis` | Specific company questions | Auto-inferred | ❌ |
| `stock-recommendations` | Broad investment ideas | ❌ | ❌ |
| `document-analysis` | Your uploaded documents | ❌ | ✅ Required |

## File Upload Specs

- **Formats:** PDF, DOCX, PPTX, TXT, HTML, CSV, XLSX
- **Max Files:** 10 per request
- **Max Size:** 50MB total
- **Field Name:** `files` (repeat for multiple)

## Common Patterns

### With Ticker Override
```json
{
  "mode": "company-analysis",
  "level": 2,
  "query": "Compare these companies",
  "tickers": ["AAPL", "MSFT", "GOOGL"]
}
```

### Multiple Files
```bash
-F "files=@file1.pdf" \
-F "files=@file2.pdf" \
-F "files=@file3.pdf"
```

### Reuse Uploaded Docs
```json
{
  "mode": "document-analysis",
  "level": 1,
  "query": "What changed from last quarter?",
  "artifactId": "artifact_abc123"
}
```

## Environment Setup
```env
AI_API_URL=http://ai-service:8000
AI_API_KEY=your-key-here
```

## Full Documentation
- [AI_QUERY_GUIDE.md](AI_QUERY_GUIDE.md) - Complete guide with examples
- [INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md) - Technical implementation details
- [README.md](README.md) - Project overview
