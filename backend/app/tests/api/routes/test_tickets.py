import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.ticket import create_random_ticket
from app.models import TicketCategory, TicketPriority, TicketStatus


def test_create_ticket(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    data = {
        "title": "Test Ticket", 
        "description": "This is a test ticket", 
        "category": TicketCategory.SUPPORT.value,
        "priority": TicketPriority.MEDIUM.value
    }
    response = client.post(
        f"{settings.API_V1_STR}/tickets/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["description"] == data["description"]
    assert content["category"] == data["category"]
    assert content["priority"] == data["priority"]
    assert content["status"] == TicketStatus.OPEN.value  # Default status
    assert "id" in content
    assert "user_id" in content


def test_read_ticket(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    ticket = create_random_ticket(db)
    response = client.get(
        f"{settings.API_V1_STR}/tickets/{ticket.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == ticket.title
    assert content["description"] == ticket.description
    assert content["id"] == str(ticket.id)
    assert content["user_id"] == str(ticket.user_id)


def test_read_ticket_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/tickets/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Ticket não encontrado"


def test_read_ticket_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    ticket = create_random_ticket(db)  # This creates a ticket owned by a different user
    response = client.get(
        f"{settings.API_V1_STR}/tickets/{ticket.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Permissões insuficientes"


def test_read_tickets(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    create_random_ticket(db)
    create_random_ticket(db)
    response = client.get(
        f"{settings.API_V1_STR}/tickets/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2
    assert content["count"] >= 2
    assert content["page"] == 1


def test_update_ticket(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    ticket = create_random_ticket(db)
    data = {
        "title": "Updated Ticket", 
        "description": "This is an updated test ticket",
        "status": TicketStatus.IN_PROGRESS.value
    }
    response = client.put(
        f"{settings.API_V1_STR}/tickets/{ticket.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["description"] == data["description"]
    assert content["status"] == data["status"]
    assert content["id"] == str(ticket.id)
    assert content["user_id"] == str(ticket.user_id)


def test_update_ticket_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"title": "Updated Ticket", "description": "This is an updated test ticket"}
    response = client.put(
        f"{settings.API_V1_STR}/tickets/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Ticket não encontrado"


def test_update_ticket_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    ticket = create_random_ticket(db)
    data = {"title": "Updated Ticket", "description": "This is an updated test ticket"}
    response = client.put(
        f"{settings.API_V1_STR}/tickets/{ticket.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Permissões insuficientes"


def test_delete_ticket(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    ticket = create_random_ticket(db)
    response = client.delete(
        f"{settings.API_V1_STR}/tickets/{ticket.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Ticket removido com sucesso"


def test_delete_ticket_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/tickets/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Ticket não encontrado"


def test_delete_ticket_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    ticket = create_random_ticket(db)
    response = client.delete(
        f"{settings.API_V1_STR}/tickets/{ticket.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Permissões insuficientes"


def test_create_comment(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    ticket = create_random_ticket(db)
    data = {"content": "This is a test comment"}
    response = client.post(
        f"{settings.API_V1_STR}/tickets/{ticket.id}/comments",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["content"] == data["content"]
    assert "id" in content
    assert "created_at" in content


def test_create_comment_ticket_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"content": "This is a test comment"}
    response = client.post(
        f"{settings.API_V1_STR}/tickets/{uuid.uuid4()}/comments",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Ticket não encontrado"
