import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { env } from "@/env";
import { useState, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import Map, { MapRef, Marker, NavigationControl } from "react-map-gl/mapbox";
import { FormValues } from "../page";

export default function StepLocation({ form, mapRef }: { form: UseFormReturn<FormValues>; mapRef: React.RefObject<MapRef | null> }) {
  const [viewState, setViewState] = useState({
    latitude: Number(form.getValues("latitude")),
    longitude: Number(form.getValues("longitude")),
    zoom: 13,
  });

  const onMarkerDrag = useCallback((event: { lngLat: { lng: number; lat: number } }) => {
    const { lng, lat } = event.lngLat;
    form.setValue("latitude", lat.toString());
    form.setValue("longitude", lng.toString());
  }, [form]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Address</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 123 Rue de l'Independance, Ariana" className="h-12 bg-white/5 border-white/5 text-white rounded-xl focus:ring-indigo-500/50" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Pin on Map</FormLabel>
        <div className="h-80 bg-slate-900 rounded-2xl border border-white/5 relative overflow-hidden">
          <Map
            ref={mapRef}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            style={{ width: "100%", height: "100%" }}
          >
            <NavigationControl position="bottom-right" />
            <Marker
              latitude={Number(form.watch("latitude"))}
              longitude={Number(form.watch("longitude"))}
              draggable
              onDragEnd={onMarkerDrag}
              anchor="bottom"
            >
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg cursor-grab active:cursor-grabbing border-2 border-white">
                <MapPin className="h-5 w-5" />
              </div>
            </Marker>
          </Map>
        </div>
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest text-center mt-2">
          Drag the pin to the exact location of the property
        </p>
      </div>
    </div>
  );
}