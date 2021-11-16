import React from "react";

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <div>
      <i
        className={classes}
        aria-hidden="true"
        onClick={props.onLiked}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default Like;
