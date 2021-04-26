import { Currency } from 'uniswap-bsc-sdk'
import React, { useCallback, useEffect, useState } from 'react'
import useLast from '../../hooks/useLast'
import { useSelectedListUrl } from '../../state/lists/hooks'
import Modal from '../Modal'
import { CurrencySearch } from './CurrencySearch'
import ListIntroduction from './ListIntroduction'
import { ListSelect } from './ListSelect'

interface CurrencySearchModalProps {
	isOpen: boolean
	onDismiss: () => void
	selectedCurrency?: Currency | null
	onCurrencySelect: (currency: Currency) => void
	otherSelectedCurrency?: Currency | null
}

export default function CurrencySearchModal({
	isOpen,
	onDismiss,
	onCurrencySelect,
	selectedCurrency,
	otherSelectedCurrency
}: CurrencySearchModalProps) {
	const [listView, setListView] = useState<boolean>(false)
	const lastOpen = useLast(isOpen)

	useEffect(() => {
		if (isOpen && !lastOpen) {
			setListView(false)
		}
	}, [isOpen, lastOpen])

	const handleCurrencySelect = useCallback(
		(currency: Currency) => {
			onCurrencySelect(currency)
			onDismiss()
		},
		[onDismiss, onCurrencySelect]
	)

	const handleClickChangeList = useCallback(() => {
		setListView(true)
	}, [])
	const handleClickBack = useCallback(() => {
		setListView(false)
	}, [])
	const handleSelectListIntroduction = useCallback(() => {
		setListView(true)
	}, [])

	const selectedListUrl = useSelectedListUrl()
	const noListSelected = !selectedListUrl

	return (
		<Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} minHeight={listView ? 40 : noListSelected ? 0 : 80}>
			{listView ? (
				<ListSelect onDismiss={onDismiss} onBack={handleClickBack} />
			) : noListSelected ? (
				<ListIntroduction onSelectList={handleSelectListIntroduction} />
			) : (
				<CurrencySearch
					isOpen={isOpen}
					onDismiss={onDismiss}
					onCurrencySelect={handleCurrencySelect}
					onChangeList={handleClickChangeList}
					selectedCurrency={selectedCurrency}
					otherSelectedCurrency={otherSelectedCurrency}
				/>
			)}
		</Modal>
	)
}
