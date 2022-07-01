const enum ENVIRONMENT {
  TEST = "test",
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export function isProduction() {
  return (
    ENVIRONMENT.PRODUCTION.toLowerCase() === process.env.NODE_ENV.toLowerCase()
  );
}

export function isDevelopment() {
  return (
    ENVIRONMENT.DEVELOPMENT.toLowerCase() === process.env.NODE_ENV.toLowerCase()
  );
}

export function isTest() {
  return ENVIRONMENT.TEST.toLowerCase() === process.env.NODE_ENV.toLowerCase();
}
