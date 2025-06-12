import React from 'react';
import styled from 'styled-components';
import Button, { LikeButton } from './Button';
import { device } from '../styles/media';
import { isResourceOwner, confirmAction, processMessageEdit } from '../utils/validation';
import { getTimeAgo } from '../utils/dateHelpers';
import { useThoughtEditing, useThoughtDeletion } from '../stores/uiStore';

const LikeButtonWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$liked ? '#fff0f5' : 'none'};
  margin-right: 8px;

  @media ${device.smallMobile} {
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 0;
  border: 1px solid #bbb;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 6px 6px 0 #000;
  max-width: 500px;
  width: 100%;

  @media ${device.mobile} {
    padding: 15px;
    margin-bottom: 15px;
  }

  @media ${device.smallMobile} {
    padding: 12px;
    margin-bottom: 12px;
    box-shadow: 4px 4px 0 #000;
  }
`;

const Message = styled.p`
  margin: 0 0 15px 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;

  @media ${device.smallMobile} {
    font-size: 0.95rem;
    margin-bottom: 12px;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  @media ${device.smallMobile} {
    gap: 6px;
  }
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media ${device.smallMobile} {
    gap: 6px;
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media ${device.smallMobile} {
    gap: 6px;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const OwnerActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 8px;

  @media ${device.smallMobile} {
    gap: 6px;
    margin-left: 0;
    margin-top: 4px;
  }
`;

const EditInput = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 80px;
  margin-bottom: 10px;
  font-family: inherit;

  @media ${device.smallMobile} {
    padding: 8px;
    font-size: 0.95rem;
    min-height: 70px;
  }

  &:focus {
    outline: none;
    border-color: #ff4d4d;
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-bottom: 15px;

  @media ${device.smallMobile} {
    gap: 6px;
  }
`;

const OwnerInfo = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 8px;
`;

const Time = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

/**
 * Card component displaying a single thought with like, edit, and delete functionality
 */
const ThoughtCard = ({ 
  message, 
  createdAt, 
  hearts = 0, 
  _id, 
  onLike, 
  liked, 
  currentUser, 
  onUpdate, 
  onDelete,
  owner,
  likesCount,
  isOptimistic 
}) => {
  // Use Zustand stores for editing and deletion state
  const {
    isEditing,
    editMessage,
    isUpdating,
    startEditing,
    updateMessage,
    setUpdating,
    cancelEditing,
    finishEditing
  } = useThoughtEditing(_id);

  const {
    isDeleting,
    startDeleting,
    finishDeleting
  } = useThoughtDeletion(_id);

  const isOwner = isResourceOwner(currentUser, owner);

  // Helper function to get display name for the owner
  const getOwnerDisplayName = (owner) => {
    if (!owner) return 'Anonymous';
    
    // Try to get first name from various possible fields
    if (owner.name) {
      return owner.name.split(' ')[0]; // Get first name from full name
    }
    if (owner.displayName) {
      return owner.displayName.split(' ')[0];
    }
    if (owner.email) {
      return owner.email.split('@')[0]; // Fallback to email username
    }
    
    return 'Anonymous';
  };

  const handleEditSave = async () => {
    const { isValid, processedMessage } = processMessageEdit(editMessage, message);
    
    if (!isValid) {
      cancelEditing();
      return;
    }

    setUpdating(true);
    const result = await onUpdate(_id, processedMessage);
    
    if (result.success) {
      finishEditing();
    } else {
      // Reset message to original if update failed
      updateMessage(message);
    }
    setUpdating(false);
  };

  const handleEditCancel = () => {
    cancelEditing();
  };

  const handleEditStart = () => {
    startEditing(message);
  };

  const handleDelete = async () => {
    if (!confirmAction('Are you sure you want to delete this thought?')) {
      return;
    }

    startDeleting();
    await onDelete(_id);
    finishDeleting();
  };

  return (
    <Card>
      {/* Show owner info if available */}
      {owner && (
        <OwnerInfo>
          By: {getOwnerDisplayName(owner)}
        </OwnerInfo>
      )}
      
      {isEditing ? (
        <>
          <EditInput
            value={editMessage}
            onChange={(e) => updateMessage(e.target.value)}
            disabled={isUpdating}
            maxLength={140}
          />
          <EditActions>
            <Button onClick={handleEditCancel} disabled={isUpdating}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditSave} 
              disabled={isUpdating || !editMessage.trim()}
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </Button>
          </EditActions>
        </>
      ) : (
        <Message>{message}</Message>
      )}
      
      <CardFooter>
        <LeftGroup>
          <LikeButtonWrapper $liked={liked}>
            <LikeButton onClick={() => onLike(_id)} liked={liked}>
              ❤️
            </LikeButton>
          </LikeButtonWrapper>
          <span>x {likesCount || hearts}</span>
        </LeftGroup>
        
        <RightGroup>
          <Time>{getTimeAgo(createdAt)}</Time>
          {/* Show edit/delete buttons only for thought owner */}
          {isOwner && !isEditing && !isOptimistic && (
            <OwnerActions>
              <Button onClick={handleEditStart} disabled={isDeleting}>
                ✏️ Edit
              </Button>
              <Button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : '🗑️ Delete'}
              </Button>
            </OwnerActions>
          )}
          {isOptimistic && (
            <span style={{fontSize: '0.8rem', color: '#999'}}>Saving...</span>
          )}
        </RightGroup>
      </CardFooter>
    </Card>
  );
};

export default ThoughtCard; 