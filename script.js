// Global variables
let currentSection = 0;
const sections = document.querySelectorAll('.form-section');
const totalSections = sections.length;
let formData = {};

// State-specific information
const stateInfo = {
    "AL": {
        name: "Alabama",
        fee: "$200",
        processingTime: "5-10 business days",
        formName: "Certificate of Formation",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC (PLLC)",
        website: "https://sos.alabama.gov/business-entities",
        specialRequirements: []
    },
    "AK": {
        name: "Alaska",
        fee: "$250",
        processingTime: "10-15 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.commerce.alaska.gov/web/cbpl/",
        specialRequirements: []
    },
    "AZ": {
        name: "Arizona",
        fee: "$50",
        processingTime: "3-5 weeks",
        formName: "Articles of Organization",
        requiresPublishing: true,
        countyRequired: true,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://azcc.gov/corporations",
        specialRequirements: ["Publication in a newspaper for three consecutive publications"]
    },
    "AR": {
        name: "Arkansas",
        fee: "$45",
        processingTime: "2-3 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.arkansas.gov/business-commercial-services-bcs",
        specialRequirements: []
    },
    "CA": {
        name: "California",
        fee: "$70",
        processingTime: "3-5 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.ca.gov/business-programs/business-entities/",
        specialRequirements: ["$800 annual franchise tax", "Statement of Information due within 90 days"]
    },
    "CO": {
        name: "Colorado",
        fee: "$50",
        processingTime: "1-3 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://www.coloradosos.gov/biz/BusinessEntities.do",
        specialRequirements: []
    },
    "CT": {
        name: "Connecticut",
        fee: "$120",
        processingTime: "3-5 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://portal.ct.gov/sots",
        specialRequirements: []
    },
    "DE": {
        name: "Delaware",
        fee: "$90",
        processingTime: "10-15 business days",
        formName: "Certificate of Formation",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://corp.delaware.gov/",
        specialRequirements: []
    },
    "FL": {
        name: "Florida",
        fee: "$125",
        processingTime: "5-7 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://dos.myflorida.com/sunbiz/",
        specialRequirements: []
    },
    "GA": {
        name: "Georgia",
        fee: "$100",
        processingTime: "5-7 business days",
        formName: "Articles of Organization",
        requiresPublishing: true,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sos.ga.gov/corporations-division-georgia-secretary-states-office",
        specialRequirements: ["Publication in a newspaper in the county where the LLC's registered office is located"]
    },
    "HI": {
        name: "Hawaii",
        fee: "$50",
        processingTime: "3-5 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://cca.hawaii.gov/breg/",
        specialRequirements: []
    },
    "ID": {
        name: "Idaho",
        fee: "$100",
        processingTime: "7-10 business days",
        formName: "Certificate of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://sos.idaho.gov/business-services/",
        specialRequirements: []
    },
    "IL": {
        name: "Illinois",
        fee: "$150",
        processingTime: "10-15 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://www.ilsos.gov/departments/business_services/",
        specialRequirements: []
    },
    "IN": {
        name: "Indiana",
        fee: "$95",
        processingTime: "5-7 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://inbiz.in.gov/",
        specialRequirements: []
    },
    "IA": {
        name: "Iowa",
        fee: "$50",
        processingTime: "2-3 business days",
        formName: "Certificate of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sos.iowa.gov/business/",
        specialRequirements: []
    },
    "KS": {
        name: "Kansas",
        fee: "$160",
        processingTime: "3-5 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sos.ks.gov/business/business.html",
        specialRequirements: []
    },
    "KY": {
        name: "Kentucky",
        fee: "$40",
        processingTime: "1-3 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://sos.ky.gov/bus/business-filings/",
        specialRequirements: []
    },
    "LA": {
        name: "Louisiana",
        fee: "$100",
        processingTime: "3-5 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.la.gov/BusinessServices/",
        specialRequirements: []
    },
    "ME": {
        name: "Maine",
        fee: "$175",
        processingTime: "5-10 business days",
        formName: "Certificate of Formation",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://www.maine.gov/sos/cec/corp/",
        specialRequirements: []
    },
    "MD": {
        name: "Maryland",
        fee: "$100",
        processingTime: "7-10 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://businessexpress.maryland.gov/",
        specialRequirements: []
    },
    "MA": {
        name: "Massachusetts",
        fee: "$500",
        processingTime: "4-5 business days",
        formName: "Certificate of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://www.sec.state.ma.us/cor/",
        specialRequirements: []
    },
    "MI": {
        name: "Michigan",
        fee: "$50",
        processingTime: "10-15 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://www.michigan.gov/lara/bureau-list/cscl",
        specialRequirements: []
    },
    "MN": {
        name: "Minnesota",
        fee: "$155",
        processingTime: "5-7 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.state.mn.us/business-liens/",
        specialRequirements: []
    },
    "MS": {
        name: "Mississippi",
        fee: "$50",
        processingTime: "3-5 business days",
        formName: "Certificate of Formation",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.ms.gov/business-services/",
        specialRequirements: []
    },
    "MO": {
        name: "Missouri",
        fee: "$50",
        processingTime: "5-10 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.mo.gov/business/corporations/",
        specialRequirements: []
    },
    "MT": {
        name: "Montana",
        fee: "$70",
        processingTime: "7-10 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sosmt.gov/business/",
        specialRequirements: []
    },
    "NE": {
        name: "Nebraska",
        fee: "$105",
        processingTime: "3-5 business days",
        formName: "Certificate of Organization",
        requiresPublishing: true,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://sos.nebraska.gov/business-services",
        specialRequirements: ["Publication in a legal newspaper for three consecutive weeks"]
    },
    "NV": {
        name: "Nevada",
        fee: "$75",
        processingTime: "1-3 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.nvsos.gov/sos/businesses",
        specialRequirements: ["Initial List of Managers or Members due within 30 days"]
    },
    "NH": {
        name: "New Hampshire",
        fee: "$100",
        processingTime: "3-5 business days",
        formName: "Certificate of Formation",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sos.nh.gov/corporation-division/",
        specialRequirements: []
    },
    "NJ": {
        name: "New Jersey",
        fee: "$125",
        processingTime: "3-5 business days",
        formName: "Certificate of Formation",
        requiresPublishing: true,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.njportal.com/DOR/BusinessFormation/",
        specialRequirements: ["Publication in a newspaper in the county where the LLC's registered office is located"]
    },
    "NM": {
        name: "New Mexico",
        fee: "$50",
        processingTime: "1-3 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.state.nm.us/business-services/",
        specialRequirements: []
    },
    "NY": {
        name: "New York",
        fee: "$200",
        processingTime: "7-10 business days",
        formName: "Articles of Organization",
        requiresPublishing: true,
        countyRequired: true,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional Service LLC",
        website: "https://dos.ny.gov/limited-liability-companies",
        specialRequirements: ["Publication in two newspapers for six consecutive weeks", "Certificate of Publication filing ($50)"]
    },
    "NC": {
        name: "North Carolina",
        fee: "$125",
        processingTime: "5-7 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.sosnc.gov/divisions/business_registration",
        specialRequirements: []
    },
    "ND": {
        name: "North Dakota",
        fee: "$135",
        processingTime: "3-5 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sos.nd.gov/business/business-services",
        specialRequirements: []
    },
    "OH": {
        name: "Ohio",
        fee: "$99",
        processingTime: "3-7 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.ohiosos.gov/businesses/",
        specialRequirements: []
    },
    "OK": {
        name: "Oklahoma",
        fee: "$100",
        processingTime: "1-3 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.ok.gov/business/",
        specialRequirements: []
    },
    "OR": {
        name: "Oregon",
        fee: "$100",
        processingTime: "5-7 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://sos.oregon.gov/business/Pages/default.aspx",
        specialRequirements: []
    },
    "PA": {
        name: "Pennsylvania",
        fee: "$125",
        processingTime: "7-10 business days",
        formName: "Certificate of Organization",
        requiresPublishing: false,
        countyRequired: true,
        allowsBenefitLLC: true,
        professionalLLCName: "Restricted Professional LLC",
        website: "https://www.dos.pa.gov/BusinessCharities/Business/",
        specialRequirements: []
    },
    "RI": {
        name: "Rhode Island",
        fee: "$150",
        processingTime: "5-7 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.ri.gov/divisions/business-services",
        specialRequirements: []
    },
    "SC": {
        name: "South Carolina",
        fee: "$110",
        processingTime: "2-3 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sos.sc.gov/online-filings/business-entities",
        specialRequirements: []
    },
    "SD": {
        name: "South Dakota",
        fee: "$150",
        processingTime: "3-5 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sdsos.gov/business-services/",
        specialRequirements: []
    },
    "TN": {
        name: "Tennessee",
        fee: "$300",
        processingTime: "5-7 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sos.tn.gov/business-services",
        specialRequirements: []
    },
    "TX": {
        name: "Texas",
        fee: "$300",
        processingTime: "3-5 business days",
        formName: "Certificate of Formation",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.state.tx.us/corp/index.shtml",
        specialRequirements: []
    },
    "UT": {
        name: "Utah",
        fee: "$70",
        processingTime: "1-2 business days",
        formName: "Certificate of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://corporations.utah.gov/",
        specialRequirements: []
    },
    "VT": {
        name: "Vermont",
        fee: "$125",
        processingTime: "7-10 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://sos.vermont.gov/corporations/",
        specialRequirements: []
    },
    "VA": {
        name: "Virginia",
        fee: "$100",
        processingTime: "5-7 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://scc.virginia.gov/pages/Business-Formation",
        specialRequirements: []
    },
    "WA": {
        name: "Washington",
        fee: "$200",
        processingTime: "2-3 business days",
        formName: "Certificate of Formation",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://www.sos.wa.gov/corps/",
        specialRequirements: []
    },
    "WV": {
        name: "West Virginia",
        fee: "$100",
        processingTime: "5-10 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sos.wv.gov/business/Pages/default.aspx",
        specialRequirements: []
    },
    "WI": {
        name: "Wisconsin",
        fee: "$130",
        processingTime: "5-10 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://www.wdfi.org/corporations/",
        specialRequirements: []
    },
    "WY": {
        name: "Wyoming",
        fee: "$100",
        processingTime: "3-5 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: false,
        professionalLLCName: "Professional LLC",
        website: "https://sos.wyo.gov/business/",
        specialRequirements: []
    },
    "DC": {
        name: "District of Columbia",
        fee: "$220",
        processingTime: "7-10 business days",
        formName: "Articles of Organization",
        requiresPublishing: false,
        countyRequired: false,
        allowsBenefitLLC: true,
        professionalLLCName: "Professional LLC",
        website: "https://dcra.dc.gov/service/corporate-registration",
        specialRequirements: []
    }
};

