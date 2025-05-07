import React from "react";
import styled from "styled-components";
import { TimeAgo } from "./Components/TimeAgo";
import { LikeBtn } from "./Components/LikeBtn";

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: white;
  width: 80vw;
  box-sizing: border-box;
  outline: 2px solid #000;
  padding: 20px;
  box-shadow: 6px 6px 0px 0px black;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    max-width: 600px;
  }
`;

const TextField = styled.div`
  background-color: white;
  font-family: monospace;
  font-weight: 500;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const View = ({ thoughts, onLike }) => {
  return (
    <>
      {thoughts.length > 0 &&
        thoughts.map((thought) => (
          <ViewContainer key={thought._id}>
            <TextField>{thought.message}</TextField>

            <ActionsWrapper>
              <LikeBtn
                thoughtId={thought._id}
                hearts={thought.hearts}
                onLike={onLike}
              />
              <TimeAgo timestamp={thought.createdAt} />
            </ActionsWrapper>
          </ViewContainer>
        ))}
    </>
  );
};
