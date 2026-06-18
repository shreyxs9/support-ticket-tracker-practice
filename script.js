const ticketForm = document.querySelector("#ticket-form");
const titleInput = document.querySelector("#ticket-title");
const descriptionInput = document.querySelector("#ticket-description");
const priorityInput = document.querySelector("#ticket-priority");
const categoryInput = document.querySelector("#ticket-category");
const formMessage = document.querySelector("#form-message");
const ticketList = document.querySelector("#ticket-list");
const searchInput = document.querySelector("#ticket-search");
const statusFilter = document.querySelector("#status-filter");
const priorityFilter = document.querySelector("#priority-filter");

const totalCount = document.querySelector("#total-count");
const openCount = document.querySelector("#open-count");
const progressCount = document.querySelector("#progress-count");
const resolvedCount = document.querySelector("#resolved-count");

let tickets = [];

function renderTickets() {
  ticketList.innerHTML = "";
  updateSummary();

  const visibleTickets = getVisibleTickets();

  if (visibleTickets.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent = "No tickets to show.";
    ticketList.appendChild(emptyState);
    return;
  }

  visibleTickets.forEach((ticket) => {
    const ticketCard = document.createElement("li");
    ticketCard.className = "ticket-card";
    ticketCard.dataset.id = ticket.id;

    ticketCard.innerHTML = `
      <div class="ticket-header">
        <h3 class="ticket-title"></h3>
        <span class="badge status-badge"></span>
      </div>
      <p class="ticket-description"></p>
      <div class="badge-row">
        <span class="badge priority-badge"></span>
        <span class="badge category-badge"></span>
      </div>
      <div class="ticket-actions">
        <button class="ticket-action edit" type="button">Edit</button>
        <button class="ticket-action status" type="button">Next Status</button>
        <button class="ticket-action delete" type="button">Delete</button>
      </div>
    `;

    ticketCard.querySelector(".ticket-title").textContent = ticket.title;
    ticketCard.querySelector(".ticket-description").textContent = ticket.description;
    ticketCard.querySelector(".status-badge").textContent = ticket.status;
    ticketCard.querySelector(".priority-badge").textContent = ticket.priority;
    ticketCard.querySelector(".category-badge").textContent = ticket.category;

    ticketCard.querySelector(".priority-badge").classList.add(ticket.priority.toLowerCase());
    if (ticket.status === "Resolved") {
      ticketCard.querySelector(".status-badge").classList.add("resolved");
    }

    ticketList.appendChild(ticketCard);
  });
}

function getVisibleTickets() {
  return tickets.filter((ticket) => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedStatus = statusFilter.value;
  const selectedPriority = priorityFilter.value;

  const matchesSearch =
    ticket.title.toLowerCase().includes(searchTerm) ||
    ticket.description.toLowerCase().includes(searchTerm);

  const matchesStatus =
    selectedStatus === "All" || ticket.status === selectedStatus;

  const matchesPriority =
    selectedPriority === "All" || ticket.priority === selectedPriority;

  return matchesSearch && matchesStatus && matchesPriority;
});
  return tickets;
}

function createTicket(ticketData) {
  // Intern 1: create a ticket object and add it to tickets.
}

function validateTicket(ticketData) {
  // Intern 1: prevent empty title and description.
  return true;
}

function editTicket(ticketId) {
  // Intern 1: allow the user to edit title, description, priority, and category.
}

function deleteTicket(ticketId) {
  tickets = tickets.filter((ticket) => ticket.id !== ticketId);
}

function moveTicketToNextStatus(ticketId) {
  // Intern 2: change status from Open -> In Progress -> Resolved -> Open.
}

function updateSummary() {
  // Intern 1: update total, open, in progress, and resolved counts.
  totalCount.textContent = tickets.length;
  openCount.textContent = "0";
  progressCount.textContent = "0";
  resolvedCount.textContent = "0";
}

function saveTickets() {
  // Intern 1: save tickets to localStorage.
}

function loadTickets() {
  // Intern 1: load tickets from localStorage.
}

ticketForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const ticketData = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    priority: priorityInput.value,
    category: categoryInput.value,
  };

  if (!validateTicket(ticketData)) {
    return;
  }

  createTicket(ticketData);
  saveTickets();
  ticketForm.reset();
  priorityInput.value = "Medium";
  formMessage.textContent = "";
  renderTickets();
});

ticketList.addEventListener("click", (event) => {
  const ticketCard = event.target.closest(".ticket-card");

  if (!ticketCard) {
    return;
  }

  const ticketId = Number(ticketCard.dataset.id);

  if (event.target.classList.contains("edit")) {
    editTicket(ticketId);
  }

  if (event.target.classList.contains("status")) {
    moveTicketToNextStatus(ticketId);
  }

  if (event.target.classList.contains("delete")) {
    deleteTicket(ticketId);
  }

  saveTickets();
  renderTickets();
});

searchInput.addEventListener("input", renderTickets);
statusFilter.addEventListener("change", renderTickets);
priorityFilter.addEventListener("change", renderTickets);

loadTickets();
renderTickets();