// County data for states that require it
const countyData = {
    "PA": [
        "Adams", "Allegheny", "Armstrong", "Beaver", "Bedford", "Berks", "Blair", "Bradford", "Bucks", "Butler",
        "Cambria", "Cameron", "Carbon", "Centre", "Chester", "Clarion", "Clearfield", "Clinton", "Columbia", "Crawford",
        "Cumberland", "Dauphin", "Delaware", "Elk", "Erie", "Fayette", "Forest", "Franklin", "Fulton", "Greene",
        "Huntingdon", "Indiana", "Jefferson", "Juniata", "Lackawanna", "Lancaster", "Lawrence", "Lebanon", "Lehigh", "Luzerne",
        "Lycoming", "McKean", "Mercer", "Mifflin", "Monroe", "Montgomery", "Montour", "Northampton", "Northumberland", "Perry",
        "Philadelphia", "Pike", "Potter", "Schuylkill", "Snyder", "Somerset", "Sullivan", "Susquehanna", "Tioga", "Union",
        "Venango", "Warren", "Washington", "Wayne", "Westmoreland", "Wyoming", "York"
    ],
    "NY": [
        "Albany", "Allegany", "Bronx", "Broome", "Cattaraugus", "Cayuga", "Chautauqua", "Chemung", "Chenango", "Clinton",
        "Columbia", "Cortland", "Delaware", "Dutchess", "Erie", "Essex", "Franklin", "Fulton", "Genesee", "Greene",
        "Hamilton", "Herkimer", "Jefferson", "Kings (Brooklyn)", "Lewis", "Livingston", "Madison", "Monroe", "Montgomery", "Nassau",
        "New York (Manhattan)", "Niagara", "Oneida", "Onondaga", "Ontario", "Orange", "Orleans", "Oswego", "Otsego", "Putnam",
        "Queens", "Rensselaer", "Richmond (Staten Island)", "Rockland", "Saratoga", "Schenectady", "Schoharie", "Schuyler", "Seneca", "St. Lawrence",
        "Steuben", "Suffolk", "Sullivan", "Tioga", "Tompkins", "Ulster", "Warren", "Washington", "Wayne", "Westchester",
        "Wyoming", "Yates"
    ],
    "AZ": [
        "Apache", "Cochise", "Coconino", "Gila", "Graham", "Greenlee", "La Paz", "Maricopa", "Mohave", "Navajo",
        "Pima", "Pinal", "Santa Cruz", "Yavapai", "Yuma"
    ]
};

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('agent-self').addEventListener('change', toggleAgentFields);
    document.getElementById('agent-other').addEventListener('change', toggleAgentFields);
    document.getElementById('effective-filing').addEventListener('change', toggleDateField);
    document.getElementById('effective-specific').addEventListener('change', toggleDateField);
    document.getElementById('member-count').addEventListener('change', updateMemberFields);
    document.getElementById('state').addEventListener('change', updateStateInfo);
    
    // Initialize the progress bar
    updateProgress();
});

