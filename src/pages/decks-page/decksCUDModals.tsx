import { FC, memo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { createDeckSchema } from '@/common/utils'
import { Button, TextField } from '@/components'
import { Modal } from '@/components/layout/forms'
import { ModalButton } from '@/components/layout/forms/modal/modalButton.tsx'
import { ModalClose } from '@/components/layout/forms/modal/modalClose.tsx'
import { ModalContent } from '@/components/layout/forms/modal/modalContent.tsx'
import { ModalField } from '@/components/layout/forms/modal/modalField.tsx'
import { ModalTitle } from '@/components/layout/forms/modal/modalTitle.tsx'
import { ControlledCheckbox } from '@/components/ui/checkbox/ControlledCheckbox.tsx'
import { ImageInput } from '@/components/ui/imageInput/imageInput.tsx'
import s from '@/pages/decks-page/decks.module.scss'
import { useCUDDecks } from '@/pages/decks-page/hook/useCUDDecks.ts'
import { CurrentDeckData, ModalVariant } from '@/pages/decks-page/hook/useDeckModalState.ts'
import { getModalTitles } from '@/pages/decks-page/utils/getModalTitles.ts'
import { CreateDeckArgs } from '@/services/decks/decks.types.ts'

export type ModalsProps = {
  isOpenModal: boolean
  setIsOpenModal: (isOpen: boolean) => void
  variant: ModalVariant
  currentDeckData: CurrentDeckData
}

export const DecksCUDModals: FC<ModalsProps> = memo(
  ({ isOpenModal, setIsOpenModal, variant, currentDeckData }) => {
    const currentInputValue =
      variant === 'updateDeck' && currentDeckData.name ? currentDeckData.name : ''

    const {
      formState: { errors },
      register,
      handleSubmit,
      control,
      reset,
      // setError,
      // watch,
    } = useForm<CreateDeckArgs>({
      defaultValues: {
        name: currentInputValue,
      },
      values: {
        name: currentInputValue,
        isPrivate: currentDeckData.isPrivate,
      },
      resolver: zodResolver(createDeckSchema),
    })

    const { createDeck, updateDeck, deleteDeck, isLoading } = useCUDDecks(
      currentDeckData,
      setIsOpenModal,
      reset
    )

    const onSubmit = variant === 'createDeck' ? createDeck : updateDeck
    const coverImage = variant === 'createDeck' ? null : currentDeckData.cover

    const titleData = getModalTitles(variant)

    //-----JSX-----
    //  Create Deck or Update Deck
    const formForCreateOrUpdate = (
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageInput name={'cover'} control={control} image={coverImage} />
        <TextField
          autoFocus
          {...register('name')}
          label={'Name Deck'}
          placeholder={'Name'}
          className={s.nameInput}
          error={errors.name}
        />
        <ControlledCheckbox
          control={control}
          defaultValue={currentDeckData.isPrivate}
          label={'Private cards'}
          name={'isPrivate'}
          className={s.checkboxIsPrivate}
        />
        <ModalButton>
          <Button variant={'secondary'} onClick={() => setIsOpenModal(false)} type={'button'}>
            Close
          </Button>
          <Button variant={'primary'} type={'submit'} disabled={isLoading}>
            {titleData.buttonTitle}
          </Button>
        </ModalButton>
      </form>
    )

    //  Delete Deck
    const deletingContent = (
      <>
        <span className={s.deleteText}>
          Do you really want to remove {currentDeckData.name}? All cards will be deleted.
        </span>
        <ModalButton>
          <Button variant={'secondary'} onClick={() => setIsOpenModal(false)} type={'button'}>
            Close
          </Button>
          <Button variant={'primary'} type={'submit'} disabled={isLoading} onClick={deleteDeck}>
            {titleData.buttonTitle}
          </Button>
        </ModalButton>
      </>
    )
    const mainContent = variant === 'deleteDeck' ? deletingContent : formForCreateOrUpdate

    return (
      <Modal isOpen={isOpenModal} onOpenChange={setIsOpenModal}>
        <ModalContent>
          <ModalTitle>{titleData.title}</ModalTitle>
          <ModalClose>X</ModalClose>
          <ModalField>{mainContent}</ModalField>
        </ModalContent>
      </Modal>
    )
  }
)
