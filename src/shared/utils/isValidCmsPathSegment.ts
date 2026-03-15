const INVALID_CMS_SEGMENT_CHARS = /[.%\\/#?&=\s]/;
const MAX_CMS_SEGMENT_LENGTH = 160;

export function isValidCmsPathSegment(segment: string) {
  return (
    segment.length > 0 &&
    segment.length <= MAX_CMS_SEGMENT_LENGTH &&
    !INVALID_CMS_SEGMENT_CHARS.test(segment)
  );
}
