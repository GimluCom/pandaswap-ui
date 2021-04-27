import { ChainId } from 'uniswap-bsc-sdk'
import React, { useContext } from 'react'
import { Text } from 'rebass'

import styled, { ThemeContext } from 'styled-components'

import { useActiveWeb3React } from '../../hooks'

import { useETHBalances } from '../../state/wallet/hooks'

import { LightCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'
import { RowBetween, RowFixed } from '../Row'
import Column from '../Column'
import Web3Status from '../Web3Status'
import { Zap, ZapOff } from 'react-feather'
import Logo from '../../assets/images/pnda-logo.png'
import '../../assets/fonts.css'

const HeaderFrame = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	top: 0;
	position: absolute;
	z-index: 2;
	${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
	display: flex;
	align-items: center;
`

const HeaderElementWrap = styled.div`
	display: flex;
	align-items: center;

	${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
	display: flex;
	align-items: center;
	pointer-events: auto;
	color: ${({ theme }) => theme.text6};
	:hover {
		cursor: pointer;
	}
	text-decoration: none;
`

const TitleText = styled.div`
	width: fit-content;
	white-space: nowrap;
	color: ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
	font-family: 'Kaushan Script', sans-serif;
	font-weight: 500;
	font-size: 32px;
	letter-spacing: 0.03rem;
	margin-top: -1rem;
	margin-left: 1rem;
`
const TitleSubText = styled.div`
	width: fit-content;
	white-space: nowrap;
	color: ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
	font-family: 'Reem Kufi', sans-serif;
	font-weight: 500;
	font-size: 16px;
	line-height: 0.5rem;
	letter-spacing: 0.03rem;
`

const AccountElement = styled.div<{ active: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
	border-radius: 6px;
	white-space: nowrap;
	width: 100%;

	:focus {
		border: 1px solid blue;
	}
`

const TestnetWrapper = styled.div`
	white-space: nowrap;
	width: fit-content;
	margin: 5px;
	pointer-events: auto;
`

const NetworkCard = styled(LightCard)`
	width: fit-content;
	border-radius: 12px;
	padding: 6px;
	background-color: ${({ theme }) => theme.advancedBG};
`

const PandaIcon = styled.div`
	transition: transform 0.3s ease;
	:hover {
		transform: rotate(-5deg);
	}
	${({ theme }) => theme.mediaWidth.upToSmall`
    img { 
      width: 0rem;
    }
  `};
`

const HeaderControls = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`

const BalanceText = styled(Text)`
	${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const StyledTradeLink = styled.a`
	background-image: linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)),
		radial-gradient(circle at left top, rgb(1, 110, 218), rgb(217, 0, 192));
	text-decoration: none;
	color: ${({ theme }) => theme.primary1};
	border-radius: 6px;
	font-weight: 600;
	font-family: 'Noto Sans';
	margin-right: 10px;
	padding: 8px 12px;
	height: 35px;

	transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);

	@media (max-width: 960px) {
		display: none;
	}
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
	[ChainId.MAINNET]: null,
	[ChainId.RINKEBY]: 'Rinkeby',
	[ChainId.ROPSTEN]: 'Ropsten',
	[ChainId.GÖRLI]: 'Görli',
	[ChainId.KOVAN]: 'Kovan',
	[ChainId.XDAI]: 'BSC'
}

export default function Header() {
	const theme = useContext(ThemeContext)
	const { account, chainId, active, error } = useActiveWeb3React()

	const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

	return (
		<HeaderFrame>
			<RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
				<HeaderElement>
					<Title href=".">
						<PandaIcon>
							<img src={Logo} alt="logo" height="50px" width="59px" />
						</PandaIcon>
						<TitleText>
							PandaSwap
							<TitleSubText>by Bao.Finance</TitleSubText>
						</TitleText>
					</Title>
				</HeaderElement>
				<HeaderControls>
					<HeaderElement>
						<TestnetWrapper>
							{chainId && active && NETWORK_LABELS[chainId] && (
								<NetworkCard>
									<Column style={{ padding: 0, margin: 0 }}>
										<RowBetween>
											{active && !error ? (
												<Zap size="10pt" style={{ color: theme.primary1 }} />
											) : (
												<ZapOff size="10pt" style={{ color: theme.red1 }} />
											)}
											<Text paddingLeft="0.15rem" fontWeight={800} fontSize={10}>
												{NETWORK_LABELS[chainId]}
											</Text>
										</RowBetween>
										<RowFixed>
											<Text fontWeight={300} fontSize={9}>
												ACTIVE
											</Text>
										</RowFixed>
									</Column>
								</NetworkCard>
							)}
						</TestnetWrapper>
						<AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
							{account && userEthBalance ? (
								<BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
									{userEthBalance?.toSignificant(4)} {chainId === 56 ? 'BNB' : 'ETH'}
								</BalanceText>
							) : null}
							<Web3Status />
						</AccountElement>
						<TestnetWrapper>
							<StyledTradeLink
								style={{
									background: `linear-gradient(128.17deg, #337855 -14.78%, #4ab684 110.05%)`,
									color: 'white'
								}}
								target="_blank"
								href="https://farms.pandaswap.xyz/"
							>
								Farms
							</StyledTradeLink>
						</TestnetWrapper>
					</HeaderElement>
					<HeaderElementWrap>
						{/* <VersionSwitch />*/}
						<Settings />
						<Menu />
					</HeaderElementWrap>
				</HeaderControls>
			</RowBetween>
		</HeaderFrame>
	)
}
