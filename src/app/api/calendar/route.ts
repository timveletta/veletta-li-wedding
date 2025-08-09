import { NextResponse } from "next/server";

export async function GET() {
  // Calendar event details
  const eventTitle = "Timothy Veletta & Jenny Li's Wedding";
  const eventDateUTC = "20251130T090000Z"; // November 30, 2025 5:00 PM AWST = 9:00 AM UTC
  const eventEndUTC = "20251130T153000Z"; // Assuming 6 hour event ending at 3:00 PM UTC (11:00 PM AWST)
  const eventLocation = "Feld and Co, 6/496 Marmion St, Booragoon WA 6154"; // Update with actual venue
  const eventDescription = "Join us for our special day!";

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//${eventTitle}//EN
BEGIN:VEVENT
UID:veletta-li-wedding-${new Date().getTime()}@velettaliwedding.com
DTSTART:${eventDateUTC}
DTEND:${eventEndUTC}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="veletta-li-wedding.ics"',
    },
  });
}
