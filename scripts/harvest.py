#!/usr/bin/env python3
"""
BRAN Org - Entrypoint CLI para Harvesters do CBBD.
Uso:
  python3 scripts/harvest.py --target ojs --edition 2024
  python3 scripts/harvest.py --target omeka --year 2013
  python3 scripts/harvest.py --target all
"""

import os
import sys
import argparse
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HARVESTERS_DIR = os.path.join(SCRIPT_DIR, "harvesters")


def run_cmd(cmd: list):
    print(f"👉 Executando: {' '.join(cmd)}")
    ret = subprocess.run(cmd)
    if ret.returncode != 0:
        print(f"❌ Falha na execução do comando (código {ret.returncode})")
        sys.exit(ret.returncode)


def main():
    parser = argparse.ArgumentParser(description="CLI Central de Extração e Mineração de Dados do CBBD")
    parser.add_argument("--target", choices=["ojs", "omeka", "consolidate", "all"], default="all", help="Alvo de extração")
    parser.add_argument("--edition", default="all", help="Edição específica para OJS (2015, 2017, 2019, 2022, 2024, 2026 ou all)")
    parser.add_argument("--year", default="all", help="Ano da coleção Omeka (2013, 1982, 1979... ou all)")
    parser.add_argument("--limit", type=int, default=None, help="Limitar quantidade de artigos (para testes)")
    parser.add_argument("--workers", type=int, default=6, help="Concorrência paralela")
    args = parser.parse_args()

    python_bin = sys.executable

    if args.target in ["ojs", "all"]:
        cmd = [python_bin, os.path.join(HARVESTERS_DIR, "harvest_ojs.py"), "--edition", args.edition, "--workers", str(args.workers)]
        if args.limit:
            cmd.extend(["--limit", str(args.limit)])
        run_cmd(cmd)

    if args.target in ["omeka", "all"]:
        cmd = [python_bin, os.path.join(HARVESTERS_DIR, "harvest_omeka.py"), "--year", args.year, "--workers", str(args.workers)]
        if args.limit:
            cmd.extend(["--limit", str(args.limit)])
        run_cmd(cmd)

    # Sempre roda a consolidação ao final
    run_cmd([python_bin, os.path.join(HARVESTERS_DIR, "consolidate_dataset.py")])
    print("✨ Processamento completo!")


if __name__ == "__main__":
    main()
