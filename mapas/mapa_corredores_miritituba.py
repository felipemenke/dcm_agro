"""
Mapa tematico (PA + MT) com gradiente de distancia ate Miritituba
e sobreposicao dos principais corredores (rodovias, hidrovias, ferrovias).

Saida: frontend/public/assets/mapa-porto.png

Requisitos: geopandas, geobr, matplotlib, numpy, shapely
"""

from __future__ import annotations

import os
import unicodedata
from dataclasses import dataclass, field
from typing import Iterable, List, Tuple

import geopandas as gpd
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.patheffects as path_effects
import numpy as np
import pandas as pd
from geobr import read_municipality
from matplotlib.colors import LinearSegmentedColormap
from matplotlib.lines import Line2D
from shapely.geometry import LineString, Point

# ──────────────────────────────────────────────────────────────────────────────
# Coordenadas de referência (lon, lat) — WGS-84, verificadas por fonte primária
# ──────────────────────────────────────────────────────────────────────────────
CITIES = {
    # Pará
    "Miritituba":           (-55.960, -4.293),   # distrito de Itaituba / porto
    "Itaituba":             (-55.983, -4.277),   # sede municipal (perto de Miritituba)
    "Santarém":             (-54.708, -2.439),
    "Barcarena":            (-48.620, -1.504),   # Porto Vila do Conde
    "Marabá":               (-49.118, -5.361),
    "Parauapebas":          (-49.902, -6.068),
    "Novo Progresso":       (-55.381, -7.125),
    "Guarantã do Norte":    (-54.900, -9.794),   # divisa MT/PA na BR-163
    "Pacajá":               (-50.641, -3.840),
    "Redencao":             (-50.030, -8.028),
    "Rurópolis":            (-54.893, -4.084),   # intermediário BR-163/PA
    # Mato Grosso
    "Sinop":                (-55.502, -11.851),
    "Sorriso":              (-55.708, -12.543),  # intermediário BR-163/MT
    "Guarantã_MT":          (-54.900, -9.794),   # mesmo que Guarantã do Norte
    "Cuiabá":               (-56.097, -15.596),
    "Rondonópolis":         (-54.636, -16.471),
    "Lucas do Rio Verde":   (-55.944, -13.033),
    "Nova Mutum":           (-56.086, -13.832),  # ramal ferrovia estadual
    "Ribeirao Cascalheira": (-51.833, -12.933),
    # Maranhão
    "Açailândia":           (-47.503, -4.948),
    "São Luís":             (-44.303, -2.530),
    # Rondônia
    "Porto Velho":          (-63.904, -8.761),
    # Amazonas
    "Itacoatiara":          (-58.444, -3.143),
}

def C(name: str) -> Tuple[float, float]:
    """Retorna (lon, lat) do dicionário de cidades."""
    if name not in CITIES:
        raise KeyError(f"Cidade não encontrada no dicionário: {name}")
    return CITIES[name]


# ──────────────────────────────────────────────────────────────────────────────
# Configurações do mapa
# ──────────────────────────────────────────────────────────────────────────────
MIRI_POINT      = Point(*C("Miritituba"))
# Expandir área exibida para dar contexto Norte/Nordeste e melhor visualização dos intermodais
TARGET_STATES   = ["PA", "MT", "RO", "AM", "MA", "TO", "PI", "BA"]
LOOKUP_STATES   = TARGET_STATES

palette_dist = ['#0f1633', '#0072b8', "#05c0f4", '#93201f', '#4a080a']
cmap_dist    = LinearSegmentedColormap.from_list("dist_cmap", palette_dist)


# ──────────────────────────────────────────────────────────────────────────────
# Funções utilitárias
# ──────────────────────────────────────────────────────────────────────────────
def norm_city(name: str) -> str:
    if not isinstance(name, str):
        return ""
    return unicodedata.normalize("NFKD", name.upper().strip()).encode("ascii", "ignore").decode()