// Navigation functions
function nextSection() {
    // Validate current section before proceeding
    if (!validateSection(currentSection)) {
        return;
    }
    
    // Save data from current section
    saveCurrentSectionData();
    
    // Hide current section
    sections[currentSection].classList.remove('active');
    
    // Move to next section
    currentSection++;
    
    // If we're at the review section, populate review data
    if (currentSection === totalSections - 2) { // Review section is second to last
        populateReviewData();
    }
    
    // Show next section
    sections[currentSection].classList.add('active');
    
    // Update progress bar
    updateProgress();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function prevSection() {
    // Hide current section
    sections[currentSection].classList.remove('active');
    
    // Move to previous section
    currentSection--;
    
    // Show previous section
    sections[currentSection].classList.add('active');
    
    // Update progress bar
    updateProgress();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function updateProgress() {
    // Skip welcome screen for progress calculation
    const progressPercentage = ((currentSection) / (totalSections - 1)) * 100;
    document.getElementById('progress').style.width = `${progressPercentage}%`;
    
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        
        if (stepNum < currentSection) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNum === currentSection) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active');
            step.classList.remove('completed');
        }
    });
}

// Update state-specific information
function updateStateInfo() {
    const stateSelect = document.getElementById('state');
    const stateCode = stateSelect.value;
    
    if (!stateCode) {
        document.getElementById('state-info').style.display = 'none';
        return;
    }
    
    const state = stateInfo[stateCode];
    
    // Display state information
    document.getElementById('state-info').style.display = 'block';
    
    let stateDetails = `
        <p><strong>Filing Fee:</strong> ${state.fee}</p>
        <p><strong>Processing Time:</strong> ${state.processingTime}</p>
        <p><strong>Form Name:</strong> ${state.formName}</p>
    `;
    
    if (state.requiresPublishing) {
        stateDetails += `<p><strong>Publication Requirement:</strong> Yes - Your LLC will need to publish a notice in approved newspapers.</p>`;
    }
    
    if (state.specialRequirements.length > 0) {
        stateDetails += `<p><strong>Special Requirements:</strong></p><ul>`;
        state.specialRequirements.forEach(req => {
            stateDetails += `<li>${req}</li>`;
        });
        stateDetails += `</ul>`;
    }
    
    stateDetails += `<p><a href="${state.website}" target="_blank">Visit ${state.name} Business Filing Website</a></p>`;
    
    document.getElementById('state-details').innerHTML = stateDetails;
    
    // Update county dropdown if required
    updateCountyField(stateCode);
    
    // Update professional and benefit LLC options
    updateEntityTypeOptions(stateCode);
    
    // Update help text for registered agent
    document.getElementById('agent-help-text').innerHTML = `
        <p>A registered agent must be available during business hours to receive legal documents.</p>
        <p>The registered agent must have a physical address in ${state.name} (not a P.O. Box).</p>
        <p>You can be your own registered agent, but your address will be public record.</p>
    `;
    
    // Update name help text
    document.getElementById('name-help-text').innerHTML = `
        <p>Your LLC name must include "Limited Liability Company," "LLC," or "L.L.C." at the end.</p>
        <p>Example: "Keystone Consulting LLC" or "Mountain State Bakery, L.L.C."</p>
        <p>The name must be distinguishable from other business names registered in ${state.name}.</p>
    `;
    
    // Update date help text if needed
    if (state.code === "CA" || state.code === "NY") {
        document.getElementById('date-help-text').innerHTML = `
            <p>The date cannot be more than 60 days in the future.</p>
        `;
    } else {
        document.getElementById('date-help-text').innerHTML = `
            <p>The date cannot be more than 90 days in the future.</p>
        `;
    }
}

