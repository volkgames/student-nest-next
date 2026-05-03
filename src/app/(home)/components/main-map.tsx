"use client";

import { useEffect, useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Loader2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const TUNISIA_BOUNDS: [[number, number], [number, number]] = [
  [7.3, 30.0], // Southwest: slightly padded
  [11.7, 37.7], // Northeast: slightly padded
];

const FALLBACK_LOCATION = {
  longitude: 10.1815,
  latitude: 36.8065,
  zoom: 11,
};

export default function MainMap() {
  const [viewState, setViewState] = useState({
    ...FALLBACK_LOCATION,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      // Defer state update to avoid synchronous cascading renders in React 19
      setTimeout(() => {
        setIsLoading(false);
        setLocationError(true);
      }, 0);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;

        // Check if user is within Tunisia bounds
        const isWithinTunisia =
          longitude >= TUNISIA_BOUNDS[0][0] &&
          longitude <= TUNISIA_BOUNDS[1][0] &&
          latitude >= TUNISIA_BOUNDS[0][1] &&
          latitude <= TUNISIA_BOUNDS[1][1];

        if (isWithinTunisia) {
          setViewState((prev) => ({
            ...prev,
            longitude,
            latitude,
            zoom: 13,
          }));
        } else {
          console.log("User outside Tunisia, using fallback.");
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError(true);
        setIsLoading(false);
      },
      { timeout: 10000 },
    );
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden">
      {/* SEO Heading */}
      <h1 className="sr-only">Student Nest - Student Housing Map Tunisia</h1>

      {/* Loading Overlay */}
      <div
        className={cn(
          "absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 transition-all duration-700 ease-in-out",
          !isLoading
            ? "opacity-0 pointer-events-none invisible"
            : "opacity-100",
        )}
      >
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20 duration-1000" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-blue-500/30 bg-slate-900 shadow-2xl shadow-blue-500/20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
          </div>
        </div>
        <div className="mt-8 text-center animate-pulse">
          <h3 className="text-2xl font-bold tracking-tight text-white bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
            Finding your nest...
          </h3>
          <p className="mt-2 text-sm text-slate-400 font-medium tracking-wide uppercase">
            Optimizing for Tunisia
          </p>
        </div>
      </div>

      {/* Error Toast (Subtle) */}
      {locationError && !isLoading && (
        <div className="absolute top-6 left-1/2 z-40 -translate-x-1/2 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/90 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl shadow-2xl">
            <div className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <MapPin className="h-4 w-4 text-orange-400" />
            <span>Using default location (Tunis)</span>
          </div>
        </div>
      )}

      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        maxBounds={TUNISIA_BOUNDS}
      >
        <NavigationControl position="top-right" />
        <GeolocateControl position="top-right" />
        <FullscreenControl position="bottom-right" />
        <ScaleControl position="bottom-right" />
      </Map>
    </div>
  );
}
