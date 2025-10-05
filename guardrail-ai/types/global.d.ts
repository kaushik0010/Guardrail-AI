export interface CerebrasResponse {
  choices: {
    message: {
      content: string | null;
    };
  }[];
}