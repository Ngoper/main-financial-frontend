export interface ParsedResponse {
  mainAnswer: string;
  sources: string[];
  citations: Array<{ source: string; type: string }>;
}

export const parseAIResponse = (answer: string, citations?: Array<{ source: string; type: string }>): ParsedResponse => {
  // Split by "---" or "**Sources:**" to separate main answer from sources
  const parts = answer.split(/---\s*\*\*Sources:\*\*|---\s*Sources:/i);
  
  let mainAnswer = parts[0].trim();
  let sources: string[] = [];
  
  if (parts.length > 1) {
    // Extract sources from the second part
    const sourcesText = parts[1].trim();
    const sourceLines = sourcesText.split('\n').filter(line => line.trim());
    sources = sourceLines.filter(line => /^\d+\./.test(line.trim()));
  }
  
  // Remove inline source references from main answer
  // Matches: [Source: ...] or (Source: ...)
  mainAnswer = mainAnswer.replace(/\[Source:\s*[^\]]+\]/gi, '');
  mainAnswer = mainAnswer.replace(/\(Source:\s*[^\)]+\)/gi, '');
  mainAnswer = mainAnswer.replace(/Source:\s*[^\n]+/gi, '');
  mainAnswer = mainAnswer.trim();
  
  return {
    mainAnswer,
    sources,
    citations: citations || []
  };
};

/**
 * @deprecated Use MarkdownRenderer component instead. This function is retained
 * for backward compatibility only and will be removed in a future release.
 */
export const formatMarkdown = (text: string): string => {
  // Bold text: **text** -> <strong>text</strong>
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Italic text: *text* -> <em>text</em>
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Line breaks
  text = text.replace(/\n/g, '<br/>');
  
  // Lists: lines starting with - or *
  text = text.replace(/^[\-\*]\s+(.+)$/gm, '<li>$1</li>');
  if (text.includes('<li>')) {
    text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  }
  
  // Numbered lists
  text = text.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
  
  return text;
};
