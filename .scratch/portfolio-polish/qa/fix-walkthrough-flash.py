"""Apply the owner's reviewed theme-reload edit to the original recorded take."""
import hashlib
import importlib.util
import json
import shutil
import subprocess
import sys
from pathlib import Path

sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location("renderer", Path(__file__).with_name("render-walkthrough.py"))
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
take = Path(sys.argv[1]).resolve()
movie = renderer.ROOT / "public/walkthrough/aster-walkthrough.mp4"
before = take / "flash-review/original-walkthrough.mp4"
before.parent.mkdir(exist_ok=True)
if not before.exists():
    shutil.copyfile(movie, before)
assert hashlib.sha256(before.read_bytes()).hexdigest() == "866e58834e2ded0fa27bfb6588e6aede9e2157b0fc7b11622d0738485fc9ffe4"

manifest_path = take / "manifest.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
hold = {"first": 144, "last": 153, "replace": 143,
        "reason": "Hold the last clean dark frame over the reload blank and first font-loading frame (158.20–158.60s)."}
scene = next(scene for scene in manifest["scenes"] if scene["id"] == "themes")
scene["frameHolds"] = [hold]
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
clip = take / "edit/11-themes.mp4"
if not clip.with_suffix(".before-hold-0.mp4").exists():
    renderer.apply_frame_holds(clip, [hold])
renderer.run(["-f", "concat", "-safe", "0", "-i", take / "edit/shots.txt",
              "-c", "copy", "-movflags", "+faststart", movie])
renderer.run(["-i", movie, "-f", "null", "-"])
assert renderer.metadata(movie) == renderer.metadata(before)

def other_chapters_digest(path):
    # Exclude only the theme chapter. All other decoded frames must match exactly,
    # including the entire mobile section, captions, cursor and timing.
    result = subprocess.run([renderer.FFMPEG, "-v", "error", "-i", str(path),
        "-vf", "select='lt(n,3811)+gte(n,4062)'", "-fps_mode", "passthrough",
        "-f", "framemd5", "-"], capture_output=True, check=True)
    return hashlib.sha256(result.stdout).hexdigest()

old_digest = other_chapters_digest(before)
new_digest = other_chapters_digest(movie)
assert old_digest == new_digest, "A chapter outside the requested edit changed."

def blank_frames(path):
    result = subprocess.run([renderer.FFMPEG, "-v", "error", "-ss", "158.16",
        "-i", str(path), "-t", "0.56", "-vf", "crop=128:64:90:800,scale=1:1",
        "-pix_fmt", "rgb24", "-f", "rawvideo", "pipe:1"], capture_output=True, check=True)
    return sum(min(result.stdout[i:i + 3]) > 200 for i in range(0, len(result.stdout), 3))

before_blank = blank_frames(before)
after_blank = blank_frames(movie)
assert before_blank == 9 and after_blank == 0
report_path = renderer.ROOT / ".scratch/portfolio-polish/qa/walkthrough-render.json"
report = json.loads(report_path.read_text(encoding="utf-8"))
report.update(bytes=movie.stat().st_size, sha256=hashlib.sha256(movie.read_bytes()).hexdigest())
report["themeReloadEdit"] = {**hold, "secondsCovered": 0.4,
    "durationAndFormatUnchanged": True, "otherChaptersDecodedFrameHash": new_digest,
    "otherChaptersIdentical": True, "blankFramesBefore": before_blank,
    "blankFramesAfter": after_blank, "fullDecode": "passed"}
report_path.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
(take / "render-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps({key: report[key] for key in ["bytes", "sha256", "themeReloadEdit"]}, indent=2))
