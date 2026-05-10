import { getMyListings } from "../actions";
import { ListingCard } from "./listing-card";

export default async function MyListings() {
  const result = await getMyListings();

  if (result.serverError) {
    console.log(result.serverError);

    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="text-red-500">Error fetching listings</span>
      </div>
    );
  }

  const myHouses = result.data;

  if (!myHouses || myHouses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-slate-400">
        <p>You haven&apos;t published any listings yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {myHouses.map((house, i) => (
        <ListingCard key={house.id} house={house} index={i} />
      ))}
    </div>
  );
}
