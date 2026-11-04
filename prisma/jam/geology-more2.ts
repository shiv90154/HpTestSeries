// IIT JAM Geology (GG) — Mocks 5 to 8: 30 MCQs each, written fresh: mineralogy and petrology 9, structural geology and tectonics 8,
// stratigraphy and palaeontology 5, geomorphology, hydrology and economic geology 8.

import { j } from "./types";

const G = "jam-geology";

export const jamGeologyMock5 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "E", 2, "Basalt is classified as a:", ["Felsic rock", "Intermediate rock", "Mafic rock", "Ultramafic rock"], "It contains about 45–52% silica, plagioclase and pyroxene."),
  j(G, "mineralogy-petrology", "M", 1, "Agate and chalcedony are varieties of:", ["Feldspar", "Cryptocrystalline silica", "Calcite", "Mica"], "They are microscopically fibrous SiO₂."),
  j(G, "mineralogy-petrology", "M", 0, "Garnet is an index mineral of:", ["Medium- to high-grade metamorphism", "Diagenesis", "Very low-grade metamorphism", "Evaporite deposition"], "It appears in the garnet zone of Barrovian metamorphism."),
  j(G, "mineralogy-petrology", "M", 2, "Pegmatites are characterised by:", ["Glassy texture", "Fine-grained texture", "Very coarse crystals", "Vesicular texture"], "Slow cooling of water-rich residual melt gives crystals of several centimetres or more."),
  j(G, "mineralogy-petrology", "M", 3, "The mineral most commonly used for U–Pb radiometric dating is:", ["Quartz", "Calcite", "Olivine", "Zircon"], "Zircon incorporates uranium but excludes lead when it crystallises."),
  j(G, "mineralogy-petrology", "M", 2, "Shale is composed predominantly of grains of:", ["Sand size", "Gravel size", "Clay and fine silt size", "Boulder size"], "It is a laminated fine-grained detrital rock."),
  j(G, "mineralogy-petrology", "M", 1, "The chemical formula of dolomite is:", ["CaCO₃", "CaMg(CO₃)₂", "MgCO₃", "FeCO₃"], "It has ordered layers of Ca and Mg."),
  j(G, "mineralogy-petrology", "H", 0, "Eclogite is a high-pressure metamorphic rock of basaltic composition containing:", ["Omphacite and garnet", "Quartz and mica", "Calcite and dolomite", "Olivine and plagioclase"], "Plagioclase is unstable at these pressures."),
  j(G, "mineralogy-petrology", "H", 1, "The characteristic polysynthetic twinning seen under crossed polars in plagioclase follows the:", ["Carlsbad law", "Albite law", "Baveno law", "Manebach law"], "It appears as parallel black-and-white lamellae."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "M", 1, "The plunge of a fold is the inclination of the:", ["Axial plane to the vertical", "Fold axis (hinge line) from the horizontal", "Limb from the axis", "Bedding from the strike"], "A plunging fold gives V-shaped outcrop patterns."),
  j(G, "structure-tectonics", "M", 0, "A thrust fault is a reverse fault with a:", ["Low dip angle", "Vertical dip", "Strike-slip displacement", "Tensional origin"], "Typically less than 30° dip."),
  j(G, "structure-tectonics", "M", 1, "Ophiolites represent slices of:", ["Continental granite", "Oceanic lithosphere emplaced on land", "Sedimentary basins", "Volcanic ash"], "They contain peridotite, gabbro, sheeted dykes and pillow lavas."),
  j(G, "structure-tectonics", "M", 2, "The distance of an earthquake epicentre from a seismograph is estimated from the:", ["Magnitude", "Colour of the trace", "Difference in arrival times of S and P waves", "Depth of focus"], "The longer the lag, the greater the distance; three stations locate the epicentre."),
  j(G, "structure-tectonics", "M", 1, "A planar fabric produced by the alignment of platy minerals in a metamorphic rock is called:", ["Lineation", "Foliation", "Bedding", "Jointing"], "Mica minerals grow perpendicular to the maximum compressive stress."),
  j(G, "structure-tectonics", "M", 0, "Break-up of the supercontinent Pangaea began in the:", ["Late Triassic to Jurassic", "Cambrian", "Precambrian", "Quaternary"], "Rifting started about 200 million years ago."),
  j(G, "structure-tectonics", "M", 1, "A sill is an igneous intrusion that is:", ["Cross-cutting the bedding", "Parallel to the bedding", "Always vertical", "Extrusive"], "A dyke cuts across the layers."),
  j(G, "structure-tectonics", "H", 2, "The mantle convection that drives plate motion is mainly driven by:", ["Solar radiation", "Tidal forces from the Moon", "Heat from the Earth's interior", "The rotation of the Earth"], "Radioactive decay and primordial heat power the convection."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "M", 0, "Stromatolites are layered structures produced by:", ["Cyanobacteria", "Trilobites", "Corals", "Algae with shells"], "Microbial mats trapped and bound sediment."),
  j(G, "stratigraphy-palaeontology", "M", 1, "The basic mappable unit of lithostratigraphy is the:", ["Era", "Formation", "Epoch", "Zone"], "A formation has distinctive lithology and is traceable across a region."),
  j(G, "stratigraphy-palaeontology", "M", 2, "The soft-bodied Ediacaran fauna belongs to the:", ["Cambrian", "Ordovician", "Late Precambrian", "Devonian"], "It lived about 635 to 541 million years ago."),
  j(G, "stratigraphy-palaeontology", "M", 3, "The first amphibians, which moved on to land, evolved in the:", ["Cambrian", "Ordovician", "Silurian", "Devonian"], "Tetrapods like Ichthyostega are Late Devonian."),
  j(G, "stratigraphy-palaeontology", "H", 1, "The Burgess Shale in Canada is renowned for its exceptional preservation of:", ["Dinosaur footprints", "Soft-bodied Cambrian animals", "Permian plants", "Pleistocene mammals"], "It is a Lagerstätte of Middle Cambrian organisms."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "E", 0, "The uppermost soil horizon, rich in humus, is the:", ["A horizon", "B horizon", "C horizon", "R horizon"], "It is also called the topsoil."),
  j(G, "geomorphology-hydrology", "M", 1, "The chemical weathering of feldspar mainly produces:", ["Quartz sand only", "Clay minerals", "Calcite", "Gypsum"], "Hydrolysis converts feldspar to kaolinite and soluble ions."),
  j(G, "geomorphology-hydrology", "M", 0, "In Strahler's system, two first-order streams join to form a stream of order:", ["Second", "Third", "First", "Fourth"], "Streams of equal order combine to give the next higher order."),
  j(G, "geomorphology-hydrology", "E", 2, "The loss of water to the atmosphere from soil and plants together is called:", ["Infiltration", "Precipitation", "Evapotranspiration", "Runoff"], "It combines evaporation and plant transpiration."),
  j(G, "geomorphology-hydrology", "M", 2, "Pyrolusite is an ore of:", ["Iron", "Chromium", "Manganese", "Titanium"], "It is MnO₂."),
  j(G, "geomorphology-hydrology", "M", 1, "The correct order of increasing rank of coal is:", ["Anthracite, bituminous, lignite, peat", "Peat, lignite, bituminous, anthracite", "Lignite, peat, anthracite, bituminous", "Peat, bituminous, lignite, anthracite"], "Increasing burial and temperature raise the carbon content."),
  j(G, "geomorphology-hydrology", "M", 0, "An anticline is a favourable petroleum trap when it is overlain by:", ["An impermeable cap rock", "A highly permeable sandstone", "A coal seam", "A volcanic ash layer"], "The seal prevents the upward escape of hydrocarbons."),
  j(G, "geomorphology-hydrology", "M", 1, "A cuesta is an asymmetric ridge with a:", ["Steep dip slope and gentle scarp", "Gentle dip slope and steep scarp", "Symmetrical profile", "Vertical face only"], "It forms in gently dipping strata of alternating hardness."),
];

