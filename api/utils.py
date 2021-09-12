import json
import os

table_names = {}

if os.getenv("LOCALSTACK_HOSTNAME", False):
    f = open('/output/outputs.json',)
    data = json.load(f)
    for output in data:
        table_names[output["OutputKey"]] = output["OutputValue"]
    
    f.close()