# 💕 Proyecto San Valentín para Jhumira

Una experiencia web interactiva romántica y elegante creada con amor.

## 🌟 Características

- **Sistema de Login/Registro**: Cuenta personal con autenticación
- **Dashboard Interactivo**: Estadísticas de amor con animaciones
- **Contador de Días**: Días desde que empezaron (1 de Diciembre, 2024)
- **Línea del Tiempo Extendida**: 11 momentos especiales de su historia
- **Mini Juegos Interactivos**: 6 juegos divertidos y románticos
- **Calendario de Sorpresas**: Mensajes especiales para cada día de febrero
- **Buzón de Amor**: Mensajes románticos que puedes actualizar
- **Galería de Fotos**: Imágenes que se desbloquean por fechas
- **Pregunta Especial**: Botón "Hazme click" con la pregunta de San Valentín
- **Diseño Responsive**: Funciona perfecto en móviles y desktop

## 🎮 Mini Juegos Incluidos

1. **Quiz del Amor** 🧠: 6 preguntas personalizadas sobre su relación
2. **Memoria del Amor** 🃏: Juego clásico de memoria con emojis románticos
3. **Calculadora del Amor** 💖: Siempre da resultados altos (96-100%) porque están hechos el uno para el otro
4. **Galleta de la Fortuna** 🥠: Mensajes motivadores y románticos aleatorios
5. **Tres en Línea del Amor** ⭕: Juega contra la computadora
6. **Atrapa Corazones** 💕: Juego de reflejos de 30 segundos

## 🚀 Cómo subir a GitHub Pages

### Paso 1: Crear repositorio en GitHub
1. Ve a [GitHub](https://github.com) e inicia sesión
2. Click en el botón "+" arriba a la derecha → "New repository"
3. Nombre del repositorio: `para-jhumira` (o el que prefieras)
4. Marca como **Public**
5. Click en "Create repository"

### Paso 2: Subir los archivos
**Opción A: Usando GitHub Web (más fácil)**
1. En tu nuevo repositorio, click en "uploading an existing file"
2. Arrastra los 4 archivos:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `games.js`
3. Escribe un mensaje: "Initial commit"
4. Click en "Commit changes"

**Opción B: Usando Git (línea de comandos)**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/para-jhumira.git
git push -u origin main
```

### Paso 3: Activar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Click en "Settings" (arriba)
3. En el menú izquierdo, click en "Pages"
4. En "Source", selecciona "main" branch
5. Click en "Save"
6. ¡Espera 1-2 minutos!
7. Tu sitio estará en: `https://TU-USUARIO.github.io/para-jhumira/`

## 🎁 Cómo personalizar el contenido

### Actualizar mensajes del buzón
Edita el archivo `script.js` en la sección `loadMailbox()`:
```javascript
const messages = [
    {
        date: 'FECHA',
        subject: 'TU ASUNTO',
        content: 'TU MENSAJE',
        unread: true
    }
    // Agrega más mensajes aquí
];
```

### Cambiar mensajes del calendario
En `script.js`, busca la función `showDaySurprise(day, special)` y modifica el objeto `messages`.

### Agregar fotos a la galería
1. Sube tus fotos al repositorio (carpeta `images/`)
2. En `script.js`, función `initializeGallery()`, cambia los placeholders por:
```javascript
item.innerHTML = `
    <img src="images/tu-foto.jpg" class="gallery-image" alt="${photo.title}">
    <div class="gallery-overlay">
        <h4>${photo.title}</h4>
        <p>${photo.description}</p>
    </div>
`;
```

## 📱 Compartir con Jhumira

Una vez publicado en GitHub Pages:

1. **Copia el link**: `https://TU-USUARIO.github.io/para-jhumira/`
2. **Envíalo por WhatsApp** con un mensaje como:
   > "Hice algo especial para ti 💕 Abre este link: [tu-link]"
3. Ella podrá:
   - Registrarse con su usuario
   - Explorar todo el contenido
   - Visitar cada día para nuevas sorpresas

## 🔄 Actualizar el contenido

Cada vez que quieras agregar o cambiar algo:

1. Edita los archivos en GitHub (click en el archivo → Edit)
2. O sube nuevos archivos
3. Guarda los cambios (Commit)
4. **¡El sitio se actualiza automáticamente!** (1-2 minutos)

Jhumira verá los cambios la próxima vez que entre.

## 💡 Tips

- **Fechas especiales**: El 14 de febrero (San Valentín) y 20 de febrero (su cumpleaños) tienen contenido especial
- **Calendario**: Solo se desbloquean los días que ya pasaron
- **Galería**: Las fotos se desbloquean en fechas específicas
- **Privacidad**: Los datos del login se guardan localmente en el navegador de ella

## 🎨 Características de Diseño

- Colores románticos elegantes (rosas, rojos, dorados)
- Animaciones suaves y profesionales
- Corazones flotando en el fondo
- Gráficos interactivos con Chart.js
- 6 mini juegos completamente funcionales
- Línea de tiempo con 11 momentos especiales
- Diseño responsive para móviles
- Tipografías elegantes (Cormorant Garamond + Montserrat)

## 📊 Estadísticas incluidas

- 18 salidas juntos
- 247 besos robados
- 999 sonrisas provocadas
- 156 mensajes de amor
- 89 abrazos eternos
- Contador en vivo de días desde el 1 de diciembre

## ❤️ ¡Disfruta!

Este proyecto fue creado con mucho amor y cuidado. Espero que Jhumira lo ame tanto como tú la amas a ella.

---

**Nota**: Todos los datos se guardan localmente en el navegador. No hay servidor ni base de datos externa.