// Update county field based on state selection
function updateCountyField(stateCode) {
    const countyContainer = document.getElementById('county-container');
    const countySelect = document.getElementById('county');
    
    // Clear existing options
    countySelect.innerHTML = '<option value="">Select a county</option>';
    
    if (stateInfo[stateCode].countyRequired) {
        countyContainer.style.display = 'block';
        
        // Add counties for the selected state
        if (countyData[stateCode]) {
            countyData[stateCode].forEach(county => {
                const option = document.createElement('option');
                option.value = county;
                option.textContent = county;
                countySelect.appendChild(option);
            });
        }
        
        // Update help text
        document.getElementById('county-help-text').innerHTML = `
            <p>This is the county where your business is located in ${stateInfo[stateCode].name}.</p>
            <p>This information is required for your ${stateInfo[stateCode].formName}.</p>
        `;
    } else {
        countyContainer.style.display = 'none';
    }
}

// Update entity type options based on state
function updateEntityTypeOptions(stateCode) {
    const professionalLLCGroup = document.getElementById('professional-llc-group');
    const benefitLLCGroup = document.getElementById('benefit-llc-group');
    
    // Update professional LLC option
    professionalLLCGroup.style.display = 'block';
    document.getElementById('professional-help-text').innerHTML = `
        <p>A ${stateInfo[stateCode].professionalLLCName} is for licensed professionals such as doctors, lawyers, accountants, etc.</p>
        <p>If you provide these services, select "Yes".</p>
    `;
    
    // Update benefit LLC option
    if (stateInfo[stateCode].allowsBenefitLLC) {
        benefitLLCGroup.style.display = 'block';
        document.getElementById('benefit-help-text').innerHTML = `
            <p>A benefit LLC in ${stateInfo[stateCode].name} has a purpose of creating a positive impact on society and the environment, in addition to making a profit.</p>
            <p>If your LLC will have a specific social or environmental mission, select "Yes".</p>
        `;
    } else {
        benefitLLCGroup.style.display = 'none';
        document.getElementById('benefit-no').checked = true;
    }
}

