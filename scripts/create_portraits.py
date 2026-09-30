import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter

# Target resolution: 800 x 1000 (aspect ratio 4:5, optimal for portrait cards)
WIDTH = 800
HEIGHT = 1000

def create_radial_gradient(width, height, center_x, center_y, inner_color, outer_color, radius=None):
    """Creates a high-quality radial gradient background simulating studio lighting."""
    if radius is None:
        radius = math.hypot(width, height) / 1.4
    
    base = Image.new('RGB', (width, height), outer_color)
    # Generate on lower res then upscale with bicubic for super smooth gradient
    gw, gh = width // 2, height // 2
    grad = Image.new('RGB', (gw, gh))
    pixels = grad.load()
    
    cx, cy = center_x // 2, center_y // 2
    r_max = radius / 2
    
    r1, g1, b1 = inner_color
    r2, g2, b2 = outer_color
    
    for y in range(gh):
        for x in range(gw):
            dist = math.hypot(x - cx, y - cy)
            t = min(1.0, dist / r_max)
            # Smoothstep curve for soft studio light falloff
            t = t * t * (3 - 2 * t)
            r = int(r1 + (r2 - r1) * t)
            g = int(g1 + (g2 - g1) * t)
            b = int(b1 + (b2 - b1) * t)
            pixels[x, y] = (r, g, b)
            
    grad = grad.resize((width, height), Image.Resampling.BICUBIC)
    return grad

def add_film_grain(image, intensity=8):
    """Adds subtle organic film grain to remove digital flatness."""
    noise = Image.new('RGB', image.size)
    pixels = noise.load()
    w, h = image.size
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            val = random.randint(-intensity, intensity)
            c = (val + 128, val + 128, val + 128)
            pixels[x, y] = c
            if x + 1 < w: pixels[x + 1, y] = c
            if y + 1 < h: pixels[x, y + 1] = c
            if x + 1 < w and y + 1 < h: pixels[x + 1, y + 1] = c
    
    # Overlay noise softly
    from PIL import ImageChops
    # Soft grain blend
    return Image.blend(image, ImageChops.screen(image, noise), 0.05)

