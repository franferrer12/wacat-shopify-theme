# WACAT Shopify Theme 🐱💧

Tema nativo de Shopify para WACAT con todas las animaciones Anime.js migradas desde Astro + React.

## 📁 Estructura del Tema

```
wacat-shopify-theme/
├── assets/
│   ├── theme.css          # CSS completo con todas las utilidades Tailwind
│   └── theme.js           # Todas las animaciones Anime.js (500+ líneas)
├── config/
│   └── settings_schema.json  # Configuración del tema
├── layout/
│   └── theme.liquid       # Layout principal con CDN de Anime.js y Swiper
├── sections/
│   ├── header.liquid      # Header con navegación
│   ├── footer.liquid      # Footer con enlaces
│   ├── hero.liquid        # Sección hero con animaciones espectaculares
│   ├── product-featured.liquid  # Producto destacado
│   ├── statistics.liquid  # Estadísticas con contadores animados
│   ├── benefits.liquid    # Beneficios con bloques customizables
│   ├── how-it-works.liquid  # 3 pasos animados
│   ├── health.liquid      # Salud con puntos positivos/negativos
│   ├── testimonials.liquid  # Testimonios con Swiper carousel
│   ├── faq.liquid         # FAQ con acordeón
│   ├── where-to-buy.liquid  # Dónde comprar
│   └── cta-final.liquid   # CTA final con testimonial
├── snippets/
│   ├── meta-tags.liquid
│   └── social-meta-tags.liquid
├── templates/
│   └── index.liquid       # Template homepage que incluye todas las sections
└── README.md
```

## ✨ Características

### Animaciones Implementadas (Anime.js)

1. **Hero Section** (17 animaciones):
   - Badge inicial con entrada explosiva
   - Latido continuo del icono corazón
   - Título letra por letra con rotación 3D
   - Subtítulo con blur fade-in
   - Imagen con entrada dramática + Ken Burns effect
   - 2 badges flotantes con animación de rebote
   - 3 checkpoints con efecto de caída
   - CTA con pulso + shimmer effect periódico
   - Huellas decorativas con animación loop
   - Hover en título (letras se elevan)
   - Mouse tracking 3D parallax en imagen
   - **Parallax scroll super dramático** (3x velocidad)

2. **Statistics Section**:
   - Contadores animados con números incrementales
   - Números de pasos con fade-in
   - Triggered by Intersection Observer

3. **General**:
   - Intersection Observer para todas las secciones
   - Scroll suave para anchor links
   - Header con backdrop blur en scroll
   - Buy button con animación de pulso

4. **Swiper Testimonials**:
   - Carousel con fade effect
   - Autoplay configurado
   - Paginación personalizada

### CSS Completo

- **900+ líneas** de CSS puro
- Todas las utilidades de Tailwind CSS usadas en el tema
- Variables CSS para colores WACAT
- Responsive design (sm, md, lg breakpoints)
- Backdrop blur effects
- Gradientes y opacity variants
- Hover states y transitions
- Swiper customization

## 🚀 Despliegue a Shopify

### Opción 1: Shopify CLI (Recomendado)

1. **Instalar Shopify CLI**:
```bash
npm install -g @shopify/cli @shopify/theme
```

2. **Login a tu tienda**:
```bash
shopify login --store wacat-store.myshopify.com
```

3. **Navegar al directorio del tema**:
```bash
cd /Users/franferrer/wacat-shopify-theme
```

4. **Subir el tema a Shopify**:
```bash
shopify theme push
```

O para preview primero:
```bash
shopify theme dev
```

### Opción 2: Manual (ZIP)

1. **Crear ZIP del tema**:
```bash
cd /Users/franferrer/wacat-shopify-theme
zip -r wacat-theme.zip . -x "*.DS_Store" -x "README.md"
```

2. **Subir a Shopify**:
   - Ve a: Admin → Online Store → Themes
   - Click en "Add theme" → "Upload ZIP file"
   - Selecciona `wacat-theme.zip`
   - Click en "Publish" cuando esté listo

### Opción 3: GitHub (Profesional)

1. **Crear repositorio**:
```bash
cd /Users/franferrer/wacat-shopify-theme
git init
git add .
git commit -m "Initial commit: WACAT Shopify Theme with Anime.js animations"
git branch -M main
git remote add origin https://github.com/tuusuario/wacat-shopify-theme.git
git push -u origin main
```

