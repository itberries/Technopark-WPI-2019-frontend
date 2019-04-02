export function makeMapFromArray(array) {
  const map = new Map();
  let rootId = 0;
  array.forEach((elem) => {
    map.set(elem.id, elem);
    if (elem.parentId === 0) {
      rootId = elem.id;
    }
  });
  return [map, rootId];
}

export function goThroughTheList(map, rootId, func) {
  let node = map.get(rootId);
  if (typeof node === 'undefined') {
    return;
  }
  while (node.childId !== 0) {
    func(node);
    node = map.get(node.childId);
  }
  func(node);
}
