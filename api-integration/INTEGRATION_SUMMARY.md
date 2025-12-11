# AI Query Endpoint Integration Summary

## Overview
Successfully integrated the backend with the Financial Chat AI unified query API according to the OpenAPI specification in `apicontext/query_endpoint.yaml`.

## Changes Made

### 1. Entity Updates (`internal/modules/aiquery/entity/aiquery.go`)

**Key Changes:**
- Changed `Level` from `string` to `int` (1-3 as per spec)
- Added optional fields: `Tickers`, `Ticker`, `ArtifactID`
- Renamed `Citation` to `SourceRef` to match spec
- Updated response structure with proper nullable fields
- Added structured `Retrieval` and `TimingsMs` types
- Made metadata fields optional with pointers

**Before:**
```go
type AIQueryRequest struct {
    Mode  string `json:"mode"`
    Level string `json:"level"` // "newbie", "novice", "expert"
    Query string `json:"query"`
}
```

**After:**
```go
type AIQueryRequest struct {
    Mode       string   `json:"mode"`
    Level      int      `json:"level"` // 1, 2, or 3
    Query      string   `json:"query"`
    Tickers    []string `json:"tickers,omitempty"`
    Ticker     string   `json:"ticker,omitempty"`
    ArtifactID string   `json:"artifactId,omitempty"`
}
```

### 2. Repository Updates (`internal/modules/aiquery/repository/aiquery_repository.go`)

**Key Changes:**
- Changed signature to accept multiple files: `[]*multipart.FileHeader`
- Support both JSON and multipart/form-data requests
- Updated API endpoint from `/api/v1/query` to `/v1/query` (per spec)
- Use `X-API-Key` header (removed redundant Authorization header)
- Proper handling of level as integer
- Support for multiple file uploads with correct field name `files`

**Request Logic:**
- If files present → multipart/form-data
- If no files → application/json
- Automatically selects appropriate Content-Type

### 3. Handler Updates (`internal/delivery/http/handler/aiquery_handler.go`)

**Key Changes:**
- Parse both JSON and multipart requests
- Convert level string to integer with validation (1-3)
- Support multiple file uploads via `form.File["files"]`
- Validate document-analysis mode requires files or artifactId
- Updated error messages to match OpenAPI spec format (`detail` field)
- Proper validation for all required fields

**Validation:**
- Mode: must be one of the three valid modes
- Level: must be integer 1, 2, or 3
- Query: must be non-empty string
- Document-analysis: requires files or artifactId

### 4. Documentation

**Created:**
- `AI_QUERY_GUIDE.md` - Comprehensive guide with examples for all modes and levels

**Updated:**
- `README.md` - Updated AI capabilities section and examples

## API Endpoint Specification

### Endpoint
```
POST /api/v1/ai/query
```

### Request Formats

#### JSON (Modes 1 & 2, or Mode 3 with artifactId)
```json
{
  "mode": "company-analysis",
  "level": 1,
  "query": "What are Tesla's revenue trends?"
}
```

#### Multipart (Mode 3 with files)
```
mode: document-analysis
level: 1
query: Summarize these reports
files: [file1.pdf, file2.pdf]
```

### Response Format
```json
{
  "answer": "...",
  "sources": [
    {
      "doc_id": "...",
      "title": "...",
      "ticker": "...",
      "chunk_id": "...",
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

## Modes & Levels

### Modes
1. **company-analysis** - Company-focused Q&A with automatic ticker inference
2. **stock-recommendations** - Broad stock ideas across multiple companies
3. **document-analysis** - Q&A grounded only in user-uploaded files

### Levels
1. **1 (Newbie)** - Simple, jargon-free explanations
2. **2 (Novice)** - Intermediate tone with light terminology
3. **3 (Expert)** - Technical, concise, finance jargon allowed

## Breaking Changes

⚠️ **Important:** The `level` parameter changed from string to integer:

**Old Format:**
```bash
-F "level=newbie"
```

**New Format:**
```bash
-F "level=1"
```

**Migration Guide:**
- `"newbie"` → `1`
- `"novice"` → `2`
- `"expert"` → `3`

## Backward Compatibility

The QueryLog entity still stores level as string, so database schema remains unchanged. The conversion happens at the application layer.

## Testing Checklist

- [ ] Test Mode 1 (company-analysis) with JSON
- [ ] Test Mode 2 (stock-recommendations) with JSON
- [ ] Test Mode 3 (document-analysis) with single file
- [ ] Test Mode 3 with multiple files (up to 10)
- [ ] Test Mode 3 with artifactId (no files)
- [ ] Test all three levels (1, 2, 3)
- [ ] Test error cases (missing fields, invalid values)
- [ ] Test JWT authentication
- [ ] Verify query logging to database
- [ ] Test with optional fields (ticker, tickers)

## Example Test Commands

### Test Mode 1 - Company Analysis
```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "company-analysis",
    "level": 1,
    "query": "What are Apple revenue trends?"
  }'
```

### Test Mode 2 - Stock Recommendations
```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "stock-recommendations",
    "level": 2,
    "query": "Which tech stocks have strong balance sheets?"
  }'
```

### Test Mode 3 - Document Analysis
```bash
curl -X POST http://localhost:8080/api/v1/ai/query \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "mode=document-analysis" \
  -F "level=1" \
  -F "query=Summarize the key points" \
  -F "files=@report.pdf"
```

## Configuration

Ensure your `.env` file has:
```env
AI_API_URL=http://your-ai-service:8000
AI_API_KEY=your-api-key-here
```

The backend constructs: `{AI_API_URL}/v1/query`

## Next Steps

1. Update any existing client applications to use integer levels
2. Test all three modes with the AI service
3. Monitor query logs for proper data capture
4. Consider adding request/response logging for debugging
5. Implement rate limiting if needed
6. Add integration tests

## Files Modified

- ✅ `internal/modules/aiquery/entity/aiquery.go`
- ✅ `internal/modules/aiquery/repository/aiquery_repository.go`
- ✅ `internal/delivery/http/handler/aiquery_handler.go`
- ✅ `README.md`
- ✅ `AI_QUERY_GUIDE.md` (new)
- ✅ `INTEGRATION_SUMMARY.md` (new)

## OpenAPI Compliance

The implementation now fully complies with the OpenAPI specification in `apicontext/query_endpoint.yaml`:

- ✅ Correct endpoint path (`/v1/query`)
- ✅ Integer level (1-3)
- ✅ X-API-Key header authentication
- ✅ Both JSON and multipart/form-data support
- ✅ Multiple file uploads
- ✅ Optional fields (tickers, ticker, artifactId)
- ✅ Proper error response format with `detail` field
- ✅ Response structure matches spec (answer, sources, metadata)
- ✅ SourceRef structure with nullable fields
