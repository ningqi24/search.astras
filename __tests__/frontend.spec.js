/**
 * Astras Search 前端测试
 * 
 * 使用 Playwright 进行端到端测试
 * 运行前需安装：npm install -D @playwright/test
 */

const { test, expect } = require('@playwright/test');

test.describe('Astras Search Frontend', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');
  });

  test('should display search interface', async ({ page }) => {
    await expect(page.locator('.logo')).toHaveText('Astras Search');
    await expect(page.locator('#searchInput')).toBeVisible();
  });

  test('should switch search engines', async ({ page }) => {
    const bingTab = page.locator('[data-engine="bing"]');
    await bingTab.click();
    await expect(bingTab).toHaveClass(/active/);
  });

  test('should toggle dark mode', async ({ page }) => {
    const themeButton = page.locator('.theme-toggle');
    await themeButton.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // 验证 localStorage
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');
  });

  test('should navigate to privacy page', async ({ page }) => {
    await page.click('a[href="privacy.html"]');
    await expect(page).toHaveURL(/privacy.html/);
    await expect(page.locator('h1')).toContainText('隐私政策');
  });

  test('should navigate to terms page', async ({ page }) => {
    await page.click('a[href="terms.html"]');
    await expect(page).toHaveURL(/terms.html/);
    await expect(page.locator('h1')).toContainText('免责声明');
  });

  test('should respond to keyboard shortcuts', async ({ page }) => {
    await page.keyboard.press('Control+k');
    await expect(page.locator('#searchInput')).toBeFocused();
  });

  test('should show search suggestions', async ({ page }) => {
    const input = page.locator('#searchInput');
    await input.fill('天气');
    await page.waitForTimeout(300); // 等待防抖
    await expect(page.locator('.suggestions')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.logo')).toBeVisible();
    await expect(page.locator('.search-box')).toBeVisible();
  });
});