# SET OR CONFIRM THESE VARIABLES v

SLICER='OrcaSlicer'
SRC="PATH_TO_YOUR_SYNC" # e.g. "$HOME/Dropbox/Slicer Settings"

# SET OR CONFIRM THESE VARIABLES ^

if [[ "${SLICER}" == 'OrcaSlicer' ]]; then
    DEST_SUBPATH='user/default'
fi

case $(uname -s) in
Darwin)
    DEST="$HOME/Library/Application Support/${SLICER}"
    ;;
Linux)
    DEST="$HOME/.config/${SLICER}"
    ;;
*)
    echo 'Unsupported system; please set $DEST manually and submit a PR!' 2>&1
    ;;
esac

pushd "${SRC}" >/dev/null || exit
for d in *; do
    dest="${DEST}/${DEST_SUBPATH}/${d}"

    if [[ -L "${dest}" ]]; then
        echo "${d} already linked; skipping"
        continue
    fi

    echo "backing up ${d}"
    test -d "${dest}" && mv "${dest}" "${dest}.old"

    echo "linking ${d}"
    ln -s "${PWD}/${d}" "${dest}"
done
popd >/dev/null || exit
