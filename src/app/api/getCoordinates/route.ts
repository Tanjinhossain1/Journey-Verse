// app/api/getCoordinates/route.js
export async function GET(req:Request) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
  
    // Here you could use an external API like Google Geocoding API
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();
  
    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      return new Response(JSON.stringify({ lat, lng }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: 'City not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  