import { NextResponse } from "next/server";

interface NominatimResponse {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  class: string;
  type: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  if (!input || input.length < 3) {
    return NextResponse.json({ results: [] });
  }

  try {
    // OpenStreetMap Nominatim API (Completely Free)
    // We filter by country (tn) and center near Tunis for better relevance
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      input,
    )}&format=json&addressdetails=1&limit=10&countrycodes=tn&accept-language=fr`;

    console.log("Fetching from OpenStreetMap:", url);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "StudentNest/1.0", // Required by Nominatim policy
      },
    });

    const data: NominatimResponse[] = await response.json();

    const results = data.map((item: NominatimResponse) => ({
      id: item.place_id.toString(),
      name: item.display_name.split(",")[0], // Usually the name of the place
      address: item.display_name.split(",").slice(1).join(",").trim(),
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      type: item.type || item.class,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("OSM Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
