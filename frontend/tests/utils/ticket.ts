import { type Page, expect } from "@playwright/test"

export async function createTicket(
  page: Page,
  title: string,
  description: string,
  category: string,
  priority: string
) {
  // Navigate to tickets page
  await page.goto("/tickets")
  
  // Click the create new ticket button
  await page.getByRole("button", { name: "New Ticket" }).click()
  
  // Fill in the ticket form
  await page.getByLabel("Title").fill(title)
  await page.getByLabel("Description").fill(description)
  await page.getByLabel("Category").selectOption(category)
  await page.getByLabel("Priority").selectOption(priority)
  
  // Submit the form
  await page.getByRole("button", { name: "Create" }).click()
  
  // Wait for the confirmation and return to tickets page
  await expect(page.getByText("Ticket created successfully")).toBeVisible()
  await page.waitForURL("/tickets")
}

export async function updateTicket(
  page: Page,
  ticketTitle: string,
  newTitle?: string,
  newDescription?: string,
  newStatus?: string
) {
  // Navigate to tickets page
  await page.goto("/tickets")
  
  // Find and click on the ticket to edit
  await page.getByRole("link", { name: ticketTitle }).click()
  
  // Click the edit button
  await page.getByRole("button", { name: "Edit" }).click()
  
  // Update fields if provided
  if (newTitle) {
    await page.getByLabel("Title").fill(newTitle)
  }
  
  if (newDescription) {
    await page.getByLabel("Description").fill(newDescription)
  }
  
  if (newStatus) {
    await page.getByLabel("Status").selectOption(newStatus)
  }
  
  // Save changes
  await page.getByRole("button", { name: "Save" }).click()
  
  // Wait for confirmation
  await expect(page.getByText("Ticket updated successfully")).toBeVisible()
}

export async function deleteTicket(page: Page, ticketTitle: string) {
  // Navigate to tickets page
  await page.goto("/tickets")
  
  // Find and click on the ticket to delete
  await page.getByRole("link", { name: ticketTitle }).click()
  
  // Click the delete button
  await page.getByRole("button", { name: "Delete" }).click()
  
  // Confirm deletion in the modal
  await page.getByRole("button", { name: "Confirm" }).click()
  
  // Wait for confirmation and return to tickets page
  await expect(page.getByText("Ticket deleted successfully")).toBeVisible()
  await page.waitForURL("/tickets")
}

export async function addComment(page: Page, ticketTitle: string, commentText: string) {
  // Navigate to tickets page
  await page.goto("/tickets")
  
  // Find and click on the ticket
  await page.getByRole("link", { name: ticketTitle }).click()
  
  // Add a comment
  await page.getByPlaceholder("Add a comment...").fill(commentText)
  await page.getByRole("button", { name: "Post" }).click()
  
  // Verify comment was added
  await expect(page.getByText(commentText)).toBeVisible()
}

export async function verifyTicketExists(page: Page, ticketTitle: string) {
  // Navigate to tickets page
  await page.goto("/tickets")
  
  // Verify the ticket is in the list
  await expect(page.getByRole("link", { name: ticketTitle })).toBeVisible()
}
