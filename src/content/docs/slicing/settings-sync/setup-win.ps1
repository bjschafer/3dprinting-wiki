# SET OR CONFIRM THESE VARIABLES v

$SLICER = 'OrcaSlicer'
$SRC = "PATH_TO_YOUR_SYNC" # e.g. "$HOME/Dropbox/Slicer Settings"
$DEST = "$env:APPDATA\$SLICER"

# SET OR CONFIRM THESE VARIABLES ^

$DEST_SUBPATH = ""
if ($SLICER -eq 'OrcaSlicer') {
    $DEST_SUBPATH = 'user/default'
}

# ensure SRC is empty; this is a fresh setup
if ($(Get-ChildItem $SRC).Length -gt 0) {
    Write-Error "${SRC} contains files -- check the path or run the sync script" 2>&1 -ErrorAction Stop
}

New-Item -ItemType Directory -Force -Path $SRC

Push-Location "$DEST\$DEST_SUBPATH"

Foreach ($d in Get-ChildItem -Directory)
{
    Write-Host "backing up $d"
    Copy-Item -Path $d -Destination "$(d).orig" -Recurse

    Move-Item $d "$SRC/$(d).Name"

    Write-Host "linking $d"
    New-Item -Target "$SRC/$(d).Name" -Path $d -ItemType SymbolicLink
}
Pop-Location

Write-Host "Successfully copied and linked $SRC to $DEST"
