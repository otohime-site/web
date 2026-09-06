// Phones and tablets get different flows in a few places: they cannot drag the
// bookmarklet link to a bookmark bar, and their browsers (in-app browsers such
// as LINE in particular) tend to block the sign-in popup, so they sign in with
// a full-page redirect instead. iPadOS 13+ reports itself as Macintosh, hence
// the extra touch-points check.
export const isMobile =
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
  (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1)