// Form validation
function validateSection(sectionIndex) {
    // Get the current section
    const section = sections[sectionIndex];
    
    // Skip validation for welcome screen
    if (section.id === 'welcome-screen') {
        return true;
    }
    
    // Basic validation for each section
    let isValid = true;
    
    // State Selection validation
    if (section.id === 'state-selection') {
        const state = document.getElementById('state').value;
        
        if (!state) {
            alert('Please select a state for your LLC.');
            isValid = false;
        }
    }
    
    // Basic Information validation
    else if (section.id === 'basic-info') {
        const llcName = document.getElementById('llc-name').value.trim();
        const llcPurpose = document.getElementById('llc-purpose').value.trim();
        
        if (!llcName) {
            alert('Please enter your LLC name.');
            isValid = false;
        } else if (!llcName.toLowerCase().includes('llc') && 
                  !llcName.toLowerCase().includes('l.l.c.') && 
                  !llcName.toLowerCase().includes('limited liability company')) {
            alert('Your LLC name must include "LLC", "L.L.C.", or "Limited Liability Company".');
            isValid = false;
        }
        
        if (!llcPurpose) {
            alert('Please enter your business purpose.');
            isValid = false;
        }
    }
    
    // Business Address validation
    else if (section.id === 'business-address') {
        const streetAddress = document.getElementById('street-address').value.trim();
        const city = document.getElementById('city').value.trim();
        const zipCode = document.getElementById('zip-code').value.trim();
        
        if (!streetAddress) {
            alert('Please enter your street address.');
            isValid = false;
        }
        
        if (!city) {
            alert('Please enter your city.');
            isValid = false;
        }
        
        // Check county if required
        if (stateInfo[formData.state].countyRequired) {
            const county = document.getElementById('county').value;
            if (!county) {
                alert('Please select your county.');
                isValid = false;
            }
        }
        
        if (!zipCode) {
            alert('Please enter your ZIP code.');
            isValid = false;
        } else if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
            alert('Please enter a valid ZIP code (e.g., 19103 or 19103-1234).');
            isValid = false;
        }
    }
    
    // Registered Agent validation
    else if (section.id === 'registered-agent') {
        const agentType = document.querySelector('input[name="agent-type"]:checked').value;
        
        if (agentType === 'other') {
            const agentName = document.getElementById('agent-name').value.trim();
            const agentStreet = document.getElementById('agent-street').value.trim();
            const agentCity = document.getElementById('agent-city').value.trim();
            const agentZip = document.getElementById('agent-zip').value.trim();
            
            if (!agentName) {
                alert('Please enter your registered agent\'s name.');
                isValid = false;
            }
            
            if (!agentStreet) {
                alert('Please enter your registered agent\'s street address.');
                isValid = false;
            }
            
            if (!agentCity) {
                alert('Please enter your registered agent\'s city.');
                isValid = false;
            }
            
            if (!agentZip) {
                alert('Please enter your registered agent\'s ZIP code.');
                isValid = false;
            } else if (!/^\d{5}(-\d{4})?$/.test(agentZip)) {
                alert('Please enter a valid ZIP code for your registered agent (e.g., 19103 or 19103-1234).');
                isValid = false;
            }
        }
    }
    
    // Member Information validation
    else if (section.id === 'member-info') {
        const memberCount = document.getElementById('member-count').value;
        let totalOwnership = 0;
        
        // Validate each member's information
        for (let i = 1; i <= (memberCount === 'more' ? 5 : memberCount); i++) {
            const memberName = document.getElementById(`member${i}-name`).value.trim();
            const memberAddress = document.getElementById(`member${i}-address`).value.trim();
            const memberOwnership = document.getElementById(`member${i}-ownership`).value.trim();
            
            if (!memberName) {
                alert(`Please enter Member ${i}'s full name.`);
                isValid = false;
                break;
            }
            
            if (!memberAddress) {
                alert(`Please enter Member ${i}'s address.`);
                isValid = false;
                break;
            }
            
            if (!memberOwnership) {
                alert(`Please enter Member ${i}'s ownership percentage.`);
                isValid = false;
                break;
            } else if (isNaN(memberOwnership) || parseFloat(memberOwnership) <= 0) {
                alert(`Please enter a valid ownership percentage for Member ${i}.`);
                isValid = false;
                break;
            }
            
            totalOwnership += parseFloat(memberOwnership);
        }
        
        // Check if total ownership adds up to 100%
        if (isValid && memberCount !== '1' && Math.abs(totalOwnership - 100) > 0.01) {
            alert('The total ownership percentage must add up to 100%.');
            isValid = false;
        }
    }
    
    // Additional Information validation
    else if (section.id === 'additional-info') {
        const effectiveDate = document.querySelector('input[name="effective-date"]:checked').value;
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (effectiveDate === 'specific') {
            const specificDate = document.getElementById('specific-date').value;
            if (!specificDate) {
                alert('Please select a specific effective date.');
                isValid = false;
            } else {
                // Check if date is within allowed range
                const selectedDate = new Date(specificDate);
                const today = new Date();
                const maxDays = (formData.state === 'CA' || formData.state === 'NY') ? 60 : 90;
                const maxDate = new Date();
                maxDate.setDate(today.getDate() + maxDays);
                
                if (selectedDate < today) {
                    alert('The effective date cannot be in the past.');
                    isValid = false;
                } else if (selectedDate > maxDate) {
                    alert(`The effective date cannot be more than ${maxDays} days in the future.`);
                    isValid = false;
                }
            }
        }
        
        if (!email) {
            alert('Please enter your email address.');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            isValid = false;
        }
        
        if (!phone) {
            alert('Please enter your phone number.');
            isValid = false;
        }
    }
    
    return isValid;
}

