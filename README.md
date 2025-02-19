# FintechApp-Multi-factor-Authentication
# Aplicación Web para Autenticación Segura

Este proyecto consiste en la implementación de un **Sistema de Autenticación Multi-Factor (MFA)** para aplicaciones Fintech, desarrollado con Django en el backend y React en el frontend. La solución tiene como objetivo reforzar la seguridad en el proceso de autenticación, protegiendo la información y los datos sensibles de los usuarios, siguiendo las mejores prácticas de la industria.

---

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Objetivos](#objetivos)
- [Características Principales](#características-principales)
- [Requerimientos Técnicos](#requerimientos-técnicos)
- [Arquitectura y Tecnologías Utilizadas](#arquitectura-y-tecnologías-utilizadas)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución y Pruebas](#ejecución-y-pruebas)
- [Despliegue en AWS](#despliegue-en-aws)
- [Documentación y Buenas Prácticas](#documentación-y-buenas-prácticas)
- [Contacto](#contacto)

---

## Descripción del Proyecto

En Creze, la seguridad de la información es una prioridad máxima. Este proyecto tiene como fin desarrollar un módulo de autenticación que se integre de forma transparente en una aplicación web existente. El sistema añade una capa adicional de seguridad mediante la implementación de **Time-Based One-Time Passwords (TOTP)** y códigos QR para la configuración de MFA a través de aplicaciones como Google Authenticator o Authy.  

La solución también contempla la integración de medidas de seguridad avanzadas para mitigar ataques comunes (CSRF, XSS, brute force) y garantizar una experiencia de usuario robusta y fluida.

---

## Objetivos

- **Seguridad Reforzada:** Desarrollar e integrar un sistema MFA que complemente la autenticación básica de Django.
- **Integración Transparente:** Asegurar que tanto el backend (Django) como el frontend (React) interactúen de forma coherente durante el proceso de autenticación.
- **Mejores Prácticas:** Implementar soluciones de seguridad de acuerdo a estándares de la industria y realizar pruebas exhaustivas (unitarias y de integración) para validar la robustez del sistema.
- **Despliegue en la Nube:** Configurar y desplegar la solución utilizando servicios gratuitos de AWS (Elastic Beanstalk/EC2, Amplify/S3, RDS) garantizando un entorno seguro y escalable.

---

## Características Principales

- **Autenticación Básica:**
  - Registro, inicio y cierre de sesión utilizando el sistema de autenticación incorporado en Django.
- **Autenticación Multi-Factor (MFA):**
  - Implementación de TOTP compatible con aplicaciones como Google Authenticator o Authy.
  - Generación y visualización de códigos QR en el frontend para facilitar la configuración del MFA.
  - Almacenamiento seguro de claves secretas asociadas a cada usuario.
- **Interfaz de Usuario:**
  - Componentes en React que gestionan el flujo de MFA con validaciones en tiempo real.
- **Seguridad Avanzada:**
  - Medidas contra ataques CSRF, XSS y brute force.
  - Uso de HTTPS para todas las comunicaciones (simulado en entorno local).
- **Testing y Validación:**
  - Pruebas unitarias y de integración que aseguran la funcionalidad y la robustez ante intentos de acceso no autorizado.
- **Documentación Completa:**
  - Guía detallada de configuración, uso y administración del sistema MFA, incluyendo cómo agregar o remover la funcionalidad para usuarios existentes.

---

## Requerimientos Técnicos

- **Backend:**
  - [Django](https://www.djangoproject.com/) (utilizando su sistema de autenticación incorporado)
- **Frontend:**
  - [React](https://reactjs.org/) (para una experiencia de usuario dinámica y validaciones en tiempo real)
- **Seguridad:**
  - Implementación de TOTP, HTTPS y medidas contra ataques web.
- **Testing:**
  - Frameworks de testing para Python y JavaScript (por ejemplo, pytest y Jest).
- **Despliegue:**
  - Servicios de AWS (Elastic Beanstalk/EC2, Amplify/S3, RDS, AWS Systems Manager Parameter Store o AWS Secrets Manager)

---

## Arquitectura y Tecnologías Utilizadas

- **Backend (Django):**
  - Gestión de usuarios, sesiones y autenticación básica.
  - Generación y verificación de códigos TOTP.
  - APIs REST para la comunicación con el frontend.
  
- **Frontend (React):**
  - Componentes para el manejo del flujo de autenticación y MFA.
  - Integración de librerías para la generación y visualización de códigos QR.
  
- **Infraestructura en la Nube:**
  - Despliegue en AWS aprovechando la capa gratuita para Elastic Beanstalk/EC2, Amplify/S3 y RDS.
  - Gestión segura de variables de entorno y secretos mediante AWS Systems Manager o AWS Secrets Manager.

---

## Instalación y Configuración

### Requisitos Previos

- **Python 3.8+**
- **Node.js y npm**
- **Git**

### Clonar el Repositorio

```bash
git clone https://github.com/MarbelousST/FintechApp-Multi-factor-Authentication/
cd FintechApp-Multi-factor-Authentication


Despliegue en AWS

La aplicación puede desplegarse utilizando los servicios gratuitos de AWS:

    Backend:
        AWS Elastic Beanstalk o AWS EC2 Free Tier (o Lambdas si se prefiere).
    Frontend:
        AWS Amplify o Amazon S3 para hosting estático.
    Base de Datos:
        AWS RDS (opcional, siempre que se mantenga dentro de la capa gratuita).

Se recomienda configurar las variables de entorno y secretos de forma segura utilizando AWS Systems Manager Parameter Store o AWS Secrets Manager.
Documentación y Buenas Prácticas

    Código Limpio y Documentado: Se ha mantenido una estructura clara, con comentarios y documentación en el código para facilitar el mantenimiento.
    Seguridad: Se han implementado medidas de seguridad para proteger datos sensibles, siguiendo los estándares de la industria.
    Testing: La aplicación cuenta con un conjunto completo de pruebas automatizadas para garantizar su correcto funcionamiento.
    Decisiones Tecnológicas: Se ha justificado el uso de Django, React y servicios de AWS por su robustez, escalabilidad y adecuación a las necesidades de seguridad en aplicaciones Fintech.

Contacto

Para cualquier duda o información adicional, por favor contacta a:

    Email: mario.abel.salvador@gmail.com