# ==============================================================================
# 1. RUSSELL T. - Barong Tagalog, warm tan studio backdrop
# ==============================================================================
def render_russell():
    # Warm beige / studio caramel background with gentle spotlight
    bg = create_radial_gradient(
        WIDTH, HEIGHT,
        center_x=400, center_y=380,
        inner_color=(235, 204, 178),  # Warm radiant beige
        outer_color=(198, 156, 126),  # Mellow studio tan
        radius=520
    )
    draw = ImageDraw.Draw(bg, 'RGBA')
    
    # Soft studio shadow behind subject
    shadow = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([210, 220, 590, 720], fill=(70, 50, 40, 45))
    sdraw.polygon([(160, 550), (640, 550), (740, 1000), (60, 1000)], fill=(70, 50, 40, 55))
    shadow = shadow.filter(ImageFilter.GaussianBlur(50))
    bg.paste(Image.alpha_composite(Image.new('RGBA', (WIDTH, HEIGHT), (0,0,0,0)), shadow), (0,0), shadow)
    
    # Layer for subject
    layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    ldraw = ImageDraw.Draw(layer)
    
    # --- Barong Tagalog (Chest & Shoulders) ---
    # Ivory translucent fabric with elegant folds
    barong_base = (248, 245, 238, 255)
    barong_shade = (226, 218, 206, 255)
    
    # Torso & Shoulders
    ldraw.polygon([
        (130, 520), (280, 470), (340, 465), (460, 465), (520, 470), (670, 520),
        (760, 1000), (40, 1000)
    ], fill=barong_base)
    
    # Collar
    ldraw.polygon([(330, 440), (400, 485), (350, 520), (315, 455)], fill=(255, 253, 248, 255))
    ldraw.polygon([(470, 440), (400, 485), (450, 520), (485, 455)], fill=(250, 246, 240, 255))
    
    # Central Embroidered Placket (Pechera)
    ldraw.rectangle([365, 485, 435, 950], fill=(245, 240, 232, 255), outline=(195, 185, 170, 200), width=2)
    # Embroidered motifs (traditional U-shape / geometric Filipino Barong embroidery)
    for y in range(510, 890, 36):
        ldraw.rectangle([375, y, 425, y + 20], outline=(175, 160, 140, 220), width=1)
        ldraw.line([(385, y + 10), (415, y + 10)], fill=(160, 145, 125, 240), width=2)
        ldraw.ellipse([395, y + 6, 405, y + 14], outline=(160, 145, 125, 240), width=1)
        
    # Vertical side embroidery bands
    for offset_x in [300, 500]:
        ldraw.line([(offset_x, 520), (offset_x, 920)], fill=(185, 175, 160, 180), width=3)
        for y in range(540, 900, 45):
            ldraw.ellipse([offset_x - 8, y, offset_x + 8, y + 12], outline=(175, 165, 150, 200), width=1)
            
    # Barong buttons (mother-of-pearl)
    for by in [500, 560, 620, 680, 740]:
        ldraw.ellipse([395, by, 405, by + 10], fill=(255, 255, 250, 255), outline=(180, 170, 155, 220))
        
    # --- Neck ---
    neck_color = (218, 168, 134, 255)
    neck_shade = (195, 142, 110, 255)
    ldraw.polygon([(345, 340), (455, 340), (450, 480), (350, 480)], fill=neck_color)
    ldraw.polygon([(345, 340), (370, 340), (380, 470), (350, 470)], fill=neck_shade)
    
    # --- Head / Face ---
    skin_base = (232, 178, 142, 255)
    skin_highlight = (244, 195, 160, 255)
    skin_shade = (205, 152, 118, 255)
    
    # Jawline and head base oval
    ldraw.ellipse([275, 170, 525, 420], fill=skin_base)
    # Chin contour
    ldraw.polygon([(320, 340), (480, 340), (440, 430), (360, 430)], fill=skin_base)
    # Soft facial highlight
    ldraw.ellipse([340, 220, 460, 350], fill=skin_highlight)
    
    # Warm cheeks / smile blush
    ldraw.ellipse([305, 280, 375, 335], fill=(225, 148, 120, 100))
    ldraw.ellipse([425, 280, 495, 335], fill=(225, 148, 120, 100))
    
    # Eyes & Eyebrows (Warm smiling crinkles)
    ldraw.line([(310, 248), (370, 242)], fill=(45, 32, 25, 255), width=5)  # Left brow
    ldraw.line([(430, 242), (490, 248)], fill=(45, 32, 25, 255), width=5)  # Right brow
    # Smiling almond eyes
    ldraw.arc([320, 264, 365, 290], start=190, end=350, fill=(35, 25, 20, 255), width=4)
    ldraw.arc([435, 264, 480, 290], start=190, end=350, fill=(35, 25, 20, 255), width=4)
    
    # Nose
    ldraw.line([(400, 265), (396, 315)], fill=skin_shade, width=3)
    ldraw.arc([386, 305, 414, 322], start=20, end=160, fill=(185, 130, 95, 255), width=3)
    
    # Smile with white teeth
    ldraw.arc([355, 335, 445, 375], start=0, end=180, fill=(170, 75, 70, 255), width=4)
    ldraw.chord([362, 345, 438, 368], start=0, end=180, fill=(255, 255, 252, 255))
    ldraw.line([(360, 346), (440, 346)], fill=(160, 60, 60, 255), width=2)
    
    # --- Hair (Styled modern side-swept dark brown) ---
    hair_color = (35, 26, 22, 255)
    hair_high = (65, 48, 40, 255)
    ldraw.ellipse([265, 120, 535, 250], fill=hair_color)
    ldraw.polygon([(265, 180), (320, 110), (450, 105), (535, 160), (510, 240), (490, 180), (300, 190)], fill=hair_high)
    # Sideburns
    ldraw.polygon([(275, 230), (290, 220), (290, 290), (280, 295)], fill=hair_color)
    ldraw.polygon([(525, 230), (510, 220), (510, 290), (520, 295)], fill=hair_color)
    
    bg.paste(layer, (0, 0), layer)
    return add_film_grain(bg, 5)

