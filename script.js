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
}

function createTicket(ticketData) {
  const ticket = {
    id: Date.now(),
    title: ticketData.title,
    description: ticketData.description,
    priority: ticketData.priority,
    category: ticketData.category,
    status: "Open",
  };

  tickets.push(ticket);
}


function validateTicket(ticketData) {
  // Intern 1: prevent empty title and description.
  return true;
}


  function editTicket(ticketId) {
  const ticket = tickets.find((t) => t.id === ticketId);

  if (!ticket) return;

  const newTitle = prompt("Edit title:", ticket.title);
  if (newTitle === null || !newTitle.trim()) return;

  const newDescription = prompt(
    "Edit description:",
    ticket.description
  );
  if (newDescription === null || !newDescription.trim()) return;

  const newPriority = prompt(
    "Edit priority (Low, Medium, High):",
    ticket.priority
  );
  if (newPriority === null || !newPriority.trim()) return;

  const newCategory = prompt(
    "Edit category:",
    ticket.category
  );
  if (newCategory === null || !newCategory.trim()) return;

  ticket.title = newTitle.trim();
  ticket.description = newDescription.trim();
  ticket.priority = newPriority.trim();
  ticket.category = newCategory.trim();

}

function deleteTicket(ticketId) {
  tickets = tickets.filter((ticket) => ticket.id !== ticketId);
}

function moveTicketToNextStatus(ticketId) {
const ticket = tickets.find((ticket) => ticket.id === ticketId);

if (!ticket) {
  return;
}

if (ticket.status === "Open") {
  ticket.status = "In Progress";
} else if (ticket.status === "In Progress") {
  ticket.status = "Resolved";
} else {
  ticket.status = "Open";
}}

function updateSummary() {
  totalCount.textContent = tickets.length;

  openCount.textContent = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  progressCount.textContent = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  resolvedCount.textContent = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;
}


  function saveTickets() {
  localStorage.setItem(
    "tickets",
    JSON.stringify(tickets)
  );

}


  function loadTickets() {
  const storedTickets = localStorage.getItem("tickets");

  if (storedTickets) {
    tickets = JSON.parse(storedTickets);
  }
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

