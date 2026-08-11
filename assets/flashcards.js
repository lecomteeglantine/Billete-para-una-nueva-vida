const FLASHCARDS = [
  {
    "id": "con-1",
    "category": "Consignes",
    "fr": "analyser",
    "es": "analizar",
    "exampleFr": "Il faut analyser les procédés employés dans le document.",
    "exampleEs": "Hay que analizar los recursos utilizados en el documento."
  },
  {
    "id": "con-2",
    "category": "Consignes",
    "fr": "confronter",
    "es": "confrontar / poner en relación",
    "exampleFr": "Confrontez les points de vue des deux auteurs.",
    "exampleEs": "Confronte los puntos de vista de los dos autores."
  },
  {
    "id": "con-3",
    "category": "Consignes",
    "fr": "dégager",
    "es": "destacar / extraer",
    "exampleFr": "Dégagez les principaux enjeux du dossier.",
    "exampleEs": "Extraiga los principales retos del dosier."
  },
  {
    "id": "con-4",
    "category": "Consignes",
    "fr": "étayer",
    "es": "fundamentar / respaldar",
    "exampleFr": "Étayer une affirmation avec un exemple précis.",
    "exampleEs": "Fundamentar una afirmación con un ejemplo preciso."
  },
  {
    "id": "con-5",
    "category": "Consignes",
    "fr": "justifier",
    "es": "justificar",
    "exampleFr": "Justifiez le choix de ce document pour la séquence.",
    "exampleEs": "Justifique la elección de este documento para la secuencia."
  },
  {
    "id": "con-6",
    "category": "Consignes",
    "fr": "nuancer",
    "es": "matizar",
    "exampleFr": "Il faut nuancer cette interprétation trop catégorique.",
    "exampleEs": "Hay que matizar esta interpretación demasiado categórica."
  },
  {
    "id": "con-7",
    "category": "Consignes",
    "fr": "rendre compte de",
    "es": "dar cuenta de",
    "exampleFr": "Rendez compte de l’évolution du personnage.",
    "exampleEs": "Dé cuenta de la evolución del personaje."
  },
  {
    "id": "con-8",
    "category": "Consignes",
    "fr": "mettre en perspective",
    "es": "poner en perspectiva",
    "exampleFr": "Mettez le texte en perspective avec son contexte.",
    "exampleEs": "Ponga el texto en perspectiva con su contexto."
  },
  {
    "id": "con-9",
    "category": "Consignes",
    "fr": "mettre en évidence",
    "es": "poner de relieve",
    "exampleFr": "Cette comparaison met en évidence une contradiction.",
    "exampleEs": "Esta comparación pone de relieve una contradicción."
  },
  {
    "id": "con-10",
    "category": "Consignes",
    "fr": "s’appuyer sur",
    "es": "basarse en",
    "exampleFr": "L’argumentation doit s’appuyer sur tous les documents.",
    "exampleEs": "La argumentación debe basarse en todos los documentos."
  },
  {
    "id": "con-11",
    "category": "Consignes",
    "fr": "cerner",
    "es": "delimitar / comprender con precisión",
    "exampleFr": "Il faut d’abord cerner les limites du sujet.",
    "exampleEs": "Primero hay que delimitar los límites del tema."
  },
  {
    "id": "con-12",
    "category": "Consignes",
    "fr": "soulever une question",
    "es": "plantear una cuestión",
    "exampleFr": "Le document soulève une question mémorielle.",
    "exampleEs": "El documento plantea una cuestión memorial."
  },
  {
    "id": "con-13",
    "category": "Consignes",
    "fr": "expliciter",
    "es": "explicitar / explicar claramente",
    "exampleFr": "Explicitez le lien entre l’objectif et l’activité.",
    "exampleEs": "Explique claramente el vínculo entre el objetivo y la actividad."
  },
  {
    "id": "con-14",
    "category": "Consignes",
    "fr": "hiérarchiser",
    "es": "jerarquizar",
    "exampleFr": "Hiérarchisez les informations avant de construire le plan.",
    "exampleEs": "Jerarquice la información antes de construir el plan."
  },
  {
    "id": "con-15",
    "category": "Consignes",
    "fr": "reformuler",
    "es": "reformular",
    "exampleFr": "Reformulez l’idée sans reprendre les mots du texte.",
    "exampleEs": "Reformule la idea sin repetir las palabras del texto."
  },
  {
    "id": "ana-1",
    "category": "Analyse",
    "fr": "un enjeu",
    "es": "un reto / una cuestión central",
    "exampleFr": "L’enjeu principal est la construction d’une mémoire collective.",
    "exampleEs": "La cuestión central es la construcción de una memoria colectiva."
  },
  {
    "id": "ana-2",
    "category": "Analyse",
    "fr": "un parti pris",
    "es": "un enfoque deliberado",
    "exampleFr": "Le cadrage révèle le parti pris du photographe.",
    "exampleEs": "El encuadre revela el enfoque deliberado del fotógrafo."
  },
  {
    "id": "ana-3",
    "category": "Analyse",
    "fr": "le point de vue",
    "es": "el punto de vista",
    "exampleFr": "Le point de vue interne limite les informations disponibles.",
    "exampleEs": "El punto de vista interno limita la información disponible."
  },
  {
    "id": "ana-4",
    "category": "Analyse",
    "fr": "la focalisation",
    "es": "la focalización",
    "exampleFr": "La focalisation varie d’un personnage à l’autre.",
    "exampleEs": "La focalización varía de un personaje a otro."
  },
  {
    "id": "ana-5",
    "category": "Analyse",
    "fr": "le registre",
    "es": "el registro",
    "exampleFr": "Le registre satirique renforce la critique politique.",
    "exampleEs": "El registro satírico refuerza la crítica política."
  },
  {
    "id": "ana-6",
    "category": "Analyse",
    "fr": "une mise en scène",
    "es": "una puesta en escena",
    "exampleFr": "L’entretien est présenté comme une mise en scène du pouvoir.",
    "exampleEs": "La entrevista se presenta como una puesta en escena del poder."
  },
  {
    "id": "ana-7",
    "category": "Analyse",
    "fr": "un procédé",
    "es": "un recurso / procedimiento",
    "exampleFr": "La répétition est un procédé d’insistance.",
    "exampleEs": "La repetición es un recurso de insistencia."
  },
  {
    "id": "ana-8",
    "category": "Analyse",
    "fr": "un implicite",
    "es": "un implícito",
    "exampleFr": "L’implicite doit être démontré à partir du texte.",
    "exampleEs": "El implícito debe demostrarse a partir del texto."
  },
  {
    "id": "ana-9",
    "category": "Analyse",
    "fr": "une tension",
    "es": "una tensión",
    "exampleFr": "La tension entre réforme et rupture structure le dossier.",
    "exampleEs": "La tensión entre reforma y ruptura estructura el dosier."
  },
  {
    "id": "ana-10",
    "category": "Analyse",
    "fr": "un paradoxe",
    "es": "una paradoja",
    "exampleFr": "Le paradoxe nourrit une problématique plus féconde.",
    "exampleEs": "La paradoja alimenta una problemática más fecunda."
  },
  {
    "id": "ana-11",
    "category": "Analyse",
    "fr": "une rupture",
    "es": "una ruptura",
    "exampleFr": "La rupture de ton signale un changement de perspective.",
    "exampleEs": "La ruptura de tono señala un cambio de perspectiva."
  },
  {
    "id": "ana-12",
    "category": "Analyse",
    "fr": "une continuité",
    "es": "una continuidad",
    "exampleFr": "Le document insiste sur les continuités sociales.",
    "exampleEs": "El documento insiste en las continuidades sociales."
  },
  {
    "id": "ana-13",
    "category": "Analyse",
    "fr": "le contexte de production",
    "es": "el contexto de producción",
    "exampleFr": "Le contexte de production éclaire la stratégie de l’auteur.",
    "exampleEs": "El contexto de producción aclara la estrategia del autor."
  },
  {
    "id": "ana-14",
    "category": "Analyse",
    "fr": "le contexte de réception",
    "es": "el contexto de recepción",
    "exampleFr": "La réception du film a évolué avec le temps.",
    "exampleEs": "La recepción de la película ha evolucionado con el tiempo."
  },
  {
    "id": "ana-15",
    "category": "Analyse",
    "fr": "la portée",
    "es": "el alcance",
    "exampleFr": "Quelle est la portée politique de cette image ?",
    "exampleEs": "¿Cuál es el alcance político de esta imagen?"
  },
  {
    "id": "ana-16",
    "category": "Analyse",
    "fr": "un contrepoint",
    "es": "un contrapunto",
    "exampleFr": "Le témoignage constitue un contrepoint au discours officiel.",
    "exampleEs": "El testimonio constituye un contrapunto al discurso oficial."
  },
  {
    "id": "écr-1",
    "category": "Écriture académique",
    "fr": "formuler une problématique",
    "es": "formular una problemática",
    "exampleFr": "La problématique doit faire apparaître une tension à expliquer.",
    "exampleEs": "La problemática debe mostrar una tensión que explicar."
  },
  {
    "id": "écr-2",
    "category": "Écriture académique",
    "fr": "annoncer le plan",
    "es": "anunciar el plan",
    "exampleFr": "L’annonce du plan reste brève et fonctionnelle.",
    "exampleEs": "El anuncio del plan debe ser breve y funcional."
  },
  {
    "id": "écr-3",
    "category": "Écriture académique",
    "fr": "dans un premier temps",
    "es": "en un primer momento",
    "exampleFr": "Dans un premier temps, nous étudierons la représentation de la peur.",
    "exampleEs": "En un primer momento, estudiaremos la representación del miedo."
  },
  {
    "id": "écr-4",
    "category": "Écriture académique",
    "fr": "dans la mesure où",
    "es": "en la medida en que",
    "exampleFr": "Cette lecture est pertinente dans la mesure où elle s’appuie sur le dossier.",
    "exampleEs": "Esta lectura es pertinente en la medida en que se basa en el dosier."
  },
  {
    "id": "écr-5",
    "category": "Écriture académique",
    "fr": "cependant",
    "es": "sin embargo",
    "exampleFr": "Cependant, le troisième document nuance cette interprétation.",
    "exampleEs": "Sin embargo, el tercer documento matiza esta interpretación."
  },
  {
    "id": "écr-6",
    "category": "Écriture académique",
    "fr": "néanmoins",
    "es": "no obstante",
    "exampleFr": "Néanmoins, cette continuité ne signifie pas immobilisme.",
    "exampleEs": "No obstante, esta continuidad no significa inmovilismo."
  },
  {
    "id": "écr-7",
    "category": "Écriture académique",
    "fr": "en revanche",
    "es": "en cambio",
    "exampleFr": "En revanche, le second auteur adopte une position critique.",
    "exampleEs": "En cambio, el segundo autor adopta una postura crítica."
  },
  {
    "id": "écr-8",
    "category": "Écriture académique",
    "fr": "certes… mais…",
    "es": "ciertamente… pero…",
    "exampleFr": "Certes, la réforme est progressive, mais elle transforme le cadre politique.",
    "exampleEs": "Ciertamente, la reforma es progresiva, pero transforma el marco político."
  },
  {
    "id": "écr-9",
    "category": "Écriture académique",
    "fr": "dès lors",
    "es": "por consiguiente",
    "exampleFr": "Dès lors, la question de la légitimité devient centrale.",
    "exampleEs": "Por consiguiente, la cuestión de la legitimidad se vuelve central."
  },
  {
    "id": "écr-10",
    "category": "Écriture académique",
    "fr": "ainsi",
    "es": "así / de este modo",
    "exampleFr": "Ainsi, le roman met en crise le récit consensuel.",
    "exampleEs": "Así, la novela cuestiona el relato consensual."
  },
  {
    "id": "écr-11",
    "category": "Écriture académique",
    "fr": "en somme",
    "es": "en suma",
    "exampleFr": "En somme, les documents construisent trois mémoires concurrentes.",
    "exampleEs": "En suma, los documentos construyen tres memorias competidoras."
  },
  {
    "id": "écr-12",
    "category": "Écriture académique",
    "fr": "il convient de",
    "es": "conviene",
    "exampleFr": "Il convient de distinguer le contexte représenté du contexte d’écriture.",
    "exampleEs": "Conviene distinguir el contexto representado del contexto de escritura."
  },
  {
    "id": "écr-13",
    "category": "Écriture académique",
    "fr": "on peut dès lors se demander",
    "es": "cabe preguntarse entonces",
    "exampleFr": "On peut dès lors se demander comment le silence devient un langage politique.",
    "exampleEs": "Cabe preguntarse entonces cómo el silencio se convierte en un lenguaje político."
  },
  {
    "id": "écr-14",
    "category": "Écriture académique",
    "fr": "cette analyse montre que",
    "es": "este análisis muestra que",
    "exampleFr": "Cette analyse montre que la transition n’est pas linéaire.",
    "exampleEs": "Este análisis muestra que la transición no es lineal."
  },
  {
    "id": "écr-15",
    "category": "Écriture académique",
    "fr": "il ressort de",
    "es": "se desprende de",
    "exampleFr": "Il ressort du dossier que la mémoire reste conflictuelle.",
    "exampleEs": "Se desprende del dosier que la memoria sigue siendo conflictiva."
  },
  {
    "id": "did-1",
    "category": "Didactique",
    "fr": "une séquence",
    "es": "una secuencia didáctica",
    "exampleFr": "La séquence est organisée autour d’une problématique culturelle.",
    "exampleEs": "La secuencia se organiza en torno a una problemática cultural."
  },
  {
    "id": "did-2",
    "category": "Didactique",
    "fr": "une séance",
    "es": "una sesión / clase",
    "exampleFr": "Cette séance prépare la tâche finale.",
    "exampleEs": "Esta sesión prepara la tarea final."
  },
  {
    "id": "did-3",
    "category": "Didactique",
    "fr": "un objectif",
    "es": "un objetivo",
    "exampleFr": "L’objectif doit être observable et réaliste.",
    "exampleEs": "El objetivo debe ser observable y realista."
  },
  {
    "id": "did-4",
    "category": "Didactique",
    "fr": "un prérequis",
    "es": "un prerrequisito",
    "exampleFr": "Les élèves réactivent les prérequis lexicaux.",
    "exampleEs": "El alumnado reactiva los prerrequisitos léxicos."
  },
  {
    "id": "did-5",
    "category": "Didactique",
    "fr": "une activité langagière",
    "es": "una actividad de lengua",
    "exampleFr": "La médiation est une activité langagière à part entière.",
    "exampleEs": "La mediación es una actividad de lengua por derecho propio."
  },
  {
    "id": "did-6",
    "category": "Didactique",
    "fr": "la compréhension de l’oral",
    "es": "la comprensión oral",
    "exampleFr": "La compréhension de l’oral est entraînée avant l’évaluation.",
    "exampleEs": "La comprensión oral se entrena antes de la evaluación."
  },
  {
    "id": "did-7",
    "category": "Didactique",
    "fr": "la production écrite",
    "es": "la producción escrita",
    "exampleFr": "La production écrite fait l’objet d’une réécriture guidée.",
    "exampleEs": "La producción escrita se somete a una reescritura guiada."
  },
  {
    "id": "did-8",
    "category": "Didactique",
    "fr": "l’interaction orale",
    "es": "la interacción oral",
    "exampleFr": "L’interaction orale exige un véritable échange.",
    "exampleEs": "La interacción oral exige un intercambio real."
  },
  {
    "id": "did-9",
    "category": "Didactique",
    "fr": "la médiation",
    "es": "la mediación",
    "exampleFr": "L’élève reformule une information pour un camarade.",
    "exampleEs": "El alumno reformula una información para un compañero."
  },
  {
    "id": "did-10",
    "category": "Didactique",
    "fr": "l’étayage",
    "es": "el andamiaje",
    "exampleFr": "L’étayage est retiré progressivement.",
    "exampleEs": "El andamiaje se retira progresivamente."
  },
  {
    "id": "did-11",
    "category": "Didactique",
    "fr": "la différenciation",
    "es": "la diferenciación",
    "exampleFr": "La différenciation adapte les aides sans réduire l’ambition.",
    "exampleEs": "La diferenciación adapta las ayudas sin reducir la ambición."
  },
  {
    "id": "did-12",
    "category": "Didactique",
    "fr": "une consigne",
    "es": "una consigna",
    "exampleFr": "La consigne précise l’action, le support et le résultat attendu.",
    "exampleEs": "La consigna precisa la acción, el soporte y el resultado esperado."
  },
  {
    "id": "did-13",
    "category": "Didactique",
    "fr": "une tâche finale",
    "es": "una tarea final",
    "exampleFr": "La tâche finale mobilise les apprentissages de la séquence.",
    "exampleEs": "La tarea final moviliza los aprendizajes de la secuencia."
  },
  {
    "id": "did-14",
    "category": "Didactique",
    "fr": "une évaluation formative",
    "es": "una evaluación formativa",
    "exampleFr": "L’évaluation formative aide à réguler les apprentissages.",
    "exampleEs": "La evaluación formativa ayuda a regular los aprendizajes."
  },
  {
    "id": "did-15",
    "category": "Didactique",
    "fr": "un critère de réussite",
    "es": "un criterio de éxito",
    "exampleFr": "Les critères de réussite sont communiqués avant la tâche.",
    "exampleEs": "Los criterios de éxito se comunican antes de la tarea."
  },
  {
    "id": "did-16",
    "category": "Didactique",
    "fr": "une trace écrite",
    "es": "una síntesis escrita",
    "exampleFr": "La trace écrite fixe les acquis essentiels.",
    "exampleEs": "La síntesis escrita fija los aprendizajes esenciales."
  },
  {
    "id": "did-17",
    "category": "Didactique",
    "fr": "une remédiation",
    "es": "una medida de refuerzo",
    "exampleFr": "La remédiation cible une difficulté identifiée.",
    "exampleEs": "La medida de refuerzo se centra en una dificultad identificada."
  },
  {
    "id": "did-18",
    "category": "Didactique",
    "fr": "un niveau visé",
    "es": "un nivel objetivo",
    "exampleFr": "Le niveau visé doit être cohérent avec la classe.",
    "exampleEs": "El nivel objetivo debe ser coherente con el curso."
  },
  {
    "id": "vie-1",
    "category": "Vie scolaire",
    "fr": "la laïcité",
    "es": "la laicidad",
    "exampleFr": "La laïcité protège la liberté de conscience.",
    "exampleEs": "La laicidad protege la libertad de conciencia."
  },
  {
    "id": "vie-2",
    "category": "Vie scolaire",
    "fr": "la neutralité",
    "es": "la neutralidad",
    "exampleFr": "L’enseignant respecte une obligation de neutralité.",
    "exampleEs": "El docente respeta una obligación de neutralidad."
  },
  {
    "id": "vie-3",
    "category": "Vie scolaire",
    "fr": "une discrimination",
    "es": "una discriminación",
    "exampleFr": "Une discrimination ne doit jamais être banalisée.",
    "exampleEs": "Una discriminación nunca debe banalizarse."
  },
  {
    "id": "vie-4",
    "category": "Vie scolaire",
    "fr": "le harcèlement",
    "es": "el acoso escolar",
    "exampleFr": "Une suspicion de harcèlement exige un signalement interne rapide.",
    "exampleEs": "Una sospecha de acoso escolar exige una comunicación interna rápida."
  },
  {
    "id": "vie-5",
    "category": "Vie scolaire",
    "fr": "le climat scolaire",
    "es": "el clima escolar",
    "exampleFr": "Un climat scolaire serein favorise les apprentissages.",
    "exampleEs": "Un clima escolar sereno favorece los aprendizajes."
  },
  {
    "id": "vie-6",
    "category": "Vie scolaire",
    "fr": "le règlement intérieur",
    "es": "el reglamento interno",
    "exampleFr": "Le règlement intérieur précise les droits et les devoirs.",
    "exampleEs": "El reglamento interno precisa los derechos y deberes."
  },
  {
    "id": "vie-7",
    "category": "Vie scolaire",
    "fr": "le devoir de réserve",
    "es": "el deber de reserva",
    "exampleFr": "Le devoir de réserve concerne l’expression publique de l’agent.",
    "exampleEs": "El deber de reserva afecta a la expresión pública del agente."
  },
  {
    "id": "vie-8",
    "category": "Vie scolaire",
    "fr": "l’obligation de signalement",
    "es": "la obligación de comunicar",
    "exampleFr": "L’obligation de signalement protège les élèves en danger.",
    "exampleEs": "La obligación de comunicar protege al alumnado en peligro."
  },
  {
    "id": "vie-9",
    "category": "Vie scolaire",
    "fr": "la liberté de conscience",
    "es": "la libertad de conciencia",
    "exampleFr": "L’école garantit la liberté de conscience de chacun.",
    "exampleEs": "La escuela garantiza la libertad de conciencia de cada persona."
  },
  {
    "id": "vie-10",
    "category": "Vie scolaire",
    "fr": "l’égalité entre les filles et les garçons",
    "es": "la igualdad entre chicas y chicos",
    "exampleFr": "Cette égalité doit se traduire dans les pratiques quotidiennes.",
    "exampleEs": "Esta igualdad debe plasmarse en las prácticas cotidianas."
  },
  {
    "id": "vie-11",
    "category": "Vie scolaire",
    "fr": "l’inclusion",
    "es": "la inclusión",
    "exampleFr": "L’inclusion suppose de tenir compte des besoins éducatifs.",
    "exampleEs": "La inclusión supone tener en cuenta las necesidades educativas."
  },
  {
    "id": "vie-12",
    "category": "Vie scolaire",
    "fr": "un aménagement",
    "es": "una adaptación",
    "exampleFr": "Un aménagement ne diminue pas nécessairement l’objectif.",
    "exampleEs": "Una adaptación no reduce necesariamente el objetivo."
  },
  {
    "id": "vie-13",
    "category": "Vie scolaire",
    "fr": "le professeur principal",
    "es": "el profesor tutor",
    "exampleFr": "Le professeur principal coordonne le suivi de la classe.",
    "exampleEs": "El profesor tutor coordina el seguimiento del grupo."
  },
  {
    "id": "vie-14",
    "category": "Vie scolaire",
    "fr": "le conseiller principal d’éducation",
    "es": "el jefe de estudios / responsable de vida escolar",
    "exampleFr": "Le CPE travaille avec les enseignants sur la vie scolaire.",
    "exampleEs": "El responsable de vida escolar trabaja con el profesorado."
  },
  {
    "id": "vie-15",
    "category": "Vie scolaire",
    "fr": "l’équipe éducative",
    "es": "el equipo educativo",
    "exampleFr": "La situation doit être partagée avec l’équipe éducative.",
    "exampleEs": "La situación debe compartirse con el equipo educativo."
  },
  {
    "id": "gra-1",
    "category": "Grammaire",
    "fr": "un déterminant",
    "es": "un determinante",
    "exampleFr": "« Cette » est un déterminant démonstratif.",
    "exampleEs": "« Esta » es un determinante demostrativo."
  },
  {
    "id": "gra-2",
    "category": "Grammaire",
    "fr": "un pronom",
    "es": "un pronombre",
    "exampleFr": "Le pronom reprend ou désigne un élément.",
    "exampleEs": "El pronombre retoma o designa un elemento."
  },
  {
    "id": "gra-3",
    "category": "Grammaire",
    "fr": "un antécédent",
    "es": "un antecedente",
    "exampleFr": "L’antécédent du pronom relatif doit être identifié.",
    "exampleEs": "Debe identificarse el antecedente del pronombre relativo."
  },
  {
    "id": "gra-4",
    "category": "Grammaire",
    "fr": "une proposition principale",
    "es": "una oración principal",
    "exampleFr": "La proposition principale contient le noyau de la phrase complexe.",
    "exampleEs": "La oración principal contiene el núcleo de la frase compleja."
  },
  {
    "id": "gra-5",
    "category": "Grammaire",
    "fr": "une proposition subordonnée",
    "es": "una oración subordinada",
    "exampleFr": "La subordonnée dépend d’une autre proposition.",
    "exampleEs": "La subordinada depende de otra oración."
  },
  {
    "id": "gra-6",
    "category": "Grammaire",
    "fr": "une subordonnée circonstancielle",
    "es": "una subordinada circunstancial",
    "exampleFr": "La subordonnée circonstancielle exprime ici la cause.",
    "exampleEs": "La subordinada circunstancial expresa aquí la causa."
  },
  {
    "id": "gra-7",
    "category": "Grammaire",
    "fr": "un complément d’objet direct",
    "es": "un complemento directo",
    "exampleFr": "Le complément d’objet direct est construit sans préposition en français.",
    "exampleEs": "El complemento directo se construye sin preposición en francés."
  },
  {
    "id": "gra-8",
    "category": "Grammaire",
    "fr": "un complément du nom",
    "es": "un complemento del nombre",
    "exampleFr": "Le complément du nom précise le sens du nom.",
    "exampleEs": "El complemento del nombre precisa el significado del sustantivo."
  },
  {
    "id": "gra-9",
    "category": "Grammaire",
    "fr": "la modalité",
    "es": "la modalidad",
    "exampleFr": "La modalité traduit l’attitude du locuteur.",
    "exampleEs": "La modalidad expresa la actitud del hablante."
  },
  {
    "id": "gra-10",
    "category": "Grammaire",
    "fr": "l’aspect accompli",
    "es": "el aspecto perfectivo / cumplido",
    "exampleFr": "L’aspect accompli présente le procès comme achevé.",
    "exampleEs": "El aspecto perfectivo presenta el proceso como terminado."
  },
  {
    "id": "gra-11",
    "category": "Grammaire",
    "fr": "la valeur temporelle",
    "es": "el valor temporal",
    "exampleFr": "Le présent a ici une valeur historique.",
    "exampleEs": "El presente tiene aquí un valor histórico."
  },
  {
    "id": "gra-12",
    "category": "Grammaire",
    "fr": "la mise en relief",
    "es": "la focalización enfática",
    "exampleFr": "La mise en relief attire l’attention sur un constituant.",
    "exampleEs": "La focalización enfática llama la atención sobre un constituyente."
  },
  {
    "id": "gra-13",
    "category": "Grammaire",
    "fr": "la voix passive",
    "es": "la voz pasiva",
    "exampleFr": "La voix passive place le patient au premier plan.",
    "exampleEs": "La voz pasiva coloca al paciente en primer plano."
  },
  {
    "id": "gra-14",
    "category": "Grammaire",
    "fr": "un connecteur logique",
    "es": "un conector lógico",
    "exampleFr": "Le connecteur logique indique une concession.",
    "exampleEs": "El conector lógico indica una concesión."
  },
  {
    "id": "gra-15",
    "category": "Grammaire",
    "fr": "une reprise anaphorique",
    "es": "una referencia anafórica",
    "exampleFr": "La reprise anaphorique assure la cohésion du texte.",
    "exampleEs": "La referencia anafórica garantiza la cohesión del texto."
  },
  {
    "id": "fau-1",
    "category": "Faux amis",
    "fr": "assister à",
    "es": "asistir a",
    "exampleFr": "J’ai assisté à la réunion signifie que j’y étais présente.",
    "exampleEs": "Asistí a la reunión significa que estuve presente."
  },
  {
    "id": "fau-2",
    "category": "Faux amis",
    "fr": "aider",
    "es": "ayudar",
    "exampleFr": "Assister quelqu’un signifie l’aider, pas être présent.",
    "exampleEs": "Asistir a alguien significa ayudarlo, no estar presente."
  },
  {
    "id": "fau-3",
    "category": "Faux amis",
    "fr": "actuellement",
    "es": "actualmente",
    "exampleFr": "Actuellement signifie « en ce moment ».",
    "exampleEs": "Actualmente significa « en este momento »."
  },
  {
    "id": "fau-4",
    "category": "Faux amis",
    "fr": "éventuellement",
    "es": "posiblemente / si procede",
    "exampleFr": "Éventuellement ne signifie pas finalement.",
    "exampleEs": "Éventuellement no significa finalmente."
  },
  {
    "id": "fau-5",
    "category": "Faux amis",
    "fr": "prétendre",
    "es": "afirmar / aspirar a",
    "exampleFr": "Il prétend que le texte est neutre.",
    "exampleEs": "Afirma que el texto es neutral."
  },
  {
    "id": "fau-6",
    "category": "Faux amis",
    "fr": "introduire",
    "es": "introducir / presentar",
    "exampleFr": "On introduit une notion, mais on présente une personne.",
    "exampleEs": "Se introduce una noción, pero se presenta a una persona."
  },
  {
    "id": "fau-7",
    "category": "Faux amis",
    "fr": "réaliser",
    "es": "darse cuenta / realizar",
    "exampleFr": "J’ai réalisé mon erreur signifie que je m’en suis rendu compte.",
    "exampleEs": "Me di cuenta de mi error."
  },
  {
    "id": "fau-8",
    "category": "Faux amis",
    "fr": "sensible",
    "es": "sensible / delicado",
    "exampleFr": "C’est une question sensible, donc délicate.",
    "exampleEs": "Es una cuestión sensible, por tanto delicada."
  },
  {
    "id": "fau-9",
    "category": "Faux amis",
    "fr": "une issue",
    "es": "una salida / un desenlace",
    "exampleFr": "L’issue du conflit reste incertaine.",
    "exampleEs": "El desenlace del conflicto sigue siendo incierto."
  },
  {
    "id": "fau-10",
    "category": "Faux amis",
    "fr": "une librairie",
    "es": "una librería",
    "exampleFr": "Une librairie vend des livres.",
    "exampleEs": "Una librería vende libros."
  },
  {
    "id": "fau-11",
    "category": "Faux amis",
    "fr": "une bibliothèque",
    "es": "una biblioteca",
    "exampleFr": "La bibliothèque prête des ouvrages.",
    "exampleEs": "La biblioteca presta libros."
  },
  {
    "id": "fau-12",
    "category": "Faux amis",
    "fr": "un avertissement",
    "es": "una advertencia",
    "exampleFr": "Le rapport contient plusieurs avertissements méthodologiques.",
    "exampleEs": "El informe contiene varias advertencias metodológicas."
  },
  {
    "id": "fau-13",
    "category": "Faux amis",
    "fr": "un concours",
    "es": "una oposición / un concurso",
    "exampleFr": "Le CAFEP est un concours de recrutement.",
    "exampleEs": "El CAFEP es una oposición de acceso."
  },
  {
    "id": "fau-14",
    "category": "Faux amis",
    "fr": "une formation",
    "es": "una formación",
    "exampleFr": "La formation universitaire ne suffit pas sans entraînement.",
    "exampleEs": "La formación universitaria no basta sin entrenamiento."
  },
  {
    "id": "fau-15",
    "category": "Faux amis",
    "fr": "une remarque",
    "es": "una observación",
    "exampleFr": "Le jury formule une remarque sur la langue.",
    "exampleEs": "El tribunal formula una observación sobre la lengua."
  },
  {
    "id": "tra-1",
    "category": "Transition espagnole",
    "fr": "le franquisme",
    "es": "el franquismo",
    "exampleFr": "Le franquisme ne disparaît pas en un jour.",
    "exampleEs": "El franquismo no desaparece en un día."
  },
  {
    "id": "tra-2",
    "category": "Transition espagnole",
    "fr": "la Transition démocratique",
    "es": "la Transición democrática",
    "exampleFr": "La Transition démocratique est un processus conflictuel.",
    "exampleEs": "La Transición democrática es un proceso conflictivo."
  },
  {
    "id": "tra-3",
    "category": "Transition espagnole",
    "fr": "la loi pour la réforme politique",
    "es": "la Ley para la Reforma Política",
    "exampleFr": "La loi ouvre la voie aux élections de 1977.",
    "exampleEs": "La ley abre el camino a las elecciones de 1977."
  },
  {
    "id": "tra-4",
    "category": "Transition espagnole",
    "fr": "les Pactes de la Moncloa",
    "es": "los Pactos de la Moncloa",
    "exampleFr": "Les Pactes cherchent un compromis économique et politique.",
    "exampleEs": "Los Pactos buscan un compromiso económico y político."
  },
  {
    "id": "tra-5",
    "category": "Transition espagnole",
    "fr": "la Constitution de 1978",
    "es": "la Constitución de 1978",
    "exampleFr": "La Constitution établit une monarchie parlementaire.",
    "exampleEs": "La Constitución establece una monarquía parlamentaria."
  },
  {
    "id": "tra-6",
    "category": "Transition espagnole",
    "fr": "l’État des autonomies",
    "es": "el Estado de las autonomías",
    "exampleFr": "L’État des autonomies organise la diversité territoriale.",
    "exampleEs": "El Estado de las autonomías organiza la diversidad territorial."
  },
  {
    "id": "tra-7",
    "category": "Transition espagnole",
    "fr": "la tentative de coup d’État",
    "es": "el intento de golpe de Estado",
    "exampleFr": "Le 23-F révèle la fragilité de la démocratie.",
    "exampleEs": "El 23-F revela la fragilidad de la democracia."
  },
  {
    "id": "tra-8",
    "category": "Transition espagnole",
    "fr": "l’amnistie",
    "es": "la amnistía",
    "exampleFr": "La loi d’amnistie de 1977 reste au cœur des débats.",
    "exampleEs": "La ley de amnistía de 1977 sigue en el centro de los debates."
  },
  {
    "id": "tra-9",
    "category": "Transition espagnole",
    "fr": "le récit du consensus",
    "es": "el relato del consenso",
    "exampleFr": "Le récit du consensus a été réévalué par les historiens.",
    "exampleEs": "El relato del consenso ha sido reevaluado por los historiadores."
  },
  {
    "id": "tra-10",
    "category": "Transition espagnole",
    "fr": "la mémoire démocratique",
    "es": "la memoria democrática",
    "exampleFr": "La mémoire démocratique interroge le traitement public du passé.",
    "exampleEs": "La memoria democrática cuestiona el tratamiento público del pasado."
  },
  {
    "id": "tra-11",
    "category": "Transition espagnole",
    "fr": "la rupture démocratique",
    "es": "la ruptura democrática",
    "exampleFr": "Une partie de l’opposition réclamait une rupture démocratique.",
    "exampleEs": "Una parte de la oposición reclamaba una ruptura democrática."
  },
  {
    "id": "tra-12",
    "category": "Transition espagnole",
    "fr": "la réforme négociée",
    "es": "la reforma negociada",
    "exampleFr": "La réforme négociée combine compromis et rapports de force.",
    "exampleEs": "La reforma negociada combina compromisos y relaciones de fuerza."
  },
  {
    "id": "ora-1",
    "category": "Oral professionnel",
    "fr": "se projeter dans le métier",
    "es": "proyectarse en la profesión",
    "exampleFr": "Le candidat doit se projeter dans le métier de professeur.",
    "exampleEs": "El candidato debe proyectarse en la profesión docente."
  },
  {
    "id": "ora-2",
    "category": "Oral professionnel",
    "fr": "prendre du recul",
    "es": "tomar distancia",
    "exampleFr": "Prendre du recul permet d’analyser une expérience.",
    "exampleEs": "Tomar distancia permite analizar una experiencia."
  },
  {
    "id": "ora-3",
    "category": "Oral professionnel",
    "fr": "valoriser son parcours",
    "es": "poner en valor su trayectoria",
    "exampleFr": "Il faut valoriser son parcours sans réciter son CV.",
    "exampleEs": "Hay que poner en valor la trayectoria sin recitar el currículum."
  },
  {
    "id": "ora-4",
    "category": "Oral professionnel",
    "fr": "une mise en situation",
    "es": "un caso práctico",
    "exampleFr": "La mise en situation exige une réponse structurée.",
    "exampleEs": "El caso práctico exige una respuesta estructurada."
  },
  {
    "id": "ora-5",
    "category": "Oral professionnel",
    "fr": "faire cesser une situation",
    "es": "hacer que cese una situación",
    "exampleFr": "La priorité est de faire cesser les propos discriminatoires.",
    "exampleEs": "La prioridad es hacer que cesen los comentarios discriminatorios."
  },
  {
    "id": "ora-6",
    "category": "Oral professionnel",
    "fr": "alerter la hiérarchie",
    "es": "informar a la jerarquía",
    "exampleFr": "Il faut alerter la hiérarchie selon le protocole.",
    "exampleEs": "Hay que informar a la jerarquía según el protocolo."
  },
  {
    "id": "ora-7",
    "category": "Oral professionnel",
    "fr": "travailler en équipe",
    "es": "trabajar en equipo",
    "exampleFr": "Un professeur ne gère pas seul toutes les difficultés.",
    "exampleEs": "Un profesor no gestiona solo todas las dificultades."
  },
  {
    "id": "ora-8",
    "category": "Oral professionnel",
    "fr": "adapter sa réponse",
    "es": "adaptar su respuesta",
    "exampleFr": "Jennifer adapte sa réponse aux informations données.",
    "exampleEs": "Jennifer adapta su respuesta a la información proporcionada."
  },
  {
    "id": "ora-9",
    "category": "Oral professionnel",
    "fr": "reconnaître une limite",
    "es": "reconocer un límite",
    "exampleFr": "Reconnaître une limite peut montrer une posture professionnelle.",
    "exampleEs": "Reconocer un límite puede mostrar una postura profesional."
  },
  {
    "id": "ora-10",
    "category": "Oral professionnel",
    "fr": "proposer un suivi",
    "es": "proponer un seguimiento",
    "exampleFr": "La réponse doit inclure un suivi de la situation.",
    "exampleEs": "La respuesta debe incluir un seguimiento de la situación."
  },
  {
    "id": "ora-11",
    "category": "Oral professionnel",
    "fr": "une posture professionnelle",
    "es": "una actitud profesional",
    "exampleFr": "La posture professionnelle associe calme, clarté et responsabilité.",
    "exampleEs": "La actitud profesional combina calma, claridad y responsabilidad."
  },
  {
    "id": "ora-12",
    "category": "Oral professionnel",
    "fr": "une réponse argumentée",
    "es": "una respuesta argumentada",
    "exampleFr": "Le jury attend une réponse argumentée, non un slogan.",
    "exampleEs": "El tribunal espera una respuesta argumentada, no un eslogan."
  },
  {
    "id": "cla-1",
    "category": "Classe",
    "fr": "un élève en difficulté",
    "es": "un alumno con dificultades",
    "exampleFr": "L’élève en difficulté bénéficie d’un étayage ciblé.",
    "exampleEs": "El alumno con dificultades recibe un apoyo específico."
  },
  {
    "id": "cla-2",
    "category": "Classe",
    "fr": "les acquis",
    "es": "los aprendizajes adquiridos",
    "exampleFr": "La séance réactive les acquis de la semaine précédente.",
    "exampleEs": "La sesión reactiva los aprendizajes de la semana anterior."
  },
  {
    "id": "cla-3",
    "category": "Classe",
    "fr": "les besoins",
    "es": "las necesidades",
    "exampleFr": "Les besoins des élèves guident les adaptations.",
    "exampleEs": "Las necesidades del alumnado guían las adaptaciones."
  },
  {
    "id": "cla-4",
    "category": "Classe",
    "fr": "une erreur récurrente",
    "es": "un error recurrente",
    "exampleFr": "Une erreur récurrente doit devenir un objectif de remédiation.",
    "exampleEs": "Un error recurrente debe convertirse en un objetivo de refuerzo."
  },
  {
    "id": "cla-5",
    "category": "Classe",
    "fr": "une production attendue",
    "es": "una producción esperada",
    "exampleFr": "La production attendue est annoncée dans la consigne.",
    "exampleEs": "La producción esperada se anuncia en la consigna."
  },
  {
    "id": "cla-6",
    "category": "Classe",
    "fr": "mettre les élèves en activité",
    "es": "poner al alumnado a trabajar",
    "exampleFr": "La séance doit mettre les élèves en activité rapidement.",
    "exampleEs": "La sesión debe poner al alumnado a trabajar rápidamente."
  },
  {
    "id": "cla-7",
    "category": "Classe",
    "fr": "faire verbaliser",
    "es": "hacer verbalizar",
    "exampleFr": "Faire verbaliser une stratégie aide à la réutiliser.",
    "exampleEs": "Hacer verbalizar una estrategia ayuda a reutilizarla."
  },
  {
    "id": "cla-8",
    "category": "Classe",
    "fr": "circuler dans la classe",
    "es": "circular por el aula",
    "exampleFr": "Le professeur circule pour observer et aider.",
    "exampleEs": "El profesor circula para observar y ayudar."
  },
  {
    "id": "cla-9",
    "category": "Classe",
    "fr": "mettre en commun",
    "es": "poner en común",
    "exampleFr": "La mise en commun permet de comparer les réponses.",
    "exampleEs": "La puesta en común permite comparar las respuestas."
  },
  {
    "id": "cla-10",
    "category": "Classe",
    "fr": "donner une rétroaction",
    "es": "dar retroalimentación",
    "exampleFr": "La rétroaction indique ce qui est réussi et ce qui doit évoluer.",
    "exampleEs": "La retroalimentación indica lo logrado y lo que debe mejorar."
  },
  {
    "id": "cla-11",
    "category": "Classe",
    "fr": "autonomiser",
    "es": "fomentar la autonomía",
    "exampleFr": "L’objectif est d’autonomiser progressivement les élèves.",
    "exampleEs": "El objetivo es fomentar progresivamente la autonomía."
  },
  {
    "id": "cla-12",
    "category": "Classe",
    "fr": "réinvestir",
    "es": "reutilizar / transferir",
    "exampleFr": "Les élèves réinvestissent le lexique dans une nouvelle tâche.",
    "exampleEs": "El alumnado reutiliza el léxico en una nueva tarea."
  }
];

