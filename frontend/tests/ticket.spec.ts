import { test, expect } from "@playwright/test"
import { 
  createTicket, 
  updateTicket, 
  deleteTicket, 
  addComment, 
  verifyTicketExists 
} from "./utils/ticket"
import { logInUser } from "./utils/user"

// Test constants
const USER_EMAIL = "test@example.com"
const USER_PASSWORD = "password123"
const TICKET_TITLE = "Test Ticket"
const UPDATED_TITLE = "Updated Ticket"
const DESCRIPTION = "This is a test ticket description"
const UPDATED_DESCRIPTION = "This is an updated description"
const COMMENT = "This is a test comment"

test.describe("Ticket management", () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await logInUser(page, USER_EMAIL, USER_PASSWORD)
  })

  test("should create a new ticket", async ({ page }) => {
    await createTicket(
      page,
      TICKET_TITLE,
      DESCRIPTION,
      "Suporte", // Category
      "Média"    // Priority
    )
    
    // Verify ticket was created
    await verifyTicketExists(page, TICKET_TITLE)
  })

  test("should update an existing ticket", async ({ page }) => {
    // First create a ticket
    await createTicket(
      page,
      TICKET_TITLE,
      DESCRIPTION,
      "Suporte",
      "Média"
    )
    
    // Then update it
    await updateTicket(
      page,
      TICKET_TITLE,
      UPDATED_TITLE,
      UPDATED_DESCRIPTION,
      "Em andamento" // Status
    )
    
    // Verify ticket was updated
    await verifyTicketExists(page, UPDATED_TITLE)
  })

  test("should add a comment to a ticket", async ({ page }) => {
    // First create a ticket
    await createTicket(
      page,
      TICKET_TITLE,
      DESCRIPTION,
      "Suporte",
      "Média"
    )
    
    // Then add a comment
    await addComment(page, TICKET_TITLE, COMMENT)
  })

  test("should delete a ticket", async ({ page }) => {
    // First create a ticket
    await createTicket(
      page,
      TICKET_TITLE,
      DESCRIPTION,
      "Suporte",
      "Média"
    )
    
    // Then delete it
    await deleteTicket(page, TICKET_TITLE)
    
    // Verify ticket was deleted (should not be visible in the list)
    await page.goto("/tickets")
    await expect(page.getByRole("link", { name: TICKET_TITLE })).not.toBeVisible()
  })

  test("should filter tickets by category", async ({ page }) => {
    // Create two tickets with different categories
    await createTicket(
      page, 
      "Support Ticket", 
      "Description", 
      "Suporte", 
      "Média"
    )
    
    await createTicket(
      page,
      "Question Ticket",
      "Description",
      "Dúvida",
      "Baixa"
    )
    
    // Navigate to tickets page
    await page.goto("/tickets")
    
    // Filter by Support category
    await page.getByLabel("Category").selectOption("Suporte")
    await page.getByRole("button", { name: "Filter" }).click()
    
    // Check that only Support ticket is visible
    await expect(page.getByRole("link", { name: "Support Ticket" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Question Ticket" })).not.toBeVisible()
  })

  test("should filter tickets by status", async ({ page }) => {
    // Create a ticket
    await createTicket(
      page,
      "Open Ticket",
      "Description",
      "Suporte",
      "Média"
    )
    
    // Change its status to In Progress
    await updateTicket(page, "Open Ticket", undefined, undefined, "Em andamento")
    
    // Create another ticket (will be Open by default)
    await createTicket(
      page,
      "Another Open Ticket",
      "Description",
      "Suporte",
      "Média"
    )
    
    // Navigate to tickets page and filter by In Progress status
    await page.goto("/tickets")
    await page.getByLabel("Status").selectOption("Em andamento")
    await page.getByRole("button", { name: "Filter" }).click()
    
    // Check that only the In Progress ticket is visible
    await expect(page.getByRole("link", { name: "Open Ticket" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Another Open Ticket" })).not.toBeVisible()
  })
})
