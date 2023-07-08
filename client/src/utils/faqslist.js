const faqs = [
  {
    question: '¿Qué es Code-Tutor y para qué sirve?',
    answer:
      'Code-Tutor es una plataforma en línea orientada a genter de Latinoamérica que sirve para conectar usuarios con tutores para proyectos de programación de manera independiente.'
  },
  {
    question:
      '¿Cuáles son las ventajas de utilizar la plataforma en comparación con buscar un tutor de programación de forma tradicional?',
    answer:
      'Code-Tutor ofrece una serie de herramientas integradas, desde los calendarios y control de agenda para el orden del tiempo personal hasta el chat para comunicarse directamente con el tutor, pasando por el control del tiempo de sesión, recordatorios de tiempo, uso de salas en plataformas conocidas y amplia disponibilidad de tutores en diferentes zonas horarias. Además, facilitamos la contratación de tutores de programación de forma independiente, brindando información detallada de los tutores en los perfiles, reviews y testimonios de otros usuarios.'
  },
  {
    question:
      '¿Cómo funciona la conexión entre usuarios y tutores de Code-Tutor?',
    answer:
      'Todos los tutores de Code-Tutor son listados en el apartado de búsqueda, donde los usuarios puede encontrar a la persona que necesite mediante los filtros por tecnología, país de origen, idioma y calificación.'
  },
  {
    question:
      '¿Qué tipo de proyectos de programación se pueden solicitar en la Code-Tutor?',
    answer: `¡El que quieras! Por parte de Code-Tutor, no hay limitaciones técnicas a la hora de solicitar un proyecto de programación. Sin embargo, es importante tener en cuenta que los tutores de la plataforma son personas independientes, por lo que es posible que no puedan aceptar todos los proyectos solicitados.`
  },
  {
    question:
      '¿Qué nivel de experiencia tienen los tutores disponibles en la plataforma?',
    answer: `En Code-Tutor nos tomamos muy en serio la calidad de los tutores disponibles en la plataforma. Por eso, todos los tutores deben pasar por un proceso de selección y verificación cuidadoso antes de ser aceptados como tutores. Por otra parte, los usuarios pueden acceder a los perfiles de los tutores para ver su experiencia, proyectos, reviews, y cualquier otra información relevante.`
  },
  {
    question:
      '¿Cuál es el proceso de selección y verificación de los tutores en la plataforma?',
    answer: `Este proceso suele demorar unos días y pasa por varias etapas, empezando por el envío de los datos solicitados, la evaluación de los mismos, y la verificación de la información. Si bien no contamos con requeriementos específicos, evaluamos cuidadosamente la experiencia y conocimientos de los tutores, así como su capacidad para explicar conceptos y trabajar con estudiantes.`
  },
  {
    question: '¿Cómo se establece la tarifa de los tutores en la plataforma?',
    answer: `Nuestro objetivo principal es ofrecer un servicio de calidad a un precio justo. Por eso, Code-Tutor se encarga de establecer límites para las tarifas de los tutores en la plataforma. Sin embargo, los tutores pueden establecer sus propias tarifas dentro de estos límites.`
  },
  {
    question:
      '¿Cuáles son los métodos de pago aceptados para contratar a un tutor?',
    answer: `Todas nuestras transacciones se realizan a través de Stripe, una plataforma de pago en línea segura y confiable. Stripe acepta una variedad de métodos de pago, incluyendo cualquier tarjeta de crédito o débito.`
  },
  {
    question:
      '¿Puedo ver reseñas o comentarios de otros usuarios sobre los tutores antes de contratarlos?',
    answer: `Sí, toda la información relevante del tutor, incluyendo las reseñas, se encuentra disponible en su perfil. Los usuarios pueden acceder a los perfiles de los tutores para ver su experiencia, proyectos, reviews, y cualquier otra información relevante.`
  },
  {
    question: '¿Cómo puedo comunicarme con un tutor antes de contratarlo?',
    answer: `Puedes utilizar nuestro serivicio de chat integrado para comunicarte con los tutores antes de contratarlos.`
  },
  {
    question:
      '¿Cuál es el tiempo de respuesta esperado de los tutores en la plataforma?',
    answer: `El tiempo de respuesta esperado de los tutores puede variar dependiendo de diversos factores, como la disponibilidad del tutor, la carga de trabajo y la ubicación geográfica.`
  },
  {
    question:
      '¿Puedo solicitar una tutoría de programación en un horario específico?',
    answer: `Sí, en Code-Tutor puedes solicitar una tutoría de programación en un horario específico. Al buscar un tutor en la plataforma, podrás ver su disponibilidad y seleccionar un horario que se adapte a tu horario y agenda.`
  },
  {
    question:
      '¿Qué herramientas o plataformas de comunicación se utilizan para las sesiones de tutoría?',
    answer: `Code-Tutor, brinda soporte a Zoom, Google Meet y Google Chat para llevar a cabo las sesiones de tutoría. Para sesiones que no requieran de control remoto recomendamos Google Meet, ya que el proceso se encuentra completamente automatizado.`
  },
  {
    question:
      '¿Se ofrece algún tipo de soporte técnico en caso de problemas técnicos durante las sesiones de tutoría?',
    answer: `Code-Tutor no ofrece soporte técnico para problemas técnicos durante las sesiones de tutoría. Sin embargo, en caso de que la sesión se vea afectada por cualquier motivo, Code-Tutor se encargará de resolver cualquier disputa una vez que se haya presentado el problema.`
  },
  {
    question:
      '¿Qué sucede si no encuentro un tutor adecuado para mi proyecto de programación en la plataforma?',
    answer: `Lamentamos que no hayas encontrado un tutor adecuado para tu proyecto de programación en la plataforma. Como recomendación, puedes intentar ampliar tus filtros de búsqueda para encontrar más tutores disponibles, solicitar opiniones de otros usuarios, o contactar a nuestro equipo de soporte para recibir ayuda.`
  },
  {
    question:
      '¿Puedo cambiar de tutor si no estoy satisfecho con el progreso de mi proyecto?',
    answer: `En Code-Tutor cada sesión se abona por separado y previo a su inicio. Por lo tanto, puedes cambiar de tutor en cualquier momento si no estás satisfecho con el progreso de tu proyecto.`
  },
  {
    question:
      '¿Cómo se maneja la confidencialidad de la información y los proyectos compartidos con los tutores?',
    answer: `Code-Tutor se toma muy en serio la confidencialidad de la información y los proyectos compartidos con los tutores. Todos los proyectos de programación compartidos con los tutores se encuentran protegidos por nuestra Política de Privacidad. Para más información o asistencia sobre este tema, puedes contactar a nuestro equipo de soporte.`
  },
  {
    question:
      '¿Puedo solicitar una tutoría en un idioma específico, aparte del español?',
    answer: `En Code-Tutor, los tutores tienen la opción de seleccionar los idiomas con los que se sienten cómodos y desean comunicarse. De momento ofrecemos soporte en español, inglés, portugués y francés.`
  },
  {
    question:
      '¿Qué sucede si tengo problemas de comunicación o dificultades con el tutor durante las sesiones?',
    answer: `Durante el tiempo que dure la sesión, Code-Tutor no podrá intervenir para solucionar ningún problema, por lo que te recomendamos intentar resolver cualquier problema de comunicación o dificultad directamente con el tutor. Sin embargo, una vez finalizada la sesión, puedes contactar a nuestro equipo de soporte para recibir ayuda.`
  },
  {
    question:
      '¿Los tutores ofrecen apoyo y orientación adicional fuera de las sesiones programadas?',
    answer: `Depende, en muchos casos, los tutores en Code-Tutor pueden ofrecer apoyo y orientación adicional fuera de las sesiones programadas. Sin embargo, esto puede variar según la disponibilidad y las preferencias individuales de cada tutor. Algunos tutores pueden estar dispuestos a responder preguntas breves o proporcionar clarificaciones adicionales por medio del chat de la plataforma entre las sesiones programadas.`
  },
  {
    question:
      '¿Puedo solicitar una muestra o demostración de habilidades antes de contratar a un tutor?',
    answer: `Sí, es posible solicitar una muestra o demostración de habilidades antes de contratar a un tutor en Code-Tutor. Algunos tutores pueden estar dispuestos a proporcionar ejemplos de su trabajo previo, proyectos realizados o incluso realizar una breve demostración de sus habilidades. Para solicitar una muestra o demostración, puedes comunicarte directamente con el tutor a través del chat de la plataforma. Es importante tener en cuenta que no todos los tutores pueden ofrecer muestras o demostraciones, ya que esto dependerá de su disponibilidad y preferencias individuales.`
  },
  {
    question:
      '¿Hay algún tipo de sistema de calificación o valoración de los tutores por parte de los usuarios?',
    answer: `Sí, en Code-Tutor se utiliza un sistema de calificación y valoración de los tutores por parte de los usuarios. Después de cada sesión de tutoría, los usuarios tienen la oportunidad de calificar y dejar comentarios sobre la experiencia y el desempeño del tutor. Ten en cuenta que podrás valorar y calificar hasta 24 horas después de que finalice la sesión.`
  },
  {
    question:
      '¿Cómo se manejan los conflictos o disputas entre los usuarios y los tutores en la plataforma?',
    answer: `Code-Tutor recomienda siempre primero intentar resolver el problema directamente con el tutor. Sin embargo, si el problema persiste, puedes contactar a nuestro equipo de soporte para recibir ayuda.`
  },
  {
    question:
      '¿La plataforma ofrece algún tipo de recurso o material educativo adicional para los usuarios?',
    answer: `En este momento no ofrecemos recursos o materiales educativos adicionales para los usuarios. Nos centramos principalmente en conectar a los usuarios con tutores expertos en programación y brindar un entorno de tutoría efectivo.`
  },
  {
    question:
      '¿Qué tipo de tecnologías de programación o lenguajes se cubren en la plataforma?',
    answer: `En Code-Tutor, cubrimos una amplia variedad de tecnologías de programación y lenguajes. Día a día, estamos trabajando para ampliar nuestra oferta de tutores y tecnologías de programación disponibles en la plataforma. Si no encuentras la tecnología de programación o el lenguaje que necesitas, puedes sugerirla a través del botón "Dar mi opinión" al inicio de la página.`
  },
  {
    question:
      '¿Existe algún requisito mínimo de tiempo para contratar a un tutor en la plataforma?',
    answer: `Sí, en Code-Tutor ofrecemos 4 tipos de sesiones de tutoría con diferentes requisitos de tiempo. Puedes elegir entre sesiones de 30 minutos, 1 hora, 90 minutos o 2 horas.`
  },
  {
    question:
      '¿Puedo solicitar tutorías recurrentes o solo se ofrecen sesiones únicas?',
    answer: `Si bien no contamos con un sistema de tutorías recurrentes, puedes solicitar sesiones de tutoría únicas o múltiples comunicándote directamente con el tutor a través del chat de la plataforma.`
  },
  {
    question:
      '¿Los tutores tienen experiencia específica en algún sector o industria en particular?',
    answer: `Sí, en Code-Tutor muchos de los tutores tienen experiencia específica en diferentes sectores o industrias de la programación. Comprendemos que cada sector tiene sus propias necesidades y desafíos particulares, por lo que contar con un tutor que tenga experiencia en un sector específico puede resultar beneficioso para los usuarios.`
  },
  {
    question:
      '¿Qué nivel de conocimiento de programación se espera que tenga el usuario antes de solicitar un tutor?',
    answer: `En Code-Tutor, no se requiere un nivel específico de conocimiento de programación antes de solicitar un tutor. La plataforma está diseñada para atender a usuarios de diferentes niveles, desde principiantes hasta usuarios con conocimientos más avanzados.`
  },
  {
    question:
      '¿Se pueden solicitar tutorías de programación en áreas especializadas, como inteligencia artificial o desarrollo web?',
    answer: `¡Por supuesto! En Code-Tutor, puedes solicitar tutorías de programación en áreas especializadas como inteligencia artificial, desarrollo web y muchas otras. La plataforma cuenta con una amplia gama de tutores especializados en diferentes tecnologías y disciplinas dentro del campo de la programación.`
  },
  {
    question:
      '¿Los tutores proporcionan apoyo en la resolución de problemas o solo ofrecen orientación general?',
    answer: `En Code-Tutor, los tutores no solo ofrecen orientación general, sino que también brindan apoyo en la resolución de problemas específicos. Los tutores pueden ayudarte a resolver problemas específicos de programación, aclarar dudas y brindarte orientación sobre cómo abordar diferentes desafíos.`
  },
  {
    question:
      '¿Los tutores ofrecen algún tipo de seguimiento o actualización sobre el progreso del proyecto?',
    answer: `Sí, en Code-Tutor los tutores pueden ofrecer seguimiento y actualización sobre el progreso del proyecto. Durante las sesiones de tutoría, los tutores pueden evaluar tu proyecto, revisar el código que has desarrollado y brindarte retroalimentación específica sobre tu progreso. Ten en cuenta que el seguimiento y la actualización del proyecto dependerán de la duración de la sesión de tutoría y de la disponibilidad del tutor.`
  },
  {
    question:
      '¿Cómo se manejan los problemas de compatibilidad tecnológica entre el tutor y el usuario durante las sesiones en línea?',
    answer: `En Code-Tutor, el tutor se compromete a brindar soporte total sobre todas las tecnologías que haya seleccionado en su perfil. Sin embargo, si durante la sesión de tutoría se presenta algún problema de compatibilidad tecnológica, el tutor y el usuario pueden comunicarse directamente a través del chat de la plataforma para resolverlo. Si el problema persiste, puedes contactar a nuestro equipo de soporte para recibir ayuda.`
  },
  {
    question:
      'No encuentro mi pregunta en esta sección de preguntas frecuentes, ¿qué debo hacer?',
    answer: `Si no encuentras tu pregunta en esta sección de preguntas frecuentes, puedes sugerirla a través del botón "Nueva pregunta" al inicio de la página. Si necesitas ayuda adicional, puedes contactar a nuestro equipo de soporte.`
  },
  {
    question:
      'Tengo una sugerencia para mejorar la plataforma, ¿cómo puedo compartirla?',
    answer: `Si tienes una sugerencia para mejorar la plataforma, puedes compartirla a través del botón "Dar mi opinión" al inicio de la página. Si necesitas ayuda adicional, puedes contactar a nuestro equipo de soporte.`
  }
]

export default faqs
