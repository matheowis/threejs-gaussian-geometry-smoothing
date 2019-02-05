import { BufferGeometry, BufferAttribute, Mesh, WireframeGeometry, LineSegments } from 'three';

const CreateProceduralMesh = (size, facesNum) => {
  var geometry = new BufferGeometry();
  // var vertices = [
  //   -1, -1, 1,
  //   1, -1, 1,
  //   -1, 1, 1,
  //   1, 1, 1,
  // ];
  // var faces = [
  //   0, 1, 2,
  //   3, 2, 1
  // ];
  // var facesNum = 30;
  var vertices = [];
  var faces = [];
  for (var x = 0; x <= facesNum; x++) {
    for (var y = 0; y <= facesNum; y++) {
      vertices.push(
        x - facesNum / 2, y - facesNum / 2, 1
      );
    }
  }

  for (var x = 0; x <= facesNum - 1; x++) {
    for (var y = 0; y <= facesNum - 1; y++) {
      const initL = x * (facesNum + 1) + y;
      const initR = initL + facesNum + 1
      faces.push(
        initL, initR, initL + 1,
        initR + 1, initL + 1, initR
      );
    }
  }
  // vertices = vertices.map(v => v * 10)
  console.log('vertices', vertices);
  console.log('faces', faces)
  //vertices = [...vertices, ...vertices.map((v, i) => i % 3 === 0 ? v + 1 : v)]


  //vertices = vertices.map(v => v * size);
  vertices = vertices.map(v => v*size);
  
  var typedVertices = new Float32Array(vertices);
  var typedFaces = new Uint16Array(faces);

  var vertBuff = new BufferAttribute(typedVertices, 3);
  console.log(vertBuff);

  geometry.attributes.position = vertBuff;
  geometry.setIndex(new BufferAttribute(typedFaces, 1));

  const mesh = new Mesh(geometry);

  return mesh;
}

export { CreateProceduralMesh };