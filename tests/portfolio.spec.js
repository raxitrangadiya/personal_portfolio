import { test, expect } from '@playwright/test';

test.describe('Personal Portfolio End-to-End Tests', () => {

  test('should load the homepage and display personal information', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Raxit Rangadiya | Portfolio/);
    
    // Check that name is visible in Hero section
    const nameHeader = page.locator('h1:has-text("Raxit Rangadiya")');
    await expect(nameHeader).toBeVisible();

    // Check navbar links are visible
    const aboutLink = page.locator('nav a:has-text("About")');
    await expect(aboutLink).toBeVisible();
    const skillsLink = page.locator('nav a:has-text("Skills")');
    await expect(skillsLink).toBeVisible();
  });

  test('should display dynamic projects loaded from database', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the projects section to load (ensure skeleton loaders are replaced)
    const projectSection = page.locator('#work');
    await expect(projectSection).toBeVisible();
    
    // At least one project card should render
    const projectCards = page.locator('#work .group');
    await expect(projectCards.first()).toBeVisible();
    
    // Check project details (like folder icon, title, technologies)
    const firstProjectTitle = await projectCards.first().locator('h3').textContent();
    expect(firstProjectTitle?.length).toBeGreaterThan(0);
  });

  test('should open project details modal on card click', async ({ page }) => {
    await page.goto('/');
    
    const firstProjectCard = page.locator('#work .group').first();
    await expect(firstProjectCard).toBeVisible();
    
    // Click project card to open modal
    await firstProjectCard.click();
    
    // Check that modal elements (Close button, Specifications, Title) are visible
    const modal = page.locator('div[role="dialog"]', { has: page.locator('button[aria-label="Close modal"]') }).or(page.locator('button[aria-label="Close modal"]'));
    await expect(modal).toBeVisible();
    
    // Close modal
    const closeBtn = page.locator('button[aria-label="Close modal"]');
    await closeBtn.click();
    await expect(modal).toBeHidden();
  });

  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/');
    
    // Fill out form
    await page.fill('#name', 'Playwright Automated Tester');
    await page.fill('#email', 'playwright.test@example.com');
    await page.fill('#message', 'Hello, this is an automated end-to-end integration test.');
    
    // Click submit button
    const submitBtn = page.locator('form button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();
    
    // Verify success state (button text changes to Proposal Sent!)
    await expect(page.locator('text=Proposal Sent!')).toBeVisible({ timeout: 10000 });
  });

  test('should authenticate admin and load the Admin Dashboard', async ({ page }) => {
    // Navigate to Login page
    await page.goto('/#/login');
    
    // Verify login page header
    const loginHeader = page.locator('h2:has-text("Admin")');
    await expect(loginHeader).toBeVisible();
    
    // Fill in default admin credentials (configured in backend server .env)
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    
    // Click Submit
    await page.click('button[type="submit"]');
    
    // Wait for OTP input to appear
    const otpInput = page.locator('#otp');
    await expect(otpInput).toBeVisible({ timeout: 5000 });
    
    // Fill mock OTP
    await page.fill('#otp', '123456');
    
    // Click Submit OTP
    await page.click('button[type="submit"]');
    
    // Wait for navigation — HashRouter produces /#/admin in the URL
    await page.waitForURL(/.*[#].*admin/, { timeout: 10000 });
    
    // Verify dashboard elements
    const dashboardHeader = page.locator('h1:has-text("Dashboard")');
    await expect(dashboardHeader).toBeVisible({ timeout: 10000 });
    
    // Check tabs are functional
    const projectsTab = page.locator('button', { hasText: 'Projects' });
    const messagesTab = page.locator('button', { hasText: 'Messages' });
    
    await expect(projectsTab).toBeVisible();
    await expect(messagesTab).toBeVisible();
    
    // Click Messages tab
    await messagesTab.click();
    await expect(page.locator('h2', { hasText: 'Received Messages' })).toBeVisible();
    
    // Check that our Playwright test message is in the inbox list!
    const testMessageContent = page.locator('text=Hello, this is an automated end-to-end integration test.').first();
    await expect(testMessageContent).toBeVisible();
  });
});
