import React, { useMemo } from 'react';
import TeamSection from './TeamSection';

const Core = ({ members }) => {
  const cloudinaryBucket = useMemo(() => import.meta.env.VITE_CLOUDINARY_BUCKET, []);
  const mappedMembers = useMemo(() => {
    return {
      management: members.management.map(member => ({
        ...member,
        imageUrl: `${cloudinaryBucket}${member.imageUrl}`,
      })),
      operation: members.operation.map(member => ({
        ...member,
        imageUrl: `${cloudinaryBucket}${member.imageUrl}`,
      })),
      techhead: members.techhead.map(member => ({
        ...member,
        imageUrl: `${cloudinaryBucket}${member.imageUrl}`,
      })),
    };
  }, [members, cloudinaryBucket]);

  return (
    <div className="flex flex-col items-center text-white py-10 w-full mb-24">
      <h1 className="text-[10vw] md:text-[100px] font-bold mb-16 font-mono">Core Team '24</h1>
      <TeamSection title="MANAGEMENT" members={mappedMembers.management} />
      <TeamSection title="Operations Team" members={mappedMembers.operation} />
      <TeamSection title="Tech Heads" members={mappedMembers.techhead} />
    </div>
  );
};

export default React.memo(Core);
