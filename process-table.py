
import csv
import json

densities = {}

with open('densities_gml.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        densities[row[0]] = row[1]

json.dumps(densities)

print("done")

'''
class SanitizedIngredient:
    def __init__(self):
        self.volume_numerator = 0
        self.volume_demoninator = 0
        self.unit = ""
        self.ounces = 0
        self.ounces_upper = 0
        self.grams = 0
        self.grams_upper = 0

ingredients = {}
with open('densities.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        ingredients[row["Ingredient"]] = {"volume": row["Volume"], "ounces": row["Ounces"], "grams": row["Grams"]}


units_list = []

for ingredient in ingredients:
    unit = ingredients[ingredient]["volume"].split(" ")[-1]
    ingredients[ingredient]["unit"] = unit
    if unit not in units_list:
        units_list.append(unit)


sanitized_ingredients = {}
for ingredient in ingredients:
    curr_item = ingredients[ingredient]
    sanitized_ingredients[ingredient] = SanitizedIngredient()
    dest_obj = sanitized_ingredients[ingredient]

    if curr_item["volume"].split()[-1] == "cup":
        vol = Fraction(curr_item["volume"].split()[0])*8
        dest_obj.volume_numerator = vol.numerator
        dest_obj.volume_demoninator = vol.denominator
        dest_obj.unit = "fl-oz"
    else:
        dest_obj.volume = curr_item["volume"]
    
    dest_obj.ounces = curr_item["ounces"]
    dest_obj.grams = curr_item["grams"]
    
        

print("done")
'''
