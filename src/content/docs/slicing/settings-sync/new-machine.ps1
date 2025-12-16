# SET OR CONFIRM THESE VARIABLES v

$SLICER = 'OrcaSlicer'
$SRC = "PATH_TO_YOUR_SYNC" # e.g. "$env:HOME/Dropbox/Slicer Settings"
$DEST = "$env:APPDATA\$SLICER"

# SET OR CONFIRM THESE VARIABLES ^

$DEST_SUBPATH = ""
if ($SLICER -eq 'OrcaSlicer') {
    $DEST_SUBPATH = 'user\default'
}

Push-Location $SRC

Foreach ($d in Get-ChildItem -Directory)
{
    $dest = "$DEST\$DEST_SUBPATH\$($d.Name)"

    if ((Test-Path $dest) -and (Get-Item -Path $dest).LinkType -eq "SymbolicLink") {
        Write-Host "${d} already linked; skipping"
        Continue
    }

    if (Test-Path -Path $dest) {
        Write-Host "backing up ${d}"
        Move-Item $dest "${dest}.old"
    }

    Write-Host "linking ${d}"

    New-Item -Path $dest -Target "$SRC\$($d.Name)" -ItemType SymbolicLink
}
