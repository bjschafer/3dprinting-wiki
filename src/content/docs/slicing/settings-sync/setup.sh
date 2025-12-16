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

# ensure SRC is empty; this is a fresh setup
if find "${SRC}" -mindepth 1 -maxdepth 1 | read -r; then
    echo "${SRC} contains files -- check the path or run the sync script" 2>&1
fi

mkdir -p "${SRC}"

pushd "${DEST}/${DEST_SUBPATH}" >/dev/null || exit
for d in *; do
    echo "backing up ${d}"
    cp -r "${d}" "${d}.orig"
    mv "${d}" "${SRC}/${d}"

    echo "linking ${d}"
    ln -s "${SRC}/${d}" "${d}"
done
popd || exit

echo "Successfully copied and linked $SRC to $DEST"