2. **Conectar en Shopify**:
   - Admin → Online Store → Themes → Add theme
   - Selecciona "Connect from GitHub"

## ⚙️ Configuración Post-Instalación

### 1. Configurar Producto

En cada sección que lo requiere (hero, product-featured, benefits, cta-final):
- Ve a Theme Customizer
- Selecciona el producto WACAT desde el dropdown
- El tema usará automáticamente la imagen, precio y variant ID

### 2. Personalizar Contenido

Todas las secciones son completamente customizables desde el Theme Customizer:
- Textos y títulos
- Imágenes
- Colores (si necesario)
- Beneficios (blocks customizables)
- Testimonios (blocks customizables)
- FAQ items (blocks customizables)

### 3. Configurar Benefits Section

En el Customizer:
1. Agrega 6 bloques de tipo "Benefit"
2. Configura cada uno:
   - Icon: `la-leaf`, `la-shield-alt`, `la-user-md`, `la-cat`, `la-smile-wink`, `la-calendar-check`
   - Title y Description
   - Footer icon y text

### 4. Configurar Testimonials

1. Agrega bloques de tipo "Testimonial"
2. Para cada uno:
   - Quote
   - Author name
   - Cat name y age
   - Rating (1-5 estrellas)

### 5. Configurar FAQ

1. Agrega bloques de tipo "FAQ Item"
2. Para cada uno:
   - Question
   - Answer

## 🎨 Librerías Externas (CDN)

El tema usa estas librerías vía CDN (ya incluidas en layout/theme.liquid):

- **Anime.js 3.2.2**: Todas las animaciones
- **Swiper 11**: Carousel de testimonios
- **Line Awesome**: Iconos
- **DM Sans Font**: Tipografía oficial WACAT

## 📱 Responsive Design

El tema es completamente responsive:
- Mobile first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg)
- Navigation adapta a móvil
- Grid layouts se ajustan automáticamente

## 🔧 Archivos Clave

### `assets/theme.js` (500+ líneas)
Contiene TODAS las animaciones:
- 17 animaciones del hero
- Counters animados
- Intersection Observers
- Swiper initialization
- Parallax scroll handler
- Buy button animations

### `sections/hero.liquid` (~190 líneas)
La sección más compleja:
- Schema con 15+ settings
- Estructura HTML completa
- Clases para todas las animaciones
- Product integration con Liquid

### `assets/theme.css` (900+ líneas)
CSS compilado con:
- Todas las utilidades Tailwind
- Custom components
- Responsive variants
- Animations classes

## 🐛 Troubleshooting

### Las animaciones no funcionan
- Verifica que Anime.js se cargue correctamente (check console)
- Asegúrate que theme.js está cargado con `defer`
- Comprueba que no hay errores de JavaScript en consola

### Swiper no funciona
- Verifica que Swiper CDN está cargado
- Asegúrate de tener testimonios agregados en el Customizer

### Estilos rotos
- Verifica que theme.css está cargado correctamente
- Comprueba la ruta del asset en layout/theme.liquid

## 📊 Métricas

- **Total archivos**: 19
- **Líneas de código**:
  - JavaScript: ~520 líneas
  - CSS: ~900 líneas
  - Liquid: ~2500+ líneas
- **Animaciones**: 25+ animaciones diferentes
- **Secciones**: 13 secciones customizables

## 🎯 Próximos Pasos

1. ✅ Subir tema a Shopify
2. ✅ Configurar producto en todas las secciones
3. ✅ Personalizar textos e imágenes
4. ✅ Agregar beneficios, testimonios y FAQs
5. ✅ Probar en móvil
6. ✅ Publicar tema

## 🔗 Links Útiles

- [Shopify CLI Docs](https://shopify.dev/themes/tools/cli)
- [Shopify Theme Kit](https://shopify.dev/themes/tools/theme-kit)
- [Anime.js Docs](https://animejs.com/documentation/)
- [Swiper Docs](https://swiperjs.com/)
- [Line Awesome Icons](https://icons8.com/line-awesome)

---

**Desarrollado con 💙 para WACAT** 🐱💧