// Save data from current section
function saveCurrentSectionData() {
    const section = sections[currentSection];
    
    // State Selection
    if (section.id === 'state-selection') {
        formData.state = document.getElementById('state').value;
        formData.stateName = stateInfo[formData.state].name;
        formData.formName = stateInfo[formData.state].formName;
        formData.fee = stateInfo[formData.state].fee;
    }
    
    // Basic Information
    else if (section.id === 'basic-info') {
        formData.llcName = document.getElementById('llc-name').value.trim();
        formData.llcPurpose = document.getElementById('llc-purpose').value.trim();
        formData.isProfessional = document.querySelector('input[name="professional"]:checked').value;
        formData.isBenefit = document.querySelector('input[name="benefit"]:checked').value;
    }
    
    // Business Address
    else if (section.id === 'business-address') {
        formData.streetAddress = document.getElementById('street-address').value.trim();
        formData.addressLine2 = document.getElementById('address-line2').value.trim();
        formData.city = document.getElementById('city').value.trim();
        
        if (stateInfo[formData.state].countyRequired) {
            formData.county = document.getElementById('county').value;
        } else {
            formData.county = '';
        }
        
        formData.zipCode = document.getElementById('zip-code').value.trim();
    }
    
    // Registered Agent
    else if (section.id === 'registered-agent') {
        formData.agentType = document.querySelector('input[name="agent-type"]:checked').value;
        
        if (formData.agentType === 'other') {
            formData.agentName = document.getElementById('agent-name').value.trim();
            formData.agentStreet = document.getElementById('agent-street').value.trim();
            formData.agentCity = document.getElementById('agent-city').value.trim();
            formData.agentZip = document.getElementById('agent-zip').value.trim();
        }
    }
    
    // Management Structure
    else if (section.id === 'management') {
        formData.managementType = document.querySelector('input[name="management-type"]:checked').value;
        formData.memberCount = document.getElementById('member-count').value;
    }
    
    // Member Information
    else if (section.id === 'member-info') {
        formData.members = [];
        
        const memberCount = formData.memberCount === 'more' ? 5 : parseInt(formData.memberCount);
        
        for (let i = 1; i <= memberCount; i++) {
            formData.members.push({
                name: document.getElementById(`member${i}-name`).value.trim(),
                address: document.getElementById(`member${i}-address`).value.trim(),
                ownership: document.getElementById(`member${i}-ownership`).value.trim()
            });
        }
    }
    
    // Additional Information
    else if (section.id === 'additional-info') {
        formData.effectiveDate = document.querySelector('input[name="effective-date"]:checked').value;
        
        if (formData.effectiveDate === 'specific') {
            formData.specificDate = document.getElementById('specific-date').value;
        }
        
        formData.email = document.getElementById('email').value.trim();
        formData.phone = document.getElementById('phone').value.trim();
    }
}

