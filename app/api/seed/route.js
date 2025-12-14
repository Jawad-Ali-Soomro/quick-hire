import connectDB from '@/lib/mongodb';
import Pro from '@/models/Pro';
import Service from '@/models/Service';
import User from '@/models/User';
import Contract from '@/models/Contract';
import bcrypt from 'bcryptjs';

// Helper function to generate random pros
function generatePros() {
  const cities = [
    { name: "Karachi", coords: { lat: 24.8607, lng: 67.0011 } },
    { name: "Lahore", coords: { lat: 31.5204, lng: 74.3587 } },
    { name: "Islamabad", coords: { lat: 33.6844, lng: 73.0479 } },
    { name: "Rawalpindi", coords: { lat: 33.5651, lng: 73.0169 } },
    { name: "Faisalabad", coords: { lat: 31.4504, lng: 73.1350 } },
    { name: "Multan", coords: { lat: 30.1575, lng: 71.5249 } },
    { name: "Peshawar", coords: { lat: 34.0151, lng: 71.5249 } },
    { name: "Quetta", coords: { lat: 30.1798, lng: 66.9750 } },
    { name: "Sialkot", coords: { lat: 32.4945, lng: 74.5229 } },
    { name: "Gujranwala", coords: { lat: 32.1617, lng: 74.1883 } },
  ];

  const serviceCategories = {
    "Home Cleaning": ["House Cleaning", "Deep Clean", "Move-out Cleaning", "Carpet Cleaning", "Office Cleaning", "Window Cleaning"],
    "Handyman Services": ["General Repairs", "Furniture Assembly", "Home Maintenance", "Installation", "Drywall Repair"],
    "Landscaping": ["Lawn Care", "Garden Design", "Irrigation", "Tree Trimming", "Fence Installation"],
    "Moving Services": ["Moving Services", "Packing", "Storage Solutions", "Loading/Unloading"],
    "Plumbing": ["Emergency Plumbing", "Pipe Repair", "Water Heater", "Drain Cleaning", "Fixture Installation"],
    "Electrical Work": ["Wiring", "Panel Upgrades", "Lighting Installation", "Outlet Repair", "Generator Installation"],
    "Painting": ["Interior Painting", "Exterior Painting", "Wallpaper Removal", "Deck Staining"],
    "HVAC Services": ["AC Repair", "Furnace Installation", "Thermostat Replacement", "Duct Cleaning", "AC Installation"],
    "Contractors": ["Home Remodeling", "Bathroom Remodels", "Kitchen Remodels", "New Construction", "Roofing"],
  };

  const companyNames = [
    "Elite", "Pro", "Premium", "Expert", "Master", "Prime", "Superior", "Ultimate", "Perfect", "Top",
    "Best", "Quality", "Reliable", "Trusted", "Professional", "Advanced", "Modern", "Classic", "Royal", "Golden"
  ];

  const serviceTypes = [
    "Cleaners", "Services", "Solutions", "Experts", "Professionals", "Team", "Group", "Co", "LLC", "Inc"
  ];

  const images = [
    "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1920&h=1080&fit=crop&q=90",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop&q=90",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&h=1080&fit=crop&q=90",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&q=90",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop&q=90",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop&q=90",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop&q=90",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&q=90",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=90",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop&q=90",
  ];

  const pros = [];
  let proId = 1;

  // Generate pros for each service category
  Object.entries(serviceCategories).forEach(([category, services]) => {
    // Generate 10-15 pros per category
    const prosPerCategory = Math.floor(Math.random() * 6) + 10;
    
    for (let i = 0; i < prosPerCategory; i++) {
      const city = cities[Math.floor(Math.random() * cities.length)];
      const companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
      const serviceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
      const name = `${companyName} ${category} ${serviceType}`;
      const avatar = `${companyName.charAt(0)}${category.charAt(0)}`;
      
      // Select 2-4 services from the category
      const selectedServices = [];
      const numServices = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < numServices && j < services.length; j++) {
        const service = services[Math.floor(Math.random() * services.length)];
        if (!selectedServices.includes(service)) {
          selectedServices.push(service);
        }
      }

      const rating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)); // 3.5 to 5.0
      const reviews = Math.floor(Math.random() * 400) + 50; // 50 to 450
      const yearsInBusiness = Math.floor(Math.random() * 15) + 2; // 2 to 17
      const employees = Math.floor(Math.random() * 8) + 1; // 1 to 9
      const responseTime = `${Math.floor(Math.random() * 10) + 2} min`; // 2 to 12 min

      pros.push({
        name,
        avatar,
        email: `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
        phone: `+92-300-${String(1000000 + proId).slice(1)}`,
        location: {
          city: city.name,
          coordinates: {
            lat: city.coords.lat + (Math.random() - 0.5) * 0.1,
            lng: city.coords.lng + (Math.random() - 0.5) * 0.1
          }
        },
        services: selectedServices,
        rating,
        reviews,
        verified: Math.random() > 0.2, // 80% verified
        topPro: Math.random() > 0.6, // 40% top pro
        yearsInBusiness,
        employees,
        responseTime,
        image: images[Math.floor(Math.random() * images.length)],
        bio: `Professional ${category.toLowerCase()} services with ${yearsInBusiness} years of experience`
      });

      proId++;
    }
  });

  return pros;
}

export async function POST(request) {
  try {
    await connectDB();

    // Sample services data
    const sampleServices = [
      {
        title: "Home Cleaning",
        slug: "home-cleaning",
        description: "Professional house cleaning, deep cleaning, and move-in/out services",
        icon: "MdCleaningServices",
        image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1920&h=1080&fit=crop&q=90",
        category: "Cleaning"
      },
      {
        title: "Handyman Services",
        slug: "handyman-services",
        description: "General repairs, furniture assembly, and home maintenance",
        icon: "MdBuild",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop&q=90",
        category: "Repair"
      },
      {
        title: "Landscaping",
        slug: "landscaping",
        description: "Lawn care, garden design, and irrigation services",
        icon: "MdGrass",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&q=90",
        category: "Outdoor"
      },
      {
        title: "Moving Services",
        slug: "moving-services",
        description: "Long distance moving, packing, and storage solutions",
        icon: "MdLocalShipping",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=90",
        category: "Moving"
      },
      {
        title: "Plumbing",
        slug: "plumbing",
        description: "Emergency plumbing, pipe repair, and water heater services",
        icon: "MdPlumbing",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&q=90",
        category: "Repair"
      },
      {
        title: "Electrical Work",
        slug: "electrical-work",
        description: "Wiring, panel upgrades, and lighting installation",
        icon: "MdElectricalServices",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop&q=90",
        category: "Repair"
      },
      {
        title: "Painting",
        slug: "painting",
        description: "Interior and exterior painting, wallpaper removal",
        icon: "MdFormatPaint",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop&q=90",
        category: "Home Improvement"
      },
      {
        title: "HVAC Services",
        slug: "hvac-services",
        description: "AC repair, furnace installation, and thermostat replacement",
        icon: "MdAcUnit",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&h=1080&fit=crop&q=90",
        category: "Repair"
      },
      {
        title: "Contractors",
        slug: "contractors",
        description: "Home remodeling, bathroom remodels, and new construction",
        icon: "MdConstruction",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop&q=90",
        category: "Construction"
      },
    ];

    // Generate 100+ pros
    const samplePros = generatePros();

    // Clear existing data (optional - remove if you want to keep existing data)
    // Note: We don't delete users to preserve existing accounts
    await Service.deleteMany({});
    await Pro.deleteMany({});

    // Insert sample services
    const services = await Service.insertMany(sampleServices);

    // Insert sample pros
    const pros = await Pro.insertMany(samplePros);

    // Create User accounts for pros so they can log in
    const proUsers = await Promise.all(
      pros.map(async (pro) => {
        // Check if user already exists
        const existingUser = await User.findOne({ email: pro.email });
        if (existingUser) {
          // Update existing user to link pro profile
          existingUser.proProfile = pro._id;
          existingUser.isPro = true;
          existingUser.role = 'pro';
          await existingUser.save();
          return existingUser;
        }

        // Create new user account for pro
        const hashedPassword = await bcrypt.hash('password123', 10); // Default password
        const user = await User.create({
          name: pro.name,
          email: pro.email,
          phone: pro.phone,
          password: hashedPassword,
          role: 'pro',
          isPro: true,
          proProfile: pro._id,
        });
        return user;
      })
    );

    // Create some sample contracts for testing (optional)
    // Create a few test customer accounts
    const testCustomers = [];
    const customerNames = ['John Doe', 'Jane Smith', 'Ahmed Ali', 'Fatima Khan'];
    for (let i = 0; i < 4; i++) {
      const existingCustomer = await User.findOne({ email: `customer${i + 1}@test.com` });
      if (!existingCustomer) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const customer = await User.create({
          name: customerNames[i],
          email: `customer${i + 1}@test.com`,
          phone: `+92-300-${String(1000000 + i).slice(1)}`,
          password: hashedPassword,
          role: 'customer',
          isPro: false,
        });
        testCustomers.push(customer);
      } else {
        testCustomers.push(existingCustomer);
      }
    }

    // Create sample contracts (assign 2-3 contracts to random pros)
    const sampleContracts = [];
    for (let i = 0; i < 10; i++) {
      const randomPro = pros[Math.floor(Math.random() * pros.length)];
      const randomCustomer = testCustomers[Math.floor(Math.random() * testCustomers.length)];
      const randomService = services[Math.floor(Math.random() * services.length)];
      
      const statuses = ['pending', 'pending', 'pending', 'accepted', 'accepted', 'completed'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const contract = await Contract.create({
        proId: randomPro._id,
        userId: randomCustomer._id,
        customerEmail: randomCustomer.email,
        customerPhone: randomCustomer.phone,
        customerName: randomCustomer.name,
        message: `I need ${randomService.title} service. Please contact me.`,
        service: randomService.title,
        status: status,
      });
      sampleContracts.push(contract);
    }

    return Response.json({ 
      success: true, 
      message: `Seeded ${services.length} services, ${pros.length} pros, ${proUsers.length} pro user accounts, ${testCustomers.length} test customers, and ${sampleContracts.length} sample contracts`,
      data: { 
        services: services.length,
        pros: pros.length,
        proUsers: proUsers.length,
        testCustomers: testCustomers.length,
        sampleContracts: sampleContracts.length
      },
      credentials: {
        pros: 'Email: {proEmail}@example.com, Password: password123',
        customers: 'Email: customer1@test.com to customer4@test.com, Password: password123'
      },
      note: 'All accounts use default password: password123'
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

