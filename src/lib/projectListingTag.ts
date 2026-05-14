/**
 * Badge « annonce » : mois seul, en majuscules, stable par slug (pas d'année).
 */
export function getListingMonthLabel(slug: string, locale: string): string {
  const fr = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const en = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 33 + slug.charCodeAt(i)) >>> 0;
  }

  const monthIdx = h % 12;
  const label = locale === "fr" ? fr[monthIdx] : en[monthIdx];

  return label.toLocaleUpperCase(locale === "fr" ? "fr" : "en");
}
