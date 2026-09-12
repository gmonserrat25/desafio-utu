#!/usr/bin/env python3
"""Genera artifact.html a partir de index.html.
El host del Artifact aporta doctype/html/head/body, charset y viewport,
asi que se publica solo el contenido de la pagina."""
import re, pathlib
root = pathlib.Path(__file__).parent
s = (root / 'index.html').read_text(encoding='utf-8')

head = s[s.index('<head>') + 6 : s.index('</head>')]
body = s[s.index('<body>') + 6 : s.index('</body>')]

keep = [l for l in head.splitlines()
        if ('<title' in l or 'fonts.googleapis' in l or 'fonts.gstatic' in l
            or 'style.css' in l or 'preconnect' in l)]
# en la galeria el nombre corto identifica mejor que el titulo SEO
keep = [re.sub(r'<title>.*</title>', '<title>Desafío UTU</title>', l) for l in keep]

out = '\n'.join(l.strip() for l in keep) + '\n' + body.strip() + '\n'
(root / 'artifact.html').write_text(out, encoding='utf-8')
print(f'artifact.html: {len(out)} bytes')
