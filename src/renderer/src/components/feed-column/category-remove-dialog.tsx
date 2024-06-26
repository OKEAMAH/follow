import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@renderer/components/ui/alert-dialog"
import { apiFetch } from "@renderer/queries/api-fetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function CategoryRemoveDialog({
  feedIdList,
  onSuccess,
  category,
  view,
}: {
  feedIdList: string[]
  onSuccess?: () => void
  category: string
  view?: number
}) {
  const queryClient = useQueryClient()
  const renameMutation = useMutation({
    mutationFn: async () =>
      apiFetch("/categories", {
        method: "DELETE",
        body: {
          feedIdList,
          deleteSubscriptions: false,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions", view],
      })
      onSuccess?.()
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Remove category
          {" "}
          <span className="font-bold">{category}</span>
          ?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This operation will delete your category, but the feeds it contains
          will be retained and grouped by website.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => renameMutation.mutate()}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