// Toggle agent fields based on selection
function toggleAgentFields() {
    const agentOtherFields = document.getElementById('agent-other-fields');
    
    if (document.getElementById('agent-other').checked) {
        agentOtherFields.style.display = 'block';
    } else {
        agentOtherFields.style.display = 'none';
    }
}

// Toggle date field based on selection
function toggleDateField() {
    const specificDateField = document.getElementById('specific-date-field');
    
    if (document.getElementById('effective-specific').checked) {
        specificDateField.style.display = 'block';
    } else {
        specificDateField.style.display = 'none';
    }
}

// Update member fields based on member count
function updateMemberFields() {
    const memberCount = document.getElementById('member-count').value;
    const membersContainer = document.getElementById('members-container');
    
    // Clear existing member sections except the first one
    while (membersContainer.children.length > 1) {
        membersContainer.removeChild(membersContainer.lastChild);
    }
    
    // Add member sections based on count
    const count = memberCount === 'more' ? 5 : parseInt(memberCount);
    
    for (let i = 2; i <= count; i++) {
        const memberSection = document.createElement('div');
        memberSection.className = 'member-section';
        memberSection.innerHTML = `
            <h3>Member ${i}</h3>
            
            <div class="form-group">
                <label for="member${i}-name">Full Name</label>
                <input type="text" id="member${i}-name" placeholder="Jane Doe">
            </div>
            
            <div class="form-group">
                <label for="member${i}-address">Address</label>
                <input type="text" id="member${i}-address" placeholder="456 Oak St, City, State ZIP">
            </div>
            
            <div class="form-group">
                <label for="member${i}-ownership">Ownership Percentage</label>
                <input type="text" id="member${i}-ownership" placeholder="50">
            </div>
        `;
        
        membersContainer.appendChild(memberSection);
    }
}

// Populate review data
function populateReviewData() {
    // State
    document.getElementById('review-state').textContent = formData.stateName;
    
    // Basic Information
    document.getElementById('review-llc-name').textContent = formData.llcName;
    document.getElementById('review-llc-purpose').textContent = formData.llcPurpose;
    
    // Show/hide professional and benefit LLC info based on state
    if (stateInfo[formData.state].allowsBenefitLLC) {
        document.getElementById('review-benefit-container').style.display = 'flex';
        document.getElementById('review-benefit').textContent = formData.isBenefit === 'yes' ? 'Yes' : 'No';
    } else {
        document.getElementById('review-benefit-container').style.display = 'none';
    }
    
    document.getElementById('review-professional-container').style.display = 'flex';
    document.getElementById('review-professional').textContent = formData.isProfessional === 'yes' ? 'Yes' : 'No';
    
    // Business Address
    let addressText = `${formData.streetAddress}`;
    if (formData.addressLine2) {
        addressText += `, ${formData.addressLine2}`;
    }
    addressText += `<br>${formData.city}, ${formData.state} ${formData.zipCode}`;
    
    if (formData.county) {
        addressText += `<br>County: ${formData.county}`;
    }
    
    document.getElementById('review-address').innerHTML = addressText;
    
    // Registered Agent
    let agentText = '';
    if (formData.agentType === 'self') {
        agentText = 'You will serve as your own registered agent.';
    } else {
        agentText = `${formData.agentName}<br>${formData.agentStreet}<br>${formData.agentCity}, ${formData.state} ${formData.agentZip}`;
    }
    document.getElementById('review-agent').innerHTML = agentText;
    
    // Management Structure
    document.getElementById('review-management').textContent = formData.managementType === 'member' ? 'Member-Managed' : 'Manager-Managed';
    document.getElementById('review-member-count').textContent = formData.memberCount === 'more' ? 'More than 5' : formData.memberCount;
    
    // Member Information
    const reviewMembers = document.getElementById('review-members');
    reviewMembers.innerHTML = '';
    
    formData.members.forEach((member, index) => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'review-item';
        memberDiv.innerHTML = `
            <span class="review-label">Member ${index + 1}:</span>
            <span class="review-value">
                ${member.name}<br>
                ${member.address}<br>
                Ownership: ${member.ownership}%
            </span>
        `;
        reviewMembers.appendChild(memberDiv);
    });
    
    // Additional Information
    let effectiveDateText = '';
    if (formData.effectiveDate === 'filing') {
        effectiveDateText = 'Upon filing (as soon as possible)';
    } else {
        effectiveDateText = `On ${formData.specificDate}`;
    }
    document.getElementById('review-effective-date').textContent = effectiveDateText;
    document.getElementById('review-email').textContent = formData.email;
    document.getElementById('review-phone').textContent = formData.phone;
}

