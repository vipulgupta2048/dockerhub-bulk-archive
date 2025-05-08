import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
// import * as dotenv from 'dotenv';

// Load environment variables
// dotenv.config();

/**
 * Docker Hub credentials from environment variables
 */
const DOCKER_USERNAME = ""
const DOCKER_PASSWORD = ""
// const DOCKER_2FA = process.env.DOCKER_2FA;

if (!DOCKER_USERNAME || !DOCKER_PASSWORD) {
  throw new Error('DOCKER_USERNAME and DOCKER_PASSWORD must be set in environment variables');
}

/**
 * Loads repository information from a JSON file
 * The JSON file should contain an array of Docker Hub repository URLs
 * @returns Array of repository names extracted from URLs
 */
const loadRepositories = () => {
  const jsonPath = path.join(__dirname, './docker_repositories.json');
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  return jsonData.repositories.map(url => {
    // Extract repository name from URL
    // URL format: https://hub.docker.com/r/balenalib/repo-name
    const repoName = url.split('/r/')[1].split('/')[1];
    return repoName;
  });
};

// Get list of repositories to process
const REPOSITORIES = loadRepositories();

/**
 * Test to archive multiple Docker Hub repositories
 * This test will:
 * 1. Log in to Docker Hub
 * 2. Process each repository in sequence
 * 3. Archive each repository
 * 4. Log success/failure for each operation
 */
test('Archive multiple DockerHub repositories', async ({ page }) => {
  // 1. Navigate to Docker Hub login
  await page.goto('https://login.docker.com/u/login/identifier');

  // 2. Fill in username and continue
  await page.fill('input[name="username"]', DOCKER_USERNAME);
  await page.click('button[type="submit"]');

  // 3. Fill in password and continue
  await page.fill('input[name="password"]', DOCKER_PASSWORD);
  await page.click('button[type="submit"]');

  // // 4. Wait for 2FA input and fill it
  // await page.waitForSelector('input[name="code"]', { timeout: 10000 });
  // await page.fill('input[name="code"]', DOCKER_2FA);
  // await page.click('button[type="submit"]');

  // Wait for login to complete and redirect to hub.docker.com
  await page.waitForURL('https://hub.docker.com/**');
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  console.log("User authenticated. Let the archival begin.")

  // Process each repository
  for (const repoName of REPOSITORIES) {
    console.log(`Processing repository: ${repoName}`);
    
    try {
      // Navigate to repository settings
      await page.goto(`https://hub.docker.com/repository/docker/${DOCKER_USERNAME}/${repoName}/settings`, {
        waitUntil: 'networkidle'
      });

      // Check if the repository is already archived
      const unarchiveButton = await page.locator('button:has-text("Unarchive repository")').first();
      if (await unarchiveButton.isVisible().catch(() => false)) {
        console.log(`Repository "${repoName}" is already archived. Skipping.`);
        continue;
      }

      // Click the Archive Repository button
      await page.waitForSelector('button:has-text("Archive repository")', { timeout: 5000 });
      await page.click('button:has-text("Archive repository")');

      // Wait for dialog and fill repo name
      await page.waitForSelector('div[role="dialog"]');
      const dialogInput = page.locator('div[role="dialog"] input[type="text"]');
      await dialogInput.waitFor({ state: 'visible' });
      await dialogInput.fill(repoName);

      // Click the Archive button in the dialog
      await page.click('div[role="dialog"] button:has-text("Archive")');

      // Assert that the repository is archived
      await expect(page.locator('text=This repository is archived')).toBeVisible({ timeout: 10000 });
      
      console.log(`Successfully archived repository: ${repoName}`);
    } catch (error) {
      console.error(`Failed to archive repository ${repoName}:`, error);
      // Continue with next repository even if one fails
      continue;
    }
  }
}); 