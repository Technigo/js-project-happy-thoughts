import React from 'react';
import styled from 'styled-components';
import Button, { LikeButton } from './Button';
import { device } from '../styles/media';
import { isResourceOwner, processMessageEdit } from '../utils/validation';
import { getTimeAgo } from '../utils/dateHelpers';
import { useThoughtEditing, useThoughtDeletion, useConfirm } from '../stores/uiStore';
import { colors } from '../styles/colors';

// Add screen reader only text component
const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
`;

const Card = styled.div`
  background: ${colors.background.white};
  border-radius: 0;
  border: 1px solid ${colors.border.main};
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: ${colors.overlay.cardShadow};
  max-width: 500px;
  width: 100%;

  @media ${device.mobile} {
    padding: 15px;
    margin-bottom: 15px;
  }

  @media ${device.smallMobile} {
    padding: 12px;
    margin-bottom: 12px;
    box-shadow: ${colors.overlay.cardShadowSmall};
  }
`;

const Message = styled.p`
  margin: 0 0 15px 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${colors.text.primary};
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
  border: 1px solid ${colors.border.light};
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
    border-color: ${colors.border.focus};
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
  color: ${colors.text.secondary};
  margin-bottom: 8px;
`;

const LikeCount = styled.span.attrs({
  'aria-live': 'polite',
  'aria-atomic': 'true'
})`
  margin-left: 4px;
`;

const Time = styled.span`
  color: ${colors.text.secondary};
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

  const { confirm } = useConfirm();

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
    const confirmed = await confirm({
      title: 'Delete Thought',
      message: 'Are you sure you want to delete this thought? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (!confirmed) {
      return;
    }

    startDeleting();
    await onDelete(_id);
    finishDeleting();
  };

  // Keyboard event handlers
  const handleLikeKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onLike(_id);
    }
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEditStart();
    }
  };

  const handleDeleteKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDelete();
    }
  };

  return (
    <Card>
      {/* Screen reader announcements */}
      {isOptimistic && (
        <ScreenReaderOnly aria-live="polite">
          Posting your thought...
        </ScreenReaderOnly>
      )}
      
      {/* Show owner info if available */}
      {owner && (
        <OwnerInfo>
          <ScreenReaderOnly>Posted by: </ScreenReaderOnly>
          {getOwnerDisplayName(owner)}
        </OwnerInfo>
      )}
      
      {isEditing ? (
        <>
          <EditInput
            value={editMessage}
            onChange={(e) => updateMessage(e.target.value)}
            disabled={isUpdating}
            maxLength={140}
            aria-label="Edit your thought"
            aria-describedby="edit-instructions"
          />
          <ScreenReaderOnly id="edit-instructions">
            Press Tab to navigate to Save or Cancel buttons
          </ScreenReaderOnly>
          <EditActions>
            <Button onClick={handleEditCancel} disabled={isUpdating}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditSave} 
              disabled={isUpdating || !editMessage.trim()}
              aria-describedby="save-status"
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </Button>
            {isUpdating && (
              <ScreenReaderOnly id="save-status" aria-live="polite">
                Saving your changes...
              </ScreenReaderOnly>
            )}
          </EditActions>
        </>
      ) : (
        <Message>{message}</Message>
      )}
      
      <CardFooter>
        <LeftGroup>
          <LikeButton 
            onClick={() => onLike(_id)} 
            onKeyDown={handleLikeKeyDown}
            $liked={liked} 
            aria-label={liked ? `Unlike this thought. Currently has ${likesCount || hearts} likes` : `Like this thought. Currently has ${likesCount || hearts} likes`}
            tabIndex={0}
          >
            ❤️
          </LikeButton>
          <LikeCount aria-label={`${likesCount || hearts} people liked this`}>
            x {likesCount || hearts}
          </LikeCount>
        </LeftGroup>
        
        <RightGroup>
          <Time>{getTimeAgo(createdAt)}</Time>
          {/* Show edit/delete buttons only for thought owner */}
          {isOwner && !isEditing && !isOptimistic && (
            <OwnerActions>
              <Button 
                onClick={handleEditStart} 
                onKeyDown={handleEditKeyDown}
                disabled={isDeleting} 
                aria-label="Edit this thought"
                tabIndex={0}
              >
                Edit
              </Button>
              <Button 
                onClick={handleDelete} 
                onKeyDown={handleDeleteKeyDown}
                disabled={isDeleting} 
                aria-label="Delete this thought"
                aria-describedby="delete-status"
                tabIndex={0}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
              {isDeleting && (
                <ScreenReaderOnly id="delete-status" aria-live="polite">
                  Deleting your thought...
                </ScreenReaderOnly>
              )}
            </OwnerActions>
          )}
          {isOptimistic && (
            <span style={{fontSize: '0.8rem', color: colors.text.placeholder}}>
              <ScreenReaderOnly>Status: </ScreenReaderOnly>
              Saving...
            </span>
          )}
        </RightGroup>
      </CardFooter>
    </Card>
  );
};

export default ThoughtCard; 