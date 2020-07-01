/**
 * This helper functions computes the length of a section.
 * Since parts are optional, this contains the logic to handle
 * sections without parts as counting as a length of 1.
 */
export default function sectionLength(section) {
  if (section.parts && section.parts.length) {
    return section.parts.length;
  } else {
    return 1;
  }
}

/**
 * Reduces an array of sections to their total length
 */
export function totalSectionLengths(sections) {
  if (!sections) {
    return 0;
  }
  return sections.reduce((acc, s) => sectionLength(s) + acc, 0);
}

/**
 * Returns an array of section lengths, ordered by their length ascending.
 * It is used when looking up the right section/part values
 * given an index into a flattened array of parts across all sections.
 */
export function listSectionsByAccumulatedLength(sections) {
  const list = [];
  if (sections) {
    sections.reduce((acc, s, i) => {
      list[i] = sectionLength(s) + acc;
      return list[i];
    }, 0);
  }
  return list;
}

/**
 * Returns the section and part corresponding to the index into a flattened
 * version of all sections/parts.
 */
export function getSectionAndPartFromIndex(sections, index) {
  const list = listSectionsByAccumulatedLength(sections);
  if (index < 0) {
    index = 0;
  }
  const maxIndex = list[list.length - 1];
  if (index >= maxIndex) {
    index = maxIndex - 1;
  }

  let section = 0;
  let priorLength = 0;
  let part = 0;
  for (let i = 0; i < list.length; i++) {
    if (index < list[i]) {
      section = i;
      priorLength = i === 0 ? 0 : list[i - 1];
      break;
    }
  }
  part = index - priorLength;
  return { section, part };
}

/**
 * Returns the index into a flattened version of all sections/parts
 * given a particular section and part.
 */
export function getIndexFromSectionAndPart(sections, section, part) {
  const list = listSectionsByAccumulatedLength(sections);
  const priorLength = section === 0 ? 0 : list[section - 1];
  return priorLength + part;
}

/**
 * This standardizes getting content since some sections have no parts.
 * We treat a request for part 0 of a section with no parts as a request for
 * the section itself.
 */
export function getContentForSectionAndPart(sections, section, part) {
  if (!sections || !sections.length) return null;

  const s = sections[section];
  if (s) {
    if (s.parts) {
      const { t, d, info, duration } = s; // make section info available to each part
      return {
        ...s.parts[part],
        section: {
          t,
          d,
          info,
          duration,
          sectionIndex: section
        }
      };
    } else if (part === 0) {
      return { ...s, sectionIndex: section, type: 'section' };
    }
  }
  return null;
}
