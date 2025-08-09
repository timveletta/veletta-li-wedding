import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  supabase,
  type RsvpData,
  type Guest,
  getGuestDisplayName,
} from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const rsvpData: RsvpData = await request.json();

    // Insert RSVP into database
    const { error: rsvpError } = await supabase
      .from("rsvps")
      .insert([rsvpData]);

    if (rsvpError) {
      console.error("Database error:", rsvpError);
      return NextResponse.json(
        { error: "Failed to save RSVP" },
        { status: 500 }
      );
    }

    // Get guest information for email
    const { data: guest, error: guestError } = await supabase
      .from("guests")
      .select("*")
      .eq("id", rsvpData.guest_id)
      .single();

    if (guestError || !guest) {
      console.error("Guest lookup error:", guestError);
      return NextResponse.json(
        { error: "Failed to find guest information" },
        { status: 500 }
      );
    }

    // Send confirmation email if email provided in RSVP
    if (rsvpData.email) {
      await sendConfirmationEmail(guest, rsvpData, request);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail(
  guest: Guest,
  rsvpData: RsvpData,
  request: NextRequest
) {
  const guestName = getGuestDisplayName(guest);
  const attending = rsvpData.attending ? "attending" : "not attending";

  // Calendar event details
  const eventTitle = "Timothy Veletta & Jenny Li's Wedding";
  const eventDateUTC = "20251130T090000Z"; // November 30, 2025 5:00 PM AWST = 9:00 AM UTC
  const eventEndUTC = "20251130T153000Z"; // Event ending at 3:30 PM UTC (11:30 PM AWST)
  const eventLocation = "Feld and Co, 6/496 Marmion St, Booragoon WA 6154"; // Update with actual venue
  const eventDescription = "Join us for our special day!";

  // Calendar links
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=${eventDateUTC}/${eventEndUTC}&details=${encodeURIComponent(
    eventDescription
  )}&location=${encodeURIComponent(eventLocation)}`;

  // Outlook expects dates in a specific format
  const outlookStartDate = "2025-11-30T17:00:00.000+08:00"; // 5:00 PM AWST
  const outlookEndDate = "2025-11-30T23:30:00.000+08:00"; // 11:30 PM AWST

  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    eventTitle
  )}&startdt=${outlookStartDate}&enddt=${outlookEndDate}&body=${encodeURIComponent(
    eventDescription
  )}&location=${encodeURIComponent(
    eventLocation
  )}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`;

  // Google Maps link
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    eventLocation
  )}`;

  try {
    await resend.emails.send({
      from: "Timothy Veletta & Jenny Li <rsvp@velettaliwedding.com>",
      to: rsvpData.email!,
      subject: `RSVP Confirmation - Veletta Li Wedding`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #7f9b7a; text-align: center;">RSVP Confirmation</h2>
          
          <p>Dear ${guestName},</p>
          
          <p>Thank you for responding to our wedding invitation! We have received your RSVP and you are marked as <strong>${attending}</strong>.</p>
          
          ${
            rsvpData.attending
              ? `
                <p>We're so excited to celebrate with you!</p>
                
                <div style="background: #f6f8f6; border: 1px solid #e8ede8; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                  <h3 style="margin: 0 0 15px 0; color: #7f9b7a;">Save the Date</h3>
                  <p style="margin: 0 0 15px 0; font-size: 16px; color: #5a6b5a;"><strong>November 30, 2025 at 5:00 PM</strong><br>Australian Western Standard Time</p>
                  <p style="margin: 0 0 15px 0; font-size: 16px; color: #5a6b5a;"><strong><a href="${googleMapsUrl}" style="color: #7f9b7a; text-decoration: none;">Feld and Co</a></strong><br>6/496 Marmion St, Booragoon WA 6154</p>
                  <p style="margin: 0 0 20px 0; color: #6b7c6b;">Add to your calendar:</p>
                  <table style="margin: 0 auto; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 5px;">
                      <a href="${googleCalendarUrl}" style="background: #7f9b7a; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px; display: inline-block;">Google Calendar</a>
                      </td>
                       <td style="padding: 5px;">
                         <a href="${outlookCalendarUrl}" style="background: #7f9b7a; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px; display: inline-block;">Outlook</a>
                       </td>
                       <td style="padding: 5px;">
                         <a href="${request.nextUrl.origin}/api/calendar" style="background: #7f9b7a; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px; display: inline-block;">Apple Calendar</a>
                       </td>
                     </tr>
                   </table>
                </div>
              `
              : `
                <p>We're sorry you can't make it, but we appreciate you letting us know.</p>
              `
          }
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e8ede8;">
          
          <p style="color: #6b7c6b; font-size: 14px; text-align: center;">
            If you need to make any changes to your RSVP, please contact us directly.
          </p>
          
          <p style="text-align: center; margin-top: 30px;">
            With love,<br>
            <strong>Timothy Veletta & Jenny Li</strong>
          </p>
        </div>
      `,
    });

    console.log(`Confirmation email sent to ${rsvpData.email}`);
  } catch (emailError) {
    console.error("Failed to send confirmation email:", emailError);
    // Don't throw error - RSVP was saved successfully, email is just a bonus
  }
}
