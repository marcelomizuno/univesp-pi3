from sqlmodel import Session

from app.models import Ticket, TicketCreate, TicketCategory, TicketPriority, TicketStatus
from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_lower_string


def create_random_ticket(db: Session) -> Ticket:
    user = create_random_user(db)
    user_id = user.id
    assert user_id is not None
    title = random_lower_string()
    description = random_lower_string()
    ticket_in = TicketCreate(
        title=title, 
        description=description, 
        category=TicketCategory.SUPPORT,  # Using a fixed category for simplicity
        priority=TicketPriority.MEDIUM,   # Using a fixed priority for simplicity
    )
    
    ticket = Ticket(
        **ticket_in.model_dump(),
        user_id=user_id
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket
