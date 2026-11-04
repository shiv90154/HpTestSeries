// IIT JAM Geology (GG) — Mocks 2 to 4: 30 MCQs each, written fresh: mineralogy and petrology 9, structural geology and tectonics 8,
// stratigraphy and palaeontology 5, geomorphology, hydrology and economic geology 8.

import { j } from "./types";

const G = "jam-geology";

export const jamGeologyMock2 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "M", 1, "The most abundant group of minerals in the Earth's crust is the:", ["Quartz group", "Feldspars", "Micas", "Pyroxenes"], "Feldspars make up about half of the continental crust."),
  j(G, "mineralogy-petrology", "E", 3, "The mineral with Mohs hardness 10 is:", ["Corundum", "Topaz", "Quartz", "Diamond"], "Diamond is the hardest natural mineral."),
  j(G, "mineralogy-petrology", "M", 0, "Muscovite mica is characterised by:", ["Perfect cleavage in one direction", "Conchoidal fracture", "Cubic cleavage", "No cleavage"], "Its sheet structure gives perfect basal cleavage."),
  j(G, "mineralogy-petrology", "M", 2, "A volcanic glass formed by very rapid cooling of silicic lava is:", ["Basalt", "Pumice", "Obsidian", "Scoria"], "Obsidian has a conchoidal fracture and no crystals."),
  j(G, "mineralogy-petrology", "M", 1, "In a porphyritic igneous rock, the large crystals are called:", ["Xenoliths", "Phenocrysts", "Vesicles", "Amygdales"], "They are set in a finer-grained groundmass."),
  j(G, "mineralogy-petrology", "H", 2, "A sandstone with more than about 25% feldspar is called:", ["Quartz arenite", "Greywacke", "Arkose", "Lithic arenite"], "Arkose forms from rapid erosion of granitic sources."),
  j(G, "mineralogy-petrology", "M", 1, "Gneissic banding is a feature of:", ["Low-grade metamorphism", "High-grade regional metamorphism", "Diagenesis", "Hydrothermal veins"], "Segregation of light and dark minerals into layers occurs at high temperature."),
  j(G, "mineralogy-petrology", "M", 0, "Contact metamorphism of shale around an intrusion commonly produces:", ["Hornfels", "Schist", "Marble", "Quartzite"], "A fine-grained non-foliated rock results from heat without directed pressure."),
  j(G, "mineralogy-petrology", "E", 2, "Calcite, CaCO₃, can be identified in the field because it:", ["Scratches glass", "Is magnetic", "Effervesces in dilute hydrochloric acid", "Has a metallic lustre"], "The reaction releases CO₂."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "E", 1, "A fold in which the limbs dip towards the axial plane and the youngest rocks lie in the core is a:", ["Anticline", "Syncline", "Monocline", "Dome"], "The strata form a trough-like structure."),
  j(G, "structure-tectonics", "M", 2, "In a reverse fault, the hanging wall has moved:", ["Down relative to the footwall", "Horizontally only", "Up relative to the footwall", "Not at all"], "Compression pushes the hanging wall up the fault plane."),
  j(G, "structure-tectonics", "M", 0, "A strike-slip fault is one in which the displacement is mainly:", ["Horizontal, parallel to the fault strike", "Vertical", "Parallel to the dip", "Rotational about a vertical axis only"], "The San Andreas Fault is a well-known example."),
  j(G, "structure-tectonics", "M", 1, "The average thickness of the continental crust is about:", ["5 km", "35 km", "100 km", "400 km"], "Oceanic crust is only about 7 km thick."),
  j(G, "structure-tectonics", "M", 2, "Deep oceanic trenches and volcanic arcs are characteristic of:", ["Divergent boundaries", "Transform boundaries", "Convergent (subduction) boundaries", "Intraplate hotspots only"], "One plate descends beneath another."),
  j(G, "structure-tectonics", "H", 1, "When the magnitude of an earthquake increases by one unit, the energy released increases by a factor of about:", ["10", "32", "100", "1000"], "Energy scales as 10^(1.5 M)."),
  j(G, "structure-tectonics", "M", 3, "Which of the following is a surface seismic wave?", ["P wave", "S wave", "Primary wave", "Love wave"], "Love and Rayleigh waves travel along the surface and cause most damage."),
  j(G, "structure-tectonics", "M", 1, "An unconformity represents:", ["A continuous sequence of deposition", "A gap in the geological record", "A fold axis", "A change in dip only"], "Erosion or non-deposition removed part of the record."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "E", 0, "According to the law of superposition, in an undisturbed sequence of sedimentary rocks the youngest layer is at the:", ["Top", "Bottom", "Middle", "Side"], "Each new layer is deposited above the earlier ones."),
  j(G, "stratigraphy-palaeontology", "M", 1, "A good index fossil should have:", ["A long time range and restricted distribution", "A short time range and wide geographical distribution", "A soft body only", "A rare occurrence"], "This allows precise correlation across regions."),
  j(G, "stratigraphy-palaeontology", "M", 2, "The correct order of the Mesozoic periods from oldest to youngest is:", ["Jurassic, Triassic, Cretaceous", "Cretaceous, Jurassic, Triassic", "Triassic, Jurassic, Cretaceous", "Triassic, Cretaceous, Jurassic"], "The Mesozoic runs from about 252 to 66 million years ago."),
  j(G, "stratigraphy-palaeontology", "M", 1, "The Glossopteris flora is evidence for the former existence of:", ["Pangaea's northern part only", "Gondwanaland", "Laurasia", "The Tethys Ocean"], "The fossil occurs in India, Africa, South America, Australia and Antarctica."),
  j(G, "stratigraphy-palaeontology", "M", 2, "Radiocarbon dating is useful for materials younger than about:", ["500 years", "5000 years", "50 000 years", "500 million years"], "After several half-lives of 5730 years too little ¹⁴C remains."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "M", 1, "The youth stage of a river is characterised by:", ["Meanders and wide floodplains", "V-shaped valleys and rapids", "Deltas", "Oxbow lakes"], "Vertical erosion dominates in the steep upper course."),
  j(G, "geomorphology-hydrology", "M", 0, "An artesian well taps a:", ["Confined aquifer under pressure", "Perched water table", "Unconfined aquifer", "Dry aquifer"], "The water rises above the aquifer top because of hydrostatic pressure."),
  j(G, "geomorphology-hydrology", "M", 1, "Deltas are formed where a river:", ["Begins in the mountains", "Deposits its sediment on entering a standing body of water", "Erodes its bed", "Joins a tributary"], "The current slows and the load is dropped."),
  j(G, "geomorphology-hydrology", "M", 2, "Caves and sinkholes are most common in terrain underlain by:", ["Granite", "Sandstone", "Limestone", "Basalt"], "Carbonic acid in groundwater dissolves carbonate rock."),
  j(G, "geomorphology-hydrology", "H", 0, "Porphyry copper deposits are mostly associated with:", ["Felsic to intermediate intrusive rocks", "Ultramafic rocks", "Sedimentary basins", "Metamorphic soles"], "Hydrothermal fluids from cooling intrusions deposit disseminated sulphides."),
  j(G, "geomorphology-hydrology", "M", 2, "Laterite is formed by:", ["Glacial erosion", "Physical weathering in deserts", "Intense chemical weathering in hot, humid regions", "Volcanic eruptions"], "Silica is leached and iron and aluminium oxides remain."),
  j(G, "geomorphology-hydrology", "M", 0, "The water table is the:", ["Upper surface of the zone of saturation", "Lower limit of the aquifer", "Surface of a lake", "Boundary of the soil"], "Below it all pore spaces are filled with water."),
  j(G, "geomorphology-hydrology", "M", 1, "A barchan dune is a crescent-shaped dune whose horns point:", ["Upwind", "Downwind", "Perpendicular to the wind", "Skywards"], "Sand moves over the windward slope and the horns trail downwind."),
];

