import json

with open("densities.json") as f:
    data = json.load(f)

new_data = []
for item in data:
    new_data.append({
        "ingredient":item,
        "density":data[item]
        })

with open("densities_2.json", "w") as f:
    json.dump(new_data, f, indent="")
print("done")