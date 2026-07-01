export interface BlogPost {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  author: string;
  image: string;
  bgColor: string; // Pastel background color for the studyfound card style
  readTime: string;
  popular: boolean;
  content: string;
  views: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "renovation-tips-singapore-hdb",
    title: "Top 10 Renovation Tips for Singapore HDB Flats",
    category: "Renovation & Upgrading",
    categorySlug: "renovation-upgrading",
    date: "March 24, 2026",
    author: "Er. Tan Boon",
    image: "/images/services/sub_home_reno.png",
    bgColor: "bg-amber-100",
    readTime: "5 mins read",
    popular: true,
    views: 1240,
    content: `
      <p>Renovating your HDB flat in Singapore is an exciting milestone, but it can also be a daunting task. With space constraints and strict HDB building regulations, careful planning is essential to achieve your dream home without running into legal or structural issues.</p>
      
      <h3>Key Renovation Phases</h3>
      <p>A successful renovation is usually executed in distinct, structured phases. Here is the standard numbering order to follow:</p>
      <ol>
        <li><strong>Design & Planning:</strong> Collaborating with your interior designer to lock in 3D layouts, electrical points, and theme.</li>
        <li><strong>Permit Approvals:</strong> Submitting designs to HDB and structural calculations to BCA to obtain hacking and masonry permits.</li>
        <li><strong>Hacking & Demolition:</strong> Dismantling existing carpentry, hacking walls, and clearing out debris.</li>
        <li><strong>M&E Works:</strong> Installing electrical lines, aircon copper piping, and water plumbing pipes.</li>
        <li><strong>Wet Works:</strong> Laying waterproofing screeds, wall plastering, and tiling the bathroom/kitchen.</li>
      </ol>

      <h3>Material Comparison Guide</h3>
      <p>To help you choose the best materials for your high-humidity Singapore flat, we have compiled a quick comparison table below:</p>
      <table>
        <thead>
          <tr>
            <th>Material Type</th>
            <th>Durability</th>
            <th>Moisture Resistance</th>
            <th>Best Use Cases</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Vinyl Flooring</strong></td>
            <td>High (Scratch-resistant)</td>
            <td>100% Waterproof</td>
            <td>Living room, Bedrooms, Study area</td>
          </tr>
          <tr>
            <td><strong>Homogeneous Tiles</strong></td>
            <td>Extreme (Impact-resistant)</td>
            <td>Excellent</td>
            <td>Bathrooms, Kitchen floors, Balconies</td>
          </tr>
          <tr>
            <td><strong>Quartz Stone</strong></td>
            <td>High (Stain & scratch-resistant)</td>
            <td>Excellent (Non-porous)</td>
            <td>Kitchen countertops, vanity tops</td>
          </tr>
          <tr>
            <td><strong>Solid Wood</strong></td>
            <td>Medium (Prone to dents)</td>
            <td>Poor (Expands in humidity)</td>
            <td>Decorative shelving, feature walls</td>
          </tr>
        </tbody>
      </table>

      <h3>Visual Layout Optimization</h3>
      <p>Below is a screenshot of a space-saving interior layout we recently executed for a 4-room BTO flat in Punggol. It illustrates how open-plan kitchens can make the living room look much more spacious:</p>
      <img src="/images/services/sub_home_reno.png" alt="Singapore HDB space-saving layout screenshot" />

      <h3>Essential Guidelines & Best Practices</h3>
      <p>When selecting your contractor, keep the following checklist in mind to ensure safety and avoid penalties:</p>
      <ul>
        <li><strong>HDB Registry:</strong> Always verify if your contractor is listed on the HDB Directory of Registered Renovation Contractors (DRRC).</li>
        <li><strong>Waterproofing Warranty:</strong> HDB enforces a 3-year warranty on waterproofing in newly built flats; make sure your contractor respects this.</li>
        <li><strong>Hacking Restrictions:</strong> Do not touch columns, beams, or load-bearing shear walls. They are vital to the building's structural integrity.</li>
        <li><strong>Electrical Load:</strong> Check if your flat requires a higher electrical load permit (e.g., 40-amp vs 30-amp DB box upgrades).</li>
      </ul>

      <h3>Video Guide: Singapore HDB Renovation Rules</h3>
      <p>Watch this educational video guide summarizing the latest building rules, permit requirements, and renovation budgeting tips in Singapore:</p>
      <div class="prose-video-container">
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="HDB Renovation Rules & Budgeting Guide" allowfullscreen></iframe>
      </div>
      
      <p>By following these guidelines, budgeting smartly, and selecting verified materials, you can create a beautiful home that stands the test of time and humidity in Singapore.</p>
    `
  },
  {
    slug: "structural-integrity-landed-homes",
    title: "Ensuring Structural Integrity During Landed Home Alterations",
    category: "Structural & Exterior Works",
    categorySlug: "structural-exterior-works",
    date: "March 20, 2026",
    author: "Er. K. Subramaniam",
    image: "/images/services/sub_steel_work.png",
    bgColor: "bg-rose-100",
    readTime: "7 mins read",
    popular: true,
    views: 890,
    content: `
      <p>Landed property alterations and additions (A&A) offer the perfect way to expand your living space. However, adding mezzanine floors or structural extensions requires heavy engineering calculations to prevent foundation settlement or structural cracks.</p>
      
      <h3>1. Soil Investigation and Foundation Testing</h3>
      <p>Landed properties in Singapore rest on varying clay or soil types. Before constructing roof extensions or adding floors, soil testing ensures the existing foundations can handle the increased dead load.</p>
      
      <h3>2. Certified Structural Steel Welds</h3>
      <p> mezzanines and portal steel structures are only as strong as their joints. Always ensure your steel fabrication is done by certified welders and checked using non-destructive testing (NDT) like ultrasonic scans.</p>
      
      <h3>3. Professional Engineer (PE) Inspections</h3>
      <p>All load-bearing modifications require submissions to the Building and Construction Authority (BCA) endorsed by a registered Professional Engineer (PE). This is a legal requirement in Singapore to ensure structural safety.</p>
    `
  },
  {
    slug: "choosing-right-waterproofing-system",
    title: "How to Choose the Right Waterproofing System for Concrete Roofs",
    category: "Painting & Waterproofing",
    categorySlug: "painting-waterproofing",
    date: "March 15, 2026",
    author: "Lee Hsien",
    image: "/images/services/sub_waterproofing.png",
    bgColor: "bg-teal-100",
    readTime: "6 mins read",
    popular: true,
    views: 1420,
    content: `
      <p>Singapore's intense tropical rainfall paired with high sun exposure can cause concrete flat roofs to expand, contract, and crack over time. Choosing the right waterproofing system prevents expensive internal water damage and structural corrosion.</p>
      
      <h3>1. Torch-On Bitumen Membranes</h3>
      <p>Torch-applied bitumen sheets are excellent for flat concrete roofs. They offer high thickness, extreme durability, and excellent resistance to standing water, making them the industry standard for landed homes.</p>
      
      <h3>2. Liquid-Applied Polyurethane (PU) Systems</h3>
      <p>Liquid PU coatings form a seamless, highly elastic membrane. They are highly UV-resistant and ideal for complex roof shapes with many pipe penetrations, as they can be easily brushed or sprayed on.</p>
      
      <h3>3. Non-Destructive PU Injection for Crack Repair</h3>
      <p>If you have localized water leaks through concrete ceilings, hacking isn't always necessary. High-pressure polyurethane (PU) injection grouting reacts with water to expand and seal leaks inside the concrete instantly.</p>
    `
  },
  {
    slug: "soundproofing-windows-singapore",
    title: "A Guide to Soundproofing Windows for Singapore Condos",
    category: "Aluminium & Glazing Works",
    categorySlug: "aluminium-glazing-works",
    date: "March 11, 2026",
    author: "Wong Siew",
    image: "/images/services/sub_aluminium_glass.png",
    bgColor: "bg-sky-100",
    readTime: "4 mins read",
    popular: false,
    views: 650,
    content: `
      <p>Living near busy expressways, MRT tracks, or construction sites in Singapore can lead to noise pollution. Normal windows offer very little acoustic insulation. Upgrading to soundproof windows can significantly restore peacefulness to your home.</p>
      
      <h3>1. The Secret is Laminated Glass</h3>
      <p>Soundproof windows utilize double or triple glazed layouts with laminated safety glass. The polyvinyl butyral (PVB) interlayer inside laminated glass acts as a dampener that absorbs acoustic vibrations, cutting noise by up to 50% to 75%.</p>
      
      <h3>2. Ensure Airtight Aluminium Frames</h3>
      <p>Even the best glass will leak sound if there are gaps in the frame. High-performance soundproof windows use multi-chambered heavy-duty aluminium profiles paired with double-rubber compression gaskets to block air (and noise) leaks.</p>
    `
  },
  {
    slug: "hdb-electrical-safety-tips",
    title: "Essential Electrical Safety and Rewiring Tips for Older HDBs",
    category: "Electrical, Plumbing & Aircon",
    categorySlug: "electrical-plumbing-aircon",
    date: "March 08, 2026",
    author: "Er. Francis Ng",
    image: "/images/services/sub_electrical.png",
    bgColor: "bg-purple-100",
    readTime: "6 mins read",
    popular: true,
    views: 1120,
    content: `
      <p>Many older HDB flats (built 30+ years ago) still use their original electrical wiring. With the massive increase in modern household appliances like air conditioners, dryers, and smart systems, older wiring can become overloaded, posing fire hazards.</p>
      
      <h3>1. Upgrade Your Distribution Board (DB) Box</h3>
      <p>Ensure your DB box is equipped with modern Residual Current Circuit Breakers (RCCB). An RCCB automatically cuts off power within milliseconds if an electrical leak or short circuit is detected, protecting your family from electric shocks.</p>
      
      <h3>2. Know the Signs of Failing Wiring</h3>
      <p>Flickering lights, burning smells near outlets, constant tripping of breakers, and warm wall switches are clear signs of deteriorating copper wires. If you experience these, call a licensed EMA electrician immediately.</p>
    `
  },
  {
    slug: "solar-energy-savings-singapore",
    title: "Maximizing Solar Energy Savings: A Singapore Landed Property Guide",
    category: "Solar Panel Installation",
    categorySlug: "solar-panel-installation",
    date: "March 02, 2026",
    author: "Lim Jun Jie",
    image: "/images/services/sub_solar.png",
    bgColor: "bg-emerald-100",
    readTime: "8 mins read",
    popular: true,
    views: 1750,
    content: `
      <p>Singapore's high electricity tariffs and abundant sunshine make solar panel installations an extremely profitable investment for landed property owners. On average, solar systems can pay for themselves in 5 to 7 years while delivering free green energy for decades.</p>
      
      <h3>1. How Net-Metering Works</h3>
      <p>Under Singapore's SP Group Net-Metering scheme, any excess electricity generated by your solar panels during the day is exported back to the national grid. SP Group will credit your utility bill, effectively letting you sell power back to them.</p>
      
      <h3>2. Tier-1 Monocrystalline Panels vs. Polycrystalline</h3>
      <p>Always opt for Tier-1 Monocrystalline PV panels. They have the highest energy conversion efficiency (often exceeding 21%) and perform significantly better under high temperatures and overcast tropical skies.</p>
    `
  },
  {
    slug: "smart-home-renovation-trends",
    title: "Smart Home Renovation Trends Dominating Singapore in 2026",
    category: "Renovation & Upgrading",
    categorySlug: "renovation-upgrading",
    date: "February 25, 2026",
    author: "Er. Tan Boon",
    image: "/images/services/sub_room_beautification.png",
    bgColor: "bg-amber-100",
    readTime: "5 mins read",
    popular: false,
    views: 740,
    content: `
      <p>Smart homes are no longer a luxury; they are a standard requirement in modern Singapore renovations. Integrating smart infrastructure during the renovation phase is much cleaner than adding smart gadgets post-renovation.</p>
      
      <h3>1. Concealed Smart Switch Hubs</h3>
      <p>Smart switches allow you to control lighting and fans using mobile apps or voice commands. Pre-planning neutral wiring to all switch boxes during the electrical hacking phase is crucial for stable smart switch operations.</p>
      
      <h3>2. Motorized Zip Blinds Integration</h3>
      <p>Balcony zip blinds protect against rain and sun. Integrating smart motorized zip blinds with wind and rain sensors allows the blinds to close automatically during sudden Singapore storms, keeping your balcony dry.</p>
    `
  },
  {
    slug: "main-gate-design-ideas",
    title: "Modern Main Gate Design Ideas for Wrought Iron & WPC",
    category: "Structural & Exterior Works",
    categorySlug: "structural-exterior-works",
    date: "February 20, 2026",
    author: "Er. K. Subramaniam",
    image: "/images/services/sub_gate_grill.png",
    bgColor: "bg-rose-100",
    readTime: "5 mins read",
    popular: false,
    views: 520,
    content: `
      <p>Your main gate is the first thing guests see. A well-designed gate provides security while enhancing the curb appeal of your landed home or condo. Wrought iron and Wood Plastic Composite (WPC) are the leading materials in 2026.</p>
      
      <h3>1. The WPC Wood Look</h3>
      <p>WPC gates combine the natural warmth of timber wood panels with the rust-free durability of aluminium frames. WPC is splinter-free, rot-resistant, and requires zero varnishing, making it ideal for outdoors.</p>
      
      <h3>2. Digital Lock Integration</h3>
      <p>Modern gates are designed with built-in metal lock boxes that perfectly house heavy-duty outdoor digital gate locks. This allows keyless fingerprint or PIN entries, enhancing security.</p>
    `
  },
  {
    slug: "exterior-painting-weather-proofing",
    title: "Why Exterior Painting is Crucial for Singapore's Wet Weather",
    category: "Painting & Waterproofing",
    categorySlug: "painting-waterproofing",
    date: "February 12, 2026",
    author: "Lee Hsien",
    image: "/images/projects/external-painting.png",
    bgColor: "bg-teal-100",
    readTime: "6 mins read",
    popular: true,
    views: 940,
    content: `
      <p>External building facades take a beating from heavy downpours and hot sun. Without high-quality paint, concrete walls absorb moisture, leading to internal spalling concrete, mold infestation, and structural decay.</p>
      
      <h3>1. Elastic and Crack-Bridging Paints</h3>
      <p>Hairline cracks occur naturally as concrete expands in hot weather. Elastic paints (like Nippon Paint Weatherbond Flex) can stretch over these hairline cracks, blocking rainwater from entering the concrete wall.</p>
      
      <h3>2. High UV and Heat Reflective Formulations</h3>
      <p>UV rays degrade paint pigment, causing chalking and fading. Choosing heat-reflective external paints reduces the amount of heat absorbed by external walls, lowering indoor aircon bills.</p>
    `
  },
  {
    slug: "clearing-stubborn-drainage-chokes",
    title: "Professional Tips for Clearing Clogged Toilets and Sinks",
    category: "Electrical, Plumbing & Aircon",
    categorySlug: "electrical-plumbing-aircon",
    date: "February 05, 2026",
    author: "Er. Francis Ng",
    image: "/images/services/sub_plumbing.png",
    bgColor: "bg-purple-100",
    readTime: "4 mins read",
    popular: false,
    views: 610,
    content: `
      <p>Drain chokes in the kitchen sink or toilet bowl are extremely inconvenient. While simple toilet plungers can clear minor clogs, persistent chokes deep inside sanitary pipes require specialized tools and techniques.</p>
      
      <h3>1. The Danger of Strong Chemical Cleaners</h3>
      <p>Highly acidic or alkaline commercial drain openers generate heat that can warp or melt thin PVC drain pipes, leading to hidden leaks inside concrete walls. Use them sparingly or opt for enzymatic cleaners.</p>
      
      <h3>2. Hydro-Jetting for Kitchen Grease</h3>
      <p>Kitchen sink chokes are usually caused by accumulated cooking grease that hardens like concrete. Professional plumbers use high-pressure hydro-jetting machines to wash away grease build-up, restoring pipes to original flow.</p>
    `
  },
  {
    slug: "understanding-hdb-renovation-permit-rules",
    title: "Understanding HDB Renovation Permit Guidelines in Singapore",
    category: "Others",
    categorySlug: "others",
    date: "January 28, 2026",
    author: "Er. Tan Boon",
    image: "/images/layout/breadcrumb-bg.png",
    bgColor: "bg-slate-100",
    readTime: "5 mins read",
    popular: true,
    views: 1190,
    content: `
      <p>Before kicking off any HDB flat upgrade, understanding HDB rules is key to avoiding fines or forced rectifications. Demolition, plumbing, and window replacements all have strict safety constraints.</p>
      
      <h3>1. Demolition of Non-Structural Walls</h3>
      <p>HDB flats use pre-cast structural walls that support the weight of the building. Hacking non-structural partition walls requires an HDB permit and must be executed carefully to avoid damage to surrounding tiles or cabling.</p>
      
      <h3>2. Bathroom Waterproofing Screeds</h3>
      <p>HDB enforces a 3-year waterproofing screed warranty rule for newly built BTO flats. When replacing bathroom floor tiles, contractors must lay a waterproof membrane screed to prevent water leaking to the flat below.</p>
    `
  }
];
