import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const dciElements = [
  {id:2,text:"The sun is a star that appears larger and brighter than other stars because it is closer. Stars range greatly in their distance from Earth. (5-ESS1-1)  [5.ESS1.A.1]",sub:"ESS1.A: The Universe and Its Stars",dom:"ESS"},
  {id:3,text:"The orbits of Earth around the sun and of the moon around Earth, together with the rotation of Earth about an axis between its North and South poles, cause observable patterns. These include day and night; daily changes in the length and direction of shadows; and different positions of the sun, moon, and stars at different times of the day, month, and year. (5-ESS1-2)  [5.ESS1.B.2]",sub:"ESS1.B: Earth and The Solar System",dom:"ESS"},
  {id:4,text:"Patterns of seasons can be observed, described, and predicted. [5.ESS1.B.1]",sub:"ESS1.B: Earth and The Solar System",dom:"ESS"},
  {id:5,text:"Local, regional, and global patterns of rock formations reveal changes over time due to earth forces, such as earthquakes. The presence and location of certain fossil types indicate the order in which rock layers were formed. (4- ESS1-1) [4.ESS1.C.1]",sub:"ESS1.C The History of Planet Earth",dom:"ESS"},
  {id:6,text:"Rainfall helps to shape the land and affects the types of living things found in a region. Water, ice, wind, living organisms, and gravity break rocks, soils, and sediments into smaller particles and move them around. (4-ESS2-1) [4.ESS2.A.1]",sub:"ESS2.A Earth's Materials and Systems",dom:"ESS"},
  {id:7,text:"Earth’s major systems are the geosphere (solid and molten rock, soil, and sediments), the hydrosphere (water and ice), the atmosphere (air), and the biosphere (living things, including humans). These systems interact in multiple ways to affect Earth’s surface materials and processes. The ocean supports a variety of ecosystems and organisms, shapes landforms, and influences climate. Winds and clouds in the atmosphere interact with the landforms to determine patterns of weather. (5-ESS2-1) [5.ESS2.A.1]",sub:"ESS2.A Earth's Materials and Systems",dom:"ESS"},
  {id:8,text:"The locations of mountain ranges, deep ocean trenches, ocean floor structures, earthquakes, and volcanoes occur in patterns. Most earthquakes and volcanoes occur in bands that are often along the boundaries between continents and oceans. Major mountain chains form inside continents or near their edges. Maps can help locate the different land and water features areas of Earth. (4-ESS2-2) [4.ESS2.B.1]",sub:"ESS2.B Plate Tectonics and Large Scale System Interactions",dom:"ESS"},
  {id:9,text:"Nearly all of Earth’s available water is in the ocean. Most fresh water is in glaciers or underground; only a tiny fraction is in streams, lakes, wetlands, and the atmosphere. (5-ESS2-2) [5.ESS2.C.1]",sub:"ESS2.C The Role of Water in Earth's Surface Processes",dom:"ESS"},
  {id:10,text:"Scientists record patterns of the weather across different times and areas so that they can make predictions about what kind of weather might happen next. (3-ESS2-1) [3.ESS2.D.1]",sub:"ESS2.D Weather and Climate",dom:"ESS"},
  {id:11,text:"Climate describes a range of an area's typical weather conditions and the extent to which those conditions vary over years. (3- ESS2-2) [3.ESS2.D.2]",sub:"ESS2.D Weather and Climate",dom:"ESS"},
  {id:12,text:"Living things affect the physical characteristics of their regions. (4-ESS2-1)",sub:"ESS2.E Biogeology",dom:"ESS"},
  {id:13,text:"Energy and fuels that humans use are derived from natural sources, and their use affects the environment in multiple ways. Some resources are renewable over time, and others are not. (4-ESS3-1)",sub:"ESS3.A Natural Resources",dom:"ESS"},
  {id:14,text:"A variety of natural hazards result from natural processes. Humans cannot eliminate natural hazards but can take steps to reduce their impacts. (3-ESS3-1) (4-ESS3-2.) [3.ESS3.B.1] [4.ESS3.A.1]",sub:"ESS3.B Natural Hazards",dom:"ESS"},
  {id:15,text:"Human activities in agriculture, industry, and everyday life have had major effects on the land, vegetation, streams, ocean, air, and even outer space. But individuals and communities are doing things to help protect Earth’s resources and environments. (5-ESS3-1) [5.ESS3.C.1]",sub:"ESS3.C Human Impacts on Earth Systems",dom:"ESS"},
  {id:16,text:"Plants and animals have both internal and external structures that serve various functions in growth, survival, behavior, and reproduction. (4-LS1-1) [4.LS1.A.1]",sub:"LS1.A Structure and Function",dom:"LS"},
  {id:17,text:"Organisms have both internal and external macroscopic structures that allow for growth, survival, behavior, and reproduction with organs that are specialized for particular body functions [5.LS1.A.1]",sub:"LS1.A Structure and Function",dom:"LS"},
  {id:18,text:"Reproduction is essential to the continued existence of every kind of organism. Plants and animals have unique and diverse life cycles. (3-LS1- 1) [3.LS1.B.1]",sub:"LS1.B Growth and Development of Organisms",dom:"LS"},
  {id:19,text:"Food provides animals with the materials they need for body repair and growth and the energy they need to maintain body warmth and for motion. (secondary to 5-PS3-1) [secondary to 5.PS3.D.1]",sub:"LS1.C Organization for Matter and Energy Flow in Organisms",dom:"LS"},
  {id:20,text:"Plants acquire their material for growth chiefly from air and water. (5- LS1-1) [5.LS1.C.1]",sub:"LS1.C Organization for Matter and Energy Flow in Organisms",dom:"LS"},
  {id:21,text:"Different sense receptors are specialized for particular kinds of information, which may be then processed by the animal’s brain. Animals are able to use their perceptions and memories to guide their actions. (4-LS1-2) [4.LS1.D.1]",sub:"LS1.D Information Processing",dom:"LS"},
  {id:22,text:"The food of almost any kind of animal can be traced back to plants. Organisms are related in food webs in which some animals eat plants for food and other animals eat the animals that eat plants. Some organisms, such as fungi and bacteria, break down dead organisms (both plants or plants parts and animals) and therefore operate as “decomposers.” Decomposition eventually restores (recycles) some materials back to the soil. Organisms can survive only in environments in which their particular needs are met. A healthy ecosystem is one in which multiple species of different types are each able to meet their needs in a relatively stable web of life. Newly introduced species can damage the balance of an ecosystem. (5-LS2-1) [5.LS2.B.1]",sub:"LS2.A Interdependent Relationships in Ecosystems",dom:"LS"},
  {id:23,text:"Matter cycles between the air and soil and among plants, animals, and microbes as these organisms live and die. Organisms obtain gases, and water, from the environment, and release waste matter (gas, liquid, or solid) back into the environment. (5-LS2-1) [5.LS2.B.1]",sub:"LS2.B: Cycles of Matter and Energy Transfer in Ecosystems",dom:"LS"},
  {id:24,text:"When the environment changes in ways that affect a place’s physical characteristics, temperature, or availability of resources, some organisms survive and reproduce, others move to new locations, yet others move into the transformed environment, and some die. (secondary to 3-LS4-4)  [secondary to 3.LS3.D.1]",sub:"LS2.C: Ecosystem Dynamics, Functioning, and Resilience",dom:"LS"},
  {id:25,text:"Being part of a group helps animals obtain food, defend themselves, and cope with changes. Groups may serve different functions and vary dramatically in size (Note: Moved from K–2). (3-LS2-1)",sub:"LS2.D: Social Interactions and Group Behavior",dom:"LS"},
  {id:26,text:"Many characteristics of organisms are inherited from their parents. (3- LS3-1)",sub:"LS3.A Inheritance of Traits",dom:"LS"},
  {id:27,text:"Other characteristics result from individuals’ interactions with the environment, which can range from diet to learning. Many characteristics involve both inheritance and environment. (3- LS3-2)  [3.LS3.A.1]",sub:"LS3.A Inheritance of Traits",dom:"LS"},
  {id:28,text:"Different organisms vary in how they look and function because they have different inherited information. (3- LS3-1)  [3.LS3.A.1]",sub:"LS3.B Varitation of Traits",dom:"LS"},
  {id:29,text:"The environment also affects the traits that an organism develops. (3- LS3-2)",sub:"LS3.B Varitation of Traits",dom:"LS"},
  {id:30,text:"Some kinds of plants and animals that once lived on Earth are no longer found anywhere. (Note: moved from K-2) (3-LS4-1)",sub:"LS4.A: Evidence of Common Ancestry and Diversity",dom:"LS"},
  {id:31,text:"Fossils provide evidence about the types of organisms that lived long ago and also about the nature of their environments. (3-LS4-1)",sub:"LS4.A: Evidence of Common Ancestry and Diversity",dom:"LS"},
  {id:32,text:"Sometimes the differences in characteristics between individuals of the same species provide advantages in surviving, finding mates, and reproducing. (3-LS4-2) [3.LS3.B.1]",sub:"LS4.B: Natural Selection",dom:"LS"},
  {id:33,text:"For any particular environment, some kinds of organisms survive well, some survive less well, and some cannot survive at all. (3-LS4-3) [3.LS3.C.1]",sub:"LS4.C: Adaptation",dom:"LS"},
  {id:34,text:"Populations live in a variety of habitats, and change in those habitats affects the organisms living there. (3-LS4-4) [3.LS3.D.1]",sub:"LS4.D Biodiversity and Humans",dom:"LS"},
  {id:35,text:"Matter of any type can be subdivided into particles that are too small to see, but even then the matter still exists and can be detected by other means. A model shows that gases are made from matter particles that are too small to see and are moving freely around in space can explain many observations, including the inflation and shape of a balloon; the effects of air on larger particles or objects. (5-PS1-1) [5.PS1.A.1]",sub:"PS1.A: Structure and Properties of Matter",dom:"PS"},
  {id:36,text:"The amount (weight) of matter is conserved when it changes form, even in transitions in which it seems to vanish. (5-PS1-2) [5.PS1.A.2]",sub:"PS1.A: Structure and Properties of Matter",dom:"PS"},
  {id:37,text:"Measurements of a variety of properties can be used to identify materials. (Boundary: At this grade level, mass and weight are not distinguished, and no attempt is made to define the unseen particles or explain the atomic-scale mechanism of evaporation and condensation.) (5-PS1-3) [5.PS1.B.1]",sub:"PS1.A: Structure and Properties of Matter",dom:"PS"},
  {id:38,text:"Predict and investigate that water can change from a liquid to a solid (freeze), and back again (melt), or from a liquid to a gas (evaporation), and back again (condensation) as the result of temperature changes. [3.PS1.A.1]",sub:"PS1.A: Structure and Properties of Matter",dom:"PS"},
  {id:39,text:"When two or more different substances are mixed, a new substance with different properties may be formed. (5-PS1-4) [5.PS1.B.2]",sub:"PS1.B Chemical reactions",dom:"PS"},
  {id:40,text:"No matter what reaction or change in properties occurs, the total weight of the substances does not change. (Boundary: Mass and weight are not distinguished at this grade level.) (5-PS1-2) [5.PS1.A.2]",sub:"PS1.B Chemical reactions",dom:"PS"},
  {id:41,text:"Each force acts on one particular object and has both strength and a direction. An object at rest typically has multiple forces acting on it, but they add to give zero net force on the object. Forces that do not sum to zero can cause changes in the object’s speed or direction of motion. (Boundary: Qualitative and conceptual, but not quantitative addition of forces are used at this level.) (3-PS2-1) [4.PS2.A.2]",sub:"PS2.A Forces and motion",dom:"PS"},
  {id:42,text:"The patterns of an object’s motion in various situations can be observed and measured; when that past motion exhibits a regular pattern, future motion can be predicted from it. (Boundary: Technical terms, such as magnitude, velocity, momentum, and vector quantity, are not introduced at this level, but the concept that some quantities need both size and direction to be described is developed.) (3-PS2-2) [4.PS2.A.1]",sub:"PS2.A Forces and motion",dom:"PS"},
  {id:43,text:"Objects in contact exert forces on each other. (3-PS2-1)",sub:"PS2.B Types of Interactions",dom:"PS"},
  {id:44,text:"Electric, and magnetic forces between a pair of objects do not require that the objects be in contact. The sizes of the forces in each situation depend on the properties of the objects and their distances apart and, for forces between two magnets, on their orientation relative to each other. (3-PS2- 3),(3-PS2-4) [3.PS2.B.1]",sub:"PS2.B Types of Interactions",dom:"PS"},
  {id:45,text:"The gravitational force of Earth acting on an object near Earth’s surface pulls that object toward the planet’s center. (5-PS2-1) [5.PS2.B.1]",sub:"PS2.B Types of Interactions",dom:"PS"},
  {id:46,text:"Heating or cooling a substance may cause changes that can be observed. Sometimes these changes are reversible, and sometimes they are not. [3.PS1.B.1]",sub:"PS2.B Types of Interactions",dom:"PS"},
  {id:47,text:"The effect of unbalanced forces on an object results in a change of motion. Patterns of motion can be used to predict future motion. Some forces act through contact; some forces act even when the objects are not in contact. The gravitational force of Earth acting on an object near Earth’s surface pulls that object toward Earth’s center. [4.PS2.B.1] [4.PS2.B.2]",sub:"PS2.B Types of Interactions",dom:"PS"},
  {id:48,text:"The faster a given object is moving, the more energy it possesses. (4-PS3-1) [4.PS3.A.1]",sub:"PS3.A Definitions of energy",dom:"PS"},
  {id:49,text:"Energy can be moved from place to place by moving objects or through sound, light, or electric currents. (4-PS3-2),(4-PS3-3)",sub:"PS3.A Definitions of energy",dom:"PS"},
  {id:50,text:"Energy is present whenever there are moving objects, sound, light, or heat. When objects collide, energy can be transferred from one object to another, thereby changing their motion. In such collisions, some energy is typically also transferred to the surrounding air; as a result, the air gets heated and sound is produced. (4-PS3-2),(4-PS3-3)",sub:"PS3.B Conservation of energy and energy transfer",dom:"PS"},
  {id:51,text:"Light also transfers energy from place to place. (4-PS3-2)",sub:"PS3.B Conservation of energy and energy transfer",dom:"PS"},
  {id:52,text:"Energy can also be transferred from place to place by electric currents, which can then be used locally to produce motion, sound, heat, or light. The currents may have been produced to begin with by transforming the energy of motion into electrical energy. (4- PS3-2),(4-PS3-4) [4.PS3.B.1] [4.PS3.B.2]",sub:"PS3.B Conservation of energy and energy transfer",dom:"PS"},
  {id:53,text:"When objects collide, the contact forces transfer energy so as to change the objects’ motions. (4-PS3-3)",sub:"PS3.C Relationship between energy and forces",dom:"PS"},
  {id:54,text:"A simple machine can change the amount of force or distance necessary to do work.[4.PS3.C.1]",sub:"PS3.C Relationship between energy and forces",dom:"PS"},
  {id:55,text:"The expression “produce energy” typically refers to the conversion of stored energy into a desired form for practical use. (4-PS3- 4) [4.PS3.B.2]",sub:"PS3.D: Energy in Chemical Processes and Everyday Life",dom:"PS"},
  {id:56,text:"The energy released [from] food was once energy from the sun that was captured by plants in the chemical process that forms plant matter (from air and water). (5-PS3-1) [5.PS3.D.1]",sub:"PS3.D: Energy in Chemical Processes and Everyday Life",dom:"PS"},
  {id:57,text:"Waves, which are regular patterns of motion, can be made in water by disturbing the surface. When waves move across the surface of deep water, the water goes up and down in place; it does not move in the direction of the wave except when the water meets the beach. (Note: This grade band endpoint was moved from K–2.) (4- PS4-1) [4.PS4.A.1]",sub:"PS4.A Wave properties",dom:"PS"},
  {id:58,text:"Waves of the same type can differ in amplitude (height of the wave) and wavelength (spacing between wave peaks). (4-PS4-1) [4.PS4.A.1]",sub:"PS4.A Wave properties",dom:"PS"},
  {id:59,text:"An object can be seen when light reflected from its surface enters the eyes. (4-PS4-2) [5.PS4.A.1]",sub:"PS4.B Electromagnetic radiation",dom:"PS"},
  {id:60,text:"Some materials allow light to pass through them, others allow only some light through and others block all the light and create a dark shadow on any surface beyond them, where the light cannot reach. Mirrors can be used to redirect a light beam. (Boundary: The idea that light travels from place to place is developed through experiences with light sources, mirrors, and shadows, but no attempt is made to discuss the speed of light.) (1- PS4-3)",sub:"PS4.B Electromagnetic radiation",dom:"PS"},
  {id:61,text:"Digitized information transmitted over long distances without significant degradation. High-tech devices, such as computers or cell phones, can receive and decode information—convert it from digitized form to voice—and vice versa. (4-PS4-3)",sub:"PS4.C Information Technologies and Instrumentation",dom:"PS"},
  {id:62,text:"Possible solutions to a problem are limited by available materials and resources (constraints). The success of a designed solution is determined by considering the desired features of a solution (criteria). Different proposals for solutions can be compared on the basis of how well each one meets the specified criteria for success or how well each takes the constraints into account. (3-5-ETS1-1) (secondary to 4-PS3-4) [secondary to 4.PS3.B.2]",sub:"ETS1.A Defing and Delimitting Engineering Problems",dom:"ETS"},
  {id:63,text:"Research on a problem should be carried out before beginning to design a solution. Testing a solution involves investigating how well it performs under a range of likely conditions. (3-5-ETS1-2)",sub:"ETS1.B: Developing Possible Solutions",dom:"ETS"},
  {id:64,text:"At whatever stage, communicating with peers about proposed solutions is an important part of the design process, and shared ideas can lead to improved designs. (3-5-ETS1-2)",sub:"ETS1.B: Developing Possible Solutions",dom:"ETS"},
  {id:65,text:"Tests are often designed to identify failure points or difficulties, which suggest the elements of the design that need to be improved. (3-5-ETS1-3)",sub:"ETS1.B: Developing Possible Solutions",dom:"ETS"},
  {id:66,text:"Testing a solution involves investigating how well it performs under a range of likely conditions. (secondary to 4-ESS3-2) [secondary to 4.ESS3.A.1]",sub:"ETS1.B: Developing Possible Solutions",dom:"ETS"},
  {id:67,text:"Different solutions need to be tested in order to determine which of them best solves the problem, given the criteria and the constraints. (3-5-ETS1-3) (secondary to 4- PS4-3)",sub:"ETS1.C: Optimizing the Design Solution",dom:"ETS"},
];