def haversine_np(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(np.radians, [lon1, lat1, lon2, lat2])
    a = np.sin((lat2-lat1)/2)**2 + np.cos(lat1)*np.cos(lat2)*np.sin((lon2-lon1)/2)**2
    return 6371.0088 * 2 * np.arcsin(np.sqrt(a))


def load_municipalities(states: Iterable[str]) -> gpd.GeoDataFrame:
    frames = []
    for uf in states:
        gdf = read_municipality(code_muni=uf, year=2020, simplified=True)
        gdf["mun_key"] = gdf["name_muni"].apply(norm_city)
        frames.append(gdf)
    return gpd.GeoDataFrame(pd.concat(frames, ignore_index=True), crs=frames[0].crs)


def add_distance_to_miritituba(gdf: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    gdf = gdf.copy()
    cent_ll = gpd.GeoSeries(gdf.to_crs(3857).centroid, crs=3857).to_crs(4326)
    gdf["cx"] = cent_ll.apply(lambda p: p.x)
    gdf["cy"] = cent_ll.apply(lambda p: p.y)
    gdf["dist_to_mirit"] = haversine_np(gdf["cx"].values, gdf["cy"].values,
                                         MIRI_POINT.x, MIRI_POINT.y)
    return gdf


# ──────────────────────────────────────────────────────────────────────────────
# Estrutura de corredor
# ──────────────────────────────────────────────────────────────────────────────
@dataclass
class Corridor:
    label:    str
    coords:   List[Tuple[float, float]]   # lista de (lon, lat) diretamente
    color:    str
    linestyle:  str   = "-"
    linewidth:  float = 2.4
    zorder:     int   = 5
    category:   str   = "rodovia"         # "ferrovia" | "rodovia" | "hidrovia"
    status:     str   = "operacional"     # "operacional" | "em_obras" | "projetada"


# ──────────────────────────────────────────────────────────────────────────────
# FERROVIAS
# ──────────────────────────────────────────────────────────────────────────────
RAILWAYS = [
    # Ferrogrão: Sinop → intermediários BR-163 → Miritituba (traçado paralelo à BR-163)
    # Traçado corrigido com nós reais ao longo da BR-163
    Corridor(
        label="Ferrogrão (projetada): Sinop → Miritituba • ~933 km",
        coords=[
            C("Sinop"), C("Sorriso"), C("Novo Progresso"), C("Rurópolis"), C("Miritituba")
        ],
        color="#f6c90e",
        linestyle="-",
        linewidth=4.2,
        zorder=8,
        category="ferrovia",
        status="projetada",
    ),

    # Ferrovia Estadual MT (Rumo): dois ramais partindo de Rondonópolis
    # Ramal 1: Rondonópolis → Cuiabá
    # Ramal 2: Rondonópolis → Nova Mutum → Lucas do Rio Verde
    Corridor(
        label="Ferrovia Estadual MT — Ramal Cuiabá: Rondonópolis → Cuiabá • ~215 km",
        coords=[C("Rondonópolis"), C("Cuiabá")],
        color="#b07fe8",
        linestyle="-.",
        linewidth=2.4,
        zorder=6,
        category="ferrovia",
        status="em_obras",
    ),
    Corridor(
        label="Ferrovia Estadual MT — Ramal Norte: Rondonópolis → Nova Mutum → Lucas do Rio Verde • ~530 km",
        coords=[C("Rondonópolis"), C("Nova Mutum"), C("Lucas do Rio Verde")],
        color="#d4b0ff",
        linestyle="-.",
        linewidth=2.4,
        zorder=6,
        category="ferrovia",
        status="em_obras",
    ),

    # EFC Carajás: Parauapebas → Marabá → Açailândia → São Luís
    # Traçado real: de Parauapebas sobe até próximo a Marabá, vira para leste até Açailândia e São Luís
    Corridor(
        label="EFC Carajás (Vale): Parauapebas → Marabá → Açailândia → São Luís • ~892 km",
        coords=[C("Parauapebas"), C("Marabá"), C("Açailândia"), C("São Luís")],
        color="#a0aec0",
        linestyle="-.",
        linewidth=2.4,
        zorder=6,
        category="ferrovia",
        status="operacional",
    ),
]


# ──────────────────────────────────────────────────────────────────────────────
# RODOVIAS
# ──────────────────────────────────────────────────────────────────────────────
HIGHWAYS = [
    # BR-163: Sinop → Sorriso → Guarantã do Norte → Novo Progresso → Rurópolis → Miritituba
    # Traçado real com intermediários verificados
    Corridor(
        label="BR-163: Sinop → Novo Progresso → Itaituba (Miritituba) • ~1.009 km",
        coords=[
            C("Sinop"), C("Sorriso"), C("Guarantã do Norte"),
            C("Novo Progresso"), C("Rurópolis"), C("Miritituba")
        ],
        color="#e67e22",
        linewidth=3.0,
        zorder=7,
        category="rodovia",
        status="operacional",
    ),

    # BR-158/155: Ribeirão Cascalheira (MT) → Redenção (PA) → Marabá (PA)
    Corridor(
        label="BR-158/155: Rib. Cascalheira → Redenção → Marabá • ~891 km",
        coords=[C("Ribeirao Cascalheira"), C("Redencao"), C("Marabá")],
        color="#e74c3c",
        linewidth=2.4,
        zorder=6,
        category="rodovia",
        status="operacional",
    ),

    # BR-364: Cuiabá → Porto Velho
    Corridor(
        label="BR-364: Cuiabá → Porto Velho (corredor Madeira) • ~1.460 km",
        coords=[C("Cuiabá"), C("Porto Velho")],
        color="#f5c04a",
        linewidth=2.2,
        zorder=6,
        category="rodovia",
        status="operacional",
    ),

    # BR-230 Transamazônica: Marabá → Pacajá → Itaituba
    Corridor(
        label="BR-230 Transamazônica: Marabá → Pacajá → Itaituba",
        coords=[C("Marabá"), C("Pacajá"), C("Itaituba")],
        color="#bc6c25",
        linewidth=2.2,
        zorder=6,
        category="rodovia",
        status="operacional",
    ),
]


# ──────────────────────────────────────────────────────────────────────────────
# HIDROVIAS
# ──────────────────────────────────────────────────────────────────────────────
WATERWAYS = [
    # Hidrovia Tapajós: Miritituba/Itaituba → Santarém (rio Tapajós — principal corredor de grãos)
    Corridor(
        label="Hidrovia Tapajós: Miritituba/Itaituba ↔ Santarém • ~250 km",
        coords=[
            C("Itaituba"),
            (-55.65, -3.90),
            (-55.05, -3.20),
            C("Santarém")
        ],
        color="#1a9fd4",
        linestyle="--",
        linewidth=3.2,
        zorder=6,
        category="hidrovia",
        status="operacional",
    ),

    # Hidrovia Tocantins-Araguaia: Marabá → Baião → Barcarena/Vila do Conde
    # Traçado corrigido: o rio Tocantins flui de Marabá para NORTE até sua foz perto de Barcarena
    # Nós intermediários: Tucuruí (eclusa) → Baião → Barcarena
    Corridor(
        label="Hidrovia Tocantins-Araguaia: Marabá → Tucuruí → Barcarena/Vila do Conde • ~500 km (em obras)",
        coords=[
            C("Marabá"),
            (-49.672, -3.758),   # Tucuruí (eclusa — ponto crítico)
            (-48.960, -2.210),   # Baião (baixo Tocantins)
            C("Barcarena"),
        ],
        color="#00cfc8",
        linestyle=(0, (6, 2, 2, 2)),  # traçado misto: parcialmente operacional
        linewidth=2.8,
        zorder=6,
        category="hidrovia",
        status="em_obras",
    ),

    # Hidrovia Madeira: Porto Velho → Itacoatiara (rio Madeira → rio Amazonas)
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
    ),
]


# ──────────────────────────────────────────────────────────────────────────────
# Ordem de renderização
# ──────────────────────────────────────────────────────────────────────────────
ALL_CORRIDORS_ORDERED = HIGHWAYS + WATERWAYS + RAILWAYS


def add_corridors(ax, corridors: Iterable[Corridor]):
    handles_by_cat = {"ferrovia": [], "rodovia": [], "hidrovia": []}
    for cor in corridors:
        xs = [p[0] for p in cor.coords]
        ys = [p[1] for p in cor.coords]

        # linhas em obras: alpha reduzido
        alpha = 0.95 if cor.status == "operacional" else 0.75

        ax.plot(xs, ys,
                color=cor.color,
                linestyle=cor.linestyle,
                linewidth=cor.linewidth,
                zorder=cor.zorder,
                alpha=alpha,
                solid_capstyle="round")

        lw_legend = max(cor.linewidth, 1.8)
        ls_legend = cor.linestyle if isinstance(cor.linestyle, str) else "--"
        handles_by_cat[cor.category].append(
            Line2D([], [], color=cor.color, linestyle=ls_legend,
                   linewidth=lw_legend, label=cor.label,
                   alpha=alpha)
        )
    return handles_by_cat


# ──────────────────────────────────────────────────────────────────────────────
# Pins de cidades-destaque
# ──────────────────────────────────────────────────────────────────────────────
PINS = {
    "Miritituba":         (C("Miritituba"),  (0.28,  0.18)),
    "Santarém":           (C("Santarém"),    (0.28,  0.18)),
    "Barcarena":          (C("Barcarena"),   (0.28,  0.18)),
    "Sinop":              (C("Sinop"),       (0.28, -0.40)),
    "Marabá":             (C("Marabá"),      (0.28,  0.18)),
    "Rondonópolis":       (C("Rondonópolis"),(0.28,  0.18)),
}

PIN_STYLE = dict(marker="o", s=300, color="#f7f7f7",
                 edgecolor="#0b1526", linewidth=1.8, zorder=10)


# ──────────────────────────────────────────────────────────────────────────────
# Build plot — 16:9
# ──────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    mun_lookup = load_municipalities(LOOKUP_STATES)

    base = mun_lookup[mun_lookup["abbrev_state"].isin(TARGET_STATES)].copy()
    base = add_distance_to_miritituba(base)

    fig = plt.figure(figsize=(24, 14))
    fig.patch.set_facecolor("#0d1b2a")

    # Eixo do mapa: 70% da largura
    ax = fig.add_axes([0.01, 0.04, 0.68, 0.92])
    ax.set_facecolor("#0d1b2a")

    # ── Coroplético de fundo ──────────────────────────────────────────────
    base.plot(
        column="dist_to_mirit",
        cmap=cmap_dist,
        linewidth=0.12,
        edgecolor="#d9e3ec",
        ax=ax,
        missing_kwds={"color": "#1a2a3a"},
    )

    # Margens extras para enxergar mais terra e facilitar zoom na leitura dos intermodais
    xmin, ymin, xmax, ymax = base.total_bounds
    pad_x = 2.5
    pad_y = 2.5
    ax.set_xlim(xmin - pad_x, xmax + pad_x)
    ax.set_ylim(ymin - pad_y, ymax + pad_y)

    # ── Contorno dos estados ──────────────────────────────────────────────
    base.dissolve(by="abbrev_state").boundary.plot(
        ax=ax, color="#dbe9f5", linewidth=1.5, zorder=4
    )

    # ── Corredores ───────────────────────────────────────────────────────
    handles_by_cat = add_corridors(ax, ALL_CORRIDORS_ORDERED)

    # ── Pins + labels ─────────────────────────────────────────────────────
    for city_name, ((lon, lat), (dx, dy)) in PINS.items():
        ax.scatter(lon, lat, **PIN_STYLE)
        txt = ax.text(
            lon + dx, lat + dy, city_name,
            fontsize=12, fontweight="bold",
            color="#ffffff", ha="left", va="center", zorder=11,
        )
        txt.set_path_effects([path_effects.withStroke(linewidth=3, foreground="#0b1526")])

    # ── Título ────────────────────────────────────────────────────────────
    ax.set_title(
        "Arco Norte — PA + MT: Distância a Miritituba e Principais Corredores Logísticos\n"
        "(Ferrogrão em amarelo · BR-163 em laranja · Hidrovias tracejadas · Ferrovias pontilhadas)",
        fontsize=13, fontweight="bold", pad=12, color="#dbe9f5",
    )
    ax.axis("off")

    # ── Colorbar (superior direita) ───────────────────────────────────────
    cax = fig.add_axes([0.706, 0.40, 0.018, 0.54])
    norm = mpl.colors.Normalize(vmin=base["dist_to_mirit"].min(),
                                 vmax=base["dist_to_mirit"].max())
    sm = mpl.cm.ScalarMappable(cmap=cmap_dist, norm=norm)
    sm._A = []
    cb = fig.colorbar(sm, cax=cax)
    cb.set_label("Distância até Miritituba (km)", fontsize=9, color="#dbe9f5", labelpad=8)
    cb.ax.yaxis.set_tick_params(color="#dbe9f5", labelcolor="#dbe9f5", labelsize=8)
    cax.set_facecolor("#0d1b2a")

    # ── Legenda (inferior direita, abaixo da colorbar) ────────────────────
    lax = fig.add_axes([0.700, 0.04, 0.295, 0.34])
    lax.set_facecolor("#111e2e")
    lax.set_xticks([]); lax.set_yticks([])
    for spine in lax.spines.values():
        spine.set_edgecolor("#3a5068"); spine.set_linewidth(1.2)

    separator = Line2D([], [], color="none", label="")

    # Indicadores de status na legenda
    status_note = Line2D([], [], color="none",
                         label="  ── operacional  ╌╌ em obras/projetado")

    cat_headers = {
        "ferrovia": Line2D([], [], color="none", label="▶  FERROVIAS"),
        "rodovia":  Line2D([], [], color="none", label="▶  RODOVIAS"),
        "hidrovia": Line2D([], [], color="none", label="▶  HIDROVIAS"),
    }

    legend_handles = [status_note, separator]
    for cat in ("ferrovia", "rodovia", "hidrovia"):
        legend_handles.append(cat_headers[cat])
        legend_handles.extend(handles_by_cat[cat])
        legend_handles.append(separator)

    leg = lax.legend(
        handles=legend_handles,
        loc="upper left",
        bbox_to_anchor=(0.02, 0.98),
        fontsize=7.4,
        frameon=False,
        title="Corredores Logísticos do Arco Norte",
        title_fontsize=9,
        borderaxespad=0.3,
        labelcolor="#dbe9f5",
        borderpad=0.5,
        labelspacing=0.38,
        handlelength=2.4,
    )
    leg.get_title().set_color("#f0f4f8")
    leg.get_title().set_fontweight("bold")

    # ── Salvar ────────────────────────────────────────────────────────────
    output_dir = os.path.join("frontend", "public", "assets")
    os.makedirs(output_dir, exist_ok=True)
    png_path = os.path.join(output_dir, "mapa-porto.png")
    svg_path = os.path.join(output_dir, "mapa-porto.svg")

    plt.savefig(png_path, dpi=400, bbox_inches="tight", facecolor=fig.get_facecolor())
    plt.savefig(svg_path, dpi=400, bbox_inches="tight", facecolor=fig.get_facecolor(), format="svg")
    print(f"✓ Mapas salvos em {png_path} e {svg_path}")