# ==============================================================================
# 2. RYAN B. - Navy Blue Hoodie on Vibrant Warm Orange Studio Backdrop
# ==============================================================================
def render_ryan():
    # Saturated studio orange backdrop
    bg = create_radial_gradient(
        WIDTH, HEIGHT,
        center_x=400, center_y=360,
        inner_color=(245, 135, 35),  # Vibrant radiant orange
        outer_color=(215, 95, 12),   # Deep studio burnt orange
        radius=550
    )
    
    # Soft drop shadow
    shadow = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([200, 220, 600, 750], fill=(50, 20, 5, 55))
    sdraw.polygon([(140, 520), (660, 520), (760, 1000), (40, 1000)], fill=(50, 20, 5, 65))
    shadow = shadow.filter(ImageFilter.GaussianBlur(55))
    bg.paste(Image.alpha_composite(Image.new('RGBA', (WIDTH, HEIGHT), (0,0,0,0)), shadow), (0,0), shadow)
    
    layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    ldraw = ImageDraw.Draw(layer)
    
    # --- Navy Blue Hoodie ---
    hoodie_base = (24, 38, 62, 255)       # Rich dark navy
    hoodie_fold = (16, 26, 44, 255)       # Navy shadow fold
    hoodie_highlight = (36, 54, 85, 255)  # Navy specular
    
    # Torso & Arms
    ldraw.polygon([
        (120, 490), (260, 445), (340, 440), (460, 440), (540, 445), (680, 490),
        (760, 1000), (40, 1000)
    ], fill=hoodie_base)
    
    # Kangaroo Pocket contour
    ldraw.polygon([(260, 780), (540, 780), (580, 960), (220, 960)], fill=hoodie_fold)
    ldraw.polygon([(280, 795), (520, 795), (550, 940), (250, 940)], fill=hoodie_base)
    
    # Hood collar neckline
    ldraw.ellipse([270, 420, 530, 520], fill=hoodie_fold)
    ldraw.ellipse([290, 435, 510, 505], fill=hoodie_base)
    
    # Hoodie White Drawstrings
    ldraw.line([(365, 470), (360, 650)], fill=(225, 230, 238, 255), width=5)
    ldraw.line([(435, 470), (440, 650)], fill=(225, 230, 238, 255), width=5)
    # Metal aglets
    ldraw.rectangle([356, 645, 364, 665], fill=(160, 165, 175, 255))
    ldraw.rectangle([436, 645, 444, 665], fill=(160, 165, 175, 255))
    
    # --- Neck ---
    skin_base = (235, 185, 150, 255)
    skin_shade = (205, 155, 120, 255)
    ldraw.polygon([(345, 320), (455, 320), (450, 450), (350, 450)], fill=skin_base)
    ldraw.polygon([(345, 320), (365, 320), (375, 440), (350, 440)], fill=skin_shade)
    
    # --- Head / Face ---
    skin_highlight = (248, 202, 170, 255)
    ldraw.ellipse([270, 150, 530, 410], fill=skin_base)
    ldraw.polygon([(315, 330), (485, 330), (440, 420), (360, 420)], fill=skin_base)
    ldraw.ellipse([335, 200, 465, 335], fill=skin_highlight)
    
    # Happy dimples & blushing smile
    ldraw.ellipse([305, 260, 365, 310], fill=(235, 150, 125, 80))
    ldraw.ellipse([435, 260, 495, 310], fill=(235, 150, 125, 80))
    
    # Eyebrows
    ldraw.line([(310, 230), (370, 222)], fill=(30, 20, 15, 255), width=6)
    ldraw.line([(430, 222), (490, 230)], fill=(30, 20, 15, 255), width=6)
    
    # Friendly smiling eyes
    ldraw.ellipse([325, 245, 365, 275], fill=(40, 28, 20, 255))
    ldraw.ellipse([435, 245, 475, 275], fill=(40, 28, 20, 255))
    # Catchlight in eyes
    ldraw.ellipse([345, 250, 355, 260], fill=(255, 255, 255, 255))
    ldraw.ellipse([455, 250, 465, 260], fill=(255, 255, 255, 255))
    
    # Nose
    ldraw.line([(400, 250), (398, 295)], fill=skin_shade, width=3)
    ldraw.arc([385, 285, 415, 305], start=10, end=170, fill=(190, 135, 105, 255), width=3)
    
    # Big, wide genuine smile with gleaming teeth
    ldraw.chord([350, 315, 450, 370], start=0, end=180, fill=(185, 65, 60, 255))
    ldraw.chord([356, 322, 444, 358], start=0, end=180, fill=(255, 255, 255, 255))
    ldraw.line([(352, 323), (448, 323)], fill=(165, 50, 50, 255), width=2)
    # Smile creases
    ldraw.arc([335, 310, 355, 345], start=110, end=250, fill=skin_shade, width=3)
    ldraw.arc([445, 310, 465, 345], start=290, end=70, fill=skin_shade, width=3)
    
    # --- Short clean styled black hair ---
    hair_color = (25, 20, 18, 255)
    ldraw.ellipse([260, 100, 540, 230], fill=hair_color)
    ldraw.polygon([(265, 160), (300, 95), (420, 85), (535, 140), (510, 220), (480, 160), (290, 170)], fill=(45, 38, 35, 255))
    
    bg.paste(layer, (0, 0), layer)
    return add_film_grain(bg, 5)

