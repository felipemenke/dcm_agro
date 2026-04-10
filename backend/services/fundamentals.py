import json
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "tres_tentos.json"


def get_fundamentals():

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    result = []

    for row in data:
        revenue = row["revenue"]
        ebitda = row["ebitda"]
        net_debt = row["net_debt"]

        margin = round((ebitda / revenue) * 100, 2)
        net_debt_ebitda = round(net_debt / ebitda, 2)

        result.append({
            "quarter": row["quarter"],
            "revenue": revenue,
            "ebitda": ebitda,
            "margin": margin,
            "net_debt_ebitda": net_debt_ebitda
        })

    return result