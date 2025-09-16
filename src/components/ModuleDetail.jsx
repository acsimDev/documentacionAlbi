import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ModuleDetail.css";
import ProgressCircle from "./ProgressCircle";
import { useProgress } from "../context/ProgressContext";
import { BackArrowIcon } from "./Icons";

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { getProgress, updateProgress } = useProgress();
  const [currentProgress, setCurrentProgress] = useState(getProgress(moduleId));

  // Función para manejar la descarga de archivos
  const handleFileDownload = async (url, filename) => {
    if (url.startsWith("http")) {
      // Para enlaces externos, abrir en nueva pestaña
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      try {
        // Para archivos locales, usar fetch para verificar y descargar
        const response = await fetch(url);
        if (response.ok) {
          const blob = await response.blob();
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = filename || url.split("/").pop();
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);
        } else {
          console.error("Error al cargar el archivo:", response.status);
          alert(
            "Error: No se pudo cargar el archivo. Verifica que el archivo existe."
          );
        }
      } catch (error) {
        console.error("Error al descargar el archivo:", error);
        alert("Error: No se pudo descargar el archivo.");
      }
    }
  };

  const handleProgressChange = (newProgress) => {
    setCurrentProgress(newProgress);
    updateProgress(moduleId, newProgress);
  };

  const progressOptions = [0, 25, 50, 75, 100];

  // Función para generar estructura estándar de módulos
  const createModuleStructure = (title, description, icon, summary, team) => ({
    title,
    description,
    icon,
    summary,
    team,
    sections: {
      documentos: [
        { title: "", description: "", link: "" },
        { title: "", description: "", link: "" },
      ],
      links: [
        { title: "", description: "", link: "" },
        { title: "", description: "", link: "" },
      ],
      planChecklist: [
        { title: "", description: "", link: "" },
        { title: "", description: "", link: "" },
      ],
    },
  });

  const modulesData = {
    //PLATAFORMA CIPE

    "hub-integraciones": {
      title: "0. Hub integraciones",
      description:
        "Central de integración entre todos los módulos del sistema.",
      icon: "",
      summary:
        "El Hub de integraciones es el componente central que orquesta todas las comunicaciones entre módulos, garantizando la interoperabilidad y eficiencia del sistema.",
      team: "Equipo de Arquitectura de Software - CIPE",
      sections: {
        documentos: [
          {
            title: "Documentación",
            description: "Uso del HUB",
            link: "Ver documentación",
            url: `${import.meta.env.BASE_URL}docs/Hub-Documentación.docx`,
          },
          {
            title: "Presentación HUB",
            description:
              "Presentación sobre el Hub, un componente central que orquesta llamadas a APIs externas, desarrollado para CIPE.",
            link: "Ver Presentación",
            url: `${import.meta.env.BASE_URL}docs/HUB-DE-INTEGRACIÓN-CIPE.pptx`,
          },
        ],
        links: [
          {
            title: "Wiki del Proyecto",
            description: "",
            link: "Ver wiki",
            url: "http://mi-kanban.acsimlab.cl:3000/",
          },
        ],
        planChecklist: [
          {
            title: "",
            description: "",
            link: "",
          },
        ],
      },
    },
    "call-center": {
      title: "1.1 Módulo Atenciones OI Call Center",
      description: "Gestión de atenciones a través del call center operativo.",
      icon: "",
      summary:
        "Sistema de atención telefónica que permite gestionar las llamadas de víctimas y usuarios, con integración completa al flujo de trabajo del Ministerio Público.",
      team: "",
      sections: {
        documentos: [
          {
            title: "Guía",
            description: "Guía de procedimientos",
            link: "Ver Guía",
            url: `https://docs.google.com/document/d/1V7hoDF9vD8c8If6jQdpjto6dYf1WaH6ylc7WjQvdRng/edit?tab=t.0#heading=h.tlowin5iljth`,
          },
        ],
        links: [{ title: "Sitio", description: "Acesso al sistema", link: "Ir al sitio", url: "https://apilab.acsimlab.cl/cipemp/login" }],
        planChecklist: [
          {
            title: "CheckList",
            description: "Checklist Call Center CIPE - Macro",
            link: "Ver Checklist",
            url: `https://docs.google.com/spreadsheets/d/17MtyKKsRLSnUzF4g2VFUGXT7jsvCJ4O3bdae-pDrJDM/edit?gid=1728570080#gid=1728570080`,
          },
        ],
      },
    },
    "atenciones-ministerio": {
      title: "1.2 Módulo Atenciones Ministerio",
      description: "Atenciones directas desde el Ministerio Público.",
      icon: "",
      summary:
        "Sistema de atención presencial que permite gestionar las consultas y trámites de víctimas directamente en las oficinas del Ministerio Público.",
      team: "Equipo de Atención Presencial - CIPE",
      sections: {
        documentos: [
          {
            title: "Atención Presencial",
            description: "Diseño de flujos operaciones",
            link: "Ver documento",
            url: "https://docs.google.com/document/d/1SkwyjV55pgW6Xa4mi8FtPDNQCMPQQXAbDMeavX2u4ps/edit?tab=t.0",
          },
        ],
        links: [
          
          { title: "Sitio", description: "Acesso al sistema", link: "Ir al sitio", url: "https://apilab.acsimlab.cl/cipemp/login" },
        ],
        planChecklist: [
          {
            title: "Checklist",
            description: "Checklist atención presencial v1",
            link: "Ver checklist",
            url: "https://docs.google.com/spreadsheets/d/1yCaekk0-JwyIXJgge1e3TAi6zmM7EwSN16EWUcVSqCw/edit?gid=1683480089#gid=1683480089",
          },

          {
            title: "Checklist Macro",
            description: "CheckList Atención Presencial CIPE - Macro",
            link: "Ver checklist",
            url: "https://docs.google.com/spreadsheets/d/1jmVMXNmpD_c8HAhS_c2C5IpEbtvDZKJDt9fDLY_OCt4/edit?gid=1617004299#gid=1617004299",
          },
        ],
      },
    },
    whatsapp: {
      title: "1.3 Módulo Atención WhatsApp",
      description: "Atención a través de WhatsApp Business.",
      icon: "",
      summary:
        "Sistema de atención digital que permite a las víctimas comunicarse con el Ministerio Público a través de WhatsApp Business, facilitando el acceso y la comunicación.",
      team: "",
      sections: {
        documentos: [{ title: "", description: "", link: "", url: "" }],
        links: [{ title: "", description: "", link: "", url: "" }],
        planChecklist: [{ title: "", description: "", link: "", url: "" }],
      },
    },
    emergencia: {
      title: "3. Módulo atenciones línea emergencia",
      description: "Gestión de atenciones de emergencia y urgencia.",
      icon: "",
      summary:
        "Este proceso permitirá la atención de llamantes priorizados que se encuentren en situaciones de emergencia, incluirá una bandeja exclusiva para llamadas 800, activaciones de emergencia y seguimiento de medidas tomadas. Se asegurará el acceso controlado y segmentado a esta funcionalidad para personal interno o externo según protocolos del Ministerio Público.",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "Sitio", description: "Acesso al sistema", link: "Ir al sitio", url: "https://apilab.acsimlab.cl/cipemp/login" },
          
        ],
        planChecklist: [
          {
            title: "Checklist",
            description: "Checklist Servicio de Emergencia CIPE - Macro",
            link: "Ver lista",
            url: "https://docs.google.com/spreadsheets/d/1iuOpPZw5T-T4bvKLtTfv75-Eg1TZMRYXQcO0SwXRcaI/edit?gid=1363792939#gid=1363792939",
          },
        ],
      },
    },
    "evaluacion-riesgo": {
      title: "2. Módulo Evaluación de Riesgo",
      description: "Evaluación y gestión del riesgo de víctimas.",
      icon: "",
      summary: "Este proceso permitirá estandarizar la evaluación de riesgo, facilitando la aplicación de pautas, clasificar adecuadamente los niveles de riesgo, y sistematizar las decisiones sobre medidas de protección.",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    derivaciones: {
      title: "4. Módulo Derivaciones",
      description: "Gestión de derivaciones a otras instituciones.",
      icon: "",
      summary: "Este proceso contará con la generación estandarizada de derivaciones, envío automatizado de antecedentes por correo y sistema de alertas, además de la gestión de agendas y listados de atención externa en áreas como apoyo psicológico, social y legal.",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    "acompanamiento-legal": {
      title: "7. Módulo atención acompañamiento legal",
      description: "Acompañamiento legal integral para víctimas.",
      icon: "",
      summary: "Este proceso permitirá gestionar entrevistas con fiscales o abogados, seguimiento del estado de la causa, visualización de fechas clave del juicio y una bandeja consolidada para gestiones legales vinculadas al acompañamiento especializado. Sus componentes se integrarán a los sistemas del MP. Este componente será validado en funcionalidad y alcance con el equipo DINF antes de su construcción y/o priorización, para hacer sinergia con lo que se está construyendo de manera interna.",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    "apoyo-psicosocial": {
      title: "6. Módulo atención apoyo psicosocial",
      description: "Apoyo psicosocial integral para víctimas y familiares.",
      icon: "",
      summary: "Este proceso permitirá otorgar la prestación de apoyo psicosocial cuando corresponda, y para ello incluirá el registro estandarizado de atenciones psicosociales y psiquiátricas, agendamiento, control de acciones realizadas y una “mi agenda” para las víctimas que puedan autogestionar su participación en el proceso de apoyo. Incluirá alertas y seguimiento.",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    prestaciones: {
      title: "8. Módulo gestión de Prestaciones",
      description: "Gestión de prestaciones y beneficios.",
      icon: "",
      summary: "Este proceso permitirá dar seguimiento activo a medidas de protección otorgadas, utilizando en una fase 2 un agente inteligente que identifique casos críticos a partir de integraciones con los sistemas del MP. Se desarrollarán funcionalidades para la resolución, ejecución y comunicación de medidas, con bandejas específicas y alertas operacionales. Adicionalmente, el módulo contará con una sección de presupuesto de las medidas de protección otorgadas.",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    autoatencion: {
      title: "9. Módulo Autoatención",
      description: "Sistema de autoatención para víctimas y abogados.",
      icon: "",
      summary: "El desarrollo de este Módulo contempla una optimización y mejora de las características ya existentes en la plataforma de Mí Fiscalía, que permite a lo usuarios hacer seguimiento de los aspectos básicos relacionados a su causa. El nuevo portal de Autoatención se presenta con nuevas características que signifiquen un aporte a los usuarios del sistema.",
      team: "Paulina Baeza, Vanessa Contreras, Roberto Martínez y Patricia Pérez",
      sections: {
        documentos: [
          { title: "Diagrama de Flujo", description: "Diagrama de Flujo Gneral", link: "Ver diagrama", url: `https://www.figma.com/board/hLRMTdYMcuOgcjfy0Gsxlx/Diagrama-flujos-autoatenci%C3%B3n?node-id=0-1&p=f&t=fgHBcRGFu4NiONDO-0` },
          { title: "Modelo de historia de Usuario", description: "Modelo v 1.0", link: "Ver modelo", url: `https://docs.google.com/spreadsheets/d/1C_TreJD-GDoyd4WkmVyP5waR_gpfvbzM51Ok1uCK20g/edit?usp=sharing` },
          { title: "Maquetas", description: "Pantallas maquetas", link: "Ver maqueta", url: `https://docs.google.com/presentation/d/1tIveWr1uyPipTxbZss7Q-ROmZdAdXzNQ62Q4WdyywPY/edit?usp=sharing` },
        ],
        links: [
          { title: "Sitio", description: "Usuario: roberto@acsim.cl, Pass: Password", link: "Ir al sitio", url: "https://apilab.acsimlab.cl/cipeaa/login" },
          
        ],
        planChecklist: [
          { title: "Planificación 2025", description: "Planificación Autoatención 2025", link: "Ver plan", url: `https://docs.google.com/spreadsheets/d/1tavJBIqJCO7gXB8TgduImNeNc3sBrHC4Gxd-QEQB7I4/edit?usp=sharing` },
          { title: "Checklist", description: "Checklist de actividades Fiscalía", link: "Ver checklist", url: `https://docs.google.com/spreadsheets/d/1czHGzXd1PPoX4_mXwNxWw_PlYabDSNTvSQ756LSsJhI/edit?usp=sharing` },
        ],
      },
    },
    monitoreo: {
      title: "5. Módulo Monitoreo y Seguimiento",
      description: "Monitoreo y seguimiento de casos y procesos.",
      icon: "",
      summary: "Este proceso de monitoreo y seguimiento contará con un componente integral con alertas configurables, mensajería automatizada y panel de control de alertas, lo que permitirá monitorear procesos críticos, anticipar incumplimientos y reconocer interacciones relevantes de manera proactiva. Anticipadamente, se debe definir todos los indicadores y KPI a monitorear en conjunto con el equipo del Ministerio Público.",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    configuracion: {
      title: "10. Módulo Configuración y perfilamiento global",
      description: "Configuración global del sistema y perfiles de usuario.",
      icon: "",
      summary: "",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    "agentes-ia": {
      title: "11. Módulo Agentes inteligentes y multiagentes",
      description: "Sistema de agentes inteligentes para automatización.",
      icon: "",
      summary: "El Módulo 11 del proyecto CIPE tiene como objetivo integrar soluciones de inteligencia artificial que potencien la experiencia de autoatención, mejoren los servicios de emergencia y abran nuevos canales de comunicación con la ciudadanía. Estas iniciativas buscan optimizar recursos, aumentar la eficiencia en la atención, y entregar una experiencia digital accesible, confiable y consistente.",
      team: "Equipo ByteQuest, Jeannette Cruz y Patricia Pérez",
      sections: {
        documentos: [
          {
            title: "Informes de avance Julio 2025",
            description: "Resumen avance proyecto CIPE - Julio 2025",
            link: "Ver documento",
            url: `${
              import.meta.env.BASE_URL
            }docs/Resumen avance proyecto CIPE - Julio 2025.docx`,
          },
          {
            title: "Informes de avance Agosto 2025",
            description: "Resumen avance proyecto CIPE - Agosto 2025",
            link: "Ver documento",
            url: `${
              import.meta.env.BASE_URL
            }docs/Resumen avance proyecto CIPE - Agosto2025.pdf`,
          },
          {
            title: "Carta Gant",
            description: "Carta Gantt Ministerio Publico(General)",
            link: "Ver Documento",
            url: `${
              import.meta.env.BASE_URL
            }docs/Carta-Gantt-Ministerio-Publico.pdf`,
          },

          {
            title: "Presentación - Estado de avance Septiembre 2025",
            description: "Estado de avance bytequest MP - Septiembre 2025",
            link: "Ver Presentación",
            url: `${import.meta.env.BASE_URL}docs/ESTADO AVANCE BYTEQUEST  MP septiembre.pdf`,
          },



          {
            title: "Entrenamiento Agentes Chatbot",
            description: "Carpeta con credenciales, Enlaces a videos, Glosario, Preguntas frecuentes, Información solicitudes, Sección victimas y Manual operativo.",
            link: "Ver carpeta",
            url: `https://drive.google.com/drive/folders/1pEXKU43qJnWaxfOJOPQ1lSTXiFgfLrmz`,
          },
        ],
        links: [{ title: "", description: "", link: "" }],
        planChecklist: [{ title: "", description: "", link: "" }],
      },
    },
    mensajeria: {
      title: "12. Módulo gestión mensajería y alertas",
      description: "Gestión de mensajería y sistema de alertas.",
      icon: "",
      summary: "",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    seguridad: {
      title: "13. Módulo Seguridad",
      description: "Gestión de seguridad y control de acceso.",
      icon: "",
      summary: "",
      team: "",
      sections: {
        documentos: [{ title: "", description: "", link: "" }],
        links: [
          {
            title: "Mapeo",
            description: "Mapa de medidas de protección",
            link: "Ver Figma",
            url: "https://www.figma.com/board/I2weVfyJWzu7ImpYTYLoje/MEDIDAS-DE-PROTECCIÓN?node-id=2-2524",
          },
        ],
        planChecklist: [{ title: "", description: "", link: "" }],
      },
    },
    "transformacion-estrategica": {
      title: "14. Módulo Transformación Estratégica. (MTE)",
      description: "Transformación estratégica del modelo de atención.",
      icon: "",
      summary: "",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    coexiste: {
      title: "15. Coexiste otras aplicaciones satélites regionales",
      description: "Integración con aplicaciones regionales existentes.",
      icon: "",
      summary: "",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    "gestion-interna": {
      title: "16. Módulo Gestión Interna T.",
      description: "Gestión interna de MP transitoria.",
      icon: "",
      summary: "",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },
    opa: {
      title: "17. Módulo gestión OPA T.",
      description: "Gestión de OPA (Oficina de Protección y Atención).",
      icon: "",
      summary: "",
      team: "",
      sections: {
        documentos: [
          { title: "", description: "", link: "" },
          
        ],
        links: [
          { title: "", description: "", link: "" },
          
        ],
        planChecklist: [
          { title: "", description: "", link: "" },
          
        ],
      },
    },

    // PILOTO CIPE

    "piloto-ej1-modulo": {
      title: "Proceso de carga",
      description:
        "Sistema piloto para pruebas y validación de funcionalidades.",
      icon: "",
      summary:
        "Módulo piloto que permite probar nuevas funcionalidades y validar procesos antes de su implementación en producción.",
      team: "",
      sections: {
        documentos: [{ title: "", description: "", link: "", url: "" }],
        links: [{ title: "", description: "", link: "", url: "" }],
        planChecklist: [
          {
            title: "Checklist",
            description: "Piloto CIPE",
            link: "Ver lista",
            url: "https://docs.google.com/spreadsheets/d/1mo4c4Fa7DUd3i8J4VqvsSbZKbJ5-FGYwIwcCF97Nh-4/edit?gid=205686129#gid=205686129",
          },
        ],
      },
    },

    "piloto-ej2-modulo": {
       title: "Proceso de Seguimiento",
       description: "Sistema de seguimiento y monitoreo de procesos piloto.",
       icon: "",
       summary:
         "Módulo especializado en el seguimiento y monitoreo de los procesos piloto, permitiendo el análisis continuo del rendimiento y la identificación de mejoras.",
       team: "",
       sections: {
         documentos: [{ title: "", description: "", link: "", url: "" }],
         links: [{ title: "", description: "", link: "", url: "" }],
         planChecklist: [{ title: "", description: "", link: "", url: "" }],
       },
     },

     "piloto-ej3-modulo": {
       title: "Proceso de Cierre y análisis",
       description: "Panel de control para monitoreo del sistema piloto.",
       icon: "",
       summary:
         "Dashboard especializado que permite monitorear en tiempo real el estado y rendimiento del sistema piloto.",
       team: "",
       sections: {
         documentos: [{ title: "", description: "", link: "", url: "" }],
         links: [{ title: "", description: "", link: "", url: "" }],
         planChecklist: [{ title: "", description: "", link: "", url: "" }],
       },
     },

    // SERVICIO DE EMERGENCIA CIPE

    "emergencia-ej1-modulo": {
      title: "Proceso de Activación de Medida de Protección",
      description: "Sistema especializado para atención de emergencias.",
      icon: "",
      summary:
        "Módulo especializado en la gestión de emergencias y situaciones críticas, con protocolos específicos y respuesta inmediata.",
      team: "",
      sections: {
        documentos: [{ title: "", description: "", link: "", url: "" }],
        links: [{ title: "", description: "", link: "", url: "" }],
        planChecklist: [
          { title: "", description: "", link: "" },
        ],
      },
    },

    "emergencia-ej2-modulo": {
      title: "Proceso de Gestión de Emergencias",
      description: "Servicios especializados para atención de emergencias.",
      icon: "",
      summary:
        "Módulo que proporciona servicios especializados para la atención integral de emergencias, incluyendo coordinación interinstitucional.",
      team: "",
      sections: {
        documentos: [{ title: "", description: "", link: "", url: "" }],
        links: [{ title: "", description: "", link: "", url: "" }],
        planChecklist: [{ title: "", description: "", link: "", url: "" }],
      },
    },

    "emergencia-ej3-modulo": {
      title: "Proceso de Gestión de Seguimientos",
      description: "Atención telefónica especializada las 24 horas del día.",
      icon: "",
      summary:
        "Sistema de atención telefónica que opera las 24 horas del día para brindar soporte inmediato en situaciones de emergencia.",
      team: "",
      sections: {
        documentos: [{ title: "", description: "", link: "", url: "" }],
        links: [{ title: "", description: "", link: "", url: "" }],
        planChecklist: [{ title: "", description: "", link: "", url: "" }],
      },
    },
  };

  const module = modulesData[moduleId];

  // Función para determinar la clase CSS según el módulo y página
  const getBorderClass = (moduleId) => {
    // Módulos de Piloto CIPE - Verde
    if (moduleId.startsWith("piloto-")) {
      return "piloto";
    }

    // Módulos de Servicio de Emergencia CIPE - Fucsia
    if (moduleId.startsWith("emergencia-")) {
      return "emergencia";
    }

    // Todos los módulos de la página principal - Azul
    return "principal";
  };

  // Función para generar el breadcrumb correcto
  const getBreadcrumb = (moduleId) => {
    if (moduleId.startsWith("piloto-")) {
      return (
        <>
          <span onClick={() => navigate("/")} className="breadcrumb-link">
            Página de inicio
          </span>{" "}
          /{" "}
          <span onClick={() => navigate("/piloto-cipe")} className="breadcrumb-link">
            Piloto CIPE
          </span>{" "}
          / {module.title}
        </>
      );
    }

    if (moduleId.startsWith("emergencia-")) {
      return (
        <>
          <span onClick={() => navigate("/")} className="breadcrumb-link">
            Página de inicio
          </span>{" "}
          /{" "}
          <span onClick={() => navigate("/servicio-emergencia")} className="breadcrumb-link">
            Servicio de emergencia CIPE
          </span>{" "}
          / {module.title}
        </>
      );
    }

    // Módulos de la página principal
    return (
      <>
        <span onClick={() => navigate("/")} className="breadcrumb-link">
          Página de inicio
        </span>{" "}
        / {module.title}
      </>
    );
  };

  const borderClass = getBorderClass(moduleId);

  if (!module) {
    return (
      <div className="module-detail">
        <div className="module-not-found">
          <h1>Módulo no encontrado</h1>
          <p>El módulo que buscas no existe o no está disponible.</p>
          <button onClick={() => navigate("/")} className="back-button">
            <BackArrowIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="module-detail">
      <div className="module-header-white">
        <div className="header-left">
          <button onClick={() => navigate("/")} className="back-button">
            <BackArrowIcon />
          </button>
          <div className="breadcrumb">
            {getBreadcrumb(moduleId)}
          </div>
        </div>
        <div className="header-right">
          <div className="module-header-info">
            <div className="module-icon-header">{module.icon}</div>
            <div className="module-header-text">
              <h1 className="module-title">{module.title}</h1>
              <p className="module-subtitle">{module.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="module-content">
        <div className={`content-container ${borderClass}`}>
          {/* Resumen del módulo */}
          <div className={`module-summary ${borderClass}`}>
            <h3>Resumen del Módulo</h3>
            <p>{module.summary}</p>
          </div>

          {/* Equipo responsable */}
          <div className={`module-team ${borderClass}`}>
            <h3>Equipo Responsable</h3>
            <p>{module.team}</p>
          </div>

          {/* Estado de Progreso */}
          <div className={`module-progress ${borderClass}`}>
            <h3>Estado de Progreso</h3>
            <div className="progress-editor">
              <div className="progress-display">
                <ProgressCircle
                  percentage={currentProgress}
                  size={80}
                  strokeWidth={6}
                />
                <span className="progress-label">
                  {currentProgress}% Completado
                </span>
              </div>
              <div className="progress-controls">
                <label>Actualizar progreso:</label>
                <div className="progress-buttons">
                  {progressOptions.map((option) => (
                    <button
                      key={option}
                      className={`progress-btn ${
                        currentProgress === option ? "active" : ""
                      }`}
                      onClick={() => handleProgressChange(option)}
                    >
                      {option}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Documentos */}
          <div className="section-group">
            <h3 className="section-title">Documentos</h3>
            <div className="items-grid">
              {module.sections.documentos.map((item, index) => (
                <div key={index} className="content-item">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <a
                    href={item.url || "#"}
                    className="item-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFileDownload(item.url, item.url.split("/").pop());
                    }}
                  >
                    {item.link}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Sección de Links */}
          <div className="section-group">
            <h3 className="section-title">Links</h3>
            <div className="items-grid">
              {module.sections.links.map((item, index) => (
                <div key={index} className="content-item">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <a
                    href={item.url || "#"}
                    className="item-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFileDownload(item.url, item.url.split("/").pop());
                    }}
                  >
                    {item.link}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Sección de Plan y Checklist */}
          <div className="section-group">
            <h3 className="section-title">Plan y Checklist</h3>
            <div className="items-grid">
              {module.sections.planChecklist.map((item, index) => (
                <div key={index} className="content-item">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <a
                    href={item.url || "#"}
                    className="item-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFileDownload(item.url, item.url.split("/").pop());
                    }}
                  >
                    {item.link}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