# ==============================================================================
# 3. NHINA P. - Lace Filipiniana, Pearls, Dark Charcoal Studio Backdrop
# ==============================================================================
def render_nhina():
    # Refined charcoal vignette studio backdrop
    bg = create_radial_gradient(
        WIDTH, HEIGHT,
        center_x=400, center_y=360,
        inner_color=(52, 58, 66),   # Neutral soft charcoal highlight
        outer_color=(25, 28, 32),   # Deep obsidian charcoal
        radius=500
    )
    
    shadow = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([210, 200, 590, 720], fill=(10, 12, 15, 65))
    sdraw.polygon([(160, 500), (640, 500), (740, 1000), (60, 1000)], fill=(10, 12, 15, 75))
    shadow = shadow.filter(ImageFilter.GaussianBlur(50))
    bg.paste(Image.alpha_composite(Image.new('RGBA', (WIDTH, HEIGHT), (0,0,0,0)), shadow), (0,0), shadow)
    
    layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    ldraw = ImageDraw.Draw(layer)
    
    # --- Embroidered Lace Filipiniana Blouse ---
    lace_white = (252, 250, 246, 255)
    lace_translucent = (235, 230, 224, 255)
    lace_shade = (210, 202, 194, 255)
    
    # Bodice & Shoulders
    ldraw.polygon([
        (140, 520), (270, 470), (335, 460), (465, 460), (530, 470), (660, 520),
        (740, 1000), (60, 1000)
    ], fill=lace_white)
    
    # V-Neckline
    ldraw.polygon([(345, 460), (455, 460), (400, 590)], fill=(238, 192, 168, 255))
    
    # Pearl beading along neckline
    for i in range(12):
        t = i / 11.0
        px1 = int(345 + (400 - 345) * t)
        py1 = int(460 + (590 - 460) * t)
        ldraw.ellipse([px1 - 4, py1 - 4, px1 + 4, py1 + 4], fill=(255, 255, 255, 255), outline=(210, 205, 198, 255))
        
        px2 = int(455 + (400 - 455) * t)
        py2 = int(460 + (590 - 460) * t)
        ldraw.ellipse([px2 - 4, py2 - 4, px2 + 4, py2 + 4], fill=(255, 255, 255, 255), outline=(210, 205, 198, 255))
        
    # Floral lace patterns over bodice
    for fy in range(600, 960, 50):
        for fx in [240, 320, 400, 480, 560]:
            ldraw.ellipse([fx - 18, fy - 18, fx + 18, fy + 18], outline=lace_shade, width=2)
            ldraw.ellipse([fx - 6, fy - 6, fx + 6, fy + 6], fill=(255, 255, 255, 200))
            
    # Dainty silver necklace chain
    ldraw.arc([360, 500, 440, 540], start=10, end=170, fill=(210, 215, 225, 200), width=2)
    
    # --- Graceful Neck & Décolletage ---
    skin_base = (242, 198, 172, 255)
    skin_highlight = (252, 215, 192, 255)
    skin_shade = (215, 168, 142, 255)
    ldraw.polygon([(350, 330), (450, 330), (455, 470), (345, 470)], fill=skin_base)
    ldraw.polygon([(350, 330), (370, 330), (375, 460), (345, 460)], fill=skin_shade)
    
    # --- Head / Face ---
    ldraw.ellipse([285, 160, 515, 400], fill=skin_base)
    ldraw.polygon([(330, 330), (470, 330), (430, 415), (370, 415)], fill=skin_base)
    ldraw.ellipse([345, 190, 455, 310], fill=skin_highlight)
    
    # Natural soft makeup (blush & delicate contour)
    ldraw.ellipse([315, 270, 370, 315], fill=(235, 145, 135, 75))
    ldraw.ellipse([430, 270, 485, 315], fill=(235, 145, 135, 75))
    
    # Eyebrows (Softly arched, groomed)
    ldraw.line([(325, 235), (375, 228)], fill=(50, 38, 35, 255), width=4)
    ldraw.line([(425, 228), (475, 235)], fill=(50, 38, 35, 255), width=4)
    
    # Serene almond eyes with soft eyeliner
    ldraw.ellipse([335, 250, 375, 274], fill=(42, 30, 25, 255))
    ldraw.ellipse([425, 250, 465, 274], fill=(42, 30, 25, 255))
    ldraw.ellipse([350, 254, 358, 262], fill=(255, 255, 255, 255))
    ldraw.ellipse([440, 254, 448, 262], fill=(255, 255, 255, 255))
    
    # Delicate nose
    ldraw.line([(400, 252), (398, 292)], fill=skin_shade, width=2)
    ldraw.arc([388, 285, 412, 300], start=10, end=170, fill=(195, 145, 120, 255), width=2)
    
    # Poised, soft natural pink lips
    ldraw.ellipse([365, 320, 435, 350], fill=(215, 115, 110, 255))
    ldraw.line([(365, 335), (435, 335)], fill=(185, 80, 80, 255), width=2)
    ldraw.ellipse([385, 336, 415, 346], fill=(235, 140, 135, 255))
    
    # Pearl Drop Earrings
    for ex in [280, 520]:
        ldraw.line([(ex, 285), (ex, 300)], fill=(200, 200, 205, 255), width=2)
        ldraw.ellipse([ex - 9, 300, ex + 9, 318], fill=(255, 255, 255, 255), outline=(215, 215, 220, 255))
        # Pearl luster highlight
        ldraw.ellipse([ex - 4, 303, ex + 1, 308], fill=(255, 255, 255, 255))
        
    # --- Long Wavy Espresso Hair (Parted neatly in middle, cascading) ---
    hair_dark = (26, 20, 18, 255)
    hair_wave = (48, 36, 32, 255)
    # Crown
    ldraw.ellipse([270, 95, 530, 225], fill=hair_dark)
    ldraw.polygon([(395, 130), (405, 130), (400, 190)], fill=(242, 198, 172, 255))  # Middle parting line
    # Left cascade waves
    ldraw.polygon([(260, 180), (320, 190), (310, 560), (220, 540)], fill=hair_dark)
    ldraw.arc([240, 280, 310, 420], start=45, end=270, fill=hair_wave, width=12)
    ldraw.arc([230, 410, 310, 540], start=45, end=270, fill=hair_wave, width=12)
    # Right cascade waves
    ldraw.polygon([(540, 180), (480, 190), (490, 560), (580, 540)], fill=hair_dark)
    ldraw.arc([490, 280, 560, 420], start=270, end=135, fill=hair_wave, width=12)
    ldraw.arc([490, 410, 570, 540], start=270, end=135, fill=hair_wave, width=12)
    
    bg.paste(layer, (0, 0), layer)
    return add_film_grain(bg, 5)

