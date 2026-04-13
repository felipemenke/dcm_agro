from pathlib import Path
p=Path('mapa_corredores_miritituba.py')
text=p.read_text(encoding='utf-8')
old='''    # ── Salvar ────────────────────────────────────────────────────────────
    output_path = "frontend/public/assets/mapa-porto.png"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    plt.savefig(output_path, dpi=300, bbox_inches="tight",
                facecolor=fig.get_facecolor())
    print(f"✓ Mapa salvo em {output_path}")
'''
new='''    # ── Salvar ────────────────────────────────────────────────────────────
    output_dir = os.path.join("frontend", "public", "assets")
    os.makedirs(output_dir, exist_ok=True)
    png_path = os.path.join(output_dir, "mapa-porto.png")
    svg_path = os.path.join(output_dir, "mapa-porto.svg")

    plt.savefig(png_path, dpi=400, bbox_inches="tight", facecolor=fig.get_facecolor())
    plt.savefig(svg_path, dpi=400, bbox_inches="tight", facecolor=fig.get_facecolor(), format="svg")
    print(f"✓ Mapas salvos em {png_path} e {svg_path}")
'''
if old not in text:
    raise SystemExit('old block not found')
text=text.replace(old,new,1)
p.write_text(text, encoding='utf-8')
print('tail rewritten')
