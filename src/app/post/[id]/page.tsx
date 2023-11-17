import React, { memo } from "react";

const PostWithId: React.FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  return (
    <div>
      <h1>{`Id: ${id}`}</h1>
    </div>
  );
};

export default memo(PostWithId);