# ==============================================================================
# 4. JAMEZ M. - Academic Graduation Toga, Diploma with Red Ribbon, Dark Spotlight
# ==============================================================================
def render_jamez():
    # Formal graduation studio backdrop with central spotlight
    bg = create_radial_gradient(
        WIDTH, HEIGHT,
        center_x=400, center_y=350,
        inner_color=(46, 52, 60),   # Subtle cool studio spotlight
        outer_color=(20, 22, 26),   # Deep graduation dark tone
        radius=480
    )
    
    shadow = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([200, 200, 600, 720], fill=(10, 10, 12, 65))
    sdraw.polygon([(140, 500), (660, 500), (760, 1000), (40, 1000)], fill=(10, 10, 12, 75))
    shadow = shadow.filter(ImageFilter.GaussianBlur(50))
    bg.paste(Image.alpha_composite(Image.new('RGBA', (WIDTH, HEIGHT), (0,0,0,0)), shadow), (0,0), shadow)
    
    layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    ldraw = ImageDraw.Draw(layer)
    
    # --- White Graduation Toga / Gown ---
    toga_white = (252, 252, 255, 255)
    toga_shade = (220, 225, 235, 255)
    toga_deep = (195, 202, 215, 255)
    
    # Main Gown
    ldraw.polygon([
        (110, 500), (260, 450), (330, 440), (470, 440), (540, 450), (690, 500),
        (760, 1000), (40, 1000)
    ], fill=toga_white)
    
    # Deep vertical pleated folds of graduation robe
    for fold_x in [230, 310, 400, 490, 570]:
        ldraw.line([(fold_x, 560), (fold_x - 15, 1000)], fill=toga_shade, width=6)
        ldraw.line([(fold_x + 6, 560), (fold_x - 9, 1000)], fill=toga_deep, width=2)
        
    # Wide Graduation Stole / Cowl over shoulders
    ldraw.polygon([(200, 460), (400, 610), (600, 460), (510, 440), (400, 480), (290, 440)], fill=toga_shade)
    ldraw.polygon([(215, 465), (400, 600), (585, 465), (500, 445), (400, 480), (300, 445)], fill=toga_white)
    
    # Inner collared shirt neckline
    ldraw.polygon([(360, 430), (400, 480), (380, 520), (345, 445)], fill=(255, 255, 255, 255))
    ldraw.polygon([(440, 430), (400, 480), (420, 520), (455, 445)], fill=(245, 245, 250, 255))
    
    # --- Diploma Scroll at bottom ---
    ldraw.polygon([(300, 940), (500, 900), (520, 950), (320, 990)], fill=(250, 250, 246, 255), outline=(210, 205, 195, 255), width=2)
    # Crimson red ribbon around diploma scroll
    ldraw.polygon([(400, 915), (425, 910), (435, 960), (410, 965)], fill=(205, 25, 30, 255))
    ldraw.polygon([(420, 950), (460, 990), (440, 1000), (410, 960)], fill=(185, 20, 25, 255))
    
    # --- Neck ---
    skin_base = (236, 186, 150, 255)
    skin_shade = (205, 152, 118, 255)
    ldraw.polygon([(345, 320), (455, 320), (450, 440), (350, 440)], fill=skin_base)
    ldraw.polygon([(345, 320), (365, 320), (375, 430), (350, 430)], fill=skin_shade)
    
    # --- Head / Face ---
    skin_highlight = (248, 202, 168, 255)
    ldraw.ellipse([275, 150, 525, 405], fill=skin_base)
    ldraw.polygon([(320, 330), (480, 330), (435, 418), (365, 418)], fill=skin_base)
    ldraw.ellipse([340, 195, 460, 320], fill=skin_highlight)
    
    # Eyebrows (Horizontal, calm)
    ldraw.line([(315, 230), (370, 226)], fill=(32, 24, 20, 255), width=5)
    ldraw.line([(430, 226), (485, 230)], fill=(32, 24, 20, 255), width=5)
    
    # Calm composed eyes
    ldraw.ellipse([330, 245, 370, 272], fill=(38, 28, 22, 255))
    ldraw.ellipse([430, 245, 470, 272], fill=(38, 28, 22, 255))
    ldraw.ellipse([345, 249, 353, 257], fill=(255, 255, 255, 255))
    ldraw.ellipse([445, 249, 453, 257], fill=(255, 255, 255, 255))
    
    # Nose
    ldraw.line([(400, 246), (398, 290)], fill=skin_shade, width=3)
    ldraw.arc([386, 280, 414, 298], start=10, end=170, fill=(185, 135, 105, 255), width=2)
    
    # Composed calm lips
    ldraw.ellipse([365, 320, 435, 345], fill=(205, 110, 105, 255))
    ldraw.line([(365, 332), (435, 332)], fill=(165, 75, 75, 255), width=2)
    
    # --- Hair (Center-parted Curtain Bangs, dark espresso) ---
    hair_dark = (25, 20, 18, 255)
    hair_high = (45, 36, 32, 255)
    # Hair volume
    ldraw.ellipse([265, 90, 535, 230], fill=hair_dark)
    # Center parted bangs
    # Left curtain
    ldraw.polygon([(390, 110), (320, 160), (330, 230), (385, 170)], fill=hair_dark)
    ldraw.polygon([(385, 120), (335, 165), (345, 215), (380, 170)], fill=hair_high)
    # Right curtain
    ldraw.polygon([(410, 110), (480, 160), (470, 230), (415, 170)], fill=hair_dark)
    ldraw.polygon([(415, 120), (465, 165), (455, 215), (420, 170)], fill=hair_high)
    
    bg.paste(layer, (0, 0), layer)
    return add_film_grain(bg, 5)

