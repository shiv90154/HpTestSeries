// IIT JAM Geology (GG) — Mocks 9 to 12: 30 MCQs each, written fresh: mineralogy and petrology 9, structural geology and tectonics 8,
// stratigraphy and palaeontology 5, geomorphology, hydrology and economic geology 8. Mock 12 is slightly above exam level.

import { j } from "./types";

const G = "jam-geology";

export const jamGeologyMock9 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "M", 1, "The mineral with the chemical formula Fe₂O₃ is:", ["Magnetite", "Haematite", "Pyrite", "Siderite"], "Haematite is the red iron oxide."),
  j(G, "mineralogy-petrology", "M", 0, "The plagioclase feldspars form a solid solution between albite and:", ["Anorthite", "Orthoclase", "Sanidine", "Microcline"], "NaAlSi₃O₈ to CaAl₂Si₂O₈."),
  j(G, "mineralogy-petrology", "M", 2, "A conglomerate differs from a breccia in that the clasts of a conglomerate are:", ["Angular", "Fine-grained", "Rounded", "Of volcanic origin only"], "Transport has abraded the pebbles."),
  j(G, "mineralogy-petrology", "H", 1, "Migmatites are formed by:", ["Contact metamorphism", "Partial melting (anatexis) of high-grade metamorphic rocks", "Diagenesis", "Evaporation"], "They show mixed layers of melted leucosome and unmelted rock."),
  j(G, "mineralogy-petrology", "M", 0, "Serpentinite is formed by the hydration of:", ["Ultramafic rocks", "Granite", "Limestone", "Sandstone"], "Olivine and pyroxene react with water to give serpentine minerals."),
  j(G, "mineralogy-petrology", "M", 3, "Quartz is characterised by:", ["Perfect cubic cleavage", "Perfect basal cleavage", "Two cleavages at 90°", "Conchoidal fracture and no cleavage"], "Its framework structure lacks planes of weakness."),
  j(G, "mineralogy-petrology", "M", 1, "Kimberlite pipes are significant because they:", ["Contain coal", "Bring diamonds up from the mantle", "Contain salt", "Form sandstone"], "Diamonds are xenocrysts carried up rapidly from depth."),
  j(G, "mineralogy-petrology", "H", 2, "Charnockite, widespread in southern India, is a rock of the:", ["Zeolite facies", "Greenschist facies", "Granulite facies", "Blueschist facies"], "It contains orthopyroxene and formed at high temperature and moderate pressure."),
  j(G, "mineralogy-petrology", "M", 0, "Pyrite is known as ‘fool’s gold’ because it has a:", ["Brassy yellow colour and cubic crystals", "Perfect cleavage", "Low density", "Soft nature"], "It is harder and more brittle than gold, with a greenish-black streak."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "M", 1, "In an isoclinal fold the two limbs are:", ["At 90° to each other", "Parallel to each other", "Horizontal", "Curved"], "The limbs dip at the same angle."),
  j(G, "structure-tectonics", "E", 1, "Alfred Wegener's hypothesis of continental drift was supported by the:", ["Colour of the sea", "Fit of the continental margins and matching fossils", "Tides", "Length of the day"], "Coastlines such as South America and Africa fit together."),
  j(G, "structure-tectonics", "M", 2, "The Atlantic coasts of the Americas are examples of:", ["Active margins", "Transform margins", "Passive continental margins", "Subduction zones"], "They lie within a plate and are tectonically quiet."),
  j(G, "structure-tectonics", "M", 0, "The ‘Ring of Fire’ around the Pacific is a belt of:", ["Volcanoes and earthquakes", "Coral reefs", "Glaciers", "Evaporites"], "It follows the subduction zones around the ocean."),
  j(G, "structure-tectonics", "M", 1, "The vertical component of displacement across a fault is the:", ["Heave", "Throw", "Strike", "Pitch"], "The horizontal component is the heave."),
  j(G, "structure-tectonics", "H", 2, "On a Mohr diagram, the normal stress and shear stress on a plane are plotted as a point on a circle whose diameter equals:", ["σ₁ + σ₃", "σ₂", "σ₁ − σ₃", "σ₁ × σ₃"], "The circle runs from σ₃ to σ₁ along the normal-stress axis."),
  j(G, "structure-tectonics", "M", 1, "The East African Rift is an example of:", ["A convergent boundary", "A continental rift (incipient divergent boundary)", "A transform boundary", "A subduction zone"], "The continent is being stretched and may eventually split."),
  j(G, "structure-tectonics", "M", 3, "The intensity of an earthquake is measured on the:", ["Richter scale", "Mohs scale", "Beaufort scale", "Modified Mercalli scale"], "It rates the damage and felt effects at a place."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "M", 0, "Belemnites are characteristic fossils of the:", ["Mesozoic", "Cambrian", "Quaternary", "Precambrian"], "These extinct cephalopods lived in Jurassic and Cretaceous seas."),
  j(G, "stratigraphy-palaeontology", "M", 1, "The principle of faunal succession was developed by:", ["James Hutton", "William Smith", "Charles Lyell", "Alfred Wegener"], "Smith saw that strata contain fossils in a definite order."),
  j(G, "stratigraphy-palaeontology", "M", 2, "The Pleistocene epoch is characterised by:", ["Widespread tropical swamps", "Dinosaur dominance", "Repeated glaciations", "The first fishes"], "Ice sheets advanced and retreated many times."),
  j(G, "stratigraphy-palaeontology", "M", 1, "Which pair of isotopes is used in the K–Ar method of dating?", ["⁸⁷Rb and ⁸⁷Sr", "⁴⁰K and ⁴⁰Ar", "²³⁸U and ²⁰⁶Pb", "¹⁴C and ¹⁴N"], "⁴⁰K decays to ⁴⁰Ar with a half-life of 1.25 billion years."),
  j(G, "stratigraphy-palaeontology", "H", 3, "The Talchir Boulder Bed at the base of the Gondwana succession in India is of:", ["Volcanic origin", "Marine origin", "Desert origin", "Glacial origin"], "It records Permo-Carboniferous glaciation."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "M", 1, "Streamlined, wind-eroded ridges in deserts are called:", ["Barchans", "Yardangs", "Moraines", "Eskers"], "They are sculpted by wind abrasion."),
  j(G, "geomorphology-hydrology", "E", 1, "A feature produced by wave erosion on a shoreline is a:", ["Delta", "Wave-cut platform", "Moraine", "Dune"], "It is a flat surface left as cliffs retreat."),
  j(G, "geomorphology-hydrology", "M", 2, "Specific retention of a rock is the ratio of the volume of water retained against gravity to the:", ["Weight of rock", "Volume of void", "Total volume of rock", "Volume of water drained"], "Specific yield + specific retention = porosity."),
  j(G, "geomorphology-hydrology", "M", 0, "The Kolar Gold Fields are located in:", ["Karnataka", "Rajasthan", "Gujarat", "Himachal Pradesh"], "They mine gold-bearing quartz veins in Archaean greenstone."),
  j(G, "geomorphology-hydrology", "M", 3, "Hot springs and geysers are surface expressions of:", ["Glaciation", "Karst processes", "Wind erosion", "Geothermal activity"], "Groundwater is heated by hot rock at depth."),
  j(G, "geomorphology-hydrology", "M", 1, "Hydrologic balance for a basin is written as:", ["P = ET − R", "P = ET + R + ΔS", "P = R − ΔS", "ET = P + R"], "Precipitation is divided among evapotranspiration, runoff and storage."),
  j(G, "geomorphology-hydrology", "M", 0, "The sheet mica of Jharkhand and Bihar occurs mainly in:", ["Pegmatites", "Limestone", "Basalt", "Alluvium"], "Large books of muscovite form in coarse pegmatite veins."),
  j(G, "geomorphology-hydrology", "H", 1, "The term ‘base level’ for a river refers to the:", ["Highest point of the course", "Lowest level to which a river can erode, usually sea level", "Depth of the channel", "Level of the floodplain only"], "It controls the profile of the river."),
];

