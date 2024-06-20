'use client';

import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';
import { useSelf } from '@liveblocks/react/suspense';

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info);
  console.log(info);
  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
};
