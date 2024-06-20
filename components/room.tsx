'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';

interface RoomProps {
  children: ReactNode;
  roomId: string;
}

export const Room = ({ children, roomId }: RoomProps) => {
  return (
    <LiveblocksProvider
      publicApiKey={
        'pk_dev_FWKRi0OMYxcPUeKrngNPHw8MkKaCIbw84gtlW0RDgpOjzDIBQMwMva7b7I215Q28'
      }
    >
      <RoomProvider id={roomId} initialPresence={{}}>
        <ClientSideSuspense
          fallback={<div>Loading...</div>}
        >
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
