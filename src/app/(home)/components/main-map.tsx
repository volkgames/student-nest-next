"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  MapRef,
} from "react-map-gl/mapbox";
import useSupercluster from "use-supercluster";
import { motion, AnimatePresence } from "framer-motion";
import "mapbox-gl/dist/mapbox-gl.css";
import { Loader2, Home as HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMapInteraction } from "@/context/map-context";
import { HouseMarker } from "./map/house-marker";
import { ClusterMarker } from "./map/cluster-marker";
import { SearchResultMarker } from "./map/search-result-marker";

const TUNISIA_BOUNDS: [[number, number], [number, number]] = [
  [7.3, 30.0],
  [11.7, 37.7],
];

const FALLBACK_LOCATION = {
  longitude: 10.1815,
  latitude: 36.8065,
  zoom: 11,
};

type HouseFeature = {
  type: "Feature";
  properties: {
    cluster: boolean;
    houseId: number;
    category: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

interface ClusterProperties {
  cluster: true;
  point_count: number;
  cluster_id: number;
}

export default function MainMap() {
  const mapRef = useRef<MapRef>(null);
  const {
    hoveredHouseId,
    setHoveredHouseId,
    selectedHouseId,
    setSelectedHouseId,
    searchResult,
    filteredHouses,
    activeTab,
    savedHouseIds,
  } = useMapInteraction();

  const [viewState, setViewState] = useState({
    ...FALLBACK_LOCATION,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocationError] = useState(false);
  const [spiderfiedCluster, setSpiderfiedCluster] = useState<{
    id: number;
    points: HouseFeature[];
    center: [number, number];
  } | null>(null);
  const [mapBounds, setMapBounds] = useState<
    [number, number, number, number] | undefined
  >(undefined);

  const displayedHouses = useMemo(() => {
    return activeTab === "explorer"
      ? filteredHouses
      : filteredHouses.filter((h) => savedHouseIds.includes(h.id));
  }, [activeTab, filteredHouses, savedHouseIds]);

  // Convert houses to GeoJSON features
  const points = useMemo(
    () =>
      displayedHouses.map((house) => ({
        type: "Feature" as const,
        properties: { cluster: false, houseId: house.id, category: "house" },
        geometry: {
          type: "Point" as const,
          coordinates: [
            house.coordinates.longitude,
            house.coordinates.latitude,
          ],
        },
      })),
    [displayedHouses]
  );

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: mapBounds,
    zoom: Math.round(viewState.zoom),
    options: { radius: 60, maxZoom: 17 },
  });

  // Handle Fly To when a search result is selected
  useEffect(() => {
    if (searchResult && mapRef.current) {
      mapRef.current.flyTo({
        center: [searchResult.longitude, searchResult.latitude],
        zoom: 15,
        duration: 2000,
      });
    }
  }, [searchResult]);

  // Handle Fly To when a house is selected
  useEffect(() => {
    if (selectedHouseId) {
      const house = filteredHouses.find((h) => h.id === selectedHouseId);
      if (house && mapRef.current) {
        // If we're in saved mode and the house isn't saved, maybe switch back or just show it?
        // For now, let's just fly to it regardless.
        mapRef.current.flyTo({
          center: [house.coordinates.longitude, house.coordinates.latitude],
          zoom: 16,
          duration: 1500,
        });
      }
    }
  }, [selectedHouseId, filteredHouses]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setTimeout(() => {
        setIsLoading(false);
        setLocationError(true);
      }, 0);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
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
          mapRef.current?.flyTo({
            center: [longitude, latitude],
            zoom: 13,
            duration: 2000,
          });
        }
        setIsLoading(false);
      },
      () => {
        setLocationError(true);
        setIsLoading(false);
      },
      { timeout: 10000 }
    );
  }, []);

  const handleClusterClick = (
    clusterId: number,
    longitude: number,
    latitude: number
  ) => {
    if (!supercluster || !mapRef.current) return;

    try {
      const expansionZoom = Math.min(
        supercluster.getClusterExpansionZoom(clusterId),
        18
      );

      if (expansionZoom > 17) {
        const leaves = supercluster.getLeaves(clusterId) as HouseFeature[];
        setSpiderfiedCluster({
          id: clusterId,
          points: leaves,
          center: [longitude, latitude],
        });
      } else {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: expansionZoom,
          duration: 800,
        });
      }
    } catch (err) {
      console.error("Cluster expansion error:", err);
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden">
      <h1 className="sr-only">Student Nest - Student Housing Map Tunisia</h1>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20 duration-1000" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-blue-500/30 bg-slate-900 shadow-2xl shadow-blue-500/20">
                <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
              </div>
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Finding your nest...
              </h3>
              <p className="mt-2 text-sm text-slate-400 font-medium tracking-wide uppercase">
                Optimizing for Tunisia
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => {
          setViewState(evt.viewState);
          if (spiderfiedCluster) setSpiderfiedCluster(null);

          const map = mapRef.current?.getMap();
          if (map) {
            const b = map.getBounds()?.toArray().flat() as [
              number,
              number,
              number,
              number
            ];
            setMapBounds(b);
          }
        }}
        onLoad={() => {
          const map = mapRef.current?.getMap();
          if (map) {
            const b = map.getBounds()?.toArray().flat() as [
              number,
              number,
              number,
              number
            ];
            setMapBounds(b);
          }
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        maxBounds={TUNISIA_BOUNDS}
        onClick={() => setSelectedHouseId(null)}
      >
        <NavigationControl position="top-right" />
        <GeolocateControl position="top-right" />
        <FullscreenControl position="bottom-right" />
        <ScaleControl position="bottom-right" />

        {/* Search Result Marker */}
        {searchResult && (
          <Marker
            longitude={searchResult.longitude}
            latitude={searchResult.latitude}
            anchor="bottom"
          >
            <SearchResultMarker name={searchResult.name} />
          </Marker>
        )}

        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const props = cluster.properties as
            | HouseFeature["properties"]
            | ClusterProperties;
          const isCluster = !!props.cluster;

          if (isCluster && "point_count" in props) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <ClusterMarker
                  longitude={longitude}
                  latitude={latitude}
                  pointCount={props.point_count}
                  onClick={() =>
                    handleClusterClick(
                      cluster.id as number,
                      longitude,
                      latitude
                    )
                  }
                />
              </Marker>
            );
          }

          const houseId = cluster.properties.houseId;
          const house = displayedHouses.find((h) => h.id === houseId)!;
          if (!house) return null;

          return (
            <Marker
              key={`house-${houseId}`}
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
            >
              <HouseMarker
                house={house}
                isHovered={hoveredHouseId === houseId}
                isSelected={selectedHouseId === houseId}
                onHover={setHoveredHouseId}
                onClick={setSelectedHouseId}
              />
            </Marker>
          );
        })}

        {/* Spiderfied Markers */}
        {spiderfiedCluster &&
          spiderfiedCluster.points.map((point, index) => {
            const houseId = point.properties.houseId;
            const house = displayedHouses.find((h) => h.id === houseId)!;
            if (!house) return null;
            const angle =
              (index / spiderfiedCluster.points.length) * Math.PI * 2;
            const radius = 0.0005;
            const lng = spiderfiedCluster.center[0] + Math.cos(angle) * radius;
            const lat = spiderfiedCluster.center[1] + Math.sin(angle) * radius;

            return (
              <Marker
                key={`spider-${houseId}`}
                longitude={lng}
                latitude={lat}
                anchor="bottom"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: -Math.cos(angle) * 50,
                    y: -Math.sin(angle) * 50,
                  }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <HouseMarker
                    house={house}
                    isHovered={hoveredHouseId === houseId}
                    isSelected={selectedHouseId === houseId}
                    onHover={setHoveredHouseId}
                    onClick={setSelectedHouseId}
                  />
                </motion.div>
              </Marker>
            );
          })}

        {/* Selected House Popup */}
        {selectedHouseId && (
          <Popup
            longitude={
              filteredHouses.find((h) => h.id === selectedHouseId)?.coordinates
                .longitude ?? 0
            }
            latitude={
              filteredHouses.find((h) => h.id === selectedHouseId)?.coordinates
                .latitude ?? 0
            }
            anchor="top"
            onClose={() => setSelectedHouseId(null)}
            closeButton={false}
            closeOnClick={false}
            closeOnMove={false}
            className="z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="p-3 bg-slate-900 border border-white/10 backdrop-blur-xl rounded-xl shadow-2xl min-w-[200px] text-white"
            >
              {(() => {
                const house = filteredHouses.find((h) => h.id === selectedHouseId);
                if (!house) return null;
                return (
                  <div className="flex flex-col gap-2">
                    <div
                      className={cn(
                        "h-24 w-full rounded-lg flex items-center justify-center",
                        house.imageColor
                      )}
                    >
                      <HomeIcon className="h-8 w-8 text-white/20" />
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      {house.title}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-blue-400 font-bold">
                        {house.price} TND/mo
                      </span>
                      <button className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-bold transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
