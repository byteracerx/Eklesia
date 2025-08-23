export default interface ChatCompletionResponse {
    id: string;
    object: "chat.completion";
    created: number;
    model: string;
    system_fingerprint?: string;
    choices: Array<{
      index: number;
      finish_reason: "stop" | "length" | "tool_calls" | "content_filter" | string | null;
      message: {
        role: "system" | "user" | "assistant" | "tool";
        content: string | null;
      };
    }>;
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
    timings?: {
      prompt_n: number;
      prompt_ms: number;
      prompt_per_token_ms: number;
      prompt_per_second: number;
      predicted_n: number;
      predicted_ms: number;
      predicted_per_token_ms: number;
      predicted_per_second: number;
    };
  }
  