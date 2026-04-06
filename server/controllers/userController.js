import User from '../models/User.js';

// Get donors (accessible by anyone, with search params)
export const getDonors = async (req, res) => {
  try {
    const { bloodGroup, city, longitude, latitude } = req.query;
    let pipeline = [];

    // Proximity search (10km) using aggregation for distance field
    if (longitude && latitude) {
      pipeline.push({
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: 'distance',
          maxDistance: 10000, // 10km
          spherical: true,
          distanceMultiplier: 0.001, // Convert meters to kilometers
          query: { role: 'Donor', isAvailable: true },
        },
      });
    } else {
      pipeline.push({
        $match: { role: 'Donor', isAvailable: true },
      });
      if (city) {
        pipeline.push({ 
          $match: { city: { $regex: city, $options: 'i' } } 
        });
      }
    }

    if (bloodGroup) {
      pipeline.push({ $match: { bloodGroup } });
    }

    pipeline.push({ $project: { password: 0 } });

    const donors = await User.aggregate(pipeline);
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update donor availability
export const updateUserAvailability = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : user.isAvailable;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        isAvailable: updatedUser.isAvailable,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
      user.city = req.body.city || user.city;
      user.contact = req.body.contact || user.contact;
      user.profileImage = req.body.profileImage || user.profileImage;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        bloodGroup: updatedUser.bloodGroup,
        city: updatedUser.city,
        contact: updatedUser.contact,
        profileImage: updatedUser.profileImage,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
