#!/usr/bin/env bash
# Pornește serverul de dezvoltare pentru proiectul OML (oradea-music-lab).
set -e

cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm nu a fost gasit in PATH. Instaleaza Node.js (ex: via nvm) inainte de a rula acest script." >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Instalez dependintele (node_modules lipseste)..."
  npm install
fi

echo "Pornesc serverul de dezvoltare (Vite)..."
npm run dev