const sepElements = [
  {id:2,text:"Ask questions about what would happen if a variable is changed.",grp:"Asking Questions and Defining Problems"},
  {id:3,text:"Identify scientific (testable) and non-scientific (nontestable) questions.",grp:"Asking Questions and Defining Problems"},
  {id:4,text:"Ask questions that can be investigated and predict reasonable outcomes based on patterns such as cause and effect relationships.",grp:"Asking Questions and Defining Problems"},
  {id:5,text:"Use prior knowledge to describe problems that can be solved.",grp:"Asking Questions and Defining Problems"},
  {id:6,text:"Define a simple design problem that can be solved through the development of an object, tool, process, or system and includes several criteria for success and constraints on materials, time, or cost.",grp:"Asking Questions and Defining Problems"},
  {id:7,text:"Identify limitations of models.",grp:"Developing and Using Models"},
  {id:8,text:"Collaboratively develop and/or revise a model based on evidence that shows the relationships among variables for frequent and regular occurring events.",grp:"Developing and Using Models"},
  {id:9,text:"Develop a model using an analogy, example, or abstract representation to describe a scientific principle or design solution.",grp:"Developing and Using Models"},
  {id:10,text:"Develop and/or use models to describe and/or predict phenomena.",grp:"Developing and Using Models"},
  {id:11,text:"Develop a diagram or simple physical prototype to convey a proposed object, tool, or process.",grp:"Developing and Using Models"},
  {id:12,text:"Use a model to test cause and effect relationships or interactions concerning the functioning of a natural or designed system.",grp:"Developing and Using Models"},
  {id:13,text:"Plan and conduct an investigation collaboratively to produce data to serve as the basis for evidence, using fair tests in which variables are controlled and the number of trials considered.",grp:"Planning and Carrying Out Investigations"},
  {id:14,text:"Evaluate appropriate methods and/or tools for collecting data.",grp:"Planning and Carrying Out Investigations"},
  {id:15,text:"Make observations and/or measurements to produce data to serve as the basis for evidence for an explanation of a phenomenon or test a design solution.",grp:"Planning and Carrying Out Investigations"},
  {id:16,text:"Make predictions about what would happen if a variable changes.",grp:"Planning and Carrying Out Investigations"},
  {id:17,text:"Test two different models of the same proposed object, tool, or process to determine which better meets criteria for success.",grp:"Planning and Carrying Out Investigations"},
  {id:18,text:"Represent data in tables and/or various graphical displays (bar graphs, pictographs and/or pie charts) to reveal patterns that indicate relationships.",grp:"Analyzing and Interpreting Data"},
  {id:19,text:"Analyze and interpret data to make sense of phenomena, using logical reasoning, mathematics, and/or computation.",grp:"Analyzing and Interpreting Data"},
  {id:20,text:"Compare and contrast data collected by different groups in order to discuss similarities and differences in their findings.",grp:"Analyzing and Interpreting Data"},
  {id:21,text:"Analyze data to refine a problem statement or the design of a proposed object, tool, or process.",grp:"Analyzing and Interpreting Data"},
  {id:22,text:"Use data to evaluate and refine design solutions.",grp:"Analyzing and Interpreting Data"},
  {id:23,text:"Decide if qualitative or quantitative data are best to determine whether a proposed object or tool meets criteria for success.",grp:"Using Mathematics and Computational Thinking"},
  {id:24,text:"Organize simple data sets to reveal patterns that suggest relationships.",grp:"Using Mathematics and Computational Thinking"},
  {id:25,text:"Describe, measure, estimate, and/or graph quantities (e.g., area, volume, weight, time) to address scientific and engineering questions and problems.",grp:"Using Mathematics and Computational Thinking"},
  {id:26,text:"Create and/or use graphs and/or charts generated from simple algorithms to compare alternative solutions to an engineering problem.",grp:"Using Mathematics and Computational Thinking"},
  {id:27,text:"Construct an explanation of observed relationships (e.g., the distribution of plants in the back yard).",grp:"Constructing Explanations and Designing Solutions"},
  {id:28,text:"Use evidence (e.g., measurements, observations, patterns) to construct or support an explanation or design a solution to a problem.",grp:"Constructing Explanations and Designing Solutions"},
  {id:29,text:"Identify the evidence that supports particular points in an explanation.",grp:"Constructing Explanations and Designing Solutions"},
  {id:30,text:"Apply scientific ideas to solve design problems.",grp:"Constructing Explanations and Designing Solutions"},
  {id:31,text:"Generate and compare multiple solutions to a problem based on how well they meet the criteria and constraints of the design solution.",grp:"Constructing Explanations and Designing Solutions"},
  {id:32,text:"Compare and refine arguments based on an evaluation of the evidence presented.",grp:"Engaging in Argument from Evidence"},
  {id:33,text:"Distinguish among facts, reasoned judgment based on research findings, and speculation in an explanation.",grp:"Engaging in Argument from Evidence"},
  {id:34,text:"Respectfully provide and receive critiques from peers about a proposed procedure, explanation, or model by citing relevant evidence and posing specific questions.",grp:"Engaging in Argument from Evidence"},
  {id:35,text:"Construct and/or support an argument with evidence, data, and/or a model.",grp:"Engaging in Argument from Evidence"},
  {id:36,text:"Construct an argument with evidence to support a claim.",grp:"Engaging in Argument from Evidence"},
  {id:37,text:"Use data to evaluate claims about cause and effect.",grp:"Engaging in Argument from Evidence"},
  {id:38,text:"Make a claim about the merit of a solution to a problem by citing relevant evidence about how it meets the criteria and constraints of the problem.",grp:"Engaging in Argument from Evidence"},
  {id:39,text:"Compare and/or combine across complex texts and/or other reliable media to support the engagement in other scientific and/or engineering practices.",grp:"Obtaining, Evaluating, and Communicating Information"},
  {id:40,text:"Combine information in written text with that contained in corresponding tables, diagrams, and/or charts to support the engagement in other scientific and/or engineering practices.",grp:"Obtaining, Evaluating, and Communicating Information"},
  {id:41,text:"Obtain and combine information from books and/or other reliable media to explain phenomena or solutions to a design problem.",grp:"Obtaining, Evaluating, and Communicating Information"},
  {id:42,text:"Communicate scientific and/or technical information orally and/or in written formats, including various forms of media as well as tables, diagrams, and charts.",grp:"Connections to Nature of Science"},
  {id:43,text:"Science Models, Laws, Mechanisms, and Theories Explain Natural Phenomena: Science explanations describe the mechanisms for natural events.",grp:"Connections to Nature of Science"},
  {id:44,text:"Science investigation use a variety of methods, tools, and techniques.",grp:"Connections to Nature of Science"},
  {id:45,text:"Science findings are based on recognizing patterns",grp:"Connections to Nature of Science"},
];