export const jamGeologyMock10 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "M", 1, "Which mineral is a hydrous aluminium silicate commonly found in weathered feldspar-rich rocks?", ["Olivine", "Kaolinite", "Pyroxene", "Garnet"], "Kaolinite results from hydrolysis of feldspar."),
  j(G, "mineralogy-petrology", "M", 0, "Which of the following is a non-silicate mineral?", ["Calcite", "Olivine", "Biotite", "Quartz"], "Calcite is a carbonate."),
  j(G, "mineralogy-petrology", "E", 0, "The rock formed when lava cools very rapidly on Earth's surface typically has:", ["A fine-grained or glassy texture", "A coarse texture", "Foliation", "Fossils"], "There is no time for large crystals to grow."),
  j(G, "mineralogy-petrology", "M", 2, "Amphibolite is produced by the metamorphism of:", ["Limestone", "Sandstone", "Basalt or gabbro", "Granite"], "Hornblende and plagioclase dominate the assemblage."),
  j(G, "mineralogy-petrology", "H", 2, "A rock showing ophitic texture has:", ["Interlocking quartz grains", "Rounded sand grains", "Plagioclase laths enclosed by pyroxene", "Glass shards"], "It is typical of dolerites."),
  j(G, "mineralogy-petrology", "M", 1, "The sedimentary rock formed mainly of the skeletal remains of marine organisms such as foraminifera is:", ["Arkose", "Chalk", "Conglomerate", "Greywacke"], "Chalk is a soft, fine-grained limestone."),
  j(G, "mineralogy-petrology", "M", 3, "Which of the following is NOT a polymorph of SiO₂?", ["Tridymite", "Cristobalite", "Coesite", "Corundum"], "Corundum is Al₂O₃."),
  j(G, "mineralogy-petrology", "H", 0, "Schistosity differs from slaty cleavage in that in schists the mica grains are:", ["Visible to the naked eye", "Microscopic", "Absent", "Randomly oriented"], "Higher grade allows the grains to grow larger."),
  j(G, "mineralogy-petrology", "M", 1, "The mineral apatite is the principal source of:", ["Aluminium", "Phosphorus", "Iron", "Chromium"], "Apatite is a calcium phosphate."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "M", 0, "An angular unconformity is distinguished by:", ["Beds below and above that dip at different angles", "Parallel strata", "Igneous rock above sedimentary", "A fault plane"], "Tilting and erosion preceded the deposition of the upper beds."),
  j(G, "structure-tectonics", "M", 2, "A normal fault results from:", ["Compression", "Shear", "Tension (extension)", "No stress"], "The crust is stretched and the hanging wall slides down."),
  j(G, "structure-tectonics", "M", 1, "Sea-floor spreading was proposed by:", ["Wegener", "Hess", "Lyell", "Hutton"], "Harry Hess suggested it in the early 1960s."),
  j(G, "structure-tectonics", "M", 0, "Seismic P waves are:", ["Compressional (longitudinal) waves", "Transverse waves", "Surface waves", "Electromagnetic waves"], "The particle motion is parallel to the direction of propagation."),
  j(G, "structure-tectonics", "H", 1, "The Andaman–Nicobar island arc lies along the boundary between the:", ["Pacific and Antarctic plates", "Indo-Australian and Burma/Sunda plates", "African and Arabian plates", "Cocos and Nazca plates"], "The 2004 Sumatra–Andaman earthquake occurred on this subduction zone."),
  j(G, "structure-tectonics", "M", 2, "The most abundant element by weight in the Earth's crust is:", ["Silicon", "Aluminium", "Oxygen", "Iron"], "Oxygen makes up about 46%."),
  j(G, "structure-tectonics", "M", 3, "Boudinage is a structure formed when a competent layer is:", ["Folded into a V", "Melted", "Faulted vertically", "Stretched and pulled apart into sausage-shaped segments"], "A stiff layer in a ductile matrix breaks into boudins."),
  j(G, "structure-tectonics", "H", 0, "A drag fold near a fault gives information about the:", ["Sense of relative movement on the fault", "Age of the fault", "Depth of the fault", "Dip of the topography"], "The beds bend in the direction of displacement."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "M", 1, "The Deccan Traps are mostly made of:", ["Granite", "Basalt flows", "Limestone", "Quartzite"], "They cover about half a million square kilometres of peninsular India."),
  j(G, "stratigraphy-palaeontology", "M", 0, "The Jurassic period is named after the:", ["Jura Mountains", "Alps", "Ural Mountains", "Appalachians"], "Marine limestones of the Jura are of this age."),
  j(G, "stratigraphy-palaeontology", "M", 2, "Fossil wood turned to stone is an example of:", ["Mould", "Imprint", "Petrification", "Amber preservation"], "Silica or carbonate minerals replace the cell structure."),
  j(G, "stratigraphy-palaeontology", "E", 3, "Fossils that are used to determine the age of the strata are called:", ["Trace fossils", "Living fossils", "Microfossils only", "Index fossils"], "They have a narrow time range and a wide distribution."),
  j(G, "stratigraphy-palaeontology", "H", 1, "The Mesozoic era ended with a mass extinction usually attributed to:", ["An ice age only", "A bolide impact and Deccan volcanism", "Rise of mammals", "A fall in sea level only"], "The Chicxulub impact and volcanism are linked to the K–Pg extinction."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "M", 2, "Alluvial fans are formed:", ["On high mountain tops", "Inside caves", "Where a stream emerges from a steep valley onto a plain", "In deep oceans"], "The stream slows and drops its coarse load."),
  j(G, "geomorphology-hydrology", "M", 0, "A drainage pattern resembling the branches of a tree, formed on homogeneous rock, is:", ["Dendritic", "Trellis", "Radial", "Rectangular"], "No structural control is evident."),
  j(G, "geomorphology-hydrology", "M", 1, "The mineral fluorite is a source of:", ["Chlorine", "Fluorine", "Iodine", "Phosphorus"], "Its formula is CaF₂."),
  j(G, "geomorphology-hydrology", "H", 2, "Groundwater of the Ganga plains contains high arsenic in many areas mainly because of:", ["Industrial smoke", "Rain acidity", "Reductive dissolution of iron oxyhydroxides in alluvial sediments", "Seawater intrusion"], "Organic matter-driven reducing conditions release arsenic into water."),
  j(G, "geomorphology-hydrology", "M", 3, "In arid regions, a dry lake bed that contains salts is called a:", ["Cirque", "Moraine", "Esker", "Playa"], "Evaporation concentrates salts on the surface."),
  j(G, "geomorphology-hydrology", "M", 1, "The principal ore mineral of mercury is:", ["Galena", "Cinnabar", "Pyrolusite", "Bauxite"], "Cinnabar is HgS."),
  j(G, "geomorphology-hydrology", "E", 1, "Which natural resource is classed as non-renewable?", ["Solar energy", "Petroleum", "Wind energy", "Tidal energy"], "It takes millions of years to form."),
  j(G, "geomorphology-hydrology", "M", 0, "The ‘lag time’ in a hydrograph is the time between the:", ["Centre of rainfall and the peak discharge", "Start of rain and the end of discharge", "Peak flow and the baseflow", "Two storms"], "It depends on basin shape and slope."),
];

