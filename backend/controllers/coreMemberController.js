import CoreMember from '../models/CoreMember.js';

export const getCoreMembers = async (req, res) => {
  try {
    const members = await CoreMember.find().sort({ "order": 1 });
    res.status(200).json({ members });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error });
  }
};

