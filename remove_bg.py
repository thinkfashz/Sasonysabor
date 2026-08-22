import os
from collections import deque
from PIL import Image

SRC = r"C:\Users\fabrickspa\Desktop\mis proyectos\sabor y sazon\Improve_the_logo_2K_202608081612.jpeg"
DST = r"C:\Users\fabrickspa\Desktop\mis proyectos\sabor y sazon\app\src\assets\logo.png"

img = Image.open(SRC).convert("RGBA")
w, h = img.size
px = img.load()

corners = [px[(0, 0)], px[(w - 1, 0)], px[(0, h - 1)], px[(w - 1, h - 1)]]
bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
TOL = 60

def dist(a, b):
    return sum((a[i] - b[i]) ** 2 for i in range(3)) ** 0.5

visited = [[False] * w for _ in range(h)]
queue = deque()
for x, y in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
    if dist(px[(x, y)][:3], bg) <= TOL:
        visited[y][x] = True
        queue.append((x, y))

while queue:
    x, y = queue.popleft()
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
            if dist(px[(nx, ny)][:3], bg) <= TOL:
                visited[ny][nx] = True
                queue.append((nx, ny))

# Feather: blend alpha of boundary pixels for smoother edges
for y in range(h):
    for x in range(w):
        if visited[y][x]:
            px[(x, y)] = (px[(x, y)][0], px[(x, y)][1], px[(x, y)][2], 0)

# Crop to content bounding box
bbox = img.getbbox()
img = img.crop(bbox)

# Resize to max width 800 for web
scale = min(1.0, 800 / img.width)
if scale < 1:
    img = img.resize((int(img.width * scale), int(img.height * scale)), Image.LANCZOS)

os.makedirs(os.path.dirname(DST), exist_ok=True)
img.save(DST, "PNG")
print("saved:", DST, img.size, img.mode)
