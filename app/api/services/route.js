import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import Pro from '@/models/Pro';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    // Get all services
    const allServices = await Service.find({}).sort({ title: 1 });

    // If city is provided, filter services that have pros in that city
    if (city) {
      // Get unique services from pros in this city
      const prosInCity = await Pro.find({ 'location.city': new RegExp(city, 'i') }).select('services');
      const availableServices = new Set();
      
      prosInCity.forEach(pro => {
        if (pro.services && Array.isArray(pro.services)) {
          pro.services.forEach(service => availableServices.add(service));
        }
      });

      // Filter services that are available in this city
      const filteredServices = allServices.filter(service => {
        // Check if any pro in this city offers this service
        return Array.from(availableServices).some(availableService => 
          service.title.toLowerCase().includes(availableService.toLowerCase()) ||
          availableService.toLowerCase().includes(service.title.toLowerCase())
        );
      });

      // Convert to plain objects
      const servicesData = filteredServices.map(service => {
        const serviceObj = service.toObject();
        if (serviceObj._id) {
          serviceObj._id = serviceObj._id.toString();
          serviceObj.id = serviceObj._id;
        }
        return serviceObj;
      });

      return Response.json({ success: true, data: servicesData });
    }

    // Return all services if no city filter
    const servicesData = allServices.map(service => {
      const serviceObj = service.toObject();
      if (serviceObj._id) {
        serviceObj._id = serviceObj._id.toString();
        serviceObj.id = serviceObj._id;
      }
      return serviceObj;
    });

    return Response.json({ success: true, data: servicesData });
  } catch (error) {
    console.error('Error fetching services:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


