#!/usr/bin/env bash
# Edub SQL: reapply the product name over upstream's. Idempotent — run it again after
# every `git merge upstream/main`, then review `git diff`.
#
# Only the product name shown to the user changes. Identifiers, package names, env vars,
# storage keys and the embedded "LibreDB" engine keep upstream's spelling, so saved data
# and upstream merges stay compatible. The packaging tests listed below compare against
# upstream's distribution files, which this fork does not ship and leaves untouched.
set -euo pipefail
cd "$(dirname "$0")/.."

git ls-files -z src public tests e2e \
  ':!tests/unit/aws-listing-fields.test.ts' \
  ':!tests/unit/aws-ami-descriptor.test.ts' \
  ':!tests/unit/caprover-template.test.ts' \
  | { xargs -0 grep -IlZ "LibreDB Studio" || true; } \
  | xargs -0 -r sed -i 's/LibreDB Studio/Edub SQL/g'

git ls-files -z src tests e2e | xargs -0 -r sed -i 's/Edub SQL SQL editor/Edub SQL editor/g'
sed -i 's/"short_name": "LibreDB"/"short_name": "Edub SQL"/' public/site.webmanifest
sed -i 's/short_name: "LibreDB",/short_name: "Edub SQL",/' tests/unit/web-app-manifest.test.ts
sed -i 's#otpauth://totp/LibreDB:#otpauth://totp/Edub%20SQL:#; s#&issuer=LibreDB&#\&issuer=Edub%20SQL\&#' src/lib/local-accounts.ts
sed -i 's/title="Add LibreDB to your authenticator app"/title="Add Edub SQL to your authenticator app"/' src/components/auth/AuthenticatorSettings.tsx
