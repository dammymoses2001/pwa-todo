import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getPendingActions, clearPendingAction } from '../utils/db';
import { addTodo } from '../services/todo';
import toast from 'react-hot-toast';

export const useSyncPendingActions = (isOnline) => {
  const queryClient = useQueryClient();

  const syncPendingActions = useCallback(async () => {
    if (!isOnline) return;

    try {
      const pendingActions = await getPendingActions();
      
      if (pendingActions.length === 0) return;

      toast.loading(`Syncing ${pendingActions.length} pending action(s)...`, { id: 'sync' });

      for (const action of pendingActions) {
        try {
          if (action.type === 'addTodo') {
            await addTodo(action.data);
            await clearPendingAction(action.id);
          }
        } catch (error) {
          console.error('Failed to sync action:', action, error);
        }
      }

      // Refresh todos after sync
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      
      toast.success('All changes synced!', { id: 'sync' });
    } catch (error) {
      console.error('Sync failed:', error);
      toast.error('Sync failed. Will retry later.', { id: 'sync' });
    }
  }, [isOnline, queryClient]);

  useEffect(() => {
    if (isOnline) {
      syncPendingActions();
    }
  }, [isOnline, syncPendingActions]);

  return { syncPendingActions };
};
