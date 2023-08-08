'use client'

import qs from 'query-string'
import { Category } from "@prisma/client"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

interface CategoriesProps {
  data: Category[]
}

export const Categories = ({
  data
}: CategoriesProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryId = searchParams.get('categoryId')

  const onClick = (id: string | undefined) => {
    const query = {categoryId: id}
    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true })

    router.push(url)
  }

  return (
    <div className='w-full overflow-x-auto space-x-2 flex p-1'>
      <Button
        onClick={() => onClick(undefined)}
        className={cn(`
          flex
          items-center
          text-center
          text-xs
          text-primary
          md:text-sm
          px-2
          md:px-4
          py-2
          md:py-3
          rounded-md
          bg-primary/10
          hover:opacity-75
          hover:text-secondary
          transition
        `,
          !categoryId ? 'bg-primary/25' : 'bg-primary/10'
        )}
      >
        Newest
      </Button>
      {data.map((item) => (
        <Button
          onClick={() => onClick(item.id)}
          className={cn(`
            flex
            items-center
            text-center
            text-xs
            text-primary
            md:text-sm
            px-2
            md:px-4
            py-2
            md:py-3
            rounded-md
            bg-primary/10
            hover:opacity-75
            hover:text-secondary
            transition
          `,
            item.id === categoryId ? 'bg-primary/25' : 'bg-primary/10'
          )}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}