import React from 'react';
import './tickets.css';

const Tickets = () => {
  const event = {
    title: 'Dutch Cloud Native Day 2025',
    date: 'July 3rd2025',
    time: '08:00 - 18:00',
    venue: 'Congreslocatie Supernova, (Jaarbeurs), 6 Jaarbeursplein, 3521 AL Utrecht',
    description:
      'In July 2025, the cloud native community will gather in Utrecht. Come and join us! Dutch Cloud Native Day (DCND) Utrecht is a local, community-organized event that gathers adopters and technologists from open source and cloud native communities.',
    tickets: [
      {
        id: 'early-bird',
        name: 'All Days – Early Bird',
        price: 129,
        salesStartDate: null,
        salesEndDate: new Date('2025-02-28T23:59:59'),
      },
      {
        id: 'all-days',
        name: 'All Day',
        price: 85,
        salesStartDate: new Date('2025-03-01'),
        salesEndDate: new Date('2025-07-03'),
      },
      {
        id: 'late-mule',
        name: 'All Days - Late Mule',
        price: 209,
        salesStartDate: new Date('2025-07-14'),
        salesEndDate: new Date('2025-07-22T23:59:59'),
      },
    ],
  };

  const isTicketAvailable = (ticket) => {
    const now = new Date();

    // Format the dates for proper comparison
    const startDateIsValid =
      !ticket.salesStartDate ||
      new Date(ticket.salesStartDate).setHours(0, 0, 0, 0) <= now.setHours(0, 0, 0, 0);

    // Reset 'now' because setHours modifies the original date object
    now.setHours(0, 0, 0, 0);

    const endDateIsValid =
      !ticket.salesEndDate ||
      new Date(ticket.salesEndDate).setHours(23, 59, 59, 999) >= now.setHours(0, 0, 0, 0);

    return startDateIsValid && endDateIsValid;
  };

  // Alternative simpler solution
  const isTicketAvailableSimpler = (ticket) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const startDate = ticket.salesStartDate
      ? new Date(
        ticket.salesStartDate.getFullYear(),
        ticket.salesStartDate.getMonth(),
        ticket.salesStartDate.getDate()
      )
      : null;

    const endDate = ticket.salesEndDate
      ? new Date(
        ticket.salesEndDate.getFullYear(),
        ticket.salesEndDate.getMonth(),
        ticket.salesEndDate.getDate()
      )
      : null;

    return (!startDate || startDate <= today) && (!endDate || endDate >= today);
  };

  const availableTickets = event.tickets.filter(isTicketAvailableSimpler);

  console.log('Available tickets:', availableTickets);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className="overflow-hidden rounded-lg  border">
      <div className="space-y-6 p-6">
        <div className="space-y-2 rounded-lg bg-gray-50 p-4">
          <h3 className="font-semibold">Available Ticket Types:</h3>

          {availableTickets.length > 0 ? (
            <ul className="list-inside list-disc space-y-1">
              {availableTickets.map((ticket) => (
                <li key={ticket.id} className="ticket-item">
                  <div className="ticket-name">{ticket.name}</div>
                  <div className="ticket-price">€{ticket.price}</div>
                  <div className="ticket-end-date">
                    {ticket.salesEndDate &&
                      `Ends on: ${ticket.salesEndDate.toLocaleDateString(undefined, dateOptions)}`}
                  </div>
                </li>
              ))}
              <h6>Refund possible until June 15, 2025.</h6>
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No tickets are currently available for sale.</p>
          )}
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold">Diversity Tickets</h4>
          <p className="text-sm">
            Contact us at{' '}
            <a
              href="mailto:info@dutchcloudnativeday.nl"
              className="text-primary font-bold hover:underline"
            >
              info@dutchcloudnativeday.nl
            </a>{' '}
            to apply for a diversity ticket - sponsored by Stichting Cloud Native NL.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-4 px-6 pb-6">
        <p className="text-center text-sm text-gray-500">
          Tickets are purchased through our external ticketing partner.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            type="button"
            className="button"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              window.open('https://dutch-cloud-native-day-2025.eventbrite.nl', '_blank')
            }
          >
            Buy your Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
