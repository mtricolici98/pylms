#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

python manage.py collectstatic --no-input
python manage.py migrate --no-input
python manage.py createsuperuser --username mtricolici --email mariustricolici.dev@gmail.com --no-input || true

exec "$@"
