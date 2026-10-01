import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
let bad = 0, total = 0;
for (const s of LAUNCH_CATALOG as any[]) {
  const rows: string[] = [];
  for (const c of s.characters) {
    const labels = new Set<string>([c.id.toLowerCase(), c.name.toLowerCase()]);
    if (c.calledName) labels.add(String(c.calledName).toLowerCase());
    const last = c.name.split(/\s+/).at(-1)?.toLowerCase();
    if (last && last.length > 2) labels.add(last);
    const first = c.name.split(/\s+/)[0].toLowerCase();
    total++;
    if (!labels.has(first)) { bad++; rows.push(`      ${c.name}  (id=${c.id})`); }
  }
  if (rows.length) console.log(`${s.storyId ?? s.id}: ${rows.length}/${s.characters.length} cast unresolvable by first name`), rows.forEach(r=>console.log(r));
}
console.log(`\nTOTAL: ${bad}/${total} characters across the catalogue`);