const cccElements = [
  {id:2,text:"Similarities and differences in patterns can be used to sort, classify, communicate and analyze simple rates of change for natural phenomena and designed products.",grp:"Patterns"},
  {id:3,text:"Patterns of change can be used to make predictions.",grp:"Patterns"},
  {id:4,text:"Patterns can be used as evidence to support an explanation.",grp:"Patterns"},
  {id:5,text:"Cause and effect relationships are routinely identified, tested, and used to explain change.",grp:"Cause and Effect"},
  {id:6,text:"Events have causes, sometimes simple, sometimes multifaceted.",grp:"Cause and Effect"},
  {id:7,text:"Events that occur together with regularity might or might not be a cause and effect relationship.",grp:"Scale Proportion and Quantitiy"},
  {id:8,text:"Natural objects and/or observable phenomena exist from the very small to the immensely large or from very short to very long time periods.",grp:"Scale Proportion and Quantitiy"},
  {id:9,text:"Standard units are used to measure and describe physical quantities such as weight, time, temperature, and volume.",grp:"Scale Proportion and Quantitiy"},
  {id:10,text:"A system is a group of related parts that make up a whole and can carry out functions its individual parts cannot.",grp:"System and System Models"},
  {id:11,text:"A system can be described in terms of its components and their interactions.",grp:"System and System Models"},
  {id:12,text:"Matter is made of particles.",grp:"Energy and Matter"},
  {id:13,text:"Matter is transported into, out of, and within systems.",grp:"Energy and Matter"},
  {id:14,text:"Energy can be transferred in various ways and between objects.",grp:"Energy and Matter"},
  {id:15,text:"Different materials have different substructures, which can sometimes be observed.",grp:"Structure and Function"},
  {id:16,text:"Substructures have shapes and parts that serve functions.",grp:"Structure and Function"},
  {id:17,text:"Change is measured in terms of differences over time and may occur at different rates.",grp:"Stability and Change"},
  {id:18,text:"Some systems appear stable, but over long periods of time will eventually change.",grp:"Stability and Change"},
  {id:19,text:"When new technologies become available, they can bring about changes in the way people live and interact with one another.",grp:"Connections to Engineering, Technology, and Applications of Science"},
  {id:20,text:"Engineers improve existing technologies or develop new ones to increase their benefits, to decrease known risks, and to meet societal demands.",grp:"Connections to Engineering, Technology, and Applications of Science"},
  {id:21,text:"People's needs and wants change over time, as do their demands for new and improved technologies. Engineers improve existing technologies.",grp:"Connections to Engineering, Technology, and Applications of Science"},
  {id:22,text:"Science and technology support each other.",grp:"Connections to Engineering, Technology, and Applications of Science"},
  {id:23,text:"Tools and instruments are used to answer scientific questions, while scientific discoveries lead to the development of new technologies.",grp:"Connections to Engineering, Technology, and Applications of Science"},
  {id:24,text:"Knowledge of relevant scientific concepts and research findings is important in engineering.",grp:"Connections to Engineering, Technology, and Applications of Science"},
];