export const jamGeologyMock3 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "M", 1, "The chemical formula of the mineral orthoclase is:", ["NaAlSi₃O₈", "KAlSi₃O₈", "CaAl₂Si₂O₈", "Mg₂SiO₄"], "Orthoclase is a potassium feldspar."),
  j(G, "mineralogy-petrology", "M", 2, "Which mineral is a polymorph of Al₂SiO₅ stable at high pressure and relatively low temperature?", ["Sillimanite", "Andalusite", "Kyanite", "Staurolite"], "Kyanite is the high-pressure polymorph."),
  j(G, "mineralogy-petrology", "E", 0, "The streak of haematite is:", ["Reddish brown", "Black", "White", "Green"], "Even when the mineral looks grey-black its powder is reddish brown."),
  j(G, "mineralogy-petrology", "M", 3, "A rock composed almost entirely of olivine is called:", ["Gabbro", "Basalt", "Diorite", "Dunite"], "Dunite is an ultramafic rock."),
  j(G, "mineralogy-petrology", "M", 0, "Vesicular texture in volcanic rocks results from:", ["Escape of gas bubbles", "Slow cooling", "Metamorphism", "Weathering only"], "Dissolved gases exsolve when pressure drops during eruption."),
  j(G, "mineralogy-petrology", "H", 1, "Chemical sedimentary rocks such as rock salt and gypsum are called:", ["Clastics", "Evaporites", "Bioherms", "Turbidites"], "They precipitate from evaporating brine."),
  j(G, "mineralogy-petrology", "M", 2, "Which of the following is a foliated metamorphic rock?", ["Quartzite", "Marble", "Schist", "Hornfels"], "Platy minerals are aligned perpendicular to the stress."),
  j(G, "mineralogy-petrology", "M", 1, "The Mg-rich end member of the olivine series is:", ["Fayalite", "Forsterite", "Tephroite", "Monticellite"], "Forsterite is Mg₂SiO₄ and fayalite is Fe₂SiO₄."),
  j(G, "mineralogy-petrology", "H", 0, "Anorthosite is composed mainly of:", ["Plagioclase feldspar", "Quartz", "Olivine", "Muscovite"], "It is a leucocratic rock with more than 90% plagioclase."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "M", 0, "A joint differs from a fault in that along a joint there is:", ["No visible displacement", "Large displacement", "Folding", "Metamorphism"], "A joint is a fracture without measurable movement."),
  j(G, "structure-tectonics", "M", 1, "The three principal stresses are ordered as:", ["σ₁ < σ₂ < σ₃", "σ₁ > σ₂ > σ₃", "σ₁ = σ₃ > σ₂", "σ₂ > σ₁ > σ₃"], "σ₁ is the maximum principal stress."),
  j(G, "structure-tectonics", "H", 2, "The lithosphere–asthenosphere boundary is marked by a change in:", ["Chemical composition", "Mineral name", "Mechanical behaviour (rigid to ductile)", "Density only"], "The asthenosphere is weak and flows."),
  j(G, "structure-tectonics", "M", 1, "Symmetrical magnetic anomaly stripes on either side of a mid-ocean ridge support:", ["Continental glaciation", "Sea-floor spreading", "Mountain building", "Eustasy"], "New crust records the changing polarity of the geomagnetic field."),
  j(G, "structure-tectonics", "M", 0, "The Himalayan collision zone is an example of:", ["Continent–continent convergence", "Ocean–ocean divergence", "Transform motion", "A hotspot track"], "India collided with Eurasia about 50 million years ago."),
  j(G, "structure-tectonics", "M", 3, "The seismic wave with the highest velocity is the:", ["S wave", "Love wave", "Rayleigh wave", "P wave"], "P waves are compressional and arrive first."),
  j(G, "structure-tectonics", "H", 1, "An overturned fold has:", ["A vertical axial plane", "Both limbs dipping in the same direction", "A horizontal axial plane only", "No hinge"], "One limb is rotated beyond the vertical so both limbs dip the same way."),
  j(G, "structure-tectonics", "M", 2, "The San Andreas Fault is a:", ["Normal fault", "Reverse fault", "Transform fault", "Thrust fault"], "It separates the Pacific and North American plates."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "M", 1, "The Cambrian explosion refers to the rapid diversification of:", ["Land plants", "Marine animals with hard parts", "Mammals", "Birds"], "Most animal phyla appear in the fossil record about 540 million years ago."),
  j(G, "stratigraphy-palaeontology", "M", 0, "The largest mass extinction, at the end of the Permian, occurred about:", ["252 million years ago", "66 million years ago", "145 million years ago", "20 million years ago"], "Roughly 90% of marine species disappeared."),
  j(G, "stratigraphy-palaeontology", "M", 2, "Graptolites are index fossils of which part of the Palaeozoic?", ["Carboniferous coal swamps", "Permian deserts", "Ordovician and Silurian", "Devonian reefs only"], "Planktonic graptolites evolved rapidly and are widely distributed."),
  j(G, "stratigraphy-palaeontology", "M", 1, "Which Indian sedimentary succession contains the main coal reserves?", ["Vindhyan", "Gondwana", "Siwalik", "Cuddapah"], "Permian Gondwana coals lie in the Damodar and Mahanadi valleys."),
  j(G, "stratigraphy-palaeontology", "H", 2, "The age of a rock that contains 25% of its original parent isotope (half-life T) is:", ["T", "1.5 T", "2 T", "4 T"], "25% remains after two half-lives."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "M", 3, "A bowl-shaped depression carved by a glacier at the head of a valley is a:", ["Fjord", "Esker", "Drumlin", "Cirque"], "Cirques form by frost shattering and plucking."),
  j(G, "geomorphology-hydrology", "M", 1, "The velocity of groundwater flow depends on the hydraulic gradient and the:", ["Colour of rock", "Hydraulic conductivity", "Age of rock", "Mineral hardness"], "Darcy's law relates discharge to K and the gradient."),
  j(G, "geomorphology-hydrology", "E", 2, "Chalcopyrite is an ore of:", ["Iron", "Lead", "Copper", "Zinc"], "It is CuFeS₂."),
  j(G, "geomorphology-hydrology", "M", 0, "Which weathering process is dominant in cold climates with repeated freezing and thawing?", ["Frost wedging", "Hydrolysis", "Oxidation", "Carbonation"], "Water expands about 9% on freezing and widens cracks."),
  j(G, "geomorphology-hydrology", "H", 1, "Placer deposits are formed by:", ["Metamorphism", "Concentration of heavy minerals by flowing water", "Cooling of magma", "Evaporation"], "Dense minerals such as gold and cassiterite settle first."),
  j(G, "geomorphology-hydrology", "M", 2, "Longshore drift moves sediment:", ["Perpendicular to the coast", "Away from the sea", "Along the shoreline", "Vertically"], "Waves approaching at an angle carry sediment along the beach."),
  j(G, "geomorphology-hydrology", "M", 1, "The main ore mineral of lead is:", ["Sphalerite", "Galena", "Pyrite", "Cinnabar"], "Galena is PbS."),
  j(G, "geomorphology-hydrology", "M", 0, "A hydrograph shows the variation of river:", ["Discharge with time", "Width with depth", "Slope with distance", "Colour with season"], "Peak discharge follows a storm."),
];