export const jamGeologyMock6 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "M", 0, "Which of the following minerals is a member of the pyroxene group?", ["Augite", "Hornblende", "Muscovite", "Orthoclase"], "Augite is a common single-chain silicate in mafic rocks."),
  j(G, "mineralogy-petrology", "M", 1, "Which sedimentary structure indicates the direction of current flow?", ["Mud cracks", "Cross-bedding", "Stylolites", "Concretions"], "Foresets dip in the downcurrent direction."),
  j(G, "mineralogy-petrology", "E", 3, "The mineral talc is used as a standard for hardness:", ["10", "5", "3", "1"], "Talc is the softest mineral on Mohs' scale."),
  j(G, "mineralogy-petrology", "M", 2, "A rock consisting almost entirely of quartz grains cemented by silica is:", ["Marble", "Schist", "Quartzite or quartz arenite", "Hornfels"], "Metamorphosed or cemented sandstone with quartz."),
  j(G, "mineralogy-petrology", "H", 0, "Komatiites are ultramafic volcanic rocks mostly of:", ["Archaean age", "Cenozoic age", "Silurian age", "Quaternary age"], "They require very high mantle temperatures, which were more common early in Earth's history."),
  j(G, "mineralogy-petrology", "M", 3, "Hornblende is a member of the:", ["Pyroxene group", "Mica group", "Feldspar group", "Amphibole group"], "It is a double-chain silicate with two cleavages at about 56°/124°."),
  j(G, "mineralogy-petrology", "M", 1, "Graded bedding is the characteristic structure of:", ["Evaporites", "Turbidites", "Lava flows", "Dykes"], "Each bed fines upward as a turbidity current wanes."),
  j(G, "mineralogy-petrology", "H", 2, "The presence of the mineral assemblage kyanite + staurolite indicates metamorphism of:", ["Limestone", "Basalt", "Aluminium-rich shale (pelite)", "Granite"], "These are Al-rich minerals typical of pelitic composition."),
  j(G, "mineralogy-petrology", "M", 0, "The silica content of a rhyolite is typically:", ["Greater than 69%", "About 50%", "About 45%", "Below 40%"], "It is a felsic rock."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "M", 1, "A fault plane dips at 60° and the hanging wall moves downward. This fault is:", ["A reverse fault", "A normal fault", "A transform fault", "A thrust"], "Extension causes the hanging wall to slide down."),
  j(G, "structure-tectonics", "M", 0, "The mid-Atlantic ridge is a:", ["Divergent boundary", "Convergent boundary", "Transform boundary", "Passive margin"], "New crust forms at the axis."),
  j(G, "structure-tectonics", "M", 2, "Island arcs such as Japan are produced by:", ["Continental rifting", "Hotspot activity", "Ocean–ocean subduction", "Collision of continents"], "Melting above the subducting slab feeds the volcanic arc."),
  j(G, "structure-tectonics", "M", 1, "An earthquake of magnitude 6 releases about how many times more ground motion amplitude than one of magnitude 4?", ["10", "100", "1000", "2"], "Amplitude increases tenfold per magnitude unit."),
  j(G, "structure-tectonics", "H", 1, "Palaeomagnetic data from rocks give an estimate of the:", ["Age of the Sun", "Palaeolatitude at which the rock formed", "Colour of the ocean", "Rainfall"], "The inclination of the remanent magnetisation depends on latitude."),
  j(G, "structure-tectonics", "M", 2, "The deepest known point of the oceans is in the:", ["Atlantic Ocean", "Indian Ocean", "Mariana Trench", "Arctic Ocean"], "It is about 11 km deep."),
  j(G, "structure-tectonics", "M", 0, "Rocks that have undergone ductile deformation typically display:", ["Folds", "Open fractures", "Fresh joints", "Breccia"], "They flow rather than break."),
  j(G, "structure-tectonics", "H", 3, "The thin layer between the crust and mantle where seismic velocities increase abruptly is the:", ["Conrad discontinuity", "Gutenberg discontinuity", "Lehmann discontinuity", "Mohorovičić discontinuity"], "Its depth varies from about 7 km below oceans to 35–70 km below continents."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "M", 1, "The Great Oxidation Event, about 2.4 billion years ago, was caused by a rise of oxygen produced by:", ["Volcanoes", "Photosynthetic cyanobacteria", "Meteorites", "Hydrothermal vents only"], "It is marked by the end of banded iron formation deposition."),
  j(G, "stratigraphy-palaeontology", "M", 0, "Lepidodendron was a giant:", ["Club moss tree of the Carboniferous", "Dinosaur", "Trilobite", "Mammal"], "Such plants formed the coal swamps."),
  j(G, "stratigraphy-palaeontology", "E", 2, "Fossil fuels such as coal are formed from the remains of:", ["Minerals", "Rocks only", "Ancient plants", "Volcanic ash"], "Plant matter was buried and carbonised."),
  j(G, "stratigraphy-palaeontology", "M", 3, "The Quaternary period is divided into the Pleistocene and the:", ["Pliocene", "Miocene", "Eocene", "Holocene"], "The Holocene began about 11 700 years ago."),
  j(G, "stratigraphy-palaeontology", "H", 2, "The ‘K–Pg boundary clay’ has an anomalous concentration of:", ["Gold", "Uranium", "Iridium", "Copper"], "The iridium anomaly supports the Chicxulub impact hypothesis."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "M", 1, "A river that has cut through hard rock and flows in a narrow steep-sided valley is said to be:", ["Aggrading", "Incised", "Braided", "Meandering on a plain"], "Incision follows uplift or a fall in base level."),
  j(G, "geomorphology-hydrology", "M", 0, "Moraines are deposits left by:", ["Glaciers", "Rivers", "Wind", "Waves"], "Unsorted debris is carried and dropped by ice."),
  j(G, "geomorphology-hydrology", "E", 1, "Which rock is the main source of cement?", ["Granite", "Limestone", "Slate", "Quartzite"], "Limestone provides calcium oxide on burning."),
  j(G, "geomorphology-hydrology", "M", 2, "A well that penetrates an unconfined aquifer shows a water level that equals the:", ["Land surface", "Top of the aquifer", "Water table", "Base of the aquifer"], "The water level coincides with the water table."),
  j(G, "geomorphology-hydrology", "H", 0, "The Himalayan rivers like the Ganga have braided channels in their upper plains because of:", ["High sediment load and variable discharge", "Low gradient and clear water", "Absence of floods", "Rock-cut valleys"], "Excess coarse load builds mid-channel bars."),
  j(G, "geomorphology-hydrology", "M", 1, "Bauxite deposits in India occur mainly in association with:", ["Granite batholiths", "Deccan basalt and laterite caps", "Glacial moraines", "River deltas"], "Intense tropical weathering concentrates aluminium hydroxides."),
  j(G, "geomorphology-hydrology", "M", 3, "Which of the following is a clay mineral?", ["Quartz", "Calcite", "Mica", "Kaolinite"], "Kaolinite, Al₂Si₂O₅(OH)₄, is a sheet silicate formed by weathering."),
  j(G, "geomorphology-hydrology", "M", 1, "Hydraulic conductivity has the dimensions of:", ["Length squared", "Length per time", "Mass per volume", "Pressure"], "K is expressed in m/day or m/s."),
];

