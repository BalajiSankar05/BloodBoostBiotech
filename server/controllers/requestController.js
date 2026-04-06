import BloodRequest from '../models/BloodRequest.js';

// Create a new blood request
export const createRequest = async (req, res) => {
  try {
    const { patientName, bloodGroup, city, hospitalName, contact } = req.body;

    const request = await BloodRequest.create({
      requester: req.user._id,
      patientName,
      bloodGroup,
      city,
      hospitalName,
      contact,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get requests made by the logged-in user
export const getMyRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ requester: req.user._id }).populate('acceptedBy', 'name contact');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get requests relevant to a donor (matching blood group or already accepted)
export const getRequestsForDonor = async (req, res) => {
  try {
    const requests = await BloodRequest.find({
      $or: [
        { status: 'Pending', bloodGroup: req.user.bloodGroup },
        { acceptedBy: req.user._id }
      ]
    })
    .populate('requester', 'name contact email')
    .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Donor accepts or rejects a request
export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Accepted' or 'Rejected'
    const request = await BloodRequest.findById(req.params.id);

    if (request) {
      if (status === 'Accepted') {
        request.status = 'Accepted';
        request.acceptedBy = req.user._id;
      } else if (status === 'Rejected') {
        request.status = 'Rejected';
        // normally rejection means just not accepted by this donor, but let's keep it simple
      }

      const updatedRequest = await request.save();
      res.json(updatedRequest);
    } else {
      res.status(404).json({ message: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({})
      .populate('requester', 'name email')
      .populate('acceptedBy', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