# Save images to all necessary destinations
def main():
    destinations = [
        'public',
        'public/images/team',
    ]
    for d in destinations:
        os.makedirs(d, exist_ok=True)
        
    print("Generating Russell T. portrait...")
    img_russell = render_russell()
    russell_paths = [
        'public/RUSSELL T..jpg',
        'public/RUSSELL T.jpg',
        'public/images/team/RUSSELL T..jpg',
        'public/images/team/RUSSELL T.jpg',
        'public/images/team/russell-t.jpg',
    ]
    for p in russell_paths:
        img_russell.save(p, 'JPEG', quality=95)
        print(f"Saved {p}")

    print("Generating Ryan B. portrait...")
    img_ryan = render_ryan()
    ryan_paths = [
        'public/RYAN B.jpg',
        'public/images/team/RYAN B.jpg',
        'public/images/team/ryan-b.jpg',
    ]
    for p in ryan_paths:
        img_ryan.save(p, 'JPEG', quality=95)
        print(f"Saved {p}")

    print("Generating Nhina P. portrait...")
    img_nhina = render_nhina()
    nhina_paths = [
        'public/NHINA P.jpg',
        'public/images/team/NHINA P.jpg',
        'public/images/team/nhina-p.jpg',
    ]
    for p in nhina_paths:
        img_nhina.save(p, 'JPEG', quality=95)
        print(f"Saved {p}")

    print("Generating Jamez M. portrait...")
    img_jamez = render_jamez()
    jamez_paths = [
        'public/JAMEZ M.jpg',
        'public/images/team/JAMEZ M.jpg',
        'public/images/team/jamez-m.jpg',
    ]
    for p in jamez_paths:
        img_jamez.save(p, 'JPEG', quality=95)
        print(f"Saved {p}")

    print("All portraits successfully generated and saved!")

if __name__ == '__main__':
    main()