export const jamGeologyMock11 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "M", 1, "The mineral with perfect rhombohedral cleavage and double refraction is:", ["Quartz", "Calcite", "Olivine", "Pyrite"], "A clear calcite crystal shows a doubled image of text seen through it."),
  j(G, "mineralogy-petrology", "M", 0, "Which of the following is an intermediate volcanic rock?", ["Andesite", "Rhyolite", "Basalt", "Komatiite"], "Andesite contains 52–63% silica."),
  j(G, "mineralogy-petrology", "M", 2, "In the Barrovian sequence of increasing metamorphic grade, the correct order is:", ["Garnet, chlorite, biotite", "Biotite, chlorite, garnet", "Chlorite, biotite, garnet", "Garnet, biotite, chlorite"], "Chlorite is stable at low grade and garnet appears at higher grade."),
  j(G, "mineralogy-petrology", "H", 1, "Diagenesis is the set of processes that convert:", ["Rock to magma", "Loose sediment to sedimentary rock", "Shale to slate only", "Lava to ash"], "It includes compaction and cementation."),
  j(G, "mineralogy-petrology", "M", 3, "Which of the following is a feldspathoid mineral found in silica-undersaturated rocks?", ["Quartz", "Orthoclase", "Albite", "Nepheline"], "Nepheline cannot coexist with free quartz."),
  j(G, "mineralogy-petrology", "M", 0, "Ripple marks in sandstone indicate deposition by:", ["Currents or waves", "Glaciers only", "Volcanic eruptions", "Metamorphism"], "Oscillating or unidirectional flow shapes the sand."),
  j(G, "mineralogy-petrology", "H", 2, "The lustre of a mineral with a bright shiny surface like metal is called:", ["Vitreous", "Silky", "Metallic", "Earthy"], "Galena and pyrite have metallic lustre."),
  j(G, "mineralogy-petrology", "M", 1, "A xenolith in an igneous rock is a:", ["Large crystal of the same magma", "Fragment of foreign rock enclosed in the magma", "Gas bubble", "Vein"], "It is picked up from the wall rock during intrusion."),
  j(G, "mineralogy-petrology", "M", 2, "Mineral hardness can be measured with a:", ["Hand lens", "Magnet", "Scratch test using standard minerals", "Streak plate only"], "Mohs' scale compares the ability to scratch."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "M", 1, "The shape of the Himalayan arc is concave to the:", ["South", "North", "East", "West"], "The mountains curve around the Indian plate's northern margin."),
  j(G, "structure-tectonics", "M", 2, "The Wadati–Benioff zone is a zone of:", ["Evaporite deposition", "Mountain glaciers", "Earthquake foci along a subducting slab", "Fold belts only"], "Earthquake foci dip beneath the overriding plate."),
  j(G, "structure-tectonics", "M", 0, "The release of strain energy stored in rocks by sudden fault slip is explained by the:", ["Elastic rebound theory", "Plume theory", "Isostasy", "Nebular hypothesis"], "Reid proposed it after the 1906 San Francisco earthquake."),
  j(G, "structure-tectonics", "H", 3, "A thrust sheet that has been transported far from its root and is surrounded by younger rocks after erosion is a:", ["Horst", "Dyke", "Boudin", "Klippe"], "A window is the opposite, with older rock exposed through the thrust sheet."),
  j(G, "structure-tectonics", "M", 1, "The age of the oceanic crust is generally less than:", ["20 million years", "About 200 million years", "2 billion years", "4 billion years"], "It is recycled by subduction."),
  j(G, "structure-tectonics", "M", 2, "Pillow lavas form when basaltic lava erupts:", ["On a glacier", "In the desert", "Under water", "In a cave"], "The outer surface chills quickly into rounded lobes."),
  j(G, "structure-tectonics", "H", 0, "Which structure is most suitable for determining the way-up of undeformed sedimentary beds?", ["Graded bedding", "Joints", "Foliation", "Boudins"], "The coarse base and fine top show younging direction."),
  j(G, "structure-tectonics", "M", 1, "The Aravalli range is a:", ["Young fold mountain", "Very old, much eroded fold belt", "Volcanic cone", "Rift valley"], "It is a Precambrian orogenic belt."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "M", 0, "The oldest known fossils, over 3.4 billion years old, are of:", ["Prokaryotic microbes", "Trilobites", "Algae with shells", "Fishes"], "Microfossils and stromatolites from the Archaean."),
  j(G, "stratigraphy-palaeontology", "M", 3, "The period known as the ‘Age of Fishes’ is the:", ["Cambrian", "Permian", "Cretaceous", "Devonian"], "Armoured fish and early sharks diversified then."),
  j(G, "stratigraphy-palaeontology", "M", 1, "The Karewa Formation of Kashmir is a:", ["Marine limestone", "Lacustrine (lake) deposit of Plio-Pleistocene age", "Granite", "Coal measure"], "It records an ancient lake in the Kashmir valley."),
  j(G, "stratigraphy-palaeontology", "H", 1, "Which of the following is an example of a trace fossil?", ["A trilobite shell", "A dinosaur footprint", "Petrified wood", "An amber insect"], "Trace fossils record behaviour rather than the body."),
  j(G, "stratigraphy-palaeontology", "E", 2, "The geological time scale was established chiefly on the basis of:", ["Ocean tides", "Rainfall", "Fossils and radiometric ages", "Moon phases"], "Both relative and absolute dating contributed."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "M", 2, "Eskers are deposits of:", ["Wind", "Ocean tides", "Meltwater streams under or within glaciers", "Volcanoes"], "They are long sinuous ridges of sand and gravel."),
  j(G, "geomorphology-hydrology", "M", 0, "Which weathering process is chiefly responsible for the formation of caves in limestone?", ["Dissolution", "Frost wedging", "Salt crystallisation", "Exfoliation"], "Carbonic acid dissolves calcite."),
  j(G, "geomorphology-hydrology", "M", 1, "Residual hills left standing above a peneplain are called:", ["Moraines", "Monadnocks", "Drumlins", "Barchans"], "They are more resistant than the surrounding rock."),
  j(G, "geomorphology-hydrology", "H", 2, "Which of the following methods is used to determine the transmissivity of an aquifer?", ["Slump test only", "Radiocarbon dating", "Pumping test", "Seismic refraction"], "Drawdown data from a pumping well give T and S."),
  j(G, "geomorphology-hydrology", "M", 0, "Which mineral is the principal ore of iron with highest magnetism?", ["Magnetite", "Haematite", "Limonite", "Siderite"], "Magnetite contains 72% iron."),
  j(G, "geomorphology-hydrology", "M", 1, "The delta of the Ganga–Brahmaputra is the largest in the world; it is a:", ["Arcuate delta", "Tide-dominated and fluvial deltaic plain", "Bird-foot delta", "Cuspate delta"], "The Sundarbans are in the tidal part of the delta."),
  j(G, "geomorphology-hydrology", "E", 3, "Gold is found as a native element, meaning it occurs:", ["As an oxide", "As a sulphide", "As a carbonate", "In an uncombined form"], "Native elements are not chemically bonded to other elements."),
  j(G, "geomorphology-hydrology", "M", 2, "The slope of the land surface along a stream bed is called its:", ["Discharge", "Load", "Gradient", "Meander"], "It is expressed as height drop per unit length."),
];