(function(){
  const STATE_KEY='billete-flash-srs-v2', DAY=24*60*60*1000;
  let filtered=[...FLASHCARDS], index=0, revealed=false, direction='es-fr';
  const $=id=>document.getElementById(id);
  function state(){try{return JSON.parse(localStorage.getItem(STATE_KEY)||'{}')}catch(e){return {}}}
  function save(s){localStorage.setItem(STATE_KEY,JSON.stringify(s));updateStats();}
  function cardState(id){return state()[id]||{level:0,due:0,seen:0,good:0,hard:0};}
  function updateStats(){
    const s=state(), now=Date.now();
    const due=FLASHCARDS.filter(c=>!s[c.id]||(s[c.id].due||0)<=now).length;
    const mastered=FLASHCARDS.filter(c=>(s[c.id]?.level||0)>=4).length;
    const seen=FLASHCARDS.filter(c=>(s[c.id]?.seen||0)>0).length;
    if($('flashDue'))$('flashDue').textContent=due;if($('flashSeen'))$('flashSeen').textContent=seen;if($('flashMastered'))$('flashMastered').textContent=mastered;
  }
  function current(){return filtered[index]}
  function render(){
    if(!filtered.length){$('flashPrompt').textContent='Aucune carte';$('flashAnswer').textContent='Modifie la recherche.';$('flashCounter').textContent='0 / 0';return;}
    index=(index+filtered.length)%filtered.length;const c=current();revealed=false;
    $('flashCat').textContent=c.category;
    $('flashPromptLang').textContent=direction==='es-fr'?'ESPAÑOL → FRANÇAIS':'FRANÇAIS → ESPAÑOL';
    $('flashPrompt').textContent=direction==='es-fr'?c.es:c.fr;
    $('flashAnswer').textContent=direction==='es-fr'?c.fr:c.es;
    $('flashExFr').innerHTML='<strong>FR :</strong> '+c.exampleFr;
    $('flashExEs').innerHTML='<strong>ES :</strong> '+c.exampleEs;
    $('flashAnswerPanel').hidden=true;$('flashRatings').hidden=true;$('revealAnswer').hidden=false;
    $('flashCounter').textContent=(index+1)+' / '+filtered.length;
  }
  function apply(){
    const q=$('flashSearch').value.trim().toLowerCase(),cat=$('flashCategory').value;
    filtered=FLASHCARDS.filter(c=>(cat==='all'||c.category===cat)&&(!q||Object.values(c).join(' ').toLowerCase().includes(q)));index=0;render();
  }
  function dueOnly(){
    const s=state(),now=Date.now();filtered=FLASHCARDS.filter(c=>!s[c.id]||(s[c.id].due||0)<=now);index=0;render();if(window.toast)toast(`${filtered.length} carte(s) à revoir maintenant.`)
  }
  function rate(kind){
    const c=current();if(!c)return;const s=state(),x=s[c.id]||{level:0,due:0,seen:0,good:0,hard:0};x.seen++;
    if(kind==='good'){x.level=Math.min(5,(x.level||0)+1);x.good++;const days=[1,3,7,14,30,60][x.level]||60;x.due=Date.now()+days*DAY;}
    if(kind==='almost'){x.level=Math.max(1,x.level||0);x.hard++;x.due=Date.now()+DAY;if(window.BilleteFrench)BilleteFrench.addError({id:`flash-${c.id}`,source:'Flashcards',type:'Presque',prompt:c.es,answer:c.fr,note:c.exampleFr});}
    if(kind==='again'){x.level=0;x.hard++;x.due=Date.now();if(window.BilleteFrench)BilleteFrench.addError({id:`flash-${c.id}`,source:'Flashcards',type:'À revoir',prompt:c.es,answer:c.fr,note:c.exampleFr});}
    s[c.id]=x;save(s);index++;render();
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const cats=[...new Set(FLASHCARDS.map(c=>c.category))];cats.forEach(c=>$('flashCategory').insertAdjacentHTML('beforeend',`<option value="${c}">${c}</option>`));
    $('nextCard').onclick=()=>{index++;render()};$('prevCard').onclick=()=>{index--;render()};$('flashSearch').oninput=apply;$('flashCategory').onchange=apply;
    $('shuffleCards').onclick=()=>{filtered.sort(()=>Math.random()-.5);index=0;render();toast('Cartes mélangées.')};
    $('flashDirection').onchange=e=>{direction=e.target.value;render()};$('reviewDue').onclick=dueOnly;
    $('revealAnswer').onclick=()=>{$('flashAnswerPanel').hidden=false;$('flashRatings').hidden=false;$('revealAnswer').hidden=true;revealed=true};
    $('speakPrompt').onclick=()=>{const c=current();if(c)speak(direction==='es-fr'?c.es:c.fr,direction==='es-fr'?'es-ES':'fr-FR')};
    $('speakAnswer').onclick=()=>{const c=current();if(c)speak(direction==='es-fr'?c.fr:c.es,direction==='es-fr'?'fr-FR':'es-ES')};
    document.querySelectorAll('[data-flash-rate]').forEach(b=>b.onclick=()=>rate(b.dataset.flashRate));
    updateStats();render();
  });
})();