// Generate LLC documents
function generateDocuments() {
    // In a real application, this would generate actual PDF documents
    // For this demo, we'll just move to the documents section and update state-specific information
    
    // Hide current section
    sections[currentSection].classList.remove('active');
    
    // Move to documents section
    currentSection++;
    
    // Show documents section
    sections[currentSection].classList.add('active');
    
    // Update progress bar
    updateProgress();
    
    // Update document section with state-specific information
    updateDocumentSection();
    
    // Pre-fill email field if available
    if (formData.email) {
        document.getElementById('send-email').value = formData.email;
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Update document section with state-specific information
function updateDocumentSection() {
    // Update certificate title
    document.getElementById('certificate-title').textContent = formData.formName;
    
    // Update next steps
    const nextStepsList = document.getElementById('next-steps-list');
    nextStepsList.innerHTML = '';
    
    // Common next steps
    const commonSteps = [
        `File your ${formData.formName} with the ${formData.stateName} Secretary of State (${formData.fee} filing fee)`,
        `Apply for an EIN (Employer Identification Number) with the IRS (free)`,
        `Open a business bank account`,
        `Check for any required business licenses or permits`
    ];
    
    // Add state-specific steps
    if (stateInfo[formData.state].requiresPublishing) {
        commonSteps.splice(1, 0, `Publish a notice of your LLC formation in approved newspapers as required by ${formData.stateName} law`);
    }
    
    // Add special requirements
    stateInfo[formData.state].specialRequirements.forEach(req => {
        if (!req.toLowerCase().includes('publication')) { // Avoid duplication with publishing requirement
            commonSteps.splice(2, 0, req);
        }
    });
    
    // Add steps to the list
    commonSteps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        nextStepsList.appendChild(li);
    });
    
    // Update filing instructions
    const filingInstructions = document.getElementById('filing-instructions');
    
    let instructionsHTML = `<p>You can file your ${formData.formName} in ${formData.stateName} in one of these ways:</p>`;
    instructionsHTML += `<ul>`;
    instructionsHTML += `<li><strong>Online:</strong> Through the <a href="${stateInfo[formData.state].website}" target="_blank">${formData.stateName} Secretary of State website</a> (recommended)</li>`;
    instructionsHTML += `<li><strong>Mail:</strong> Send to the appropriate filing office in ${formData.stateName}</li>`;
    
    if (['CA', 'NY', 'DE', 'FL', 'TX', 'IL', 'PA', 'OH', 'GA', 'NC'].includes(formData.state)) {
        instructionsHTML += `<li><strong>In Person:</strong> At the Secretary of State office in the state capital</li>`;
    }
    
    instructionsHTML += `</ul>`;
    
    // Add state-specific notes
    if (stateInfo[formData.state].requiresPublishing) {
        instructionsHTML += `<p><strong>Important Note:</strong> ${formData.stateName} requires publication of a notice in approved newspapers after filing your LLC. Failure to complete this step could result in your LLC not being in good standing.</p>`;
    }
    
    filingInstructions.innerHTML = instructionsHTML;
}

// Download document function (simulated)
function downloadDocument(type) {
    // In a real application, this would download the actual document
    // For this demo, we'll just show an alert
    
    if (type === 'certificate') {
        alert(`In a real application, this would download your ${formData.formName} for ${formData.stateName}.`);
    } else if (type === 'operating') {
        alert(`In a real application, this would download your Operating Agreement customized for ${formData.stateName}.`);
    }
}

// Send email function (simulated)
function sendEmail() {
    const email = document.getElementById('send-email').value.trim();
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    alert(`In a real application, your LLC documents would be sent to ${email}.`);
}

// Start over function
function startOver() {
    // Reset form data
    formData = {};
    
    // Hide current section
    sections[currentSection].classList.remove('active');
    
    // Move to welcome section
    currentSection = 0;
    
    // Show welcome section
    sections[currentSection].classList.add('active');
    
    // Update progress bar
    updateProgress();
    
    // Reset form fields
    document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach(input => {
        input.value = '';
    });
    
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        if (radio.defaultChecked) {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });
    
    // Reset state info
    document.getElementById('state-info').style.display = 'none';
    
    // Reset member fields
    updateMemberFields();
    
    // Reset agent fields
    toggleAgentFields();
    
    // Reset date field
    toggleDateField();
    
    // Scroll to top
    window.scrollTo(0, 0);
}