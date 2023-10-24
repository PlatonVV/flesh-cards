import { FC } from 'react'

import { Link } from 'react-router-dom'

import { ReactComponent as ArrowBack } from '../../assets/icons/arrow-back-outline.svg'

import s from './friends-pack.module.scss'

import { Skeleton, Table, TableColumns, THead, Typography } from '@/components'
import { Pagination } from '@/components/ui/pagination'
import { useGetDecks } from '@/pages/decks-page/hook/useGetDecks.tsx'
import { useSkeletonHeightState } from '@/pages/decks-page/hook/useSkeletonHeightState.ts'
import { FriendsPackHeaders } from '@/pages/friends-pack/friends-pack-headers.tsx'
import { FriendsPackTableBody } from '@/pages/friends-pack/friends-pack-table-body.tsx'
import { friendsOrderName } from '@/pages/friends-pack/friends.types.ts'

const friendsColumnsTitles: TableColumns<friendsOrderName> = [
  { title: 'Question', orderName: 'question' },
  { title: 'Answer', orderName: 'answer' },
  { title: 'LastUpdate', orderName: 'updated' },
  { title: 'Grade' },
  // { title: '' },
]
const perPageCountVariant = ['10', '20', '30', '50', '100']
const initialSkeletonHeight = 374

export const FriendsPack: FC = () => {
  const {
    isFetching,
    isError,
    profileData: { id: authorId },
    decksData: {
      maxCardsCount,
      pagination: { currentPage, itemsPerPage, totalPages },
      items,
    },
    isLoadingDecksData,
    sort,
    setSortMemo,
    onChangeSearchInputMemo,
    setCurrentPageMemo,
    setItemsPerPageMemo,
  } = useGetDecks()

  let [skeletonHeight, setSkeletonHeight] = useSkeletonHeightState(initialSkeletonHeight)

  if (isError) return <h1>Error!</h1>

  return (
    <div className={s.pageWrapper}>
      <Link style={{ textDecoration: 'none' }} to={'/'}>
        <div className={s.linkArrowContainer}>
          <ArrowBack />
          <Typography variant={'body2'}>Back to Packs List</Typography>
        </div>
      </Link>
      <FriendsPackHeaders
        disabled={isFetching}
        onChangeSearchInput={onChangeSearchInputMemo}
        maxCardsCount={maxCardsCount}
      />
      <Table variant={'cards'}>
        <THead
          columns={friendsColumnsTitles}
          onSort={setSortMemo}
          currentSort={sort}
          disabled={isFetching}
        />
        <FriendsPackTableBody
          items={items}
          authorId={authorId}
          onChangeHeight={setSkeletonHeight}
        />
      </Table>
      <Skeleton
        isFetching={isFetching}
        isLoading={isLoadingDecksData}
        currentHeight={skeletonHeight.current}
      />
      <div className={s.paginationWrapper}>
        <Pagination
          disabled={isFetching}
          perPageCountVariant={perPageCountVariant}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          changePage={setCurrentPageMemo}
          changeItemsPerPage={setItemsPerPageMemo}
          className={s.pagination}
        />
      </div>
    </div>
  )
}
