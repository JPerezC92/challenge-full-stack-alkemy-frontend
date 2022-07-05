export function isAbortError(error: any): boolean {
  return (error as DOMException)?.code === DOMException.ABORT_ERR;
}
