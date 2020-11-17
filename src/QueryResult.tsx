import { Alert, Skeleton } from '@material-ui/lab'
import React, { FunctionComponent } from 'react'
import { UseQueryState } from 'urql'

interface Props {
  result: UseQueryState
  errorMsg?: string
  skeletonVariant?: 'text' | 'circle' | 'rect'
  skeletonWidth?: number | string
  skeletonHeight?: number | string
}

export const QueryResult: FunctionComponent<Props> = (
  { result, errorMsg = '發生問題，請重試。', skeletonVariant = 'text', skeletonWidth, skeletonHeight, children }) => {
  if (result.fetching) {
    return <Skeleton variant={skeletonVariant} width={skeletonWidth} height={skeletonHeight} />
  }
  if (result.error != null) {
    return <Alert severity="error">{errorMsg}</Alert>
  }
  return <>{children}</>
}