const dciCoverage = {
  13:[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  14:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  15:[0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
  16:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2],
  17:[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  18:[0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  19:[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 1, 2, 0, 1, 2],
  20:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  21:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  22:[0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2],
  23:[2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  24:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
};
const sepCoverage = {
  13:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  14:[0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  15:[0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0],
  16:[0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
  17:[0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  18:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  19:[0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  20:[0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  21:[0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
  22:[0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  23:[0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  24:[0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};
const cccCoverage = {
  13:[0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  14:[2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  15:[0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  16:[0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0],
  17:[0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  18:[0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2],
  19:[2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  20:[0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  21:[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  22:[0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  23:[2, 2, 0, 2, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  24:[0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

// ─── COLOURS ──────────────────────────────────────────────────────────────────
const FULL_COLOR = "#1a5276";
const PART_COLOR = "#a9cce3";
const NONE_COLOR = "#f5f7f9";

const DIM_ACCENT = { DCI:"#e07020", SEP:"#2060a0", CCC:"#208060" };
const DOM_COLORS = { ESS:"#ddeaf8", LS:"#d6f0e0", PS:"#fde8d0", ETS:"#ebe0f4" };
const DOM_ACCENT = { ESS:"#1a5fa8", LS:"#208050", PS:"#c05a10", ETS:"#7040a0" };

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const UNITS = [13,14,15,16,17,18,19,20,21,22,23,24];
const TBD_UNITS = new Set([]);
const UNIT_TITLES = {
  13:"Avoiding Extinction",
  14:"Bugs and Blooms",
  15:"Guardians of the Garden",
  16:"Pinball Wizards",
  17:"Streamside Survival",
  18:"The Power of Water",
  19:"Sensing Tsunamis",
  20:"A Playground for All",
  21:"From Sun to Food",
  22:"Using Our Resources Wisely",
  23:"Celestial Clocks and Calendars",
  24:"Particle Picnic",
};

function buildGroups(elements, groupKey) {
  const groups = {};
  elements.forEach(el => {
    const g = el[groupKey] || "Other";
    if (!groups[g]) groups[g] = [];
    groups[g].push({ ...el });
  });
  return groups;
}

function getCoverage(coverageMap, unit, elIdx) {
  const row = coverageMap[unit];
  return row ? (row[elIdx] ?? 0) : 0;
}

function coverageLabel(v) {
  return v === 2 ? "Full Coverage" : v === 1 ? "Partial Coverage" : "Not Covered";
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────
function CellTooltip({ info }) {
  if (!info) return null;
  return (
    <div style={{
      position:"fixed", zIndex:9999,
      left: Math.min(info.x + 12, window.innerWidth - 340),
      top: Math.min(info.y + 12, window.innerHeight - 180),
      background:"#1a2533", color:"#e8edf2",
      borderRadius:8, padding:"12px 16px",
      maxWidth:320, boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
      fontSize:12, lineHeight:1.5, pointerEvents:"none"
    }}>
      <div style={{ fontWeight:700, fontSize:13, marginBottom:4, color:"#7ec8e3" }}>
        Unit {info.unit} — {UNIT_TITLES[info.unit]}
      </div>
      {info.group && (
        <div style={{ color:"#a0b8c8", fontSize:11, marginBottom:3 }}>
          {info.group}
        </div>
      )}
      <div style={{ marginBottom:8, color:"#dde5ec" }}>{info.text}</div>
      <div style={{
        display:"inline-block", padding:"2px 10px", borderRadius:12,
        background: info.cov===2?FULL_COLOR : info.cov===1?"#2e6d9e":"#394a5a",
        color: info.cov===2?"#fff" : info.cov===1?"#c8e3f5":"#8ca0b0",
        fontSize:11, fontWeight:600
      }}>
        {coverageLabel(info.cov)}
      </div>
    </div>
  );
}

// ─── HEATMAP GRID ─────────────────────────────────────────────────────────────
function HeatGrid({ elements, coverageMap, groupKey, domainKey, headerColor, headerAccent }) {
  const [tooltip, setTooltip] = useState(null);
  const ROW_H = 26;
  const LEFT_W = 180;
  const CELL_W = 22;
  const groups = buildGroups(elements, groupKey);
  const groupList = Object.entries(groups);

  const groupWidths = groupList.map(([grp, els]) => {
    const textPx = grp.length * 7.8 + 28;
    const cellsPx = els.length * CELL_W;
    return Math.max(textPx, cellsPx);
  });

  const elPositions = [];
  groupList.forEach(([grp, els], gi) => {
    const cellW = groupWidths[gi] / els.length;
    els.forEach(el => elPositions.push({ el, cellW, gi }));
  });

  const totalW = LEFT_W + groupWidths.reduce((a, b) => a + b, 0);

  const handleMouseEnter = (e, unit, el, cov) => {
    setTooltip({ x: e.clientX, y: e.clientY, unit, text: el.text, group: el[groupKey] || el[domainKey] || "", cov });
  };

  return (
    <div style={{ position:"relative" }}>
      <div style={{ overflowX:"auto", overflowY:"visible" }}>
        <table style={{ borderCollapse:"collapse", tableLayout:"fixed", width: totalW, minWidth: totalW }}>
          <colgroup>
            <col style={{ width: LEFT_W }} />
            {elPositions.map(({ el, cellW }) => (
              <col key={el.id} style={{ width: cellW }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th style={{
                position:"sticky", left:0, zIndex:10,
                background:"#e8edf3", borderRight:"2px solid #cdd4dc",
                borderBottom:"2px solid #c2ccd8", padding:"6px 8px",
                fontSize:10, fontWeight:700, color:"#8899aa",
                textTransform:"uppercase", letterSpacing:1,
                textAlign:"left", whiteSpace:"nowrap"
              }}>Unit</th>
              {groupList.map(([grp, els], gi) => {
                const accent = domainKey ? DOM_ACCENT[els[0][domainKey]] || "#445566" : (headerAccent || "#445566");
                const bg = domainKey ? (DOM_COLORS[els[0][domainKey]] || "#eef2f7") : (headerColor || "#ddeeff");
                return (
                  <th key={grp} colSpan={els.length} style={{
                    background: bg,
                    borderLeft:"2px solid #bbc6d2",
                    borderBottom:"2px solid #c2ccd8",
                    padding:"7px 10px",
                    fontSize:11, fontWeight:700, color:accent,
                    textAlign:"left", whiteSpace:"nowrap",
                    maxWidth: groupWidths[gi]
                  }}>
                    {grp}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {UNITS.map(unit => {
              const isTbd = TBD_UNITS.has(unit);
              return (
                <tr key={unit}>
                  <td style={{
                    position:"sticky", left:0, zIndex:5,
                    background: isTbd ? "#f5f5f5" : "#fafbfc",
                    borderRight:"2px solid #cdd4dc",
                    borderBottom:"1px solid #e8ecf0",
                    height: ROW_H, textAlign:"left",
                    opacity: isTbd ? 0.45 : 1, padding:"0 8px",
                    whiteSpace:"nowrap", overflow:"hidden"
                  }}>
                    <span style={{ fontSize:11, fontWeight:700, color:"#34495e" }}>{unit}</span>
                    <span style={{ fontSize:10, color:"#7890a0", marginLeft:6 }}>{UNIT_TITLES[unit]}</span>
                  </td>
                  {elPositions.map(({ el, gi }, i) => {
                    const cov = getCoverage(coverageMap, unit, el.idx);
                    const isFirstInGroup = i === 0 || elPositions[i-1].gi !== gi;
                    let bg = NONE_COLOR;
                    if (!isTbd) {
                      if (cov === 2) bg = FULL_COLOR;
                      else if (cov === 1) bg = PART_COLOR;
                    }
                    return (
                      <td
                        key={el.id}
                        style={{
                          height: ROW_H, background: bg,
                          borderLeft: isFirstInGroup ? "2px solid #bbc6d2" : "1px solid #e8ecf0",
                          borderBottom:"1px solid #e8ecf0",
                          cursor: cov > 0 ? "pointer" : "default",
                          opacity: isTbd ? 0.4 : 1,
                          padding:0
                        }}
                        onMouseEnter={e => handleMouseEnter(e, unit, el, cov)}
                        onMouseLeave={() => setTooltip(null)}
                        onMouseMove={e => tooltip && setTooltip(t => ({...t, x:e.clientX, y:e.clientY}))}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <CellTooltip info={tooltip} />
    </div>
  );
}

// ─── SUMMARY CHART ────────────────────────────────────────────────────────────
function SummaryChart() {
  const chartData = UNITS.map(unit => {
    const dciFull = dciElements.reduce((s,el,i)=>s+(dciCoverage[unit]?.[i]===2?1:0),0);
    const dciPart = dciElements.reduce((s,el,i)=>s+(dciCoverage[unit]?.[i]===1?1:0),0);
    const sepFull = sepElements.reduce((s,el,i)=>s+(sepCoverage[unit]?.[i]===2?1:0),0);
    const sepPart = sepElements.reduce((s,el,i)=>s+(sepCoverage[unit]?.[i]===1?1:0),0);
    const cccFull = cccElements.reduce((s,el,i)=>s+(cccCoverage[unit]?.[i]===2?1:0),0);
    const cccPart = cccElements.reduce((s,el,i)=>s+(cccCoverage[unit]?.[i]===1?1:0),0);
    return {
      name:`U${unit}`, unit,
      "DCI Full":dciFull, "DCI Partial":dciPart,
      "SEP Full":sepFull, "SEP Partial":sepPart,
      "CCC Full":cccFull, "CCC Partial":cccPart,
    };
  });

  return (
    <div style={{ padding:"0 8px 16px" }}>
      <p style={{ fontSize:12, color:"#6b7f91", marginBottom:12, marginLeft:4 }}>
        Element coverage counts per unit across all three dimensions.
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top:8, right:16, left:0, bottom:4 }} barCategoryGap="20%">
          <XAxis dataKey="name" tick={{ fontSize:11, fill:"#6b7f91" }} />
          <YAxis tick={{ fontSize:10, fill:"#6b7f91" }} width={28} />
          <RechartsTooltip
            formatter={(v, name) => [v, name]}
            contentStyle={{ fontSize:11, borderRadius:6, border:"1px solid #dde4ec" }}
          />
          <Legend wrapperStyle={{ fontSize:11 }} />
          <Bar dataKey="DCI Full" stackId="a" fill={DIM_ACCENT.DCI} name="DCI Full" />
          <Bar dataKey="DCI Partial" stackId="a" fill="#f5b87a" name="DCI Partial" />
          <Bar dataKey="SEP Full" stackId="b" fill={DIM_ACCENT.SEP} name="SEP Full" />
          <Bar dataKey="SEP Partial" stackId="b" fill="#88b8e0" name="SEP Partial" />
          <Bar dataKey="CCC Full" stackId="c" fill={DIM_ACCENT.CCC} name="CCC Full" />
          <Bar dataKey="CCC Partial" stackId="c" fill="#80ccac" name="CCC Partial" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function NGSSAlignment() {
  const [activeTab, setActiveTab] = useState("DCI");
  const tabs = ["DCI","SEP","CCC","Summary"];
  const tabCounts = { DCI: 66, SEP: 44, CCC: 23 };
  const tabAccents = { DCI: DIM_ACCENT.DCI, SEP: DIM_ACCENT.SEP, CCC: DIM_ACCENT.CCC, Summary: "#445566" };

  const dciWithIdx = dciElements.map((el, i) => ({...el, idx:i}));
  const sepWithIdx = sepElements.map((el, i) => ({...el, idx:i}));
  const cccWithIdx = cccElements.map((el, i) => ({...el, idx:i}));

  const renderDCI = () => {
    const domainOrder = ["ESS","LS","PS","ETS"];
    const domainNames = {
      ESS: "Earth & Space Science",
      LS: "Life Science",
      PS: "Physical Science",
      ETS: "Engineering, Technology & Applications"
    };
    return (
      <div>
        {domainOrder.map(dom => {
          const els = dciWithIdx.filter(e => e.dom === dom);
          if (!els.length) return null;
          return (
            <div key={dom} style={{ marginBottom:24 }}>
              <div style={{
                display:"flex", alignItems:"center", gap:10, marginBottom:8,
                padding:"6px 14px", background:DOM_COLORS[dom],
                borderLeft:`4px solid ${DOM_ACCENT[dom]}`, borderRadius:"0 6px 6px 0"
              }}>
                <span style={{ fontWeight:800, fontSize:14, color:DOM_ACCENT[dom], letterSpacing:1 }}>{dom}</span>
                <span style={{ fontSize:12, color:"#567", fontWeight:500 }}>{domainNames[dom]}</span>
                <span style={{ marginLeft:"auto", fontSize:11, color:"#899aaa" }}>{els.length} elements</span>
              </div>
              <HeatGrid elements={els} coverageMap={dciCoverage} groupKey="sub" domainKey="dom" />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{
      fontFamily:"'Georgia', 'Times New Roman', serif",
      background:"#f0f3f7", minHeight:"100vh", color:"#2c3e50"
    }}>
      <div style={{
        background:"linear-gradient(135deg, #c42e2f 0%, #ef3839 50%, #c42e2f 100%)",
        padding:"22px 28px 16px", color:"#fff",
        boxShadow:"0 4px 16px rgba(0,0,0,0.2)"
      }}>
        <div style={{ fontSize:11, letterSpacing:2, color:"#ffd0d0", marginBottom:4 }}>
          mySci 3–5 Science Curriculum
        </div>
        <h1 style={{ margin:0, fontSize:22, fontWeight:700, letterSpacing:0.3, color:"#ffffff" }}>
          NGSS Alignment Overview
        </h1>
        <p style={{ margin:"6px 0 0", fontSize:12, color:"#ffd0d0", lineHeight:1.5 }}>
          12-unit coverage across Disciplinary Core Ideas · Science &amp; Engineering Practices · Crosscutting Concepts
        </p>
      </div>

      <div style={{
        background:"#fff", borderBottom:"1px solid #dde4ec",
        padding:"10px 28px", display:"flex", alignItems:"center", gap:20, flexWrap:"wrap"
      }}>
        <span style={{ fontSize:11, fontWeight:700, color:"#8899aa", textTransform:"uppercase", letterSpacing:1 }}>Coverage:</span>
        {[
          { color: FULL_COLOR, label:"Full" },
          { color: PART_COLOR, label:"Partial", textColor:"#2a5070" },
          { color: NONE_COLOR, label:"None", textColor:"#aab", border:"1px solid #dde4ec" }
        ].map(({color,label,textColor,border}) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:18, height:18, background:color, borderRadius:3, border:border||"none", flexShrink:0 }} />
            <span style={{ fontSize:12, color: textColor||"#e8edf2", fontWeight:500 }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ background:"#fff", borderBottom:"1px solid #dde4ec", padding:"0 20px", display:"flex", gap:4 }}>
        {tabs.map(tab => {
          const active = activeTab === tab;
          const accent = tabAccents[tab];
          return (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding:"12px 20px", border:"none", background:"none", cursor:"pointer",
              fontSize:13, fontWeight: active ? 700 : 500,
              color: active ? accent : "#7b8fa0",
              borderBottom: active ? `3px solid ${accent}` : "3px solid transparent",
              transition:"all 0.15s", fontFamily:"inherit"
            }}>
              {tab}
              {tab !== "Summary" && (
                <span style={{ marginLeft:6, fontSize:10, color: active ? accent : "#aab" }}>
                  ({tabCounts[tab]})
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ padding:"20px 20px 40px" }}>
        {activeTab === "Summary" && <SummaryChart />}
        {activeTab === "DCI" && (
          <div>
            <p style={{ fontSize:12, color:"#6b7f91", marginBottom:16, marginLeft:2 }}>
              Disciplinary Core Ideas — 66 elements organized across 4 science domains.
              Hover any cell to see the full element text and coverage level.
            </p>
            {renderDCI()}
          </div>
        )}
        {activeTab === "SEP" && (
          <div>
            <p style={{ fontSize:12, color:"#6b7f91", marginBottom:16, marginLeft:2 }}>
              Science &amp; Engineering Practices — 44 elements across 9 practice categories.
            </p>
            <HeatGrid elements={sepWithIdx} coverageMap={sepCoverage} groupKey="grp" />
          </div>
        )}
        {activeTab === "CCC" && (
          <div>
            <p style={{ fontSize:12, color:"#6b7f91", marginBottom:16, marginLeft:2 }}>
              Crosscutting Concepts — 23 elements across 8 concept categories.
            </p>
            <HeatGrid elements={cccWithIdx} coverageMap={cccCoverage} groupKey="grp" headerColor="#d2f0e3" headerAccent="#208060" />
          </div>
        )}
      </div>

      <div style={{ textAlign:"center", padding:"12px 20px 24px", fontSize:11, color:"#aab" }}>
        Source data: NGSS Element Tracker (3–5) · Colors encode full (dark blue) and partial (light blue) coverage
      </div>
    </div>
  );
}
