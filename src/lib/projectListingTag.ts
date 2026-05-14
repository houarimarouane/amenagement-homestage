/**
 * Libellé type « annonce » : mois + année variés mais stables par slug (même rendu à chaque build / visite).
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
  const year = 2023 + ((h >>> 10) % 4);

  if (locale === "fr") {
    return `${fr[monthIdx]} ${year}`;
  }
  return `${en[monthIdx]} ${year}`;
}
