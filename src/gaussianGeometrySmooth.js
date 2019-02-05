import { BufferGeometry, Vector3, Face3 } from 'three';

const gaussianGeometrySmooth = (geometry = new BufferGeometry()) => {
  var vertices = [];
  var faces = []
  var gVertsArray = geometry.attributes.position.array;
  var gFacesArray = geometry.index.array;
  var UfromP = [];
  for (var i = 0; i < gVertsArray.length; i += 3) {
    vertices.push(new Vector3(i, i + 1, i + 2));
  }
  for (var i = 0; i < gFacesArray.length; i++) {
    faces.push(new Face3(i, i + 1, i + 2));
  }

  for (var i = 0; i < gVertsArray.length; i += 3) {
    var iMain = i / 3;
    var filteredFaces = qPointsIndexes(gFacesArray, iMain);
    var qPoints = [];
    for (var k = 0; k < filteredFaces.length; k++) {
      qPoints.push(...[gVertsArray[k * 3], gVertsArray[k * 3 + 1], gVertsArray[k * 3 + 2]]);
    }
    var pPoints = [gVertsArray[i], gVertsArray[i + 1], gVertsArray[i + 2]];

    var rightSide = WiQiSum(pPoints, qPoints);
    var leftSide = sumWi(pPoints, qPoints);
    console.log('filteredFaces=', filteredFaces);
    console.log('qPoints=', qPoints)
    console.log('pPoints=', pPoints)
    console.log('WiQiSum(pPoints, qPoints) =', WiQiSum(pPoints, qPoints));
    console.log('sumWi(pPoints, qPoints) =', sumWi(pPoints, qPoints));

    var result = rightSide.map((r, index) => r / leftSide[index]);
    UfromP.push(...result);
  }

  console.log('UfromP', UfromP);
  for (var i = 0; i < gVertsArray.length; i++) {
    gVertsArray[i] += UfromP[i] * 1;
  }
}

function CalcWi(P = 0, Q = 0) {
  return 1 / Math.abs(P - Q);
}
function sumWi(Ps, Qs) {
  var sum = [0, 0, 0];
  for (var i = 0; i < Qs.length; i++) {
    sum[i % 3] += CalcWi(Ps[i % 3], Qs[i])
  }
  return sum;
}
function WiQiSum(Ps, Qs) {
  var sum = [0, 0, 0];
  for (var i = 0; i < Qs.length; i++) {
    sum[i % 3] += CalcWi(Ps[i % 3], Qs[i]) * Qs[i] - Ps[i % 3];
  }
  return sum;
}

function qPointsIndexes(faces = [], index) {
  var result = [];
  for (var k = 0; k < faces.length; k++) {
    if (faces[k] === index || faces[k + 1] === index || faces[k + 2] === index) {
      if (faces[k] !== index) {
        result.push(faces[k])
      }
      if (faces[k + 1] !== index) {
        result.push(faces[k + 1])
      }
      if (faces[k + 2] !== index) {
        result.push(faces[k + 2])
      }
    }
  }
  return result;
}

export { gaussianGeometrySmooth };