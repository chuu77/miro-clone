'use client';
import Image from 'next/image';

import { useMutation } from 'convex/react';
import { useOrganization } from '@clerk/nextjs';

import { api } from '@/convex/_generated/api';

import { Button } from '@/components/ui/button';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';

export const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: 'Untitled',
    })
      .then((id) => {
        toast.success('Board Created');
        // TODO: Redirect to board/{id}
      })
      .catch(() => toast.error('Failed to create board'));
  };
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src="/note.svg" height={140} width={140} alt="Empty" />
      <h2 className="mt-6 text-2xl font-semibold">Create your first board!</h2>
      <p className="textg-sm mt-2 text-muted-foreground">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create board
        </Button>
      </div>
    </div>
  );
};
