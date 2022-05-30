export interface MyRepository<Result> {
  (props: { abortController: AbortController }): Result;
}
