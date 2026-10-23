from pathlib import Path
from collections import defaultdict, deque
from xml.etree import ElementTree as ET
import json
import re
import sys

# slots.json structure:
# {
#     "#7F7BE6": "outerPetals",
#     "#9D97F5": "innerPetals",
#     "#C9C5FC": "stamen",
#     "#6C9159": "stem"
# }

ROOT_DIR = Path("assets")
OUTPUT_DIR = Path("generated")

OUTPUT_DIR.mkdir(exist_ok=True)

FILENAME_RE = re.compile(
    r"^([a-z0-9-]+)_([0-9]+(?:_[0-9]+)*)$"
)

SVG_ATTR_MAP = {
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "fill-rule": "fillRule",
    "clip-rule": "clipRule",
    "stroke-miterlimit": "strokeMiterlimit"
}

errors = []
warnings = []


def pascal_case(name: str):
    return "".join(
        x.capitalize()
        for x in name.split("-")
    )


def sort_stage(stage: str):
    return [int(x) for x in stage.split("_")]


def get_parent(stage: str, all_stages: set[str]) -> str | None:
    parts = stage.split("_")
    stage_num = int(parts[0])

    if stage_num == 1:
        return None

    branches = parts[1:]
    candidates = []

    for i in range(len(branches) - 1, 0, -1):
        candidates.append(
            f"{stage_num}_{'_'.join(branches[:i])}"
        )

    if branches:
        candidates.append(
            f"{stage_num - 1}_{'_'.join(branches)}"
        )

    for i in range(len(branches) - 1, 0, -1):
        candidates.append(
            f"{stage_num - 1}_{'_'.join(branches[:i])}"
        )

    candidates.append(str(stage_num - 1))

    for candidate in candidates:
        if candidate in all_stages:
            return candidate

    return None


total_svgs = 0
processed_plants_count = 0
generated_plants = []

