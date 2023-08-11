'use client'
import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarImage } from "./ui/avatar";

export const UserAvatar = () => {
  const { user } = useUser()
  return (
    <Avatar className=''>
      <AvatarImage src={user?.imageUrl} />
    </Avatar>
  )
}