export const jamGeologyMock7 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "M", 2, "The mineral used as a standard for hardness 6 on Mohs' scale is:", ["Apatite", "Quartz", "Orthoclase", "Fluorite"], "The scale runs talc, gypsum, calcite, fluorite, apatite, orthoclase, quartz, topaz, corundum, diamond."),
  j(G, "mineralogy-petrology", "M", 0, "Which mineral is the main constituent of limestone?", ["Calcite", "Dolomite", "Gypsum", "Halite"], "Limestones consist mostly of calcium carbonate."),
  j(G, "mineralogy-petrology", "E", 1, "Which of the following is an igneous rock?", ["Shale", "Basalt", "Marble", "Sandstone"], "It forms by cooling of molten lava."),
  j(G, "mineralogy-petrology", "M", 3, "The crystal system of halite is:", ["Hexagonal", "Orthorhombic", "Monoclinic", "Cubic"], "Its cubes show perfect cubic cleavage."),
  j(G, "mineralogy-petrology", "H", 1, "In thin section under crossed polars, a mineral that stays dark upon rotation of the stage is:", ["Anisotropic", "Isotropic", "Pleochroic", "Birefringent"], "Isotropic minerals (cubic) or sections normal to the optic axis stay extinct."),
  j(G, "mineralogy-petrology", "M", 0, "Slaty cleavage is developed during:", ["Low-grade regional metamorphism of shale", "High-grade metamorphism of granite", "Contact metamorphism", "Diagenesis of sand"], "Clay minerals recrystallise to microscopic mica aligned perpendicular to stress."),
  j(G, "mineralogy-petrology", "M", 2, "An igneous rock with the mineralogy of 40% quartz, 30% K-feldspar and 25% plagioclase would be a:", ["Basalt", "Diorite", "Granite", "Gabbro"], "Quartz and alkali feldspar dominate a granite."),
  j(G, "mineralogy-petrology", "H", 1, "Which of the following is a ring silicate (cyclosilicate)?", ["Olivine", "Beryl", "Biotite", "Quartz"], "Beryl contains six-membered rings of SiO₄ tetrahedra."),
  j(G, "mineralogy-petrology", "M", 1, "Phenocrysts of olivine are most likely to occur in:", ["Rhyolite", "Basalt", "Granite", "Pumice"], "Olivine is stable in mafic melts."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "M", 1, "The tectonic plate boundary where two plates slide past each other is a:", ["Divergent", "Transform", "Convergent", "Collision"], "Lithosphere is neither created nor destroyed."),
  j(G, "structure-tectonics", "M", 0, "The Indian plate is moving:", ["Northward", "Southward", "Westward only", "Not at all"], "It continues to push into Eurasia at about 5 cm per year."),
  j(G, "structure-tectonics", "H", 2, "A conjugate set of shear fractures forms with the maximum compressive stress lying:", ["Perpendicular to both", "Parallel to the fault planes", "In the acute angle between the fractures", "In the obtuse angle between the fractures"], "The angle between the shear planes bisected by σ₁ is about 60°."),
  j(G, "structure-tectonics", "M", 3, "Seismic ‘shadow zone’ for S waves exists because the:", ["Mantle is liquid", "Crust is thin", "Inner core is solid", "Outer core is liquid"], "S waves do not travel through fluids."),
  j(G, "structure-tectonics", "M", 1, "Radiometric dating of ocean floor basalts shows that the age:", ["Decreases away from the ridge", "Increases away from the ridge", "Is uniform", "Is random"], "New crust forms at the ridge and spreads outward."),
  j(G, "structure-tectonics", "M", 2, "Folded mountain belts such as the Alps are chiefly associated with:", ["Hotspots", "Rifts", "Convergent plate boundaries", "Transform faults"], "Compression shortens and thickens the crust."),
  j(G, "structure-tectonics", "M", 0, "Slickensides on a rock surface indicate:", ["Fault movement", "Weathering", "Sedimentary bedding", "Burrowing"], "Polished, striated surfaces record direction of slip."),
  j(G, "structure-tectonics", "E", 3, "The hot, convecting layer between the lithosphere and the mesosphere is the:", ["Crust", "Outer core", "Inner core", "Asthenosphere"], "It is a weak, partially molten zone."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "M", 1, "Which of the following is an example of an ‘index’ fossil group of the Mesozoic?", ["Trilobites", "Ammonites", "Graptolites", "Eurypterids"], "Ammonites evolved rapidly and are widely distributed."),
  j(G, "stratigraphy-palaeontology", "M", 0, "The Precambrian makes up about how much of Earth's history?", ["Nearly 88%", "About 10%", "About 50%", "About 25%"], "It extends from 4.6 billion to 541 million years ago."),
  j(G, "stratigraphy-palaeontology", "M", 2, "Coral reefs are best preserved in which kind of rock?", ["Granite", "Basalt", "Limestone", "Quartzite"], "Reef corals secrete calcium carbonate."),
  j(G, "stratigraphy-palaeontology", "H", 0, "A rock unit that formed at the same time, regardless of its lithology, is a:", ["Chronostratigraphic unit", "Lithostratigraphic unit", "Biostratigraphic unit", "Magnetostratigraphic zone only"], "Time-rock units such as the system and series are defined by time."),
  j(G, "stratigraphy-palaeontology", "M", 1, "The Vindhyan Supergroup of India is mainly of which age?", ["Palaeozoic", "Proterozoic", "Mesozoic", "Cenozoic"], "It is a thick, little-deformed Meso- to Neoproterozoic sedimentary succession."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "M", 1, "Floodplains are produced mainly by:", ["Glacial erosion", "Deposition by overflowing rivers", "Wind", "Volcanism"], "Sediment settles on the valley floor during floods."),
  j(G, "geomorphology-hydrology", "M", 2, "Aeolian loess deposits consist chiefly of wind-blown:", ["Sand", "Gravel", "Silt", "Boulders"], "Fine silt is transported over long distances."),
  j(G, "geomorphology-hydrology", "E", 1, "The main ore of zinc is:", ["Galena", "Sphalerite", "Haematite", "Bauxite"], "Sphalerite is ZnS."),
  j(G, "geomorphology-hydrology", "M", 0, "The permeability of a rock depends mainly on:", ["The interconnection of pores", "Its colour", "Its hardness", "Its age"], "Connected pore space allows fluid flow."),
  j(G, "geomorphology-hydrology", "H", 1, "Which of the following describes a ‘losing’ stream?", ["The water table is above the stream level and the stream gains water", "The stream level is above the water table and it loses water to groundwater", "The stream is dry all year", "It flows on bedrock only"], "Water seeps from the channel into the ground."),
  j(G, "geomorphology-hydrology", "M", 3, "Which of the following is a metallic mineral deposit formed by magmatic segregation?", ["Rock salt", "Coal", "Limestone", "Chromite seam"], "Chromite settles from the magma in layered ultramafic bodies."),
  j(G, "geomorphology-hydrology", "M", 1, "The point where a river enters the sea and deposits its load is often a:", ["Fjord", "Delta or estuary", "Cirque", "Oasis"], "Deposition or tidal mixing occurs at the mouth."),
  j(G, "geomorphology-hydrology", "M", 2, "The Coriolis effect is responsible for:", ["Volcanic eruption", "Rock weathering", "Deflection of moving air and water over the rotating Earth", "Sea-floor spreading"], "Deflection is to the right in the northern hemisphere."),
];