export const jamGeologyMock4 = [
  // ───────── Mineralogy and petrology ─────────
  j(G, "mineralogy-petrology", "M", 1, "Which of the following minerals has a tectosilicate (framework) structure?", ["Olivine", "Quartz", "Augite", "Biotite"], "Every oxygen of the tetrahedra is shared with neighbouring tetrahedra."),
  j(G, "mineralogy-petrology", "M", 0, "The extrusive equivalent of granite is:", ["Rhyolite", "Basalt", "Andesite", "Komatiite"], "Both have the same chemical composition."),
  j(G, "mineralogy-petrology", "E", 1, "Which of the following is a sedimentary rock?", ["Granite", "Limestone", "Gneiss", "Basalt"], "It is formed from the accumulation of carbonate material."),
  j(G, "mineralogy-petrology", "M", 3, "Two distinct cleavage directions at nearly 90° are typical of:", ["Quartz", "Mica", "Calcite", "Pyroxene"], "Pyroxenes cleave at about 87°/93°, whereas amphiboles cleave at 56°/124°."),
  j(G, "mineralogy-petrology", "H", 1, "A rock composed predominantly of calcium-rich pyroxene and plagioclase, intrusive and coarse-grained, is:", ["Granite", "Gabbro", "Dunite", "Syenite"], "Gabbro is the plutonic equivalent of basalt."),
  j(G, "mineralogy-petrology", "M", 2, "Metamorphism at high pressure but low temperature, as in subduction zones, produces:", ["Hornfels", "Granulite", "Blueschist", "Migmatite"], "Glaucophane gives it a blue colour."),
  j(G, "mineralogy-petrology", "M", 0, "The refractive index of a mineral is measured by comparing it with immersion liquids; a mineral that is isotropic belongs to the:", ["Cubic system", "Hexagonal system", "Monoclinic system", "Triclinic system"], "Cubic crystals have the same refractive index in all directions."),
  j(G, "mineralogy-petrology", "M", 1, "The Fe-rich mineral that is strongly magnetic is:", ["Haematite", "Magnetite", "Pyrite", "Limonite"], "Magnetite, Fe₃O₄, is attracted to a magnet."),
  j(G, "mineralogy-petrology", "H", 2, "In which type of magma series does the magma enrich in iron relative to magnesium in early differentiation without silica enrichment?", ["Calc-alkaline", "Alkaline", "Tholeiitic", "Peralkaline"], "Tholeiitic fractionation under low oxygen fugacity gives iron enrichment."),
  // ───────── Structural geology and tectonics ─────────
  j(G, "structure-tectonics", "M", 1, "A line along which a bed intersects a horizontal plane is the:", ["Dip", "Strike", "Plunge", "Pitch"], "It is the trend of the bed."),
  j(G, "structure-tectonics", "M", 2, "The thickest part of the Earth by volume is the:", ["Crust", "Outer core", "Mantle", "Inner core"], "The mantle occupies about 84% of the Earth's volume."),
  j(G, "structure-tectonics", "M", 0, "In structural geology, a horst is a:", ["Block uplifted between two normal faults", "Block dropped between two normal faults", "Fold structure", "Joint set"], "A graben is the downthrown equivalent."),
  j(G, "structure-tectonics", "M", 1, "Earthquake foci at depth up to 700 km are found in:", ["Mid-ocean ridges", "Subduction zones (Wadati–Benioff zones)", "Hotspots", "Continental interiors"], "The descending slab remains brittle to great depth."),
  j(G, "structure-tectonics", "H", 0, "The Deccan Traps are thought to have been produced by a:", ["Mantle plume (hotspot)", "Subduction zone", "Transform fault", "Meteorite impact only"], "The Réunion hotspot lay beneath India at the time."),
  j(G, "structure-tectonics", "M", 2, "A shear zone is characterised by:", ["Brittle fracture only", "No deformation", "Concentrated ductile or brittle deformation", "Volcanism"], "Strain is localised along a narrow zone."),
  j(G, "structure-tectonics", "M", 1, "Isostasy explains why:", ["Earthquakes occur", "Mountains have deep roots", "Magma rises", "Rivers meander"], "Light crust floats on the denser mantle like an iceberg."),
  j(G, "structure-tectonics", "H", 3, "The Gutenberg discontinuity is the boundary between the:", ["Crust and mantle", "Upper and lower mantle", "Inner and outer core", "Mantle and outer core"], "S waves vanish and P waves slow at about 2900 km depth."),
  // ───────── Stratigraphy and palaeontology ─────────
  j(G, "stratigraphy-palaeontology", "M", 1, "Fossils of the first land plants are found in rocks of the:", ["Cambrian", "Silurian", "Jurassic", "Eocene"], "Small vascular plants appear in the Silurian."),
  j(G, "stratigraphy-palaeontology", "M", 0, "The ‘Age of Mammals’ is the:", ["Cenozoic", "Mesozoic", "Palaeozoic", "Precambrian"], "Mammals diversified after the extinction of the dinosaurs."),
  j(G, "stratigraphy-palaeontology", "E", 2, "Fossils are mostly found in:", ["Igneous rocks", "High-grade metamorphic rocks", "Sedimentary rocks", "Meteorites"], "Burial in sediment preserves organic remains."),
  j(G, "stratigraphy-palaeontology", "M", 3, "The geological time unit smaller than an era is a:", ["Eon", "Epoch", "Chron", "Period"], "Eras are divided into periods, which are divided into epochs."),
  j(G, "stratigraphy-palaeontology", "H", 1, "The Siwalik Group is famous for fossils of:", ["Trilobites", "Mammals including primates", "Dinosaurs", "Ammonites"], "These Miocene–Pleistocene molasse deposits of the Himalayan foreland contain mammalian fauna."),
  // ───────── Geomorphology, hydrology and economic geology ─────────
  j(G, "geomorphology-hydrology", "M", 1, "The mineral gypsum is used mainly in the manufacture of:", ["Steel", "Plaster and cement", "Glass", "Fertiliser nitrogen"], "Gypsum is calcium sulphate dihydrate."),
  j(G, "geomorphology-hydrology", "M", 0, "Inselbergs are isolated residual hills found in:", ["Arid and semi-arid regions", "Glaciated terrain", "Coastal zones", "Karst terrain"], "They survive as resistant remnants of a retreating escarpment."),
  j(G, "geomorphology-hydrology", "M", 2, "Specific yield is the ratio of the volume of water that drains freely from a rock to its:", ["Weight", "Porosity", "Total volume", "Density"], "It is a fraction of the total volume."),
  j(G, "geomorphology-hydrology", "E", 1, "The process of the removal and transport of weathered material is called:", ["Weathering", "Erosion", "Deposition", "Lithification"], "Agents include water, wind and ice."),
  j(G, "geomorphology-hydrology", "H", 1, "Banded iron formations are mostly found in rocks of:", ["Cenozoic age", "Archaean to Palaeoproterozoic age", "Mesozoic age", "Quaternary age"], "They formed when oxygen from early photosynthesis precipitated dissolved iron."),
  j(G, "geomorphology-hydrology", "M", 2, "A tsunami is most often caused by:", ["Strong winds", "Tides", "Submarine earthquakes", "River floods"], "Sudden vertical displacement of the sea floor moves the water column."),
  j(G, "geomorphology-hydrology", "M", 3, "The strongest influence on coastal erosion is exerted by:", ["Rainfall", "Wind blown dust", "Ground temperature", "Waves"], "Wave energy abrades and undercuts shorelines."),
  j(G, "geomorphology-hydrology", "M", 0, "Chromite, the ore of chromium, is typically hosted by:", ["Ultramafic rocks", "Granites", "Limestone", "Sandstone"], "It forms as a cumulate in layered intrusions and ophiolites."),
];
