import csv
import json
from pathlib import Path
import re
import sys

MANIFEST_FILE = Path("../plants/generated") / "plants_manifest.json"
OUTPUT_DIR = Path("generated")


def load_plants_manifest(manifest_path: Path) -> dict:
    if not manifest_path.exists():
        raise FileNotFoundError(
            f"Could not find '{manifest_path}'. "
            f"Please run your SVG generator script first so it creates the manifest."
        )
    return json.loads(manifest_path.read_text(encoding="utf-8"))


def parse_flower_field(raw_field: str):
    """
    Parses:
      - 'Lantana (orange)' -> ('lantana', 'orange', 'Lantana')
      - 'Lavender'         -> ('lavender', 'default', 'Lavender')
    """
    cleaned = raw_field.strip()
    match = re.match(r"^([^\(]+)(?:\s*\((.*?)\))?$", cleaned)

    if not match:
        species_display = cleaned
        palette = "default"
    else:
        species_display = match.group(1).strip()
        palette = match.group(2).strip() if match.group(2) else "default"

    species_key = species_display.lower()
    return species_key, palette, species_display


def validate_item(species: str, palette: str, line_num: int, raw_value: str, manifest: dict):
    # 1. Validate species exists
    if species not in manifest:
        available = ", ".join(f"'{k}'" for k in sorted(manifest.keys()))
        raise ValueError(
            f"\n[CSV Error: Row {line_num}] Unknown plant '{species}' parsed from '{raw_value}'.\n"
            f"Available plants in assets: [{available}]"
        )

    valid_palettes = manifest[species]["palettes"]

    # 2. Allow 'default' if it's the only one or map it to first palette
    if palette == "default" and "default" not in valid_palettes and len(valid_palettes) > 0:
        # Fallback to the plant's first defined palette (e.g., 'classic')
        palette = valid_palettes[0]

    # 3. Validate palette
    if palette not in valid_palettes:
        available_palettes = ", ".join(f"'{p}'" for p in valid_palettes)
        raise ValueError(
            f"\n[CSV Error: Row {line_num}] Unknown palette '{palette}' for flower '{species}'.\n"
            f"Valid palettes for '{species}': [{available_palettes}]"
        )

    return palette


def generate_collectables(csv_filepath: str):
    manifest = load_plants_manifest(MANIFEST_FILE)
    records = []

    with open(csv_filepath, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)

        for line_num, row in enumerate(reader, start=2):
            clean_row = {k.strip(): v.strip() for k, v in row.items() if k is not None}

            flower_raw = clean_row.get("Flower")
            total_plants_raw = clean_row.get("Total plants")

            if not flower_raw or not total_plants_raw:
                continue

            species, raw_palette, display_name = parse_flower_field(flower_raw)
            threshold = int(total_plants_raw)

            # Validate against manifest
            resolved_palette = validate_item(species, raw_palette, line_num, flower_raw, manifest)

            slug_id = f"{species}_{resolved_palette}_{threshold}"
            records.append({
                "id": slug_id,
                "plant": species,
                "palette": resolved_palette,
                "displayName": display_name,
                "threshold": threshold,
                "unlocked": threshold == 0,
            })

    records.sort(key=lambda r: r["threshold"])

    # 1. Write collectables.d.ts
    dts_path = OUTPUT_DIR / "collectables.d.ts"
    dts_path.write_text("""// AUTO-GENERATED - DO NOT EDIT MANUALLY
import type { PlantSpecies, PlantPaletteKey } from './types';

export interface CollectableItem<T extends PlantSpecies = PlantSpecies> {
  id: string;
  plant: T;
  palette: PlantPaletteKey<T>;
  threshold: number;
  displayName: string;
  unlocked: boolean;
  unlockedAt: number | null;
}
""", encoding="utf-8")

    # 2. Write collectables.ts
    ts_path = OUTPUT_DIR / "collectables.ts"
    lines = [
        "// AUTO-GENERATED - DO NOT EDIT MANUALLY",
        "import type { CollectableItem } from './collectables.d';",
        "import type { PlantSpecies } from './types';",
        "",
        "export const INITIAL_COLLECTABLES: CollectableItem[] = [",
    ]

    for item in records:
        lines.append("  {")
        lines.append(f'    id: "{item["id"]}",')
        lines.append(f'    plant: "{item["plant"]}" as PlantSpecies,')
        lines.append(f'    palette: "{item["palette"]}" as any,')
        lines.append(f'    threshold: {item["threshold"]},')
        lines.append(f'    displayName: "{item["displayName"]}",')
        lines.append(f'    unlocked: {"true" if item["unlocked"] else "false"},')
        lines.append(f'    unlockedAt: {"0" if item["unlocked"] else "null"},')
        lines.append("  },")

    lines.append("];\n")
    lines.append("""export function getUnlockedCollectables(
  items: CollectableItem[] = INITIAL_COLLECTABLES
): CollectableItem[] {
  return items.filter((item) => item.unlocked);
}

export function getRandomUnlockedCollectable(
  items: CollectableItem[] = INITIAL_COLLECTABLES
): CollectableItem {
  const unlocked = getUnlockedCollectables(items);
  if (unlocked.length === 0) return items[0];
  const index = Math.floor(Math.random() * unlocked.length);
  return unlocked[index];
}
""")

    ts_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"✓ Generated {len(records)} collectables verified against {MANIFEST_FILE}")


if __name__ == "__main__":
    csv_input = sys.argv[1] if len(sys.argv) > 1 else "plants.csv"
    try:
        generate_collectables(csv_input)
    except (ValueError, FileNotFoundError) as err:
        print(err, file=sys.stderr)
        sys.exit(1)