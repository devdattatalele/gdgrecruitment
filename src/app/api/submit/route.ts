import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Google Sheets configuration
    // You need to set up these environment variables
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      return NextResponse.json(
        { error: 'Google Sheet ID not configured' },
        { status: 500 }
      );
    }

    // Prepare the row data
    const rowData = [
      new Date().toISOString(), // Timestamp
      formData.name,
      formData.email,
      formData.phone,
      formData.rollNumber,
      formData.branch,
      formData.year,
      formData.primaryDomain,
      formData.secondaryDomain || '',
      formData.whyGDG,
      formData.experience,
      formData.portfolio || '',
      // Add domain-specific answers
      ...Object.keys(formData)
        .filter(key => key.includes('_q'))
        .map(key => formData[key] || '')
    ];

    // Append data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:Z', // Adjust range as needed
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}