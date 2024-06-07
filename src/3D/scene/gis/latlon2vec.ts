import { Vector3 } from "@babylonjs/core";

/**
 * 经纬度转BJS3维坐标；
 * @param longitude 经度 -180-180
 * @param latitude 纬度 -90-90
 * @param height 距离地面的高度，
 * @param ellipsoid 
 * @param result 
 */
export function fromDegrees(longitude: number, latitude: number, height?: number, ellipsoid?: { radiiSquared: { x: number, y: number, z: number }}) {
  checkNumber(longitude, "longitude");
  checkNumber(latitude, "latitude");
  longitude = toCesiumRadians(longitude);
  latitude = toCesiumRadians(latitude);
  // console.log("cesium",fromRadians(longitude, latitude, height, ellipsoid))
  return fromRadians(longitude, latitude, height, ellipsoid);
}
export function BJSlonlat2Vector3(lon: number, lat: number, radiusEarth = 6371001) {
  let latitude_rad = lat * Math.PI / 180;
  let longitude_rad = lon * Math.PI / 180;

  let xPos = radiusEarth * Math.cos(latitude_rad) * Math.cos(longitude_rad);
  let zPos = radiusEarth * Math.cos(latitude_rad) * Math.sin(longitude_rad);
  let yPos = radiusEarth * Math.sin(latitude_rad);
  return Vector3.FromArray([xPos, yPos, zPos]);
}
function checkNumber(value: number, type: string) {
  switch (type) {
    case "value":
      value = value;
      break;

    default:
      break;
  }
}
function toCesiumRadians(degrees: number) {
  return degrees * Math.PI / 180;
}
function fromRadians(longitude: number, latitude: number, height?: number, ellipsoid?: { radiiSquared: { x: number, y: number, z: number } }) {
  checkNumber(longitude, "longitude");
  checkNumber(latitude, "latitude");

  
  //------------
    // let p1 = [116.3912757, 39.906217];
    // let p2 = [116.390406,39.915596];
    //--------------------------------
  height = height ?? 0.0;
  const radiiSquared = ellipsoid
    ? ellipsoid.radiiSquared
    : {
      x: 6378137.0 * 6378137.0,
      y: 6378137.0 * 6378137.0,
      z: 6356752.3142451793 * 6356752.3142451793
    }
  const cosLatitude = Math.cos(latitude);
  let scratchN = Vector3.FromArray([
    cosLatitude * Math.cos(longitude),
    cosLatitude * Math.sin(longitude),
    Math.sin(latitude)
  ]);

  scratchN = Vector3.Normalize(scratchN);

  let scratchK = Vector3.FromArray([
    radiiSquared.x * scratchN.x,
    radiiSquared.y * scratchN.y,
    radiiSquared.z * scratchN.z,
  ]);


  const gamma = Math.sqrt(Vector3.Dot(scratchN, scratchK));
  scratchK = scratchK.scale(1 / gamma);
  scratchN = scratchN.scale(height);
  let p3 =  Vector3.FromArray([
    scratchK.x + scratchN.x,
    scratchK.z + scratchN.z,
    scratchK.y + scratchN.y
  ]);
  let distance = Vector3.Distance(p3,Vector3.Zero());
  p3 = p3.normalize().scale(distance);
  //new Vector3(cart.x, cart.z, cart.y);
  return p3;
}
