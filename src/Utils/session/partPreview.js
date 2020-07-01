/**
 * This helper function accepts a Codex part and
 * returns a title and preview text.
 */

export default function partPreview(part) {
  let { type, t, d, info } = part;

  if (!t && type) {
    t = type.toUpperCase();
  }

  if (d) {
    d = processRecursively(d);
  } else {
    d = processRecursively(info);
  }

  return { t, d };
}

function processRecursively(d) {
  if (!d) {
    return null;
  }

  if (typeof d === 'string') {
    return d;
  }

  if (Array.isArray(d)) {
    return processRecursively(d[0]);
  }

  return processRecursively(d.t);
}
