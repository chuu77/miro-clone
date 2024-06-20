import { Canvas } from './_components/canvas';
import { Room } from '@/components/room';

interface BoardIdPageProps {
  params: {
    boardId: 'my-room';
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room roomId={params.boardId}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;