for plant_dir in ROOT_DIR.iterdir():

    if not plant_dir.is_dir():
        continue

    plant_name = plant_dir.name
    print(f"Processing {plant_name}")

    slots_file = plant_dir / "slots.json"

    if not slots_file.exists():
        errors.append(
            f"{plant_name}: missing slots.json"
        )
        continue

    slots = json.loads(
        slots_file.read_text(
            encoding="utf-8"
        )
    )

    slots = {
        k.upper(): v
        for k, v in slots.items()
    }

    used_slot_colors = set()
    stages = {}
    graph = defaultdict(list)

    svg_files = list(
        plant_dir.glob("*.svg")
    )

    if not svg_files:
        errors.append(
            f"{plant_name}: contains no svg files"
        )
        continue

    # --------------------
    # Read SVG files
    # --------------------

    for svg_file in svg_files:

        match = FILENAME_RE.match(
            svg_file.stem
        )

        if not match:
            errors.append(
                f"{svg_file.name}: invalid filename"
            )
            continue

        file_plant = match.group(1)

        if file_plant != plant_name:
            errors.append(
                f"{svg_file.name}: filename plant does not match folder name"
            )
            continue

        stage = match.group(2)

        if stage in stages:
            errors.append(
                f"{plant_name}: duplicate stage {stage}"
            )
            continue

        try:
            tree = ET.parse(svg_file)
            root = tree.getroot()
        except ET.ParseError as ex:
            errors.append(
                f"{svg_file.name}: invalid svg ({ex})"
            )
            continue

        viewbox = root.get("viewBox")

        if not viewbox:
            errors.append(
                f"{svg_file.name}: missing viewBox"
            )
            continue

        tsx_elements = []

        for child in root:

            tag = child.tag.split("}")[-1]
            attrs = []

            for key, value in child.attrib.items():

                react_key = SVG_ATTR_MAP.get(
                    key,
                    key
                )

                if react_key in ["fill", "stroke"]:

                    upper = value.upper()

                    if upper not in slots:
                        errors.append(
                            f"{svg_file.name}: unknown color {upper}"
                        )
                        continue

                    slot = slots[upper]
                    used_slot_colors.add(upper)

                    attrs.append(
                        f'{react_key}={{colors.{slot}}}'
                    )
                    continue

                attrs.append(
                    f'{react_key}="{value}"'
                )

            tsx_elements.append(
                f'<{tag} {" ".join(attrs)} />'
            )

        stages[stage] = {
            "viewBox": viewbox,
            "tsx": "\n        ".join(tsx_elements)
        }

    # --------------------
    # Graph Validation
    # --------------------

    if "1" not in stages:
        errors.append(
            f"{plant_name}: missing stage 1"
        )

    all_stage_keys = set(stages.keys())

    for stage in stages:

        parent = get_parent(
            stage,
            all_stage_keys
        )

        if parent and parent not in stages:
            errors.append(
                f"{plant_name}: {stage} has missing parent {parent}"
            )
        elif parent:
            graph[parent].append(stage)

    # --------------------
    # Reachability
    # --------------------

    visited = set()
    queue = deque(["1"])

    while queue:
        current = queue.popleft()

        if current in visited:
            continue

        visited.add(current)

        for nxt in graph.get(current, []):
            queue.append(nxt)

    unreachable = set(stages) - visited

    for stage in unreachable:
        errors.append(
            f"{plant_name}: unreachable stage {stage}"
        )

    # --------------------
    # Unused Slot Colors
    # --------------------

    for color, slot in slots.items():
        if color not in used_slot_colors:
            warnings.append(
                f"{plant_name}: slot color {color} ({slot}) never used"
            )

    # --------------------
    # TSX Export
    # --------------------

    component_name = pascal_case(plant_name)
    stage_entries = []

    for stage in sorted(stages, key=sort_stage):
        stage_data = stages[stage]
        next_stages = sorted(graph.get(stage, []), key=sort_stage)
        next_stages_json = json.dumps(next_stages)

        stage_entries.append(
f'''  "{stage}": {{
    stage: "{stage}",
    nextStages: {next_stages_json},
    asset: {{
      viewBox: "{stage_data["viewBox"]}",
      render: (colors: {component_name}Colors) => (
        <>
          {stage_data["tsx"]}
        </>
      ),
    }},
  }}'''
        )

    output = f'''import type {{ PlantStageAsset }} from "../types";

export interface {component_name}Colors {{
'''

    slot_names = sorted(set(slots.values()))

    for slot in slot_names:
        output += f"  {slot}: string;\n"

    output += "}\n\n"
    output += f'export const {component_name}Stages = {{\n'
    output += ",\n".join(stage_entries)
    output += "\n};\n"

    (OUTPUT_DIR / f"{plant_name.capitalize()}.tsx").write_text(
        output,
        encoding="utf-8"
    )

    total_svgs += len(stages)
    processed_plants_count += 1
    generated_plants.append(plant_name)

index_imports = []
index_reexports = []
plant_dict_entries = []

for plant in sorted(generated_plants):
    comp_name = pascal_case(plant)
    capitalized_plant = plant.capitalize()
    index_imports.append(f'import {{ {comp_name}Stages }} from "./{capitalized_plant}"')
    index_reexports.append(f'export * from "./{capitalized_plant}"')
    plant_dict_entries.append(f'  "{capitalized_plant}": {comp_name}Stages,')

index_content = "\n".join(index_imports) + "\n\n"
index_content += "\n".join(index_reexports) + "\n\n"
index_content += "export const plants: Record<string, any> = {\n"
index_content += "\n".join(plant_dict_entries) + "\n"
index_content += "};\n"

# index_lines = []
# for plant in sorted(generated_plants):
#     index_lines.append(f'export * from "./{plant.capitalize()}";')

(OUTPUT_DIR / "index.ts").write_text(
    index_content,
    encoding="utf-8"
)

# --------------------
# Report
# --------------------

if warnings:
    print("\nWarnings:")
    for warning in warnings:
        print("⚠", warning)

if errors:
    print("\nErrors:")
    for error in errors:
        print("❌", error)
    sys.exit(1)

print("\n✓ Export succeeded")
print(f"✓ {processed_plants_count} plants")
print(f"✓ {total_svgs} stages")
print("✓ TSX files generated with stage graph structures")