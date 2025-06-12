import styled from 'styled-components';
import { TimeAgo } from './Components/TimeAgo';
import { LikeBtn } from './Components/LikeBtn';
import { DeleteBtn } from './Components/DeleteBtn';

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: white;
  width: 100%;
  max-width: 700px;
  box-sizing: border-box;
  outline: 2px solid #000;
  padding: 20px;
  box-shadow: 6px 6px 0px 0px black;
  margin-bottom: 10px;
  transition: transform 0.2s ease;
  overflow-wrap: break-word;
`;

const TextField = styled.div`
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

export const View = ({ thoughts, onLike, handleDeleteThought }) => {
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
              <DeleteBtn
                thoughtId={thought._id}
                onDelete={handleDeleteThought}
              />
              <TimeAgo timestamp={thought.createdAt} />
            </ActionsWrapper>
          </ViewContainer>
        ))}
    </>
  );
};
