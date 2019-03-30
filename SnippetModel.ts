class Snippet {
  SnippetId: number;
  Body: string;
  UserId: number;
  Language: string;
  constructor(SnippetId: any, Body: any, UserId: any, Language: any) {
    this.SnippetId = SnippetId;
    this.Body = Body;
    this.UserId = UserId;
    this.Language = Language;
  }
}
