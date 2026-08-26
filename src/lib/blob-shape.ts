// Formă organică (blob) flat, reosită în mai multe locuri (fundal de secțiune, containere de
// icon) — un singur path, aplicat cu transform (rotate/scale) diferit de fiecare dată, ca să nu
// fie nevoie de mai multe path-uri desenate separat. Vezi Faza 4B din HOMEPAGE_REDESIGN_PLAN.md.
// Coordonate centrate în jurul lui (0,0), rază ~80 — folosește transform="translate(cx cy) ..."
// într-un viewBox pătrat pentru a-l poziționa.
export const BLOB_PATH =
  "M54.2,-58.3C68.7,-49.5,78.2,-32.1,80.7,-14.1C83.2,3.9,78.7,22.6,68.5,37.6C58.3,52.6,42.4,64,24.7,70.4C7,76.8,-12.5,78.3,-29.8,72.4C-47.1,66.6,-62.2,53.4,-70.7,37C-79.2,20.6,-81.1,1,-76.8,-16.8C-72.5,-34.6,-62,-50.6,-47.7,-59.3C-33.4,-68,-16.7,-69.4,0.9,-70.6C18.5,-71.8,39.7,-67.1,54.2,-58.3Z";
