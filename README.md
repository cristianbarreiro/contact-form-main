# 📧 Contact Form - Frontend Mentor Challenge

## 📸 Vista previa del proyecto

![Vista previa del formulario de contacto](./design/desktop-preview.jpg)

*Espacio reservado para screenshot del proyecto finalizado*

---

## 🌟 Descripción del proyecto

Este es un formulario de contacto interactivo desarrollado como parte del challenge de [Frontend Mentor](https://www.frontendmentor.io). El proyecto implementa un formulario completamente funcional con validación en tiempo real y feedback visual para el usuario.

## ✨ Características implementadas

### 🎯 Funcionalidades principales
- ✅ **Validación completa del formulario** con JavaScript vanilla
- ✅ **Mensaje de éxito** que aparece y se desvanece automáticamente
- ✅ **Validación en tiempo real** con feedback visual
- ✅ **Diseño responsivo** para móvil y desktop
- ✅ **Accesibilidad mejorada** con labels y mensajes de error claros

### 🎨 Validaciones implementadas
- **Campos requeridos**: First Name, Last Name, Email, Message
- **Validación de email**: Formato correcto con regex
- **Tipo de consulta**: Selección obligatoria de radio button
- **Consentimiento**: Checkbox obligatorio para envío
- **Feedback visual**: Bordes rojos para errores, verdes para campos válidos

### 🛠️ Mejoras técnicas
- **Desactivación de validación HTML nativa** con `novalidate`
- **JavaScript modular** con funciones separadas
- **CSS organizado** con variables personalizadas
- **Animaciones suaves** para el mensaje de éxito
- **Gestión de estados** con clases CSS dinámicas

## 🚀 Tecnologías utilizadas

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con variables CSS y animaciones
- **JavaScript ES6** - Lógica de validación y manipulación del DOM
- **Responsive Design** - Adaptable a diferentes dispositivos

## 📱 Características responsive

- **Desktop**: Layout de dos columnas para nombre y apellido
- **Mobile** (< 380px): Stack vertical de todos los elementos
- **Mensaje de éxito**: Ajuste automático de tamaño y posición

## 🎯 Validaciones detalladas

### Campos de texto
```javascript
// Validación de campos requeridos con feedback visual
if (firstName === '') {
    // Mostrar error y borde rojo
} else {
    // Ocultar error y borde verde
}
```

### Email
```javascript
// Validación con expresión regular
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailPattern.test(email);
```

### Estados visuales
- 🔴 **Error**: Borde rojo + mensaje de error visible
- 🟢 **Válido**: Borde verde + mensaje de error oculto
- ⚪ **Neutral**: Borde gris por defecto

## 🎨 Paleta de colores

```css
:root {
  --light-green: hsl(148, 38%, 91%);
  --green: hsl(169, 82%, 27%);
  --red: hsl(0, 66%, 54%);
  --white: hsl(0, 0%, 100%);
  --medium-grey: hsl(186, 15%, 59%);
  --dark-grey: hsl(187, 24%, 22%);
}
```

## 📁 Estructura del proyecto

```
contact-form-main/
├── index.html              # Estructura principal
├── styles/
│   └── styles.css          # Estilos y responsive design
├── js/
│   └── main.js            # Lógica de validación
├── assets/
│   ├── images/            # Iconos y favicon
│   └── fonts/             # Fuente Karla
└── design/                # Diseños de referencia
```

## 🔧 Instalación y uso

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/contact-form-main.git
   ```

2. **Abre el proyecto**
   ```bash
   cd contact-form-main
   ```

3. **Ejecuta el proyecto**
   - Abre `index.html` en tu navegador
   - O usa un servidor local como Live Server

## 💡 Aprendizajes clave

### JavaScript
- Manipulación avanzada del DOM
- Validación de formularios sin librerías
- Gestión de eventos y estados
- Expresiones regulares para validación

### CSS
- Variables CSS para mantenimiento
- Animaciones y transiciones suaves
- Diseño responsive con media queries
- Pseudo-selectores avanzados

### Buenas prácticas
- Separación de responsabilidades
- Código limpio y comentado
- Accesibilidad web
- Validación tanto en frontend como UX

## 🌐 Demo en vivo

[Ver proyecto en vivo](tu-url-de-deployment)

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Frontend Mentor: [@tu-usuario](https://www.frontendmentor.io/profile/tu-usuario)

## 🙏 Agradecimientos

- [Frontend Mentor](https://www.frontendmentor.io) por el challenge
- Comunidad de desarrolladores por el feedback

---

⭐ **¡Si te gustó el proyecto, no olvides darle una estrella!** ⭐
