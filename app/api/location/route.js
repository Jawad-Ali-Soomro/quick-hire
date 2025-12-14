export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
      return Response.json(
        { success: false, error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // Use a geocoding service to get city name from coordinates
    // For now, we'll use a simple reverse geocoding approach
    // In production, use Google Maps API or similar
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }

    const data = await response.json();
    const city = data.locality || data.city || data.principalSubdivision || 'Unknown';

    return Response.json({ 
      success: true, 
      data: { 
        city,
        country: data.countryName || 'Pakistan',
        coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) }
      } 
    });
  } catch (error) {
    console.error('Error getting location:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}



