'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { StringToBoolean } from 'class-variance-authority/types';
import Image from 'next/image';
import { Overlay } from './overlay';
import { useAuth } from '@clerk/nextjs';
import { Footer } from './footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Actions } from '@/components/actions';
import { MoreHorizontal } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';

interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel =
    userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const handleFavorite = useMutation(api.board.favorite);
  const handleUnfavorite = useMutation(
    api.board.unfavorite,
  );

  const { mutate: onFavorite, pending: pendingFavorite } =
    useApiMutation(api.board.favorite);
  const {
    mutate: onUnfavorite,
    pending: pendingUnfavorite,
  } = useApiMutation(api.board.unfavorite);

  const toggleFavorite = () => {
    if (isFavorite) {
      handleUnfavorite({ id: id as Id<'boards'> }).catch(
        () => toast.error('Failed to unfavorite'),
      );
    } else {
      handleFavorite({
        id: id as Id<'boards'>,
        orgId,
      }).catch(() => toast.error('Failed to favorite'));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-fit"
          />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute right-1 top-1 px-3 py-2 opacity-0 outline-none transition-opacity group-hover:opacity-100">
              <MoreHorizontal className="text-white opacity-75 transition-opacity hover:opacity-100" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] justify-between overflow-hidden rounded-lg">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
