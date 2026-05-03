fetch universities in Tunisia using overpass api
the result should be a json file containing the name and the coordinates of each university

```query
[out:json][timeout:25];
area["ISO3166-1"="TN"][admin_level=2]->.searchArea;
(
  node["amenity"="university"](area.searchArea);
  way["amenity"="university"](area.searchArea);
  relation["amenity"="university"](area.searchArea);
);
out center;
```
