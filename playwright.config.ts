import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  timeout: 900000000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://hub.docker.com',
    trace: 'on',  // Capture trace for all test runs
    screenshot: 'on',  // Capture screenshots for all test runs
    video: 'on-first-retry',  // Capture video on first retry
    navigationTimeout: 60000,  // Increase navigation timeout to 60 seconds
    actionTimeout: 30000,  // Increase action timeout to 30 seconds
    // Show browser for debugging
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
}); 