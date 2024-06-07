import { Tools, Vector3 } from "@babylonjs/core";
const oneOverRadiiSquared = Vector3.FromArray([2.458172257647332e-14, 2.458172257647332e-14, 2.4747391015697002e-14]);
const oneOverRadii = Vector3.FromArray([
  1.567855942887398e-7,
  1.567855942887398e-7,
  1.573130351105623e-7
])
const centerToleranceSquared = 0.1

export function vec3TolonLat(cartesian: Vector3) {
  cartesian = vector3ToCartesian3(cartesian);
  const p = scaleToGeodeticSurface(cartesian);

  if (!p) {
    return undefined;
  }

  const n = geodeticSurfaceNormal(p);
  if (!n) return;
  const h = cartesian.subtract(p);
  
  const longitude = Tools.ToDegrees(Math.atan2(n.y, n.x));
  const latitude = Tools.ToDegrees(Math.asin(n.z));
  const dot = Vector3.Dot(h, cartesian);
  let sign = 0;
  switch (true) {
    case dot == 0:
      sign = 0
      break;
    case dot > 0:
      sign = 1
      break;
    case dot < 0:
      sign = -1
      break;
  }
  const height =
    sign * Vector3.Distance(h, Vector3.Zero());

  return {
    longitude,
    latitude,
    height
  }

}

function scaleToGeodeticSurface(
  cartesian:Vector3
) {
  //>>includeStart('debug', pragmas.debug);
 

  const positionX = cartesian.x;
  const positionY = cartesian.y;
  const positionZ = cartesian.z;

  const oneOverRadiiX = oneOverRadii.x;
  const oneOverRadiiY = oneOverRadii.y;
  const oneOverRadiiZ = oneOverRadii.z;

  const x2 = positionX * positionX * oneOverRadiiX * oneOverRadiiX;
  const y2 = positionY * positionY * oneOverRadiiY * oneOverRadiiY;
  const z2 = positionZ * positionZ * oneOverRadiiZ * oneOverRadiiZ;

  // Compute the squared ellipsoid norm.
  const squaredNorm = x2 + y2 + z2;
  const ratio = Math.sqrt(1.0 / squaredNorm);

  // As an initial approximation, assume that the radial intersection is the projection point.
  const intersection =cartesian.scale(ratio);

  // If the position is near the center, the iteration will not converge.
  if (squaredNorm < centerToleranceSquared) {
    return !isFinite(ratio)
      ? undefined
      : intersection.clone();
  }

  const oneOverRadiiSquaredX = oneOverRadiiSquared.x;
  const oneOverRadiiSquaredY = oneOverRadiiSquared.y;
  const oneOverRadiiSquaredZ = oneOverRadiiSquared.z;

  // Use the gradient at the intersection point in place of the true unit normal.
  // The difference in magnitude will be absorbed in the multiplier.
  const gradient = Vector3.Zero();
  gradient.x = intersection.x * oneOverRadiiSquaredX * 2.0;
  gradient.y = intersection.y * oneOverRadiiSquaredY * 2.0;
  gradient.z = intersection.z * oneOverRadiiSquaredZ * 2.0;

  // Compute the initial guess at the normal vector multiplier, lambda.
  let lambda =
    ((1.0 - ratio) * Vector3.Distance(cartesian,Vector3.Zero())) /
    (0.5 * Vector3.Distance(gradient,Vector3.Zero()));
  let correction = 0.0;

  let func;
  let denominator;
  let xMultiplier;
  let yMultiplier;
  let zMultiplier;
  let xMultiplier2;
  let yMultiplier2;
  let zMultiplier2;
  let xMultiplier3;
  let yMultiplier3;
  let zMultiplier3;

  do {
    lambda -= correction;

    xMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredX);
    yMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredY);
    zMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredZ);

    xMultiplier2 = xMultiplier * xMultiplier;
    yMultiplier2 = yMultiplier * yMultiplier;
    zMultiplier2 = zMultiplier * zMultiplier;

    xMultiplier3 = xMultiplier2 * xMultiplier;
    yMultiplier3 = yMultiplier2 * yMultiplier;
    zMultiplier3 = zMultiplier2 * zMultiplier;

    func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1.0;

    // "denominator" here refers to the use of this expression in the velocity and acceleration
    // computations in the sections to follow.
    denominator =
      x2 * xMultiplier3 * oneOverRadiiSquaredX +
      y2 * yMultiplier3 * oneOverRadiiSquaredY +
      z2 * zMultiplier3 * oneOverRadiiSquaredZ;

    const derivative = -2.0 * denominator;

    correction = func / derivative;
  } while (Math.abs(func) > 0.000000000001);

  return Vector3.FromArray([
    positionX * xMultiplier,
    positionY * yMultiplier,
    positionZ * zMultiplier
  ])
}

function vector3ToCartesian3(vec: any) {
  return Vector3.FromArray([vec.x, vec.z, vec.y]);
}

function multiplyComponents(p1: Vector3, p2: Vector3) {
  return Vector3.FromArray([
    p1.x * p2.x,
    p1.y * p2.y,
    p1.z * p2.z,
  ])
}

function geodeticSurfaceNormal(cartesian: Vector3) {
  let relative = 0.00000000000001;
  if (
    Vector3.Distance(cartesian, Vector3.Zero()) < relative
  ) {
    return undefined;
  }
  //   {
  //     "x": 2.458172257647332e-14,
  //     "y": 2.458172257647332e-14,
  //     "z": 2.4747391015697002e-14
  // }

  let result = multiplyComponents(
    cartesian,
    oneOverRadiiSquared
  );
  return Vector3.Normalize(result);
}