export const jamGeologyMock8 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "M", 0, "Biotite is distinguished from muscovite chiefly by its:", ["Dark colour due to Fe and Mg", "Absence of cleavage", "Cubic form", "Hardness of 10"], "Biotite is the Fe–Mg mica and appears brown to black."),
  j(G, "mineralogy-petrology", "M", 1, "The groundmass of a basalt is composed mainly of:", ["Quartz and K-feldspar", "Plagioclase and pyroxene", "Muscovite and quartz", "Calcite"], "These minerals dominate mafic rocks."),
  j(G, "mineralogy-petrology", "E", 2, "Rocks formed by consolidation of sediments are:", ["Igneous", "Metamorphic", "Sedimentary", "Volcanic only"], "They are made by lithification of material at the surface."),
  j(G, "mineralogy-petrology", "M", 3, "Which silicate structure has the highest Si:O ratio?", ["Nesosilicate", "Inosilicate", "Phyllosilicate", "Tectosilicate"], "In frameworks the ratio is 1:2."),
  j(G, "mineralogy-petrology", "H", 2, "The Bowen continuous reaction series refers to the:", ["Pyroxene to amphibole to biotite chain", "Olivine to pyroxene transition", "Gradual change in plagioclase from Ca-rich to Na-rich", "Change from K-feldspar to quartz"], "Early calcic plagioclase reacts with the melt to become sodic."),
  j(G, "mineralogy-petrology", "M", 0, "Cataclasite and mylonite are rocks formed by:", ["Fault-related deformation", "Evaporation", "Volcanism", "Cooling of magma"], "They are produced in fault zones by brittle or ductile shear."),
  j(G, "mineralogy-petrology", "M", 1, "Concretions in sedimentary rocks are formed by:", ["Wind erosion", "Localised precipitation of cement around a nucleus", "Volcanic ash falls", "Glaciers"], "Minerals such as calcite or silica precipitate in pore spaces."),
  j(G, "mineralogy-petrology", "H", 1, "The ‘Fe–Ti oxide’ minerals ilmenite and magnetite are typically found as accessory minerals in:", ["Evaporites", "Mafic igneous rocks", "Pure limestones", "Quartz veins"], "They crystallise from iron- and titanium-rich basaltic melts."),
  j(G, "mineralogy-petrology", "M", 2, "Pumice is best described as a:", ["Plutonic rock", "Sedimentary rock", "Highly vesicular volcanic glass", "Metamorphic rock"], "It is so full of bubbles that it can float."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "M", 1, "A dip of 90° means the bed is:", ["Horizontal", "Vertical", "Overturned", "Folded"], "The bedding plane is perpendicular to the horizontal."),
  j(G, "structure-tectonics", "M", 0, "In a syncline, the beds in the core are:", ["Youngest", "Oldest", "Metamorphosed only", "Horizontal"], "Older beds crop out on the limbs and the youngest lie in the trough."),
  j(G, "structure-tectonics", "M", 2, "Transform faults offset:", ["Continental interiors only", "Subduction zones only", "Mid-ocean ridge segments", "Mountain belts only"], "They lie perpendicular to the ridge axis."),
  j(G, "structure-tectonics", "M", 1, "Which type of stress causes folding of rocks?", ["Tensional stress", "Compressional stress", "Hydrostatic stress only", "No stress"], "Horizontal shortening buckles the layers."),
  j(G, "structure-tectonics", "H", 2, "Which of the following gives the most direct evidence for the liquid state of the outer core?", ["Gravity anomalies", "Magnetic reversals", "S-wave shadow zone", "Heat flow"], "S waves stop at the core–mantle boundary."),
  j(G, "structure-tectonics", "M", 0, "A hotspot track such as the Hawaiian–Emperor chain shows that the Pacific plate:", ["Moves over a stationary mantle plume", "Is stationary", "Is subducting under Hawaii", "Is spreading from Hawaii"], "The age of the islands increases away from the active volcano."),
  j(G, "structure-tectonics", "M", 1, "The focus of an earthquake is:", ["The point at the surface above the origin", "The point inside the Earth where rupture begins", "The seismic station", "The zone of maximum intensity"], "The epicentre is the surface point directly above."),
  j(G, "structure-tectonics", "H", 1, "In a fold, the surface connecting the hinge lines of successive beds is the:", ["Fold limb", "Axial surface", "Crest", "Plunge"], "It divides the fold as symmetrically as possible."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "M", 0, "The first appearance of birds in the fossil record, e.g. Archaeopteryx, is in the:", ["Jurassic", "Cambrian", "Permian", "Eocene"], "It dates from about 150 million years ago."),
  j(G, "stratigraphy-palaeontology", "M", 1, "Which geological period saw the greatest extent of coal swamps?", ["Cambrian", "Carboniferous", "Triassic", "Neogene"], "The name means ‘coal-bearing’."),
  j(G, "stratigraphy-palaeontology", "M", 2, "The oldest known rocks on Earth are found in:", ["The Himalaya", "The Deccan", "Archaean cratons such as the Acasta Gneiss", "The Alps"], "They are over 4 billion years old."),
  j(G, "stratigraphy-palaeontology", "M", 3, "Foraminifera are especially useful in the:", ["Dating of granite", "Study of lava flows", "Correlation of metamorphic rocks", "Correlation and dating of marine sediments"], "Their planktonic forms evolve rapidly and are abundant."),
  j(G, "stratigraphy-palaeontology", "H", 1, "The Permian–Triassic boundary in India is well exposed in the Spiti and Kashmir regions of the:", ["Western Ghats", "Himalaya", "Eastern Ghats", "Aravalli range"], "Marine sections there are important for studying the end-Permian crisis."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "M", 1, "Which mineral is the chief ore of tin?", ["Wolframite", "Cassiterite", "Chalcopyrite", "Pentlandite"], "Cassiterite is SnO₂."),
  j(G, "geomorphology-hydrology", "M", 0, "A river terrace is formed by:", ["Abandonment of a former floodplain after downcutting", "Wind", "Glacial melting only", "Volcanic activity"], "Rejuvenation lowers the channel below the old floodplain."),
  j(G, "geomorphology-hydrology", "E", 0, "The ability of a rock to store water is called its:", ["Porosity", "Permeability", "Density", "Hardness"], "It is the ratio of void volume to total volume."),
  j(G, "geomorphology-hydrology", "M", 2, "Stalactites hang from cave ceilings and are formed of:", ["Quartz", "Halite", "Calcite", "Gypsum only"], "Dripping water deposits calcium carbonate."),
  j(G, "geomorphology-hydrology", "H", 2, "Seawater intrusion in coastal aquifers is caused by:", ["Excess recharge", "Rise of the water table", "Over-pumping of fresh groundwater", "Low evaporation"], "Lowering the freshwater head allows saline water to advance inland."),
  j(G, "geomorphology-hydrology", "M", 1, "Which of the following is a clean-burning fuel found with petroleum?", ["Peat", "Natural gas", "Lignite", "Anthracite"], "Methane-rich gas is trapped with oil."),
  j(G, "geomorphology-hydrology", "M", 3, "Which mineral is the main source of phosphate for fertiliser?", ["Calcite", "Gypsum", "Halite", "Apatite"], "Phosphorite rocks contain apatite."),
  j(G, "geomorphology-hydrology", "M", 0, "Desertification is the process by which:", ["Fertile land becomes desert", "Deserts become forests", "Rivers meander", "Glaciers advance"], "Over-grazing and drought degrade land."),
];