export const jamGeologyMock12 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "H", 1, "In a ternary diagram for sandstone classification (QFL), a quartz arenite plots near the:", ["F apex", "Q apex", "L apex", "Centre"], "It is made almost entirely of quartz grains."),
  j(G, "mineralogy-petrology", "H", 2, "The Fe/Mg-rich orthopyroxene in a hypersthene-bearing rock indicates that the rock crystallised from:", ["Acidic magma", "A sedimentary protolith only", "Mafic to intermediate melt or granulite facies conditions", "A carbonate melt"], "Orthopyroxene is stable in mafic igneous rocks and granulites."),
  j(G, "mineralogy-petrology", "H", 0, "The first-order interference colour of quartz in thin section under crossed polars is typically:", ["Grey to white", "Third-order pink", "Isotropic black", "Green"], "Its low birefringence (0.009) gives grey-white colours in 30 µm sections."),
  j(G, "mineralogy-petrology", "H", 1, "The assemblage olivine + quartz is not stable together because they react to form:", ["Garnet", "Orthopyroxene", "Feldspar", "Mica"], "Mg₂SiO₄ + SiO₂ gives 2 MgSiO₃."),
  j(G, "mineralogy-petrology", "M", 0, "Peridotite is the dominant rock type of the:", ["Upper mantle", "Continental crust", "Oceanic sediments", "Inner core"], "It consists of olivine and pyroxenes."),
  j(G, "mineralogy-petrology", "H", 2, "Eutectic crystallisation in the system diopside–anorthite means that:", ["Only one mineral crystallises", "The melt is always glassy", "Both minerals crystallise together at a fixed temperature at the lowest melting composition", "The minerals form a solid solution"], "The eutectic is the lowest-melting composition."),
  j(G, "mineralogy-petrology", "H", 1, "Staurolite and kyanite are typical minerals of which metamorphic facies?", ["Zeolite", "Amphibolite", "Granulite", "Sanidinite"], "Medium-pressure, medium to high-temperature pelitic assemblages."),
  j(G, "mineralogy-petrology", "M", 3, "The Fe-bearing mineral commonly used for the extraction of titanium is:", ["Magnetite", "Haematite", "Chromite", "Ilmenite"], "Ilmenite is FeTiO₃."),
  j(G, "mineralogy-petrology", "H", 0, "A positive europium anomaly in a REE pattern of a rock suggests:", ["Plagioclase accumulation", "Plagioclase fractionation from the melt", "Garnet fractionation", "Zircon accumulation"], "Eu²⁺ substitutes for Ca²⁺ in plagioclase."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "H", 2, "The stereographic projection is used to represent:", ["Chemical composition", "Mineral grain size", "Three-dimensional orientation data of planes and lines", "Seismic velocities"], "Poles to planes and lineations are plotted on the net."),
  j(G, "structure-tectonics", "H", 0, "In a parallel (concentric) fold, the thickness of a bed measured perpendicular to the bedding is:", ["Constant around the fold", "Greater in the hinge zone", "Greater in the limbs", "Zero at the hinge"], "The layers keep their orthogonal thickness, so the fold shape changes with depth."),
  j(G, "structure-tectonics", "M", 1, "The Himalayan Main Central Thrust separates the:", ["Siwaliks from the Gangetic plain", "Higher Himalayan crystallines from the Lesser Himalaya", "Tibet from India", "Karakoram from Pamir"], "It brings high-grade rocks over the Lesser Himalaya."),
  j(G, "structure-tectonics", "H", 0, "In Airy's isostasy, mountain elevation is compensated by:", ["A deeper crustal root of constant density", "A lateral density change at constant thickness", "Flow of the asthenosphere only", "A thinner crust"], "Higher topography has a deeper root."),
  j(G, "structure-tectonics", "H", 3, "The Curie temperature is important in palaeomagnetism because above it a mineral:", ["Melts", "Becomes harder", "Turns into glass", "Loses its ferromagnetism"], "Magnetisation is acquired on cooling through it."),
  j(G, "structure-tectonics", "M", 0, "The strain in a rock that returns to original shape on removal of stress is:", ["Elastic", "Plastic", "Ductile", "Brittle"], "Recoverable deformation is elastic."),
  j(G, "structure-tectonics", "H", 2, "The orientation of a fault plane with respect to the maximum stress σ₁ in an Andersonian normal fault is that σ₁ is:", ["Horizontal", "Dipping at 45°", "Vertical", "Parallel to the strike"], "In extension, the vertical load is the maximum principal stress."),
  j(G, "structure-tectonics", "M", 1, "Which of the following is a result of slab pull?", ["Fall of sea level", "Movement of an oceanic plate towards a subduction zone", "Formation of dunes", "Glaciation"], "The dense sinking slab drags the plate."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "H", 1, "Walther's law of facies states that:", ["Facies are random", "Vertically adjacent facies were deposited in laterally adjacent environments", "Facies never change", "Facies form only in deserts"], "A migrating environment leaves facies stacked in the same order."),
  j(G, "stratigraphy-palaeontology", "H", 0, "The magnetostratigraphic scale is based on:", ["Reversals of the Earth's magnetic field recorded in rocks", "Fossil abundance", "Colour of the rock", "Grain size"], "Normal and reversed polarity chrons are correlated worldwide."),
  j(G, "stratigraphy-palaeontology", "M", 2, "The principle of cross-cutting relationships states that:", ["Older faults are always horizontal", "Folds cut rivers", "A feature that cuts across a rock is younger than the rock it cuts", "Intrusions are older than their host rock"], "A dyke is younger than the rocks it intrudes."),
  j(G, "stratigraphy-palaeontology", "M", 1, "The Neogene period consists of the Miocene and the:", ["Eocene", "Pliocene", "Oligocene", "Paleocene"], "The Pliocene follows the Miocene and precedes the Quaternary."),
  j(G, "stratigraphy-palaeontology", "H", 2, "The Rb–Sr isochron method yields:", ["Only relative ages", "The age of fossils", "The age of a suite of cogenetic rocks and initial ⁸⁷Sr/⁸⁶Sr ratio", "The magnetic age"], "The slope of the isochron gives the age."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "H", 1, "A well is pumped at a constant rate and the cone of depression is found to be steeper in a lower transmissivity aquifer because:", ["Water is denser", "A greater head gradient is required to supply the same discharge", "The well is deeper", "The water is warmer"], "Q = T · gradient × width."),
  j(G, "geomorphology-hydrology", "H", 0, "In the Piper trilinear diagram, the groundwater composition is plotted using:", ["Major cations and anions", "Only pH", "Isotopes", "Trace metals"], "It helps classify water types."),
  j(G, "geomorphology-hydrology", "M", 2, "The Hjulström curve relates:", ["Rainfall and runoff", "Slope and elevation", "Flow velocity to the size of particles eroded, transported or deposited", "Temperature and weathering"], "Fine silt and clay need higher velocities for erosion than sand."),
  j(G, "geomorphology-hydrology", "H", 2, "The main mechanism of formation of orogenic gold deposits is:", ["Evaporation", "Weathering residual enrichment", "Hydrothermal fluid flow along shear zones during metamorphism", "Magmatic segregation"], "Quartz–carbonate veins in greenstone belts host gold."),
  j(G, "geomorphology-hydrology", "M", 1, "Which type of oil trap is formed by an impermeable salt dome?", ["Stratigraphic trap only", "Structural trap", "Placer", "Lithostatic trap only"], "The rising salt arches overlying strata and seals reservoirs against its flank."),
  j(G, "geomorphology-hydrology", "H", 3, "The uranium deposits of Jaduguda in Jharkhand are associated with:", ["Deccan basalts", "Gondwana coalfields", "Deltaic sands", "The Singhbhum shear zone"], "Uranium mineralisation is hosted in sheared metasediments."),
  j(G, "geomorphology-hydrology", "H", 0, "Hydraulic head at a point in an aquifer is the sum of the elevation head and the:", ["Pressure head", "Kinetic head", "Thermal head", "Gravity head"], "Velocity head is negligible for groundwater."),
  j(G, "geomorphology-hydrology", "H", 1, "Which type of Quaternary climate change is most responsible for the formation of river terraces in the Himalayan foreland?", ["Plate collision alone", "Alternations between aggradation and incision due to climate and tectonics", "Seafloor spreading", "Wind erosion"], "Changes in sediment supply and discharge produced cut-and-fill sequences."),
];
