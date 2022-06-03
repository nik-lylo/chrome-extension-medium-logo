export function recursiveSeekSvg(pathElem: any) {
  if (pathElem.tagName === "svg" || pathElem.tagName === "div") {
    return pathElem;
  }
  return recursiveSeekSvg(pathElem.parentNode);
}
