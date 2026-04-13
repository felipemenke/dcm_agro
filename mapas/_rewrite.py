from pathlib import Path
p=Path('mapa_corredores_miritituba.py')
text=p.read_text(encoding='utf-8')
text=text.replace('coords=[C("Itaituba"), C("Santarém")]', 'coords=[\n            C("Itaituba"),\n            (-55.65, -3.90),\n            (-55.05, -3.20),\n            C("Santarém")\n        ]')
old_madeira='''    # Hidrovia Madeira: Porto Velho → Itacoatiara (rio Madeira → rio Amazonas)
    # Traçado: o rio Madeira corre de SUL (Porto Velho/RO) para NORTE/LESTE até foz em Itacoatiara (AM)
    # Intermediário: Humaitá (AM) como nó de inflexão do rio
    Corridor(
        label="Hidrovia Madeira: Porto Velho → Itacoatiara • ~1.060 km",
        coords=[
            C("Porto Velho"),
            (-61.862, -7.510),   # Humaitá/AM (rio Madeira vira para nordeste)
            (-59.990, -4.680),   # Manicoré aproximado
            C("Itacoatiara"),
        ],
        color="#0077b6",
        linestyle="--",
        linewidth=2.6,
        zorder=6,
        category="hidrovia",
        status="operacional",
    ),'''
new_madeira='''    # Hidrovia Madeira: Porto Velho → Itacoatiara (rio Madeira → rio Amazonas)
    # Traçado com pontos intermediários para seguir o canal.
    Corridor(
        label="Hidrovia Madeira: Porto Velho → Itacoatiara • ~1.060 km",
        coords=[
            C("Porto Velho"),
            (-61.862, -7.510),   # Humaitá/AM
            (-60.950, -6.550),   # tramo médio
            (-59.990, -4.680),   # Manicoré aproximado
            (-58.900, -3.900),   # subida rumo Itacoatiara
            C("Itacoatiara"),
        ],
        color="#0077b6",
        linestyle="--",
        linewidth=2.6,
        zorder=6,
        category="hidrovia",
        status="operacional",
    ),'''
text=text.replace(old_madeira, new_madeira)
if '(-55.65, -3.90)' not in text:
    raise SystemExit('replacement failed')
p.write_text(text, encoding='utf-8')
print('rewrote')
